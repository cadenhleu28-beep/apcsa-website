# APCSA 2025-2026 Exam Format

**Exam date:** Friday, May 15, 2026, 12:00 PM local time
**Delivery:** 100% digital via College Board Bluebook (laptop or Chromebook)
**No paper option.** Code is typed into Bluebook's built-in editor (no syntax highlighting, no autocomplete).
**Java Quick Reference** provided on-screen during both sections.

---

## Section I: Multiple Choice

| Attribute | Old (pre-2026) | New (2026) |
|-----------|----------------|------------|
| Questions | 40 | **42** |
| Answer choices | 5 (A–E) | **4 (A–D)** |
| Time | 80 min | **90 min** |
| Exam weight | 50% | **55%** |

---

## Section II: Free Response

| Attribute | Old (pre-2026) | New (2026) |
|-----------|----------------|------------|
| Questions | 4 | **4** |
| Total points | 36 (9+9+9+9) | **25 (7+7+5+6)** |
| Time | 80 min | **90 min** |
| Exam weight | 50% | **45%** |

### FRQ Question Breakdown (fixed structure every year)

| Q | Type | Points | Skills | What to Write |
|---|------|--------|--------|---------------|
| 1 | Methods and Control Structures | 7 | 2.A, 2.C | Part A (4 pts): iterative/conditional statements + method calls. Part B (3 pts): must call String methods |
| 2 | Class Design | 7 | 2.B, 2.C | A complete class: private instance variables, constructor, required methods |
| 3 | Data Analysis with ArrayList | 5 | 2.A, 2.B | One method that uses, analyzes, and manipulates an ArrayList |
| 4 | 2D Array | 6 | 2.A, 2.B | One method that uses, analyzes, and manipulates a 2D array |

**Note:** FRQ Q3 now uses ArrayList exclusively (not arrays). This is a change from the previous format.

---

## FRQ Penalty System

Up to 3 penalties per question (labeled v, w, x, y, z). Each penalty applies only **once** per question even if repeated. Penalties cannot reduce a question score below zero.

| Penalty | Triggered by |
|---------|-------------|
| w | Extraneous side effects (e.g., unintended `System.out.println`) |
| y | Destruction of persistent data (incorrectly mutating a parameter reference) |
| z | `void` method or constructor returning a value |

---

## Scoring

- **MCQ:** 42 raw points, each worth equal weight → contributes 55% of composite
- **FRQ:** 25 raw points → contributes 45% of composite
- **AP Score 5:** ~70% composite
- **AP Score 3 (passing):** ~40% composite

---

## Deep Reference Files

See [research/11-mcq-format-detailed.md](11-mcq-format-detailed.md) for full MCQ question type breakdown, topic distribution, distractor patterns, and code examples.

See [research/12-frq-format-detailed.md](12-frq-format-detailed.md) for per-FRQ point rubrics, common mistakes, scenario templates, and writing strategy.

---

## Exam Tips Derived from Format

1. **4 answer choices** (not 5) — no "E" option. Eliminates one distractor per question compared to old format.
2. **Typed code in Bluebook** — practice typing Java by hand without IDE help. No autocomplete.
3. **55% MCQ weight** — MCQ now matters slightly more than FRQ. Strong MCQ performance is critical.
4. **FRQ Q1 Part B** — String methods are always required. Know `length()`, `substring()`, `indexOf()`, `charAt()`.
5. **FRQ Q2** — must write a complete class from scratch. Practice writing class header, `private` fields, constructor with `this.field = param`, and accessor/mutator methods.
6. **FRQ Q3 (ArrayList only)** — know all ArrayList methods cold: `size()`, `add()`, `get()`, `set()`, `remove()`. Practice safe removal (backward traversal).
7. **FRQ Q4 (2D Array)** — practice nested loops with `grid.length` (rows) and `grid[0].length` (cols).
