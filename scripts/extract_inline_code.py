#!/usr/bin/env python3
"""
Extract embedded Java code from MCQ `question` fields into the dedicated
`code` field, so it renders as a proper code block instead of one mashed-up
paragraph.

Conservative: only acts when (a) the question contains clear code lines,
(b) there's no existing `code:` field for that question, and (c) the prose
part is non-empty after extraction.

Runs across mcqBank.ts, curriculum.ts, examData{,2,3}.ts.
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

# Java-ish tokens that strongly indicate a line is code, not prose.
JAVA_KEYWORDS = {
    "public", "private", "protected", "static", "final", "abstract",
    "void", "int", "double", "String", "boolean", "char", "byte",
    "short", "long", "float", "class", "interface", "extends",
    "implements", "return", "new", "if", "else", "for", "while", "do",
    "switch", "case", "break", "continue", "import", "package", "try",
    "catch", "finally", "throw", "throws", "this", "super",
}


def is_code_line(line: str) -> bool:
    """Heuristic: does this line look like Java code, not English prose?"""
    s = line.strip()
    if not s:
        return False

    # Indented lines are almost always code in this context
    if line.startswith(("    ", "\t")):
        return True

    # Lonely braces / annotations / javadoc
    if s in {"{", "}", "});", "};"}:
        return True
    if s.startswith(("/**", "*/", "* ", "@")):
        return True

    # Statement-like: ends with semicolon
    if s.endswith(";") or s.endswith("{") or s.endswith("}"):
        return True

    # Starts with a Java keyword
    first_word = re.split(r"[\s(]", s, maxsplit=1)[0]
    if first_word in JAVA_KEYWORDS:
        return True

    # Contains an obvious Java construct anywhere
    if re.search(
        r"\b(System\.out|public\s+\w+\(|private\s+\w+\(|"
        r"static\s+\w+\s+\w+\(|return\s+[^.];?$|new\s+\w+\()",
        s,
    ):
        return True

    return False


def split_question(raw: str):
    """Split a raw question string (with escaped \\n) into (prose, code).

    Returns (prose, code) where:
      - prose is the joined English text
      - code is the joined Java code (None if no code lines found)
    """
    # Decode escape sequences so we can analyze line by line
    lines = raw.split("\\n")

    prose_lines = []
    code_lines = []

    # Walk lines, classifying each
    for line in lines:
        if is_code_line(line):
            code_lines.append(line)
        else:
            # Blank lines belong with whichever group just ended (default prose)
            if line.strip() == "":
                # If we're inside a code block (last was code), keep blank in code
                if code_lines and not prose_lines:
                    code_lines.append(line)
                elif code_lines and prose_lines and prose_lines[-1] != "":
                    # Boundary between blocks
                    continue
                else:
                    continue
            else:
                prose_lines.append(line)

    if not code_lines:
        return raw, None

    # Trim leading/trailing blanks in code block
    while code_lines and code_lines[0].strip() == "":
        code_lines.pop(0)
    while code_lines and code_lines[-1].strip() == "":
        code_lines.pop()

    prose = " ".join(p.strip() for p in prose_lines if p.strip())
    code = "\\n".join(code_lines)

    # Sanity check: if extraction would leave prose empty, fall back
    if not prose:
        return raw, None
    return prose, code


# Pattern for a question entry: id ... question: "..." (optional code: "...") ... answer/correctId
# We rewrite the question line (and inject code line) when needed.

def process_file(path: Path) -> int:
    src = path.read_text().split("\n")
    out = []
    changes = 0
    n = len(src)

    question_re = re.compile(r'^(?P<indent>\s*)question: "(?P<q>(?:[^"\\]|\\.)*)",\s*$')
    code_field_re = re.compile(r'^\s*code:\s*[`"\']')

    i = 0
    while i < n:
        line = src[i]
        m = question_re.match(line)
        if not m:
            out.append(line)
            i += 1
            continue

        # Look ahead a few lines for an existing `code:` field — if present, skip
        has_code = any(
            code_field_re.match(src[k]) for k in range(i + 1, min(i + 8, n))
        )
        if has_code:
            out.append(line)
            i += 1
            continue

        raw_q = m.group("q")
        if "\\n" not in raw_q:
            out.append(line)
            i += 1
            continue

        prose, code = split_question(raw_q)
        if code is None:
            out.append(line)
            i += 1
            continue

        # Write the cleaned-up question, then a `code:` line right after
        indent = m.group("indent")
        out.append(f'{indent}question: "{prose}",')
        out.append(f'{indent}code: "{code}",')
        changes += 1
        i += 1

    path.write_text("\n".join(out))
    print(f"  {path.relative_to(ROOT)}: extracted code from {changes} questions")
    return changes


def main():
    total = 0
    for f in FILES:
        p = ROOT / f
        if p.exists():
            total += process_file(p)
    print(f"\nTotal questions modified: {total}")


if __name__ == "__main__":
    main()
