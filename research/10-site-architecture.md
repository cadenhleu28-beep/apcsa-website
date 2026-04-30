# Site Architecture — Curriculum JSON Structure

## Summary

| Unit | Sub-units | CED Topics Covered |
|------|-----------|-------------------|
| Unit 1: Using Objects and Methods | 8 | 1.1 – 1.15 (all 15) |
| Unit 2: Selection and Iteration | 6 | 2.1 – 2.12 (all 12) |
| Unit 3: Class Creation | 4 | 3.1 – 3.9 (all 9) |
| Unit 4: Data Collections | 7 | 4.1 – 4.17 (all 17) |
| **Total** | **25 sub-units** | **53 topics** |

---

## Unit 1: Using Objects and Methods
*Exam weight: 15–25% | Color: Blue | Icon: Box*

| Sub-unit ID | Slug | Title | CED Topics |
|-------------|------|-------|------------|
| 1-1 | `java-basics` | Java Basics & Primitive Types | 1.1, 1.2, 1.3 |
| 1-2 | `assignment-casting` | Assignment, Input & Casting | 1.4, 1.5 |
| 1-3 | `operators` | Compound Operators & Increment | 1.6 |
| 1-4 | `apis-comments-method-signatures` | APIs, Comments & Method Signatures | 1.7, 1.8, 1.9 |
| 1-5 | `calling-class-methods` | Calling Class (Static) Methods | 1.10 |
| 1-6 | `math-class` | The Math Class | 1.11 |
| 1-7 | `objects-instantiation` | Objects & Instantiation | 1.12, 1.13, 1.14 |
| 1-8 | `string-manipulation` | String Manipulation | 1.15 |

---

## Unit 2: Selection and Iteration
*Exam weight: 25–35% | Color: Green | Icon: GitBranch*

| Sub-unit ID | Slug | Title | CED Topics |
|-------------|------|-------|------------|
| 2-1 | `boolean-expressions` | Boolean Expressions | 2.1, 2.2 |
| 2-2 | `conditionals` | Conditionals: if, else if, else | 2.3, 2.4, 2.5, 2.6 |
| 2-3 | `while-loops` | while Loops | 2.7 |
| 2-4 | `for-loops` | for Loops & for-each | 2.8 |
| 2-5 | `standard-algorithms` | Standard Algorithms | 2.9, 2.10 |
| 2-6 | `nested-iteration-runtime` | Nested Iteration & Runtime Analysis | 2.11, 2.12 |

---

## Unit 3: Class Creation
*Exam weight: 10–18% | Color: Purple | Icon: Code2*

| Sub-unit ID | Slug | Title | CED Topics |
|-------------|------|-------|------------|
| 3-1 | `abstraction-design` | Abstraction, Design & Ethics | 3.1, 3.2 |
| 3-2 | `class-anatomy-constructors` | Class Anatomy & Constructors | 3.3, 3.4 |
| 3-3 | `writing-methods` | Writing Methods | 3.5, 3.6 |
| 3-4 | `static-scope-this` | Static Members, Scope & the this Keyword | 3.7, 3.8, 3.9 |

---

## Unit 4: Data Collections
*Exam weight: 30–40% | Color: Orange | Icon: Database*

| Sub-unit ID | Slug | Title | CED Topics |
|-------------|------|-------|------------|
| 4-1 | `data-ethics-datasets` | Data Ethics & Introduction to Data Sets | 4.1, 4.2 |
| 4-2 | `arrays` | Arrays | 4.3, 4.4, 4.5 |
| 4-3 | `file-io` | Using Text Files (File I/O) | 4.6 |
| 4-4 | `arraylist` | ArrayList | 4.7, 4.8, 4.9, 4.10 |
| 4-5 | `2d-arrays` | 2D Arrays | 4.11, 4.12, 4.13 |
| 4-6 | `searching-sorting` | Searching & Sorting Algorithms | 4.14, 4.15 |
| 4-7 | `recursion` | Recursion (Trace Only) | 4.16, 4.17 |

---

## URL Structure

```
/                           → Homepage (4 unit cards)
/unit/1                     → Unit 1 Overview
/unit/1/java-basics         → Sub-unit page
/unit/1/assignment-casting  → Sub-unit page
...
/unit/4/recursion           → Last sub-unit page
```

## Linear Navigation Order (Back / Next buttons)

```
1-1 → 1-2 → 1-3 → 1-4 → 1-5 → 1-6 → 1-7 → 1-8
    → 2-1 → 2-2 → 2-3 → 2-4 → 2-5 → 2-6
    → 3-1 → 3-2 → 3-3 → 3-4
    → 4-1 → 4-2 → 4-3 → 4-4 → 4-5 → 4-6 → 4-7
```

The `prevSubUnit()` and `nextSubUnit()` helper functions in `src/data/curriculum.ts` handle this automatically using the `allSubUnits` flat array.

---

## Data File Locations

| File | Purpose |
|------|---------|
| `src/types/curriculum.ts` | TypeScript interfaces for all data shapes |
| `src/data/curriculum.ts` | Full curriculum data + helper functions |
