#!/usr/bin/env python3
"""
Scan all MCQ files for two issue classes:

1. DUPLICATE OPTIONS — any two (or more) options within a single question
   share the same `text` value. This is always a bug (the question is
   un-answerable / ambiguous).

2. ANSWER OUT OF RANGE — the `answer` / `correctId` value isn't one of
   A/B/C/D, or refers to a letter that doesn't appear in the options.

Reports issues with file:line and question id so they can be fixed.
"""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
FILES = [
    ("src/data/mcqBank.ts",    "letter", "answer"),
    ("src/data/curriculum.ts", "id",     "correctId"),
    ("src/data/examData.ts",   "id",     "correctId"),
    ("src/data/examData2.ts",  "id",     "correctId"),
    ("src/data/examData3.ts",  "id",     "correctId"),
]


def parse_questions(path: Path, letter_kw: str, answer_kw: str):
    """Yield (line_number, id, options_dict, answer_letter) for each question."""
    src = path.read_text().split("\n")
    n = len(src)

    opt_re = re.compile(
        rf'^\s*\{{\s*{letter_kw}: "([A-D])",\s*'
        rf"text: (?P<text>\"(?:[^\"\\]|\\.)*\"|'(?:[^'\\]|\\.)*')"
        rf'(?:,\s*[a-zA-Z]+:\s*[^,}}]+?)*\s*\}},?\s*$'
    )
    ans_re = re.compile(rf'^\s*{answer_kw}: "([A-D])",?\s*$')
    id_re = re.compile(r'^\s*id:\s*"?([^",]+)"?,?\s*$')
    opts_start = re.compile(r"^\s*options: \[\s*$")
    opts_end = re.compile(r"^\s*\],?\s*$")

    # Multi-line option (each entry is its own block with id:, text:, on
    # separate lines).
    multi_text_re = re.compile(
        r"^\s*text: (?P<text>\"(?:[^\"\\]|\\.)*\"|'(?:[^'\\]|\\.)*'),?\s*$"
    )
    multi_letter_re = re.compile(rf'^\s*{letter_kw}: "([A-D])",?\s*$')

    i = 0
    # Track the most recent id seen above any options block
    pending_id = None
    while i < n:
        line = src[i]

        idm = id_re.match(line)
        if idm and ('"' in line or "'" in line):
            pending_id = idm.group(1)

        if opts_start.match(line):
            opts_start_line = i + 1  # 1-based
            j = i + 1
            opts = {}  # letter → text
            # Parse 4 entries
            for _ in range(8):  # tolerate up to 4 multi-line entries
                if j >= n:
                    break
                while j < n and (src[j].strip() == "" or src[j].lstrip().startswith("//")):
                    j += 1
                if j >= n:
                    break
                if opts_end.match(src[j]):
                    break
                m = opt_re.match(src[j])
                if m:
                    text = m.group("text")
                    opts[m.group(1)] = text
                    j += 1
                    continue
                # Try multi-line: a `{` on its own line, then fields, then `},`
                if re.match(r"^\s*\{\s*$", src[j]):
                    block_letter = None
                    block_text = None
                    k = j + 1
                    while k < n and not re.match(r"^\s*\},?\s*$", src[k]):
                        lm = multi_letter_re.match(src[k])
                        if lm:
                            block_letter = lm.group(1)
                        tm = multi_text_re.match(src[k])
                        if tm:
                            block_text = tm.group("text")
                        k += 1
                    if block_letter and block_text is not None:
                        opts[block_letter] = block_text
                    j = k + 1
                    continue
                # Unknown line — stop trying
                break

            # Find the answer line right after
            ans_letter = None
            ans_line = None
            jj = j
            while jj < n and jj < j + 6:
                am = ans_re.match(src[jj])
                if am:
                    ans_letter = am.group(1)
                    ans_line = jj + 1
                    break
                jj += 1

            if len(opts) == 4:
                yield (opts_start_line, pending_id, opts, ans_letter)
            i = j
        i += 1


def main():
    total_qs = 0
    total_dup = 0
    total_bad_ans = 0
    for rel_path, letter_kw, answer_kw in FILES:
        path = ROOT / rel_path
        if not path.exists():
            continue
        print(f"\n=== {rel_path} ===")
        file_qs = 0
        file_dup = 0
        file_bad = 0
        for line_no, qid, opts, ans in parse_questions(path, letter_kw, answer_kw):
            file_qs += 1
            # Duplicate options check
            seen = {}
            dups = []
            for letter, text in opts.items():
                if text in seen:
                    dups.append((seen[text], letter, text))
                else:
                    seen[text] = letter
            if dups:
                file_dup += 1
                for prior_letter, dup_letter, dup_text in dups:
                    snippet = dup_text[:80].replace("\n", " ")
                    print(f"  DUP line {line_no} id={qid}: option {prior_letter} == option {dup_letter}: {snippet}")
            # Answer correctness (letter must exist in options)
            if ans is None or ans not in opts:
                file_bad += 1
                print(f"  BAD ANS line {line_no} id={qid}: answer={ans!r}, options={sorted(opts.keys())}")
        total_qs += file_qs
        total_dup += file_dup
        total_bad_ans += file_bad
        print(f"  scanned: {file_qs} questions, {file_dup} with duplicate options, {file_bad} with bad answer letter")

    print(f"\n=== Totals: {total_qs} questions, {total_dup} duplicates, {total_bad_ans} bad-answer-letter ===")


if __name__ == "__main__":
    main()
