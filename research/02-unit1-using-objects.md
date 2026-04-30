# Unit 1: Using Objects and Methods — Detailed Content

**Exam weight:** 15–25% | **Suggested pacing:** ~32–34 class periods

---

## 1.1 Introduction to Algorithms, Programming, and Compilers
- Algorithm: a step-by-step procedure to solve a problem
- Java is compiled to bytecode; JVM executes bytecode on any platform
- Syntax errors caught at compile time; logic/runtime errors at run time

## 1.2 Variables and Data Types
**Primitive types tested on exam:**
| Type | Description | Example |
|------|-------------|---------|
| `int` | Integer, 32-bit | `int x = 5;` |
| `double` | Floating point, 64-bit | `double d = 3.14;` |
| `boolean` | True or false | `boolean b = true;` |

- Declare: `int x;`
- Declare and initialize: `int x = 5;`
- `String` is a reference type (object), not a primitive

## 1.3 Expressions and Output
- Arithmetic operators: `+`, `-`, `*`, `/`, `%`
- **Integer division truncates:** `7 / 2` → `3` (not 3.5)
- **Modulo:** `7 % 3` → `1` (remainder)
- Operator precedence: `*`, `/`, `%` before `+`, `-`; left-to-right for equal precedence
- `System.out.println(value)` — prints with newline
- `System.out.print(value)` — prints without newline
- String concatenation: `"Value: " + x` (int auto-converted to String)

## 1.4 Assignment Statements and Input
- Assignment: `x = expression;` (right side evaluated first)
- `Scanner` class used for input in class instruction (keyboard input excluded from AP exam; see 4.6 for file input which IS tested)

## 1.5 Casting and Range of Variables
- **Widening** (automatic): `int` → `double` (no data loss)
- **Narrowing** (requires explicit cast): `(int) 3.9` → `3` (truncates, not rounds)
- `(double) 7 / 2` → `3.5` (cast before division)
- `7 / (double) 2` → `3.5` (same result)
- `(double) (7 / 2)` → `3.0` (division happens first — still truncates!)
- `int` range: approximately -2.1 billion to 2.1 billion (`Integer.MIN_VALUE` to `Integer.MAX_VALUE`)

## 1.6 Compound Assignment Operators
| Operator | Equivalent | Example |
|----------|------------|---------|
| `x += n` | `x = x + n` | `x += 3` |
| `x -= n` | `x = x - n` | `x -= 1` |
| `x *= n` | `x = x * n` | `x *= 2` |
| `x /= n` | `x = x / n` | `x /= 4` |
| `x %= n` | `x = x % n` | `x %= 3` |
| `x++` | `x = x + 1` | post-increment |
| `++x` | `x = x + 1` | pre-increment (returns new value) |
| `x--` | `x = x - 1` | post-decrement |

## 1.7 Application Program Interface (API) and Libraries
- An API defines how to interact with pre-built classes/methods
- Libraries: collections of pre-written classes
- `import` statement brings in library classes

## 1.8 Documentation with Comments
- Single-line: `// this is a comment`
- Multi-line: `/* this spans multiple lines */`
- Javadoc: `/** @param x the input value */`
- Comments do not affect program execution

## 1.9 Method Signatures
- Format: `returnType methodName(paramType paramName, ...)`
- Example: `public static double calculateArea(double radius)`
- Return type: `void` if nothing returned
- Parameters: typed list of inputs

## 1.10 Calling Class Methods (Static Methods)
- Called on the class, not an object: `ClassName.methodName(args)`
- Example: `Math.abs(-5)`, `Integer.parseInt("42")`
- No object instance required

## 1.11 Math Class
All methods are `static` — call as `Math.methodName(...)`:

| Method | Description | Example |
|--------|-------------|---------|
| `Math.abs(x)` | Absolute value | `Math.abs(-3)` → `3` |
| `Math.pow(base, exp)` | Exponentiation | `Math.pow(2, 3)` → `8.0` |
| `Math.sqrt(x)` | Square root | `Math.sqrt(9)` → `3.0` |
| `Math.random()` | Random double in [0.0, 1.0) | `Math.random()` → e.g. 0.47 |
| `Math.max(a, b)` | Larger of two values | `Math.max(3, 7)` → `7` |
| `Math.min(a, b)` | Smaller of two values | `Math.min(3, 7)` → `3` |
| `Math.floor(x)` | Round down | `Math.floor(3.9)` → `3.0` |
| `Math.ceil(x)` | Round up | `Math.ceil(3.1)` → `4.0` |
| `Math.round(x)` | Round to nearest | `Math.round(3.5)` → `4` |

**Common pattern — random int in range [min, max]:**
```java
int n = (int)(Math.random() * (max - min + 1)) + min;
```

## 1.12 Objects: Instances of Classes
- A **class** is a blueprint; an **object** is an instance of that blueprint
- Objects have **state** (instance variables) and **behavior** (methods)
- Reference variables store the address of an object in memory (not the object itself)

## 1.13 Object Creation and Storage (Instantiation)
- `ClassName varName = new ClassName(args);`
- `new` allocates memory and calls the constructor
- Reference variable holds memory address
- Two variables can reference the same object (**aliasing**)
- Uninitialized reference variables have value `null`

## 1.14 Calling Instance Methods
- Called on an object: `objectRef.methodName(args)`
- Example: `str.length()`, `str.substring(1, 3)`
- The object the method is called on is the **implicit parameter**

## 1.15 String Manipulation
`String` is immutable — all methods return a new String, never modify the original.

| Method | Description | Example |
|--------|-------------|---------|
| `s.length()` | Number of characters | `"hello".length()` → `5` |
| `s.substring(from, to)` | Chars from index `from` to `to-1` (exclusive end) | `"hello".substring(1,3)` → `"el"` |
| `s.substring(from)` | Chars from index `from` to end | `"hello".substring(2)` → `"llo"` |
| `s.indexOf(str)` | Index of first occurrence; -1 if not found | `"hello".indexOf("ll")` → `2` |
| `s.equals(other)` | True if same characters | `"abc".equals("abc")` → `true` |
| `s.compareTo(other)` | Negative/0/positive (lexicographic order) | `"abc".compareTo("abd")` → `-1` |

**Indexing:** Zero-based. `"hello"` → h=0, e=1, l=2, l=3, o=4.

**Important:** Use `.equals()` to compare String content, NOT `==`. Using `==` compares references (memory addresses).
