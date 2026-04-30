# Unit 2: Selection and Iteration — Detailed Content

**Exam weight:** 25–35% | **Suggested pacing:** ~29–31 class periods

---

## 2.1 Algorithms with Selection and Repetition
- Algorithm: a finite set of instructions solving a problem
- **Selection:** conditionally execute code based on a condition
- **Repetition (iteration):** repeat code while a condition holds

## 2.2 Boolean Expressions
**Relational operators** (produce `boolean`):
| Operator | Meaning |
|----------|---------|
| `==` | Equal to |
| `!=` | Not equal to |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal |
| `<=` | Less than or equal |

**Logical operators:**
| Operator | Meaning | Short-circuits? |
|----------|---------|-----------------|
| `&&` | AND — true only if both true | Yes — stops at first `false` |
| `\|\|` | OR — true if either is true | Yes — stops at first `true` |
| `!` | NOT — flips boolean | No |

**De Morgan's Laws (must know for exam):**
- `!(a && b)` ≡ `!a || !b`
- `!(a || b)` ≡ `!a && !b`

**Truth table for `&&`:**
| A | B | A && B |
|---|---|--------|
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | F |

**Truth table for `||`:**
| A | B | A \|\| B |
|---|---|---------|
| T | T | T |
| T | F | T |
| F | T | T |
| F | F | F |

## 2.3 if Statements
```java
if (condition) {
    // runs if condition is true
} else if (anotherCondition) {
    // runs if first false, this true
} else {
    // runs if all above false
}
```
- Conditions are evaluated top to bottom; first true branch executes, rest skipped
- Braces `{}` optional for single-statement bodies (but best practice to include)

## 2.4 Nested if Statements
```java
if (x > 0) {
    if (y > 0) {
        // x > 0 AND y > 0
    }
}
```
- Inner `if` only reached when outer condition is true
- Produces the same logic as `&&` but can be clearer in complex cases

## 2.5 Compound Boolean Expressions
- Combine with `&&`, `||`, `!`
- Example: `if (x >= 0 && x <= 100)` — x is between 0 and 100 inclusive
- Short-circuit evaluation: in `a && b`, if `a` is false, `b` is never evaluated

## 2.6 Comparing Boolean Expressions
- Two conditions are **equivalent** if they produce the same result for all inputs
- Simplify using De Morgan's Laws or truth tables
- Common equivalence: `!(x == y)` ≡ `x != y`

## 2.7 while Loops
```java
while (condition) {
    // body — repeat while condition is true
}
```
- Condition evaluated **before** each iteration
- If condition is false at start, body never executes
- **Infinite loop risk:** if condition never becomes false
- **Off-by-one error:** running one too many or too few times

```java
int i = 0;
while (i < 5) {
    System.out.println(i);
    i++;    // must update or infinite loop
}
// prints 0, 1, 2, 3, 4
```

## 2.8 for Loops
```java
for (initialization; condition; update) {
    // body
}
```
- **Initialization:** runs once before loop starts
- **Condition:** checked before each iteration
- **Update:** runs after each iteration

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
// prints 0, 1, 2, 3, 4
```

**Equivalence with while:**
```java
// These are identical:
for (int i = 0; i < n; i++) { ... }

int i = 0;
while (i < n) { ... i++; }
```

**Enhanced for-each (read-only traversal):**
```java
int[] arr = {1, 2, 3};
for (int val : arr) {
    System.out.println(val);
}
```

## 2.9 Implementing Selection and Iteration Algorithms
Standard algorithms to know (per CED 2.9.A.1):

| Algorithm | Pattern |
|-----------|---------|
| Divisibility | `if (n % d == 0)` |
| Extract digits | `n % 10` for last digit; `n / 10` to remove it |
| Count occurrences | `count++` inside conditional |
| Minimum/Maximum | Initialize to first element; compare each subsequent |
| Sum | Accumulate with `sum += value` |
| Average | `sum / count` (watch for integer division) |

```java
// Find max in array
int max = arr[0];
for (int i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i];
    }
}
```

## 2.10 Implementing String Algorithms
`charAt(int index)` — returns the `char` at index (zero-based)

```java
String s = "hello";
for (int i = 0; i < s.length(); i++) {
    char c = s.charAt(i);
    // process character c
}
```

Standard string algorithms:
- Count vowels/consonants
- Reverse a string
- Check if palindrome
- Find substrings meeting criteria
- Count occurrences of a character

```java
// Reverse a string
String reversed = "";
for (int i = s.length() - 1; i >= 0; i--) {
    reversed += s.charAt(i);
}
```

## 2.11 Nested Iteration
```java
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        // inner body runs rows * cols times total
    }
}
```
- Inner loop completes **all** its iterations for each single iteration of outer loop
- Total iterations = outer iterations × inner iterations
- Common use: printing patterns, processing 2D arrays

**Statement execution count example:**
```java
for (int i = 0; i < 3; i++) {       // 3 times
    for (int j = 0; j < 4; j++) {   // 4 times each
        System.out.print("*");       // runs 3 × 4 = 12 times
    }
}
```

## 2.12 Informal Run-Time Analysis
- **O(n):** linear — one loop through n elements
- **O(n²):** quadratic — nested loops over n elements
- Run-time analysis here is informal: count statement executions or describe growth

```java
// O(n) — visits each element once
for (int i = 0; i < n; i++) { ... }

// O(n²) — for each of n elements, visits n elements
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) { ... }
}
```

No formal Big-O notation required on the exam — students describe "proportional to n" or count exact statement executions.
