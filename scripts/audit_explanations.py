#!/usr/bin/env python3
"""
Score the readability of every MCQ explanation.

The site renders explanations by splitting on sentence boundaries
(period/exclaim/question + space + capital/quote/paren). An explanation
written as ONE long sentence with em-dashes and semicolons chaining
ideas renders as one wall of text — which is the bug we care about.

This script classifies each explanation:

  GOOD       — multiple short sentences, structured, easy to read
  ACCEPTABLE — long-ish but breaks cleanly
  HARD       — wall-of-text / single sentence over ~200 chars
  TERRIBLE   — single run-on sentence over ~400 chars

and reports counts per file so we know the rewrite scope.
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FILES = [
    "src/data/mcqBank.ts",
    "src/data/curriculum.ts",
    "src/data/examData.ts",
    "src/data/examData2.ts",
    "src/data/examData3.ts",
]

# Same split pattern that splitExplanation() uses on the site
SPLIT_RE = re.compile(r"(?<=[.!?])\s+(?=[A-Z\"'(])")
EXPL_RE = re.compile(
    r"explanation:\s*(\"(?:[^\"\\]|\\.)*\"|'(?:[^'\\]|\\.)*'|`[^`]*`)",
)


LEADS_WITH_ANSWER_RE = re.compile(
    r"^(?:[A-D] (?:is|matches|gives|holds|prints|returns|equals)|"
    r"(?:The )?(?:correct )?[Aa]nswer (?:is|matches)|"
    r"Choice [A-D]|Option [A-D]|"
    r"Trace[:\s]|Step \d|`?\w+\(\d|return |Step-by-step)"
)


def grade(text: str) -> tuple:
    """Classify one explanation. Returns (grade, longest_sentence_len, leads_with_answer)."""
    if not text:
        return ("TINY", 0, False)

    sentences = SPLIT_RE.split(text)
    longest_sentence = max(len(s) for s in sentences) if sentences else len(text)
    leads_with_answer = bool(LEADS_WITH_ANSWER_RE.match(text.strip()))

    # Stricter thresholds: a long sentence is HARD to read at any sentence count
    if longest_sentence > 250:
        return ("TERRIBLE", longest_sentence, leads_with_answer)
    if longest_sentence > 180:
        return ("HARD", longest_sentence, leads_with_answer)
    if longest_sentence > 120:
        return ("ACCEPTABLE", longest_sentence, leads_with_answer)
    return ("GOOD", longest_sentence, leads_with_answer)


def main():
    grand = {"GOOD": 0, "ACCEPTABLE": 0, "HARD": 0, "TERRIBLE": 0, "TINY": 0}
    leads_count = 0
    total_count = 0
    hard_ids = []

    for rel in FILES:
        path = ROOT / rel
        if not path.exists():
            continue
        src = path.read_text()
        counts = {"GOOD": 0, "ACCEPTABLE": 0, "HARD": 0, "TERRIBLE": 0, "TINY": 0}
        file_leads = 0

        for m in EXPL_RE.finditer(src):
            lit = m.group(1)
            inner = lit[1:-1]
            inner = (
                inner.replace("\\n", " ")
                .replace("\\t", " ")
                .replace('\\"', '"')
                .replace("\\'", "'")
                .replace("\\\\", "\\")
            )
            g, longest, leads = grade(inner)
            counts[g] += 1
            grand[g] += 1
            total_count += 1
            if leads:
                leads_count += 1
                file_leads += 1
            if g in ("HARD", "TERRIBLE"):
                line_no = src.count("\n", 0, m.start()) + 1
                hard_ids.append((rel, line_no, g, longest, inner[:140]))

        total = sum(counts.values())
        lead_pct = (file_leads * 100 // total) if total else 0
        print(
            f"{rel:30s} total={total:5d}  "
            f"GOOD={counts['GOOD']:4d}  ACCEPTABLE={counts['ACCEPTABLE']:4d}  "
            f"HARD={counts['HARD']:4d}  TERRIBLE={counts['TERRIBLE']:4d}  "
            f"lead={lead_pct}%"
        )

    grand_total = sum(grand.values())
    print()
    print(f"=== TOTALS over {grand_total} explanations ===")
    for k in ("GOOD", "ACCEPTABLE", "HARD", "TERRIBLE", "TINY"):
        pct = grand[k] * 100 // grand_total if grand_total else 0
        print(f"  {k:11s} {grand[k]:5d} ({pct}%)")
    print(f"  leads-with-answer  {leads_count} ({leads_count*100//grand_total}%)")

    print("\n=== 5 sample TERRIBLE (longest sentence > 250 chars) ===")
    terr = [x for x in hard_ids if x[2] == "TERRIBLE"]
    for rel, line_no, g, longest, snippet in terr[:5]:
        print(f"  {rel}:{line_no}  [longest={longest}]  {snippet}...")

    print(f"\nTotal HARD+TERRIBLE explanations needing rewrite: {grand['HARD']+grand['TERRIBLE']}")
    print(f"Total ACCEPTABLE+HARD+TERRIBLE (broader pass): {grand['ACCEPTABLE']+grand['HARD']+grand['TERRIBLE']}")


if __name__ == "__main__":
    main()
