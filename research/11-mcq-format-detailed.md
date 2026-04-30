# APCSA 2025-2026 MCQ Format — Deep Reference

**Applies to:** May 2026 exam (first exam under the new 4-unit curriculum)
**Section I:** 42 questions, 90 minutes, 4 answer choices (A–D), worth 55% of total score

---

## Question Distribution by Unit

These are the **official CED exam weight ranges** from College Board:

| Unit | Title | CED Weight | Approx. Questions (of 42) |
|------|-------|------------|--------------------------|
| Unit 1 | Using Objects and Methods | **15–25%** | 6–11 questions |
| Unit 2 | Selection and Iteration | **25–35%** | 11–15 questions |
| Unit 3 | Class Creation | **10–18%** | 4–8 questions |
| Unit 4 | Data Collections | **30–40%** | 13–17 questions |

**A realistic exam breakdown (~42 Qs):**
- Unit 1: ~10 questions
- Unit 2: ~12 questions
- Unit 3: ~7 questions
- Unit 4: ~13 questions

Unit 4 (Data Collections) is the highest-weighted unit — almost a third of the MCQ section alone.

---

## Topic Sub-Distribution within Units

### Unit 1 Topics (CED 1.1–1.15) — ~10 questions
| Topic | CED # | Typical MCQ count |
|-------|-------|-------------------|
| Primitive types, literals, `int`/`double`/`boolean` | 1.1, 1.2 | 1–2 |
| Variable declaration and assignment | 1.3, 1.4 | 1 |
| Arithmetic operators, integer division, modulo | 1.5 | 1–2 |
| Compound operators (`+=`, `*=`), increment/decrement | 1.6 | 1 |
| Using pre-built methods, APIs | 1.7–1.9 | 1 |
| Static (class) methods, `Math` class | 1.10, 1.11 | 1–2 |
| Object instantiation, constructors, `null` | 1.12–1.14 | 1 |
| String methods: `length()`, `substring()`, `indexOf()`, `charAt()`, `equals()` | 1.15 | 1–2 |

### Unit 2 Topics (CED 2.1–2.12) — ~12 questions
| Topic | CED # | Typical MCQ count |
|-------|-------|-------------------|
| Boolean expressions, relational/logical operators | 2.1, 2.2 | 1–2 |
| `if`, `else if`, `else` chains | 2.3–2.5 | 1–2 |
| De Morgan's law, compound booleans | 2.6 | 1 |
| `while` loops, off-by-one | 2.7 | 2 |
| `for` loops, `for-each` | 2.8 | 2 |
| Standard algorithms (min/max find, accumulator, sequential search, count) | 2.9, 2.10 | 1–2 |
| Nested loops, runtime analysis (Big-O style descriptions) | 2.11, 2.12 | 1–2 |

### Unit 3 Topics (CED 3.1–3.9) — ~7 questions
| Topic | CED # | Typical MCQ count |
|-------|-------|-------------------|
| Abstraction, data representation, ethics/bias basics | 3.1, 3.2 | 1 |
| Class anatomy: fields, constructors, headers | 3.3, 3.4 | 1–2 |
| Writing methods: return types, parameters, `void` | 3.5, 3.6 | 2 |
| `static` members, scope, `this` keyword | 3.7–3.9 | 1–2 |

### Unit 4 Topics (CED 4.1–4.17) — ~13 questions
| Topic | CED # | Typical MCQ count |
|-------|-------|-------------------|
| Data ethics, data sets intro | 4.1, 4.2 | 1 |
| 1D Arrays: creation, traversal, algorithms | 4.3–4.5 | 2–3 |
| Text File I/O (Scanner with file) | 4.6 | 1 |
| ArrayList: creation, `add()`, `get()`, `set()`, `remove()`, `size()` | 4.7–4.9 | 2–3 |
| ArrayList algorithms: traversal, search, removal during traversal | 4.10 | 1–2 |
| 2D Arrays: creation, row/column traversal | 4.11–4.13 | 2 |
| Searching and sorting (sequential, binary, selection, insertion) | 4.14, 4.15 | 1–2 |
| Recursion tracing (not writing) | 4.16, 4.17 | 1 |

---

## MCQ Question Ordering

**Questions are NOT arranged in unit order.** The MCQ section mixes topics throughout. However, there is a general tendency for:
- Questions to gradually increase in complexity (earlier questions are simpler)
- Code-tracing questions to appear throughout the entire section
- Multi-concept questions (combining loops + arrays, or classes + methods) to appear in the second half

**Key implication for practice:** Students should practice ALL topics, not assume a certain order.

---

## Question Types by Computational Thinking Practice

From the official CED, the 5 Practices are weighted as follows across 42 MCQ:

| Practice | % of MCQ | Approx. Questions |
|----------|----------|-------------------|
| Practice 3: Analyze Code | 37–53% | 16–22 questions |
| Practice 2: Develop Code | 22–38% | 9–16 questions |
| Practice 4: Document Code | 10–15% | 4–6 questions |
| Practice 1: Design Code | 2–10% | 1–4 questions |
| Practice 5: Use Responsibly | 2–10% | 1–4 questions |

**Practice 3 (Analyze Code) is the dominant practice** — roughly HALF of all MCQ questions ask you to trace code and determine output, errors, or state.

---

## The 10 MCQ Question Archetypes

### Type 1 — "What is printed?" (Most Common — ~25% of exam)
- Trace all statements, track variable changes, predict `System.out.print` output exactly
- Common traps: string concatenation with integers, integer division truncation, off-by-one in loops
- Example stem: *"What is printed as a result of executing the following code segment?"*
```java
int x = 7;
int y = 2;
System.out.println(x / y);      // prints 3, not 3.5
System.out.println(x % y);      // prints 1
System.out.println(x + " " + y); // prints "7 2"
```

### Type 2 — "What is the value of the variable?" (~15% of exam)
- Trace code and report the final value of a named variable
- Common traps: variable shadowing, reassignment inside loops, compound operators
- Example stem: *"What is the value of `count` after the following loop executes?"*

### Type 3 — "How many times does the loop execute?" (~10% of exam)
- Count iterations for `for`, `while`, or nested loops
- Common traps: `<` vs `<=` boundaries, post-increment vs pre-increment, do-while
- Example stem: *"How many times is the body of the following loop executed?"*

### Type 4 — "Which code segment correctly implements...?" (~15% of exam)
- Choose the correct code from 4 options
- Tests: proper loop bounds, correct use of ArrayList methods, correct class syntax
- Example stem: *"Which of the following code segments correctly removes all negative values from the ArrayList `nums`?"*

### Type 5 — "What is the result when the method is called with these arguments?" (~10% of exam)
- Call a shown method with given arguments, trace what happens, predict return value
- Tests: parameter passing, method logic, return statements
- Example stem: *"What is returned by `mystery(5)` given the following method definition?"*

### Type 6 — "Which of the following changes would make the code work as intended?" (~8% of exam)
- Code contains a bug; find the fix
- Tests: understanding of loop conditions, array bounds, boolean logic
- Example stem: *"The code segment below is intended to find the maximum value in array `arr`. Which change would make it work correctly?"*

### Type 7 — "Which of the following code segments is equivalent to...?" (~7% of exam)
- Recognizing that two code forms behave the same
- Tests: `for`↔`while` equivalence, De Morgan's laws, `if`/`else` chain refactoring
- Example stem: *"Which of the following is equivalent to the code segment shown below?"*

### Type 8 — "What is a precondition / postcondition?" (~6% of exam) — Practice 4
- State what must be true before/after a method runs
- Tests: understanding of assumptions baked into algorithm logic
- Example stem: *"Which of the following is a precondition for the following method to produce the correct result?"*

### Type 9 — I / II / III Style (~5% of exam)
- Presents 3 numbered statements; ask which are true
- Answer choices are combinations: "I only", "I and II only", "I, II, and III", etc.
- Example stem: *"Which of the following statements about the code segment are true?"*

### Type 10 — Ethics / Society / Bias (~3% of exam) — Practice 5
- No code; conceptual question about computing impact
- Topics: algorithmic bias, data privacy, digital equity, intellectual property
- Example stem: *"A company uses an AI model trained on historical hiring data. Which of the following is the most likely concern?"*

---

## Common Distractor Patterns (Wrong Answers Are Designed This Way)

College Board distractors are intentional. Knowing these helps eliminate wrong choices:

| Trap | How It Shows Up |
|------|----------------|
| Integer division truncation | `7/2 = 3`, not `3.5` — one answer shows `3.5` |
| Off-by-one in loop | Loop runs 9 times, one answer says 10, one says 8 |
| String `==` vs `.equals()` | Code uses `==` to compare Strings — one answer assumes it works correctly |
| `null` dereference | Calling a method on a variable that was never assigned |
| Array index out of bounds | Accessing `arr[arr.length]` instead of `arr[arr.length - 1]` |
| Modifying list during forward traversal | Skipping an element when removing from ArrayList mid-loop |
| `void` method used as expression | `result = list.add(item)` — `add` returns `void` |
| Post-increment confusion | `x++` evaluates to old value of `x` |
| `Math.random()` range | Returns `[0.0, 1.0)` — exclusive upper bound |
| Integer overflow | Large multiplication stored in `int` silently overflows |

---

## Frequently Tested Code Patterns

These specific patterns appear most often across years:

### Loop patterns
```java
// Count occurrences in array
int count = 0;
for (int val : arr) {
    if (val == target) count++;
}

// Forward removal from ArrayList (WRONG — skips elements)
for (int i = 0; i < list.size(); i++) {
    if (shouldRemove(list.get(i))) list.remove(i); // BUG: skip next element
}

// Backward removal from ArrayList (CORRECT)
for (int i = list.size() - 1; i >= 0; i--) {
    if (shouldRemove(list.get(i))) list.remove(i);
}
```

### String tracing
```java
String s = "Hello";
System.out.println(s.substring(1, 3)); // "el"  — NOT "ell"
System.out.println(s.indexOf("l"));    // 2
System.out.println(s.length());        // 5
```

### Math class
```java
Math.abs(-3)     // 3
Math.pow(2, 3)   // 8.0  (returns double)
Math.sqrt(9)     // 3.0
Math.random()    // [0.0, 1.0) — multiply to scale
(int)(Math.random() * 6) + 1  // random 1–6
```

### Integer division and casting
```java
int a = 5, b = 2;
double result = a / b;       // 2.0 — division happens before assignment
double result2 = (double)a / b; // 2.5 — cast before division
```

### 2D Array traversal
```java
int[][] grid = new int[rows][cols];
for (int r = 0; r < grid.length; r++) {
    for (int c = 0; c < grid[0].length; c++) {
        // access grid[r][c]
    }
}
```

---

## What Is NOT on the MCQ (Removed in 2025-2026 Reform)

- `extends`, `super`, `@Override` — no inheritance
- `implements`, `interface` — no interfaces
- Polymorphism, dynamic dispatch
- Writing recursive methods (only tracing recursive methods is tested)
- Abstract classes

---

## MCQ Tips for Content Creation

When writing MCQ questions for the study site:

1. **~50% of questions should be code-tracing** ("What is printed?", "What is the value of...?")
2. **Use all 4 answer choices deliberately**: one correct answer, two plausible traps (off-by-one, wrong type, wrong method), one clearly wrong distractor
3. **Keep code short**: real AP exam code snippets are 5–15 lines. Longer is harder to trace under time pressure.
4. **Label units and CED topics** in each MCQ's metadata so the site can track student performance per topic
5. **Include at least one String question per Unit 1 section** — String methods are heavily tested
6. **Include at least one ArrayList traversal question per Unit 4 section** — ArrayList logic is the most common single topic
7. **Avoid inheritance/polymorphism** — these are no longer tested
