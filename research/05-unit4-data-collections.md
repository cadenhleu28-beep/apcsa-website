# Unit 4: Data Collections — Detailed Content

**Exam weight:** 30–40% | **Suggested pacing:** ~50–52 class periods
(Heaviest unit — nearly 1/3 of the exam)

---

## 4.1 Ethical and Social Issues Around Data Collection (NEW)
- **Privacy risks:** collecting/storing personal data creates risks; developers must safeguard user privacy
- **Algorithmic bias:** systemic errors in algorithms produce unfair outcomes based on flawed or incomplete data
- **Data quality:** incomplete or inaccurate data leads to incorrect conclusions
- **Appropriate data sets:** must identify whether a data set is suitable for a given problem

## 4.2 Introduction to Using Data Sets (NEW)
- A **data set** is a collection of specific pieces of information
- Data sets can be manipulated and analyzed to solve problems
- Values accessed one at a time (sequentially)
- Data representable in tables or charts as algorithm-planning tools

## 4.3 Array Creation and Access
```java
// Create empty array (default values)
int[] arr = new int[5];       // [0, 0, 0, 0, 0]
double[] prices = new double[3]; // [0.0, 0.0, 0.0]
boolean[] flags = new boolean[2]; // [false, false]
String[] names = new String[4];  // [null, null, null, null]

// Create with initializer list
int[] scores = {90, 85, 78, 92, 88};
```

- **Zero-based indexing:** first element at index 0
- `arr.length` — number of elements (no parentheses, it's a field)
- `arr[i]` — access element at index `i`
- `ArrayIndexOutOfBoundsException` thrown for invalid index (< 0 or >= length)

## 4.4 Array Traversals
```java
// Standard for loop (read or write)
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}

// Enhanced for-each (read-only)
for (int val : arr) {
    System.out.println(val);
}

// Backward traversal
for (int i = arr.length - 1; i >= 0; i--) {
    System.out.println(arr[i]);
}

// Adjacent elements
for (int i = 0; i < arr.length - 1; i++) {
    System.out.println(arr[i] + " and " + arr[i + 1]);
}
```

## 4.5 Implementing Array Algorithms
```java
// Sum and average
int sum = 0;
for (int val : arr) { sum += val; }
double avg = (double) sum / arr.length;

// Maximum (initialize to first element, NOT 0)
int max = arr[0];
for (int i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
}

// Count occurrences
int count = 0;
for (int val : arr) {
    if (val > 50) count++;
}

// Reverse an array
for (int i = 0; i < arr.length / 2; i++) {
    int temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
}
```

## 4.6 Using Text Files (NEW — required)
```java
import java.io.File;
import java.io.IOException;
import java.util.Scanner;

public static void readFile() throws IOException {
    File f = new File("data.txt");
    Scanner scan = new Scanner(f);

    while (scan.hasNext()) {
        String line = scan.nextLine();
        System.out.println(line);
    }
    scan.close();
}
```

**Scanner methods (all on Java Quick Reference):**
| Method | Returns | Notes |
|--------|---------|-------|
| `nextInt()` | `int` | Throws `InputMismatchException` if unavailable |
| `nextDouble()` | `double` | |
| `nextBoolean()` | `boolean` | |
| `nextLine()` | `String` | Reads full line; may return empty String right after another Scanner method |
| `next()` | `String` | Reads next whitespace-delimited token |
| `hasNext()` | `boolean` | Returns `true` if more input exists |
| `close()` | `void` | Closes the scanner |

**`throws IOException` is required** in the method signature when working with files.
**Keyboard input (`Scanner(System.in)`) is excluded from the AP exam.**

## 4.7 Wrapper Classes
Needed because `ArrayList` requires object types, not primitives.

| Primitive | Wrapper |
|-----------|---------|
| `int` | `Integer` |
| `double` | `Double` |
| `boolean` | `Boolean` |

**Autoboxing:** automatic conversion from primitive to wrapper (`int` → `Integer`)
**Unboxing:** automatic conversion from wrapper to primitive (`Integer` → `int`)

```java
Integer wrapped = 42;        // autoboxing
int primitive = wrapped;     // unboxing
```

**Useful static methods:**
```java
Integer.parseInt("42")       // String → int
Double.parseDouble("3.14")   // String → double
Integer.MIN_VALUE            // -2147483648
Integer.MAX_VALUE            //  2147483647
String.split(String del)     // splits String into array of Strings (NEW on QR)
```

## 4.8 ArrayList Methods
```java
import java.util.ArrayList;

ArrayList<String> list = new ArrayList<String>();
// or with diamond operator:
ArrayList<Integer> nums = new ArrayList<>();
```

**All ArrayList methods (on Java Quick Reference):**
| Method | Description | Returns |
|--------|-------------|---------|
| `list.size()` | Number of elements | `int` |
| `list.add(obj)` | Appends to end | `boolean` (always true) |
| `list.add(index, obj)` | Inserts at index, shifts right | `void` |
| `list.get(index)` | Returns element at index | `E` (the type) |
| `list.set(index, obj)` | Replaces element, returns old | `E` |
| `list.remove(index)` | Removes element, shifts left, returns it | `E` |

**Array vs. ArrayList comparison:**
| Feature | Array | ArrayList |
|---------|-------|-----------|
| Size | Fixed at creation | Dynamic |
| Syntax | `arr[i]` | `list.get(i)` |
| Length | `arr.length` | `list.size()` |
| Primitives | Allowed | Not allowed (use wrappers) |

## 4.9 ArrayList Traversals
```java
// Standard for loop
for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}

// Enhanced for-each (read-only)
for (String s : list) {
    System.out.println(s);
}

// Backward traversal
for (int i = list.size() - 1; i >= 0; i--) {
    System.out.println(list.get(i));
}
```

## 4.10 Implementing ArrayList Algorithms
**Safe removal during traversal (use backward loop to avoid index shifting):**
```java
// Remove all even numbers
for (int i = list.size() - 1; i >= 0; i--) {
    if (list.get(i) % 2 == 0) {
        list.remove(i);
    }
}
```

Why backward? When you remove index `i` going forward, the element at `i+1` shifts to `i` and gets skipped.

## 4.11 2D Array Creation and Access
```java
// Create
int[][] grid = new int[3][4]; // 3 rows, 4 columns

// Initializer list
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Access
grid[row][col] = 10;
int val = matrix[1][2]; // row 1, col 2 → 6
```

- `grid.length` — number of rows
- `grid[0].length` — number of columns
- Row-major storage (elements of same row are together)

## 4.12 2D Array Traversals
```java
// Row-major (standard)
for (int r = 0; r < grid.length; r++) {
    for (int c = 0; c < grid[r].length; c++) {
        System.out.print(grid[r][c] + " ");
    }
    System.out.println();
}

// Enhanced for-each
for (int[] row : grid) {
    for (int val : row) {
        System.out.print(val + " ");
    }
}

// Column-major (outer = cols, inner = rows)
for (int c = 0; c < grid[0].length; c++) {
    for (int r = 0; r < grid.length; r++) {
        System.out.print(grid[r][c] + " ");
    }
}
```

## 4.13 Implementing 2D Array Algorithms
```java
// Sum all elements
int total = 0;
for (int[] row : grid) {
    for (int val : row) {
        total += val;
    }
}

// Find maximum
int max = grid[0][0];
for (int[] row : grid) {
    for (int val : row) {
        if (val > max) max = val;
    }
}
```

## 4.14 Searching Algorithms
**Linear search:** checks each element in order; works on unsorted data
```java
// Returns index, or -1 if not found
public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}
```
- Can start from either end
- For 2D arrays: apply linear search to each row
- Time: O(n)

## 4.15 Sorting Algorithms
**Selection sort:** find the minimum of the unsorted portion, swap into position
```java
for (int i = 0; i < arr.length - 1; i++) {
    int minIndex = i;
    for (int j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) minIndex = j;
    }
    int temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
}
```

**Insertion sort:** take next element from unsorted portion, insert into correct position in sorted portion by shifting
```java
for (int i = 1; i < arr.length; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key;
}
```

## 4.16 Recursion (TRACE ONLY — writing recursive code is excluded)
- A recursive method calls itself
- Must have at least one **base case** (stops recursion) and one **recursive call**
- Each call has its own local variables and parameters
- Any recursive solution can be written iteratively

**Trace example:**
```java
public static int factorial(int n) {
    if (n == 0) return 1;          // base case
    return n * factorial(n - 1);   // recursive call
}
// factorial(4) → 4 * factorial(3) → 4 * 3 * factorial(2)
//              → 4 * 3 * 2 * factorial(1) → 4 * 3 * 2 * 1 * factorial(0)
//              → 4 * 3 * 2 * 1 * 1 = 24
```

**Exclusion Statement:** Writing recursive code is outside the scope of the AP CSA exam.

## 4.17 Recursive Searching and Sorting
**Binary search** (data must be sorted first):
- Start at middle; if target is smaller, search left half; if larger, search right half
- Each step eliminates half the remaining elements
- O(log n) — much more efficient than linear search for large datasets

```java
// Recursive binary search (for tracing — not expected to write on exam)
public static int binarySearch(int[] arr, int target, int low, int high) {
    if (low > high) return -1;
    int mid = (low + high) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] > target) return binarySearch(arr, target, low, mid - 1);
    else return binarySearch(arr, target, mid + 1, high);
}
```

**Merge sort:**
- Recursively divides array in half until sub-arrays have 1 element
- Merges sorted halves back together
- O(n log n) — most efficient of the three required sorts

**Sorting algorithms on the exam:** selection sort, insertion sort, merge sort only.
Other sorting algorithms (bubble sort, quick sort, heap sort) are outside scope.
