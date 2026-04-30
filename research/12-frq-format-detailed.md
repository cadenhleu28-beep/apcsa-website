# APCSA 2025-2026 FRQ Format — Deep Reference

**Applies to:** May 2026 exam (first exam under the new 4-unit curriculum)
**Section II:** 4 questions, 90 minutes, worth 45% of total score
**Total raw points:** 25 (7 + 7 + 5 + 6)
**Platform:** Typed into Bluebook digital editor. No syntax highlighting, no autocomplete.
**Java Quick Reference** is available on-screen during this section.

---

## Fixed FRQ Structure (same every year)

| Q# | Type | Points | Skills | Units Covered |
|----|------|--------|--------|---------------|
| 1 | Methods and Control Structures | **7 pts** | 2.A, 2.C | Units 1, 2 |
| 2 | Class Design | **7 pts** | 2.B, 2.C | Unit 3 |
| 3 | Data Analysis with ArrayList | **5 pts** | 2.A, 2.B | Unit 4 |
| 4 | 2D Array | **6 pts** | 2.A, 2.B | Unit 4 |

**This structure is fixed.** Q1 is always Methods & Control Structures. Q4 is always 2D Arrays. This has been confirmed in the official CED.

---

## FRQ 1: Methods and Control Structures (7 points)

### What it tests
Writing Java methods using: loops, conditionals, method calls to provided helper methods, accumulators, String operations.

### Structure
**Two-part question.**
- **Part A (4 points):** Write a single method. Uses helper methods, conditional logic, or basic accumulation.
- **Part B (3 points):** Write a second method that often calls Part A's method and adds a loop or additional logic.

**Critical:** Part B often requires calling Part A's method. Even if Part A is wrong, Part B can receive full credit if it correctly calls `partAMethod()` as if it worked.

### Typical Scenario Shape
A class is given with some private instance variables and a few helper methods already defined. You write two new methods for that class.

Example (2025 preview — DogWalker):
- Given: `DogWalkingCompany company`, `int maxDogs`
- Part A: Write `walkDogs(int hour)` — call company.numAvailableDogs(), apply logic, return count
- Part B: Write `dogWalkShift(int startHour, int endHour)` — loop over hours, call walkDogs(), accumulate pay

### Point Breakdown Pattern (7 pts)
| Points | What's Awarded For |
|--------|--------------------|
| 1 | Correct loop structure (type, bounds) |
| 1 | Loop variable used correctly inside body |
| 1 | Correct helper method call with proper arguments |
| 1 | Correct conditional logic (if/else) |
| 1 | Accumulator variable correctly initialized and updated |
| 1 | Correct return value or output |
| 1 | Part A method called correctly inside Part B |

### Common Mistakes (Each Costs 1 Point)
- Calling helper method without the object reference (`numAvailableDogs(hour)` instead of `company.numAvailableDogs(hour)`)
- Calling Part A's method twice in a loop (stores intermediate result once, then calls again)
- Using `&&` instead of `||` in a compound condition (or vice versa)
- Loop uses wrong variable in the body (using `startHour` instead of loop variable `hour`)
- Off-by-one: `< endHour` instead of `<= endHour`

### Key Methods/Skills Required
- `while` and `for` loops with custom bounds
- Calling instance methods with correct syntax (`object.method(args)`)
- `Math.min()` or `Math.max()` for clamping values
- String methods: `substring()`, `charAt()`, `indexOf()`, `length()`, `equals()`
- Conditional expressions and boolean logic

### Sample Scenario Types
- Scheduling/availability systems (call helper to check availability per time slot)
- Text processing (process each character in a string using a loop)
- Financial calculators (accumulate earnings with bonus conditions)
- Game scoring (loop over rounds, apply rules per round)

---

## FRQ 2: Class Design (7 points)

### What it tests
Writing a complete Java class from scratch: class header, private instance variables, constructor, and 2–3 required methods.

### Structure
**Single-part question.**
Write an entire class. The question specifies:
- What private fields the class should have (and their types)
- The constructor signature and what it should initialize
- 2–3 methods with their signatures and behavior described in English

### Typical Scenario Shape
A class representing a real-world concept (a text editor, a shopping cart, a student record, etc.). You write the entire class definition.

Example (2025 preview — SignedText):
- Private fields: `String first`, `String last`
- Constructor: `SignedText(String firstName, String lastName)`
- Method 1: `getSignature()` — returns first initial + "-" + last name
- Method 2: `addSignature(String textStr)` — 3-way conditional logic with String operations

### Point Breakdown Pattern (7 pts)
| Points | What's Awarded For |
|--------|--------------------|
| 1 | Correct class header (`public class ClassName`) |
| 1 | Private instance variables with correct types |
| 1 | Constructor header with correct parameters |
| 1 | Constructor body correctly assigns `this.field = param` |
| 1 | Method 1 header correct + returns correct type |
| 1 | Method 1 body implements logic correctly |
| 1 | Method 2 body implements correct multi-case logic |

**Crucial insight:** Nearly half the points are structural (class header, fields, constructor). Write the skeleton FIRST, even if you're unsure of the method bodies.

### Strategy: Write Skeleton First
```java
public class ClassName {
    private Type field1;
    private Type field2;

    public ClassName(Type param1, Type param2) {
        this.field1 = param1;
        this.field2 = param2;
    }

    public ReturnType method1() {
        // TODO
    }

    public ReturnType method2(Type param) {
        // TODO
    }
}
```
This skeleton earns ~4 points before you write any logic.

### Common Mistakes (Each Costs 1 Point)
- `public` instance variables instead of `private`
- Constructor does not assign all parameters to instance variables
- Using a local variable name instead of `this.field` causing shadowing
- `substring(0)` instead of `substring(0, 1)` for single character
- Using `==` to compare Strings instead of `.equals()`
- Missing `return` statement in non-void methods
- Method declared `static` when it should be an instance method

### Key Methods/Skills Required
- All String methods: `length()`, `substring(start, end)`, `indexOf()`, `charAt()`, `equals()`
- Conditional multi-case logic (2–3 `if`/`else if`/`else` branches)
- Correct use of `this.` for instance variables
- Understanding `private` vs. `public` visibility

### Sample Scenario Types
- Text/String manipulation class (signature, label, formatter)
- Score tracker or counter class
- Simple data container class (book, product, student)
- Game entity class (player, card, score)

---

## FRQ 3: Data Analysis with ArrayList (5 points)

### What it tests
Writing one method (or sometimes a constructor + method) that creates, traverses, and manipulates an ArrayList. May involve object creation and insertion.

### Structure
**Usually one or two parts.** Always involves an ArrayList as the primary data structure.

A class with an `ArrayList` instance variable is given. You write:
- A **constructor** that populates the ArrayList, OR
- A **method** that processes/filters/transforms the ArrayList, OR
- Both

### Typical Scenario Shape
A class representing a collection of objects. You build or process the list.

Example (2025 preview — Round with competitors):
- Instance variable: `private ArrayList<Competitor> competitorList`
- Part A: Constructor `Round(String[] names)` — loop through String array, create Competitor objects, add to list
- Part B: `buildMatches()` method — use two-pointer approach (front + back), create Match objects, return new ArrayList<Match>

### Point Breakdown Pattern (5 pts)
| Points | What's Awarded For |
|--------|--------------------|
| 1 | Correct ArrayList method usage (`add()`, `get()`, `size()`, `remove()`) |
| 1 | Correct traversal or iteration (loop bounds correct) |
| 1 | Correct object instantiation inside the loop |
| 1 | Core algorithm logic (two-pointer, filter, accumulate) |
| 1 | Correct return value or list state at end |

### Critical Rule: Do NOT Redeclare the ArrayList
If the class already declares `private ArrayList<X> myList;`, do NOT write:
```java
// WRONG — redeclares as a local variable, loses reference
ArrayList<X> myList = new ArrayList<X>();

// CORRECT — initializes the existing instance variable
myList = new ArrayList<X>();
```

### Common Mistakes (Each Costs 1 Point)
- Redeclaring the ArrayList with a type (`ArrayList<X> myList = ...`) when instance variable already exists
- Off-by-one in rank calculation (`i` instead of `i+1` when ranks start at 1)
- Using `add()` when question wants `set()`, or vice versa
- Wrong loop bounds for two-pointer traversal
- Not returning the new ArrayList at end of a method that should return one
- Accessing `list.get(i)` with `i` out of bounds (past `list.size() - 1`)
- Using `==` to compare objects instead of `.equals()`

### Key Methods/Skills Required
```java
// Full ArrayList API required
list.add(element)           // append
list.add(index, element)    // insert at index
list.get(index)             // read
list.set(index, element)    // replace
list.remove(index)          // delete by index
list.size()                 // count

// Traversal patterns
// Forward:
for (int i = 0; i < list.size(); i++) { ... list.get(i) ... }
// For-each (read only):
for (Type item : list) { ... }
// Backward removal:
for (int i = list.size() - 1; i >= 0; i--) { if (cond) list.remove(i); }
// Two-pointer:
int lo = 0, hi = list.size() - 1;
while (lo < hi) { ... lo++; hi--; }
```

### Two-Pointer Pattern (High-Value)
This pattern appears in ArrayList FRQs when building pairs from a list:
```java
ArrayList<Match> matches = new ArrayList<Match>();
int lo = 0;
int hi = competitorList.size() - 1;
// If odd-sized, skip index 0 (top seed gets a bye)
if (competitorList.size() % 2 != 0) lo = 1;
while (lo < hi) {
    matches.add(new Match(competitorList.get(lo), competitorList.get(hi)));
    lo++;
    hi--;
}
return matches;
```

### Sample Scenario Types
- Tournament bracket / pairing system
- Student roster processing (filter by grade, GPA, etc.)
- Shopping cart (calculate totals, remove items)
- Playlist manager (reorder, filter, add songs)
- Leaderboard (rank players, find top-N)

---

## FRQ 4: 2D Array (6 points)

### What it tests
Writing a constructor or method that creates and/or traverses a 2D array. Uses nested loops, conditional logic on array elements, and in-place mutation.

### Structure
**Usually one or two parts.** Centers on a 2D int array or 2D Object array.

A class with a 2D array instance variable is given. You write:
- A constructor that initializes the 2D array (allocate + fill)
- A method that traverses and processes the 2D array

### Typical Scenario Shape
A grid-based system (game board, spreadsheet, image pixels, etc.).

Example (2025 preview — SumOrSameGame):
- Instance variable: `private int[][] puzzle`
- Part A: Constructor `SumOrSameGame(int rows, int cols)` — allocate grid, fill with random int 1–9
- Part B: `clearPair(int row, int col)` — traverse grid, find matching or summable pairs, apply merging

### Point Breakdown Pattern (6 pts)
| Points | What's Awarded For |
|--------|--------------------|
| 1 | Correct 2D array allocation (`new int[rows][cols]`) |
| 1 | Correct nested loop structure (outer = rows, inner = cols) |
| 1 | Correct bounds (`grid.length` for rows, `grid[0].length` for cols) |
| 1 | Correct element access pattern (`grid[r][c]`) |
| 1 | Correct conditional logic on elements |
| 1 | Correct mutation or return value |

### Key Syntax Required (Must Memorize)
```java
// Declare and allocate
int[][] grid = new int[rows][cols];

// Row count vs. column count
grid.length         // number of rows
grid[0].length      // number of columns

// Access pattern (ALWAYS row then column)
grid[row][col]

// Standard nested loop template
for (int r = 0; r < grid.length; r++) {
    for (int c = 0; c < grid[0].length; c++) {
        // do something with grid[r][c]
    }
}

// Column-first traversal (less intuitive — often tested)
for (int c = 0; c < grid[0].length; c++) {
    for (int r = 0; r < grid.length; r++) {
        // do something with grid[r][c]
    }
}
```

### Common Mistakes (Each Costs 1 Point)
- Swapping `grid.length` and `grid[0].length` (gets rows and columns backwards)
- Accessing `grid[c][r]` instead of `grid[r][c]` (transposes the array)
- Forgetting to allocate: declaring `int[][] grid;` without `= new int[rows][cols]`
- Off-by-one: `<= grid.length` instead of `< grid.length`
- Using `Math.random()` without casting: `(int)(Math.random() * 9) + 1` is needed for int 1–9
- Using `==` to compare String/object elements (for object arrays)
- Mutating the array while using its values — create a copy or process carefully

### Using Math.random() in 2D Array Constructor
When filling a 2D array with random integers in range `[min, max]`:
```java
// Random integer in [1, 9]:
grid[r][c] = (int)(Math.random() * 9) + 1;

// Random integer in [0, n-1]:
grid[r][c] = (int)(Math.random() * n);
```

### Sample Scenario Types
- Game board (Tic-Tac-Toe, Minesweeper, Sudoku cell processor)
- Image/pixel manipulation (brighten, grayscale, rotate)
- Spreadsheet operations (row sums, column averages)
- Maze / pathfinding setup (fill with 0s and 1s)
- Score grids (tournament round results)

---

## Cross-FRQ Rubric Principles

These rules apply across all 4 FRQs:

### Points Are Awarded Positively
Rubrics award points for what you DO correctly, not deduct for errors. Write something — a blank answer gets 0/7; an attempt with a broken loop and correct structure still earns 3–4 points.

### Penalty System (Applied at Most Once Per Question)
| Label | Triggered When |
|-------|----------------|
| `w` | Extraneous `System.out.println()` output (printing when not asked) |
| `y` | Destruction of persistent data (mutating a parameter you shouldn't) |
| `z` | `void` method or constructor has a `return value;` statement |

Each penalty applies **at most once per question**, even if the mistake is repeated.

### Syntax Forgiveness
Minor syntax errors (missing semicolon, extra brace, minor typo) that do not change meaning are generally not penalized. However:
- Wrong method name (`subString` instead of `substring`) = wrong
- Wrong return type = wrong
- Missing `return` = wrong

### "If Part A is Wrong, Part B Can Still Earn Full Credit"
If Part B calls Part A's method and does so correctly, it earns the "calls Part A" point regardless of whether Part A is correctly implemented. Always call Part A, even if you're unsure of Part A.

---

## FRQ Writing Strategy for Recreating Exam Questions

When writing original FRQ-style questions for the study site or a mock exam:

### FRQ 1 Template
1. Create a class with 1–2 private fields and 2–3 given helper methods
2. Ask student to write Part A: a method using a loop + conditional + those helpers
3. Ask student to write Part B: a method that calls Part A in a loop and accumulates a result

### FRQ 2 Template
1. Describe a real-world object with 2–3 properties
2. Specify: private field types, constructor signature, 2 method specs
3. Ask student to write the complete class
4. Method 2 should involve multi-case conditional logic with String operations

### FRQ 3 Template
1. Provide a class with an `ArrayList<ObjectType>` instance variable already declared
2. Ask student to write a constructor that populates it (loop over input array, create objects)
3. OR ask student to write a method that processes it (filter, sort, build pairs)
4. Ideal: use a two-pointer pattern for the method

### FRQ 4 Template
1. Provide a class with a `private int[][] grid` instance variable
2. Ask student to write a constructor that allocates + fills the array
3. Ask student to write a method that traverses and modifies or queries the grid
4. Include at least one conditional check on cell values in the method

---

## Time Budget (90 minutes, 4 questions)

| Question | Recommended Time | Notes |
|----------|-----------------|-------|
| FRQ 1 | 20–22 min | Two parts — do Part A in ~10 min, Part B in ~10 min |
| FRQ 2 | 20–22 min | Write skeleton first (4 pts), then fill methods |
| FRQ 3 | 22–24 min | Think through traversal pattern before coding |
| FRQ 4 | 22–24 min | Get bounds right first; nested loops easy to mess up |
| Buffer | ~5 min | Review for missing return statements, penalty mistakes |

If you finish an FRQ early, review for:
- Missing `return` statements
- Object references (did you use `object.method()` or just `method()`?)
- Off-by-one in loop bounds
- Correct ArrayList method names (`remove` not `delete`, `get` not `fetch`)
