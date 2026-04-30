# Java Quick Reference — 2025-2026 AP Exam

This is the complete list of classes and methods provided to students on-screen during both sections of the AP CSA exam. Nothing outside this list can be assumed to be available — students must memorize anything else they use.

---

## String Class

```java
String(String str)                    // constructor
int length()                          // number of characters
String substring(int from, int to)    // chars [from, to) — end is exclusive
String substring(int from)            // equivalent to substring(from, length())
int indexOf(String str)               // index of first occurrence; -1 if not found
boolean equals(Object other)          // true if same content
int compareTo(String other)           // negative/0/positive (lexicographic)
String[] split(String del)            // NEW 2025-2026: splits on delimiter
```

**Key rules:**
- `substring(from, to)` — `from` is inclusive, `to` is exclusive
- `"hello".substring(1, 3)` → `"el"` (indices 1 and 2 only)
- `indexOf` returns `-1` when not found, never throws an exception
- `compareTo` returns negative if less, 0 if equal, positive if greater
- `split(" ")` splits on spaces; `split(",")` splits on commas

---

## Integer Class

```java
Integer.MIN_VALUE     // -2147483648 (constant)
Integer.MAX_VALUE     //  2147483647 (constant)
static int parseInt(String s)         // converts String to int
```

**Common use — initialize min/max sentinels:**
```java
int min = Integer.MAX_VALUE;  // anything will be smaller
int max = Integer.MIN_VALUE;  // anything will be larger
```

---

## Double Class

```java
static double parseDouble(String s)   // converts String to double
```

---

## Math Class

All methods are `static`. Call as `Math.methodName(...)`.

```java
static int abs(int x)                       // absolute value (int version)
static double abs(double x)                 // absolute value (double version)
static double pow(double base, double exp)  // base^exp (always returns double)
static double sqrt(double x)               // square root (always returns double)
static double random()                     // random double in [0.0, 1.0)
```

**Note:** `Math.max()`, `Math.min()`, `Math.floor()`, `Math.ceil()`, `Math.round()` are **not** on the Quick Reference. Students must know them from memory if used (and they often are).

**Random integer in range [min, max]:**
```java
int n = (int)(Math.random() * (max - min + 1)) + min;
```

---

## ArrayList Class

Requires: `import java.util.ArrayList;`

```java
int size()                       // number of elements
boolean add(E obj)               // appends to end; always returns true
void add(int index, E obj)       // inserts at index; shifts elements right
E get(int index)                 // returns element at index
E set(int index, E obj)          // replaces element; returns old element
E remove(int index)              // removes element; shifts left; returns removed
```

**Declaration:**
```java
ArrayList<String> list = new ArrayList<String>();
ArrayList<Integer> nums = new ArrayList<>();  // diamond operator OK
```

---

## File Class (NEW 2025-2026)

Requires: `import java.io.File;`

```java
File(String pathname)            // creates File object pointing to the given path
```

**Usage:**
```java
File f = new File("data.txt");
```

---

## Scanner Class (NEW 2025-2026 — File version)

Requires: `import java.util.Scanner;` and `import java.io.IOException;`
Method signature must include `throws IOException`.

```java
Scanner(File f)          // creates Scanner to read from a File
int nextInt()            // reads next int token; throws InputMismatchException if unavailable
double nextDouble()      // reads next double token
boolean nextBoolean()    // reads next boolean token
String nextLine()        // reads entire line; may return empty String after another Scanner method
String next()            // reads next whitespace-delimited token
boolean hasNext()        // returns true if more input remains
void close()             // closes the scanner
```

**Exclusion:** `Scanner(System.in)` for keyboard input is **not** on the AP exam.

**Typical file-reading pattern:**
```java
public static void process() throws IOException {
    File f = new File("data.txt");
    Scanner scan = new Scanner(f);
    while (scan.hasNext()) {
        String line = scan.nextLine();
        // process line
    }
    scan.close();
}
```

---

## Object Class

```java
boolean equals(Object other)     // true if objects are equal (override to customize)
String toString()                // String representation (override to customize)
```

---

## Summary: What's NOT on the Quick Reference

Students must memorize these if they use them:
- `Math.max()`, `Math.min()`, `Math.floor()`, `Math.ceil()`, `Math.round()`
- `String.charAt(int index)` — returns `char` at index (critical for string traversal)
- `System.out.println()`, `System.out.print()`
- Array syntax: `arr.length`, `arr[i]`, `new int[n]`, `{1, 2, 3}` initializer
- 2D array syntax: `grid[r][c]`, `grid.length`, `grid[0].length`
- `for`, `while`, `if/else` syntax
- Casting syntax: `(int)`, `(double)`
- `new` keyword
- `this` keyword
- `static` keyword
- All of Unit 3 (class writing syntax)
