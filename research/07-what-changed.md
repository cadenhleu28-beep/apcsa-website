# APCSA 2025-2026 — What Changed

---

## Removed from Required Content

### 1. Inheritance (entire old Unit 9)
The biggest removal. None of the following appear on the 2025-2026 exam:
- `extends` keyword
- Subclass / superclass relationships
- Method overriding and `@Override`
- `super` keyword and `super()` constructor calls
- Polymorphism and dynamic dispatch
- Upcasting / aliasing subclass references to superclass type
- `instanceof` operator
- Interfaces (`implements`)

**Why removed:** Aligns with introductory college CS courses, which cover inheritance later. Allows deeper focus on remaining topics.
**Teachers may still teach it** as enrichment — it simply won't appear on the exam.

### 2. Writing Recursive Methods
Recursion tracing remains (Topic 4.16), but an explicit Exclusion Statement says:
> "Writing recursive code is outside the scope of the AP Computer Science A course and exam."

Students must trace recursive calls and predict outputs — they do NOT write them.

### 3. FRQ Arrays in Question 3
Old FRQ Q3 sometimes used arrays. New FRQ Q3 uses **ArrayList exclusively**.

### 4. Big Ideas
The previous CED had named "Big Ideas" (Modularity, Variables, Control, Impact of Computing, etc.) as a cross-cutting framework. These are **entirely removed** from the 2025-2026 CED. The 5 Computational Thinking Practices are the only cross-cutting framework remaining.

### 5. One answer choice per MCQ question
Old MCQ had 5 choices (A–E). New MCQ has **4 choices (A–D)**.

---

## Added to Required Content

### 1. Topic 4.1 — Ethical and Social Issues Around Data Collection (entirely new)
- Privacy risks from collecting and storing personal data
- Algorithmic bias (systemic errors producing unfair outcomes)
- Data quality: incomplete/inaccurate data leads to wrong conclusions
- Identifying an appropriate data set for a given problem

### 2. Topic 4.2 — Introduction to Using Data Sets (entirely new)
- Definition of a data set
- Manipulating and analyzing data sets to solve problems
- Data represented in charts/tables as algorithm planning tools

### 3. Topic 4.6 — Using Text Files (moved from optional to required)
- `File` class: `new File("filename.txt")`
- `Scanner` with a `File` argument (not `System.in`)
- Full suite of Scanner methods: `nextInt()`, `nextDouble()`, `nextBoolean()`, `nextLine()`, `next()`, `hasNext()`, `close()`
- `throws IOException` required in method headers using files
- `import java.io.File;` and `import java.io.IOException;`

### 4. New items on Java Quick Reference
- `File(String pathname)` — File constructor
- Full `Scanner` class with `File` parameter and all methods
- `String.split(String del)` — splits String into String array

### 5. 42 MCQ questions (up from 40)
Two additional multiple-choice questions added.

### 6. AI pedagogy section in CED (not assessed)
Full instructional section on using AI tools in the classroom — not tested on exam.

---

## Structural Changes

### 10 units → 4 units
Old units reorganized:

| New Unit | Roughly combines old units |
|----------|---------------------------|
| Unit 1: Using Objects and Methods | Old Units 1, 2 |
| Unit 2: Selection and Iteration | Old Units 3, 4 |
| Unit 3: Class Creation | Old Units 5, 6 |
| Unit 4: Data Collections | Old Units 7, 8, 10 |

Old Unit 9 (Inheritance) is eliminated entirely with no replacement.

### Exam weight redistribution
| Section | Old | New |
|---------|-----|-----|
| MCQ | 50% | 55% |
| FRQ | 50% | 45% |

### FRQ point values changed
| Q | Old points | New points |
|---|-----------|-----------|
| Q1 | 9 | 7 |
| Q2 | 9 | 7 |
| Q3 | 9 | 5 |
| Q4 | 9 | 6 |
| **Total** | **36** | **25** |

---

## Pedagogical Shifts

1. **Objects-first approach preserved:** Unit 1 uses existing objects (String, Math) before students write their own classes in Unit 3.

2. **Ethics before algorithms:** Unit 4 opens with data ethics (4.1–4.2) before arrays and ArrayLists, contextualizing why data structures matter.

3. **Real-world data integration:** File I/O (4.6) placed early in Unit 4 so authentic datasets can power ArrayList and 2D Array exercises.

4. **Digital-first assessment:** All exams in Bluebook — students type Java without IDE assistance. Practice typing code matters now more than ever.

5. **Recursion scoped down significantly:** From "write recursive methods" to "trace recursive calls only."

6. **Teacher unit autonomy:** Teachers may subdivide the 4 units however they like. The 4-unit structure defines what is assessed, not how instruction must be organized.

7. **20 lab hours still required:** Lab requirement unchanged from previous CED.
