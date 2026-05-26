#!/usr/bin/env python3
"""
Rebalance MCQ answer-letter distribution across all question files.

For each question:
  1. Compute a hash-based target letter (A/B/C/D) so each is roughly 25%.
  2. If current letter != target, rotate options + update answer + remap
     letter references in the explanation.

Skips questions with multi-line option entries (a rare edge case in exam files).
"""

import re
import hashlib
import random
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent.parent
LETTERS = "ABCD"

FILES = [
    ("src/data/mcqBank.ts",    "letter", "answer"),
    ("src/data/curriculum.ts", "id",     "correctId"),
    ("src/data/examData.ts",   "id",     "correctId"),
    ("src/data/examData2.ts",  "id",     "correctId"),
    ("src/data/examData3.ts",  "id",     "correctId"),
]

# Strict choice-letter context patterns. Each lookaround anchors the [A-D]
# as a real choice reference (vs. a variable name or other use).
# Python's re requires fixed-width lookbehind, so use separate patterns for
# "Choice", "Option", "Distractor".
EXPL_PATTERNS = [
    re.compile(r"(?<=\bChoice )[A-D]\b"),
    re.compile(r"(?<=\bOption )[A-D]\b"),
    re.compile(r"(?<=\bDistractor )[A-D]\b"),
    re.compile(
        r"\b[A-D](?= (?:is|would|are|and|confuses|describes|swaps|misses|"
        r"requires|skips|matches|fits|hits|fails|tests|uses|adds|removes|"
        r"sets|gets|seems|might|forgets|reverses|leaves|drops|loses|wins|"
        r"overcounts|undercounts|attempts|expects|assumes|tries|reads|"
        r"writes|works|prints|throws|computes|returns)\b)"
    ),
    re.compile(r"(?<=\. )[A-D]\b"),
    re.compile(r"[A-D](?=\))"),
    re.compile(r"\b[A-D](?=:)"),
]


def build_target_list(salt: str, n_questions: int) -> list:
    """Build a list of target letters, exact-even distribution, deterministically
    shuffled per file. So a 42-question file gets exactly 11/11/10/10 across A/B/C/D
    in a per-file pseudo-random order."""
    targets = [LETTERS[i % 4] for i in range(n_questions)]
    rng = random.Random(salt)
    rng.shuffle(targets)
    return targets


def remap_explanation(text: str, remap: dict) -> str:
    """Replace choice-letter references using remap dict (e.g. {'A':'C',...}).

    Uses placeholders to avoid cascading replacements: pattern N's output
    can otherwise re-match in pattern N+1, undoing the first change.
    """

    PLACEHOLDER = {l: f"\x01{l}\x01" for l in LETTERS}

    def to_placeholder(m):
        return PLACEHOLDER[m.group(0)]

    # First pass: every choice-letter reference becomes a placeholder
    for pat in EXPL_PATTERNS:
        text = pat.sub(to_placeholder, text)

    # Second pass: placeholders become the remapped letter
    for old, ph in PLACEHOLDER.items():
        text = text.replace(ph, remap[old])

    return text


def parse_option_entry(src, start_idx, letter_kw):
    """Parse one option entry starting at src[start_idx].

    Returns dict with:
      kind: 'single' or 'multi'
      letter: 'A'/'B'/'C'/'D'
      text: the quoted text literal (e.g., '"hello"')
      rest: extra fields trailing the text in single-line format (e.g., ', isCode: true')
      end_idx: index of the last line of the entry
      text_idx: (multi-line only) index of the line containing `text:`
      text_indent: (multi-line only) indent of the text line
      text_rest: (multi-line only) trailing fragment after the text value on its own line
    """
    line = src[start_idx]

    # Single-line: { id: "X", text: "..." or '...' (the wrapping quote can be
    # either, e.g. '"gramm_5"' for a JSON-like string that itself contains "),
    # optionally followed by extra fields like isCode: true.
    single_re = re.compile(
        rf'^(?P<indent>\s*)\{{ {letter_kw}: "(?P<letter>[A-D])", '
        rf"text: (?P<text>\"(?:[^\"\\]|\\.)*\"|'(?:[^'\\]|\\.)*')"
        rf"(?P<rest>(?:,\s*[a-zA-Z]+:\s*[^,}}]+?)*)?\s*\}},\s*$"
    )
    m = single_re.match(line)
    if m:
        return {
            "kind": "single",
            "indent": m.group("indent"),
            "letter": m.group("letter"),
            "text": m.group("text"),
            "rest": m.group("rest") or "",
            "end_idx": start_idx,
        }

    # Multi-line: {  <newline>  id: "X",  text: "...",  isCode: true,  },
    if re.match(r"^\s*\{\s*$", line):
        i = start_idx + 1
        letter = None
        text = None
        text_idx = None
        text_indent = None
        # Walk until we hit the closing `},`
        while i < len(src):
            l = src[i]
            if re.match(r"^\s*\},?\s*$", l):
                if letter and text is not None:
                    return {
                        "kind": "multi",
                        "letter": letter,
                        "text": text,
                        "text_idx": text_idx,
                        "text_indent": text_indent,
                        "end_idx": i,
                    }
                return None
            # letter field
            lm = re.match(rf'^\s*{letter_kw}: "([A-D])",\s*$', l)
            if lm:
                letter = lm.group(1)
                i += 1
                continue
            # text field — quote wrapper can be " or '
            tm = re.match(
                r"^(?P<indent>\s*)text: (?P<text>\"(?:[^\"\\]|\\.)*\"|'(?:[^'\\]|\\.)*'),?\s*$",
                l,
            )
            if tm:
                text = tm.group("text")
                text_idx = i
                text_indent = tm.group("indent")
                i += 1
                continue
            # Other fields (isCode, etc.) — skip
            i += 1
        return None

    return None


def count_questions(src: list, letter_kw: str, answer_kw: str) -> int:
    """Quick first pass: count rebalanceable questions (4-option blocks with answer)."""
    ans_re = re.compile(rf'^\s*{answer_kw}: "[A-D]",\s*$')
    opts_start_re = re.compile(r"^\s*options: \[\s*$")
    count = 0
    i = 0
    n = len(src)
    while i < n:
        if opts_start_re.match(src[i]):
            j = i + 1
            entries = []
            for _ in range(4):
                if j >= n:
                    break
                while j < n and (src[j].strip() == "" or src[j].lstrip().startswith("//")):
                    j += 1
                entry = parse_option_entry(src, j, letter_kw)
                if entry is None:
                    break
                entries.append(entry)
                j = entry["end_idx"] + 1
            while j < n and (src[j].strip() == "" or src[j].lstrip().startswith("//")):
                j += 1
            if len(entries) == 4 and j < n and re.match(r"^\s*\],?\s*$", src[j]):
                j += 1
                while j < n:
                    if ans_re.match(src[j]):
                        count += 1
                        break
                    if not (src[j].strip() == "" or src[j].lstrip().startswith("//")):
                        break
                    j += 1
        i += 1
    return count


def process_file(path: Path, letter_kw: str, answer_kw: str):
    src = path.read_text().split("\n")
    out = list(src)

    # First pass: count questions, then build a per-file target list with
    # exact-even distribution.
    n_questions = count_questions(src, letter_kw, answer_kw)
    targets = build_target_list(str(path.name), n_questions)

    ans_re = re.compile(rf'^(?P<indent>\s*){answer_kw}: "(?P<letter>[A-D])",\s*$')
    # Explanation can be on same line as `explanation:` keyword, OR keyword on
    # one line and the string literal indented on the next line.
    expl_sameline_re = re.compile(
        r"^(?P<indent>\s*)explanation: (?P<lit>\"(?:[^\"\\]|\\.)*\"|'(?:[^'\\]|\\.)*'),?\s*$"
    )
    expl_kw_re = re.compile(r"^(?P<indent>\s*)explanation:\s*$")
    expl_strline_re = re.compile(
        r"^(?P<indent>\s*)(?P<lit>\"(?:[^\"\\]|\\.)*\"|'(?:[^'\\]|\\.)*'),?\s*$"
    )
    opts_start_re = re.compile(r"^\s*options: \[\s*$")
    opts_end_re = re.compile(r"^\s*\],?\s*$")

    qidx = 0
    changes = 0
    skipped = 0

    i = 0
    n = len(src)
    while i < n:
        if opts_start_re.match(src[i]):
            entries = []
            j = i + 1
            for _ in range(4):
                if j >= n:
                    break
                # Skip blank lines and comments between entries
                while j < n and (src[j].strip() == "" or src[j].lstrip().startswith("//")):
                    j += 1
                entry = parse_option_entry(src, j, letter_kw)
                if entry is None:
                    break
                entries.append(entry)
                j = entry["end_idx"] + 1

            # Skip blank/comment lines before the `],`
            while j < n and (src[j].strip() == "" or src[j].lstrip().startswith("//")):
                j += 1

            if len(entries) != 4 or j >= n or not opts_end_re.match(src[j]):
                skipped += 1
                i += 1
                continue

            close_idx = j
            j += 1

            # Find the answer line
            ans_idx = None
            while j < n:
                if ans_re.match(src[j]):
                    ans_idx = j
                    break
                if not (src[j].strip() == "" or src[j].lstrip().startswith("//")):
                    break
                j += 1
            if ans_idx is None:
                i += 1
                continue
            am = ans_re.match(src[ans_idx])
            current = am.group("letter")
            j = ans_idx + 1

            # Find the explanation. Two formats:
            #   (a) explanation: "literal",
            #   (b) explanation:
            #         "literal",
            expl_idx = None
            expl_lit = None
            expl_indent = None
            expl_format = None  # 'sameline' or 'twoline'
            while j < n:
                m = expl_sameline_re.match(src[j])
                if m:
                    expl_idx = j
                    expl_lit = m.group("lit")
                    expl_indent = m.group("indent")
                    expl_format = "sameline"
                    break
                m = expl_kw_re.match(src[j])
                if m and j + 1 < n:
                    sm = expl_strline_re.match(src[j + 1])
                    if sm:
                        expl_idx = j + 1
                        expl_lit = sm.group("lit")
                        expl_indent = sm.group("indent")
                        expl_format = "twoline"
                        break
                if not (src[j].strip() == "" or src[j].lstrip().startswith("//")):
                    break
                j += 1

            target = targets[qidx] if qidx < len(targets) else LETTERS[qidx % 4]
            qidx += 1

            if current == target:
                i = (expl_idx if expl_idx is not None else ans_idx) + 1
                continue

            cur_i = LETTERS.index(current)
            tgt_i = LETTERS.index(target)
            shift = (cur_i - tgt_i + 4) % 4

            # Rotate the text values across entries; each entry KEEPS its
            # original kind/structure, only the text content moves.
            texts = [e["text"] for e in entries]
            rests = [e.get("rest", "") for e in entries]
            new_texts = [texts[(k + shift) % 4] for k in range(4)]
            new_rests = [rests[(k + shift) % 4] for k in range(4)]

            for k, entry in enumerate(entries):
                if entry["kind"] == "single":
                    # Rebuild the single-line entry with the new text + rest
                    line_idx = entry["end_idx"]
                    out[line_idx] = (
                        f'{entry["indent"]}{{ {letter_kw}: "{entry["letter"]}", '
                        f'text: {new_texts[k]}{new_rests[k]} }},'
                    )
                else:
                    # Multi-line: only update the text-field line
                    text_idx = entry["text_idx"]
                    out[text_idx] = f'{entry["text_indent"]}text: {new_texts[k]},'

            # Rewrite answer
            out[ans_idx] = f'{am.group("indent")}{answer_kw}: "{target}",'

            # Remap explanation
            if expl_idx is not None:
                remap = {LETTERS[k]: LETTERS[(k - shift + 4) % 4] for k in range(4)}
                new_lit = remap_explanation(expl_lit, remap)
                if expl_format == "sameline":
                    out[expl_idx] = f"{expl_indent}explanation: {new_lit},"
                else:
                    # Two-line: only update the string-literal line; keep the
                    # `explanation:` keyword line unchanged.
                    out[expl_idx] = f"{expl_indent}{new_lit},"

            changes += 1
            i = (expl_idx if expl_idx is not None else ans_idx) + 1
        else:
            i += 1

    path.write_text("\n".join(out))
    print(f"{path}: {changes} of {qidx} questions rebalanced (skipped {skipped}).")


def report_distribution():
    print("\n=== Final distributions ===")
    for rel_path, _, ans_kw in FILES:
        p = ROOT / rel_path
        src = p.read_text()
        counts = {l: 0 for l in LETTERS}
        for m in re.finditer(rf'{ans_kw}: "([A-D])"', src):
            counts[m.group(1)] += 1
        total = sum(counts.values())
        if total == 0:
            continue
        line = " ".join(f"{l}={counts[l]}({counts[l]*100//total}%)" for l in LETTERS)
        print(f"  {rel_path:30s} total={total:4d}  {line}")


if __name__ == "__main__":
    for rel_path, letter_kw, answer_kw in FILES:
        path = ROOT / rel_path
        if not path.exists():
            print(f"SKIP: {path} not found", file=sys.stderr)
            continue
        process_file(path, letter_kw, answer_kw)
    report_distribution()
