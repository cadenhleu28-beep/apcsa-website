# MCQ Bank — Feature Specification

Last updated: 2026-04-30

---

## Core Design Philosophy

The MCQ Bank has two modes:

- **Whole Unit** — a one-and-done quiz drawn randomly across all topics in a unit, with a score at the end.
- **Specific Topic** — a mastery drill. The user picks one topic and gets 5 questions per round, cycling infinitely until they feel confident. There is no finish line.

---

## User Workflow

```
MCQ Bank
  └── Step 1: Choose mode
        ├── [Whole Unit]
        └── [Specific Topic]

      ── [Whole Unit] path ──────────────────────────────
        → Pick unit (1 / 2 / 3 / 4)
        → Pick question count (10 / 15 / 20 / 25)
        → Questions drawn randomly from all topics in that unit
        → One-and-done quiz
        → Score summary screen at the end (X / N correct)

      ── [Specific Topic] path ──────────────────────────
        → Pick unit (1 / 2 / 3 / 4)
        → Pick a topic from that unit (list of 9–17 topics, no "All" option)
        → 5 questions served from that topic's 30-question bank
        → Instant feedback on each question (correct/incorrect + explanation)
        → "Next Question →" button
        → After Q5: "Go Again" button — serves the next 5 questions
        → When the 30-question pool is exhausted, it reshuffles and loops
        → No score pressure, no forced endpoint — user exits when ready
```

---

## Question Bank Size

**Every topic has exactly 30 questions.**

- 53 topics across 4 units
- **1,590 total questions** in the full bank

| Unit | Topics | Questions |
|---|---|---|
| Unit 1 — Using Objects and Methods | 15 | 450 |
| Unit 2 — Selection and Iteration | 12 | 360 |
| Unit 3 — Class Creation | 9 | 270 |
| Unit 4 — Data Collections | 17 | 510 |
| **Total** | **53** | **1,590** |

---

## Topic List by Unit

### Unit 1 — Using Objects and Methods
*(Exam weight: 15–25%)*

| # | Topic |
|---|---|
| 1.1 | Introduction to Algorithms, Programming, and Compilers |
| 1.2 | Variables and Data Types |
| 1.3 | Expressions and Output |
| 1.4 | Assignment Statements and Input |
| 1.5 | Casting and Range of Variables |
| 1.6 | Compound Assignment Operators |
| 1.7 | Application Program Interface (API) and Libraries |
| 1.8 | Documentation with Comments |
| 1.9 | Method Signatures |
| 1.10 | Calling Class Methods |
| 1.11 | Math Class |
| 1.12 | Objects: Instances of Classes |
| 1.13 | Object Creation and Storage (Instantiation) |
| 1.14 | Calling Instance Methods |
| 1.15 | String Manipulation |

### Unit 2 — Selection and Iteration
*(Exam weight: 25–35%)*

| # | Topic |
|---|---|
| 2.1 | Algorithms with Selection and Repetition |
| 2.2 | Boolean Expressions |
| 2.3 | if Statements |
| 2.4 | Nested if Statements |
| 2.5 | Compound Boolean Expressions |
| 2.6 | Comparing Boolean Expressions |
| 2.7 | while Loops |
| 2.8 | for Loops |
| 2.9 | Implementing Selection and Iteration Algorithms |
| 2.10 | Implementing String Algorithms |
| 2.11 | Nested Iteration |
| 2.12 | Informal Run-Time Analysis |

### Unit 3 — Class Creation
*(Exam weight: 10–18%)*

| # | Topic |
|---|---|
| 3.1 | Abstraction and Program Design |
| 3.2 | Impact of Program Design |
| 3.3 | Anatomy of a Class |
| 3.4 | Constructors |
| 3.5 | Methods: How to Write Them |
| 3.6 | Methods: Passing and Returning References of an Object |
| 3.7 | Class Variables and Methods |
| 3.8 | Scope and Access |
| 3.9 | this Keyword |

### Unit 4 — Data Collections
*(Exam weight: 30–40%)*

| # | Topic |
|---|---|
| 4.1 | Ethical and Social Issues Around Data Collection |
| 4.2 | Introduction to Using Data Sets |
| 4.3 | Array Creation and Access |
| 4.4 | Array Traversals |
| 4.5 | Implementing Array Algorithms |
| 4.6 | Using Text Files |
| 4.7 | Wrapper Classes |
| 4.8 | ArrayList Methods |
| 4.9 | ArrayList Traversals |
| 4.10 | Implementing ArrayList Algorithms |
| 4.11 | 2D Array Creation and Access |
| 4.12 | 2D Array Traversals |
| 4.13 | Implementing 2D Array Algorithms |
| 4.14 | Searching Algorithms |
| 4.15 | Sorting Algorithms |
| 4.16 | Recursion |
| 4.17 | Recursive Searching and Sorting |

---

## Infinite Loop Behavior (Specific Topic Mode)

- Each topic has a 30-question pool.
- The session maintains a shuffled queue drawn from that pool.
- Questions are served 5 at a time.
- When the queue empties (after 6 rounds = 30 questions), it reshuffles the full pool and starts again.
- No "you've seen all questions" screen — the loop is invisible to the user.
- Optional: a small quiet counter "Questions answered this session: X" in the corner. No score tracker.

---

## Per-Question UI

1. Topic label (e.g., "2.8 — for Loops")
2. Question text (with code block if applicable)
3. Four answer choices (A–D), selectable once
4. After selection:
   - Correct answer highlighted green
   - Chosen wrong answer highlighted red (if applicable)
   - Explanation revealed below
5. "Next Question →" button (or "Go Again" after Q5 in topic mode)

---

## Whole Unit Mode — Score Summary Screen

After the final question in a Whole Unit session:
- "X / N correct"
- Breakdown by topic (how many from each topic, how many correct)
- "Try Again" button (new random draw) and "Back to Menu" button

---

## Implementation Plan

1. Write all question data (`src/data/mcqBank.ts`) — 1,590 questions, unit by unit
2. Build unit/topic/count selection UI
3. Build quiz engine (shuffle, 5-at-a-time cycling, whole-unit draw)
4. Build per-question UI with feedback
5. Build score summary screen (whole unit mode only)

---

## Open Questions / Future Considerations

- Persistent progress via localStorage: highlight topics the user has drilled before.
- Streak indicator: subtle "5 in a row correct!" message after consecutive correct answers.
- Could add a "weak topics" summary after a whole unit session.
