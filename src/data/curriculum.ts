import type { Curriculum } from "../types/curriculum";

// APCSA 2025-2026 Curriculum — Official CED structure
// Source: College Board AP Computer Science A CED, effective Fall 2025 (AP D-531)
//
// 4 units, 53 official topics, grouped into 30 sub-units for the website.
// Topic numbering (e.g. "1.1", "4.6") matches the official CED exactly.
// DO NOT add Inheritance/Polymorphism — removed from the 2025-2026 exam.
// Recursion (4.16): trace-only. Writing recursive methods is excluded.
// File I/O (4.6): Scanner with File, NOT Scanner(System.in).

export const curriculum: Curriculum = {
  version: "2025-2026",
  totalTopics: 53,
  units: [
    // ─────────────────────────────────────────────────────────────────────
    // UNIT 1: Using Objects and Methods  (Topics 1.1 – 1.15)
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 1,
      slug: "using-objects",
      title: "Using Objects and Methods",
      examWeight: "15–25%",
      suggestedPeriods: "32–34",
      description:
        "Java fundamentals: primitive types, expressions, operators, APIs, and using pre-built objects like String and Math.",
      color: "blue",
      icon: "Box",
      subUnits: [
        {
          id: "1-1",
          slug: "java-basics",
          title: "Java Basics & Primitive Types",
          cedTopics: ["1.1", "1.2", "1.3"],
          description:
            "Algorithms, compilation, primitive data types, arithmetic expressions, and printed output.",
          objectives: [
            "Explain what an algorithm is and how a compiler converts source code to bytecode",
            "Declare and initialize int, double, and boolean variables",
            "Write arithmetic expressions using +, -, *, /, and %",
            "Predict the result of integer division and the modulo operator",
            "Use System.out.println and System.out.print to produce output",
          ],
          codeExamples: [
            {
              id: "1-1-ex1",
              title: "Your First Java Program",
              code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.print("No newline here. ");
        System.out.println("Same line as above.");
    }
}`,
              explanation:
                "Every Java program lives inside a class. The main method is the entry point — Java runs it automatically. println adds a newline after printing; print does not.",
            },
            {
              id: "1-1-ex2",
              title: "Declaring Primitive Variables",
              code: `int score = 95;           // 32-bit whole number
double gpa = 3.85;         // 64-bit decimal
boolean passed = true;     // only true or false

System.out.println(score);   // 95
System.out.println(gpa);     // 3.85
System.out.println(passed);  // true`,
              explanation:
                "The three primitive types on the AP exam are int, double, and boolean. String is a reference type (object), not a primitive — it stores a memory address, not raw data.",
            },
            {
              id: "1-1-ex3",
              title: "Arithmetic & Integer Division",
              code: `int a = 7;
int b = 2;

System.out.println(a + b);  // 9
System.out.println(a - b);  // 5
System.out.println(a * b);  // 14
System.out.println(a / b);  // 3  ← truncates, does NOT round!
System.out.println(a % b);  // 1  ← remainder (modulo)

double result = 7.0 / 2;    // 3.5  (one double → double division)`,
              explanation:
                "When both operands are int, division truncates toward zero — 7 / 2 is 3, not 3.5. The modulo operator (%) returns the remainder after division. If either operand is a double, the result is a double.",
            },
            {
              id: "1-1-ex4",
              title: "String Concatenation with +",
              code: `int year = 2026;
String msg = "AP Exam year: " + year;
System.out.println(msg);              // AP Exam year: 2026

// Evaluation goes left-to-right — this is a common trap!
System.out.println("Sum: " + 1 + 2); // Sum: 12  (NOT 3!)
System.out.println("Sum: " + (1 + 2)); // Sum: 3   (parens force addition first)`,
              explanation:
                "When + is applied to a String, it concatenates rather than adds. Left-to-right evaluation means \"Sum: \" + 1 produces \"Sum: 1\" first, then \"Sum: 1\" + 2 produces \"Sum: 12\". Use parentheses to force arithmetic before concatenation.",
            },
          ],
          conceptChecks: [
            {
              id: "1-1-cc1",
              prompt: "What does the following code print?",
              code: `System.out.println(17 / 5);
System.out.println(17 % 5);`,
              answer:
                "3\n2\n\nInteger division truncates: 17 ÷ 5 = 3 remainder 2. So 17 / 5 → 3, and 17 % 5 → 2.",
              hint: "Both operands are int, so / truncates and % gives the remainder.",
            },
            {
              id: "1-1-cc2",
              prompt: "What is the output of this code?",
              code: `System.out.print("A");
System.out.println("B");
System.out.print("C");
System.out.println("D");`,
              answer:
                "AB\nCD\n\nprint() does not add a newline, so A and B appear on the same line. println() adds a newline after B, then C and D appear on the next line.",
              hint: "Track which calls use print vs. println.",
            },
            {
              id: "1-1-cc3",
              prompt: "What is the output of this code segment?",
              code: `int x = 10;
int y = 4;
System.out.println(x / y);
System.out.println(x % y);`,
              answer:
                "2\n2\n\n10 / 4 = 2 (truncated from 2.5). 10 % 4 = 2 (since 4 × 2 = 8, remainder is 10 − 8 = 2).",
            },
          ],
          mcqs: [
            {
              id: "1-1-mcq1",
              question: "What is the value of x after the following code executes?",
              code: `int x = 15 / 4;`,
              options: [
                { id: "A", text: "3" },
                { id: "B", text: "3.75" },
                { id: "C", text: "4" },
                { id: "D", text: "3.0" },
              ],
              correctId: "A",
              explanation:
                "Both 15 and 4 are int literals, so integer division is performed: 15 ÷ 4 = 3 (truncated toward zero). The result 3 is stored in x. It is not rounded to 4 and not stored as a decimal.",
              skill: "2.B",
            },
            {
              id: "1-1-mcq2",
              question:
                "Which of the following correctly declares a variable to store the value 4.5?",
              options: [
                { id: "A", text: "int x = 4.5;" },
                { id: "B", text: "double x = 4.5;" },
                { id: "C", text: "boolean x = 4.5;" },
                { id: "D", text: "int x = (int) 4.5;" },
              ],
              correctId: "B",
              explanation:
                "4.5 is a floating-point number, which requires double. int cannot store decimals — int x = 4.5 is a compile error. (int) 4.5 would truncate to 4, losing the decimal. boolean stores only true or false.",
              skill: "1.B",
            },
            {
              id: "1-1-mcq3",
              question: "What is printed by the following statement?",
              code: `System.out.println("Score: " + 10 + 5);`,
              options: [
                { id: "A", text: "Score: 15" },
                { id: "B", text: "Score: 105" },
                { id: "C", text: "Score: 10 + 5" },
                { id: "D", text: "A compile error occurs" },
              ],
              correctId: "B",
              explanation:
                'Evaluation is left-to-right. "Score: " + 10 produces "Score: 10" (string concatenation). Then "Score: 10" + 5 produces "Score: 105". To get 15, write "Score: " + (10 + 5).',
              skill: "2.B",
            },
            {
              id: "1-1-mcq4",
              question: "What is the result of the expression 23 % 7?",
              options: [
                { id: "A", text: "3" },
                { id: "B", text: "2" },
                { id: "C", text: "7" },
                { id: "D", text: "3.28" },
              ],
              correctId: "B",
              explanation:
                "23 % 7 is the remainder when 23 is divided by 7. 7 × 3 = 21, so the remainder is 23 − 21 = 2. The modulo of two ints is always an int.",
              skill: "2.B",
            },
            {
              id: "1-1-mcq5",
              question: "Consider the following code segment. What is the output?",
              code: `int a = 5;
int b = 2;
double c = a / b;
System.out.println(c);`,
              options: [
                { id: "A", text: "2.5" },
                { id: "B", text: "2" },
                { id: "C", text: "2.0" },
                { id: "D", text: "3.0" },
              ],
              correctId: "C",
              explanation:
                "a / b is evaluated first. Since both a and b are int, integer division produces 2. The int value 2 is then widened to double and stored in c. Printing a double 2.0 outputs 2.0, not 2.5 — the division already happened between two ints.",
              skill: "2.B",
            },
          ],
        },
        {
          id: "1-2",
          slug: "assignment-casting",
          title: "Assignment, Input & Casting",
          cedTopics: ["1.4", "1.5"],
          description:
            "Assignment statements, variable ranges, widening vs. narrowing casts, and casting pitfalls.",
          objectives: [
            "Write assignment statements and trace value changes",
            "Explain the range of int and double types",
            "Apply explicit casts with (int) and (double)",
            "Predict the result of casting operations, including order-of-operations traps",
          ],
          codeExamples: [
            {
              id: "1-2-ex1",
              title: "Assignment Statements",
              code: `int x = 10;       // declare and initialize
x = x + 5;        // right side evaluated first: 10 + 5 = 15
x = x * 2;        // 15 * 2 = 30
System.out.println(x);  // 30

// Multiple variables
int a = 3;
int b = a;        // b gets a copy of the VALUE — not a reference
a = 99;
System.out.println(b); // still 3 — primitives copy by value`,
              explanation:
                "In an assignment, the entire right side is evaluated before the result is stored. For primitive types, assignment copies the value — changing a later does not affect b.",
            },
            {
              id: "1-2-ex2",
              title: "Widening and Narrowing Casts",
              code: `// Widening (automatic) — no data lost
int i = 42;
double d = i;         // int fits inside double automatically
System.out.println(d); // 42.0

// Narrowing (must be explicit) — data CAN be lost
double pi = 3.14159;
int truncated = (int) pi;   // truncates toward zero, does NOT round
System.out.println(truncated); // 3

double neg = -2.9;
int negTrunc = (int) neg;   // truncates toward zero
System.out.println(negTrunc);  // -2  (NOT -3!)`,
              explanation:
                "Widening (int → double) is automatic because no precision is lost. Narrowing (double → int) requires an explicit cast and truncates the decimal — it never rounds. Negative values also truncate toward zero.",
            },
            {
              id: "1-2-ex3",
              title: "Casting Order-of-Operations Trap",
              code: `// Cast applies to the NEXT value/expression, not the whole thing
System.out.println((double) 7 / 2);    // 3.5  — cast 7 to 7.0, then 7.0/2
System.out.println(7 / (double) 2);    // 3.5  — cast 2 to 2.0, then 7/2.0
System.out.println((double)(7 / 2));   // 3.0  — 7/2 = 3 first, then cast!

// Classic exam trap
int a = 9;
int b = 2;
double result = (double)(a / b);  // 4.0, NOT 4.5!
double result2 = (double) a / b;  // 4.5 — correct way`,
              explanation:
                "(double)(a / b) casts the result AFTER integer division has already truncated. To force decimal division, cast one operand BEFORE the division: (double) a / b.",
            },
          ],
          conceptChecks: [
            {
              id: "1-2-cc1",
              prompt: "What is the value of result after this code?",
              code: `double result = (double)(9 / 2);`,
              answer:
                "4.0\n\nThe parentheses force 9 / 2 to be evaluated first as integer division: 9 / 2 = 4. Then (double) 4 widens it to 4.0. It is NOT 4.5.",
              hint: "Which happens first — the division or the cast?",
            },
            {
              id: "1-2-cc2",
              prompt: "What does (int)(-3.1) evaluate to?",
              answer:
                "-3\n\nCasting to int truncates toward zero, not toward negative infinity. -3.1 truncates to -3, not -4.",
              hint: "int cast always truncates toward zero.",
            },
            {
              id: "1-2-cc3",
              prompt: "What is the final value of x?",
              code: `int x = 5;
x = x + 3;
x = x * 2;
System.out.println(x);`,
              answer:
                "16\n\nStep 1: x = 5 + 3 = 8. Step 2: x = 8 * 2 = 16.",
            },
          ],
          mcqs: [
            {
              id: "1-2-mcq1",
              question: "What is the value of the following expression?",
              code: `(int) 3.9 + 1`,
              options: [
                { id: "A", text: "4" },
                { id: "B", text: "5" },
                { id: "C", text: "4.9" },
                { id: "D", text: "3" },
              ],
              correctId: "A",
              explanation:
                "(int) 3.9 truncates to 3. Then 3 + 1 = 4. The cast only applies to the literal 3.9, not to the + 1 part.",
              skill: "2.B",
            },
            {
              id: "1-2-mcq2",
              question: "Which of the following results in the double value 4.5?",
              options: [
                { id: "A", text: "double r = (double)(9 / 2);" },
                { id: "B", text: "double r = 9 / 2;" },
                { id: "C", text: "double r = (double) 9 / 2;" },
                { id: "D", text: "double r = (int) 9.0 / (int) 2.0;" },
              ],
              correctId: "C",
              explanation:
                "(double) 9 / 2 casts 9 to 9.0 before division, yielding 9.0 / 2 = 4.5. Option A computes integer division first (4), then casts to 4.0. Option B also does integer division. Option D casts back to int before dividing.",
              skill: "2.B",
            },
            {
              id: "1-2-mcq3",
              question: "Which conversion happens automatically (without an explicit cast)?",
              options: [
                { id: "A", text: "double to int" },
                { id: "B", text: "int to boolean" },
                { id: "C", text: "int to double" },
                { id: "D", text: "double to boolean" },
              ],
              correctId: "C",
              explanation:
                "int to double is a widening conversion — no data is lost since a double can represent all int values. All other options would lose information or are incompatible types, requiring an explicit cast or being illegal in Java.",
              skill: "1.B",
            },
            {
              id: "1-2-mcq4",
              question: "What is stored in x after this statement?",
              code: `int x = (int)(-7.8);`,
              options: [
                { id: "A", text: "-8" },
                { id: "B", text: "-7" },
                { id: "C", text: "7" },
                { id: "D", text: "8" },
              ],
              correctId: "B",
              explanation:
                "Casting to int always truncates toward zero, not toward negative infinity. -7.8 truncated toward zero is -7, not -8. Many students confuse truncation with floor (which would give -8).",
              skill: "2.B",
            },
          ],
        },
        {
          id: "1-3",
          slug: "operators",
          title: "Compound Operators & Increment",
          cedTopics: ["1.6"],
          description:
            "Compound assignment operators (+=, -=, *=, /=, %=) and increment/decrement operators.",
          objectives: [
            "Rewrite compound assignment as a full assignment statement",
            "Distinguish between pre-increment (++x) and post-increment (x++) in an expression",
            "Trace the value of a variable through a sequence of compound assignments",
          ],
          codeExamples: [
            {
              id: "1-3-ex1",
              title: "Compound Assignment Operators",
              code: `int x = 20;

x += 5;   // x = x + 5  →  25
x -= 3;   // x = x - 3  →  22
x *= 2;   // x = x * 2  →  44
x /= 4;   // x = x / 4  →  11  (integer division!)
x %= 3;   // x = x % 3  →   2  (11 % 3 = 2)

System.out.println(x); // 2`,
              explanation:
                "Each compound operator is shorthand for applying the operation to the variable and reassigning. /= uses integer division when both sides are int — 11 /= 4 stores 2, not 2.75.",
            },
            {
              id: "1-3-ex2",
              title: "Increment and Decrement Operators",
              code: `int n = 5;

// Post-increment: use THEN add
System.out.println(n++); // prints 5, then n becomes 6
System.out.println(n);   // 6

// Pre-increment: add THEN use
n = 5; // reset
System.out.println(++n); // n becomes 6, then prints 6
System.out.println(n);   // 6

// Decrement works the same way
int m = 10;
System.out.println(m--); // prints 10, then m becomes 9
System.out.println(m);   // 9`,
              explanation:
                "Post-increment (n++) returns the current value and then increments. Pre-increment (++n) increments first and then returns the new value. In a standalone statement (not inside an expression), they behave identically.",
            },
          ],
          conceptChecks: [
            {
              id: "1-3-cc1",
              prompt: "What is the value of x after these statements?",
              code: `int x = 10;
x += 3;
x *= 2;
x -= 5;`,
              answer:
                "21\n\nStep 1: x = 10 + 3 = 13. Step 2: x = 13 * 2 = 26. Step 3: x = 26 - 5 = 21.",
            },
            {
              id: "1-3-cc2",
              prompt: "What does this code print — two lines?",
              code: `int n = 5;
System.out.println(n++);
System.out.println(n);`,
              answer:
                "5\n6\n\nPost-increment: println receives n's current value (5), prints it, then n becomes 6. The second println prints the updated n.",
              hint: "Post-increment: use the value, then increment.",
            },
            {
              id: "1-3-cc3",
              prompt: "What does this code print?",
              code: `int n = 5;
System.out.println(++n);
System.out.println(n);`,
              answer:
                "6\n6\n\nPre-increment: n becomes 6 first, then println prints 6. Both lines print 6.",
              hint: "Pre-increment: increment first, then use the value.",
            },
          ],
          mcqs: [
            {
              id: "1-3-mcq1",
              question: "Which statement is equivalent to x += 7?",
              options: [
                { id: "A", text: "x = 7;" },
                { id: "B", text: "x = x + 7;" },
                { id: "C", text: "x + 7;" },
                { id: "D", text: "x =+ 7;" },
              ],
              correctId: "B",
              explanation:
                "x += 7 is shorthand for x = x + 7. Option A sets x to 7 (discards old value). Option C is not an assignment. Option D (=+ 7) sets x to positive 7, not x + 7.",
              skill: "2.B",
            },
            {
              id: "1-3-mcq2",
              question: "What is the value of x after the following code?",
              code: `int x = 17;
x /= 5;`,
              options: [
                { id: "A", text: "3.4" },
                { id: "B", text: "3" },
                { id: "C", text: "4" },
                { id: "D", text: "2" },
              ],
              correctId: "B",
              explanation:
                "x /= 5 means x = x / 5 = 17 / 5. Since x is int, integer division applies: 17 / 5 = 3 (truncated). The result 3 is stored back in x.",
              skill: "2.B",
            },
            {
              id: "1-3-mcq3",
              question: "What is printed by the following code?",
              code: `int n = 7;
System.out.println(n--);`,
              options: [
                { id: "A", text: "5" },
                { id: "B", text: "6" },
                { id: "C", text: "7" },
                { id: "D", text: "8" },
              ],
              correctId: "C",
              explanation:
                "Post-decrement (n--) returns the current value of n (7) before decrementing. The println receives 7 and prints it. After the statement, n is 6.",
              skill: "2.B",
            },
            {
              id: "1-3-mcq4",
              question: "What is the output of the following code?",
              code: `int x = 4;
x *= 3;
x %= 5;
System.out.println(x);`,
              options: [
                { id: "A", text: "12" },
                { id: "B", text: "2" },
                { id: "C", text: "7" },
                { id: "D", text: "1" },
              ],
              correctId: "B",
              explanation:
                "Step 1: x *= 3 → x = 4 * 3 = 12. Step 2: x %= 5 → x = 12 % 5 = 2 (12 = 2×5 + 2). Final output: 2.",
              skill: "2.B",
            },
          ],
        },
        {
          id: "1-4",
          slug: "apis-comments-method-signatures",
          title: "APIs, Comments & Method Signatures",
          cedTopics: ["1.7", "1.8", "1.9"],
          description:
            "What an API is, how to read documentation, writing comments, and understanding method signatures.",
          objectives: [
            "Explain what an API and a library are",
            "Write single-line and multi-line comments",
            "Read a method signature and identify return type, name, and parameter types",
          ],
          codeExamples: [
            {
              id: "1-4-ex1",
              title: "Writing Comments",
              code: `// Single-line comment — ignored by the compiler

/* Multi-line comment:
   spans multiple lines.
   Useful for longer explanations. */

/**
 * Javadoc comment — used to generate API documentation.
 * @param radius the radius of the circle
 * @return the area of the circle
 */
public static double circleArea(double radius) {
    return Math.PI * radius * radius;
}`,
              explanation:
                "Comments are completely ignored by the compiler — they exist for human readers. Single-line (//) comments end at the next newline. Multi-line (/* */) can span many lines. Javadoc (/** */) is parsed by tools to generate documentation.",
            },
            {
              id: "1-4-ex2",
              title: "Reading a Method Signature",
              code: `//  return type      method name     parameters
//       ↓                ↓             ↓
public static  double  calculateArea(double radius)

// How to call it:
double area = calculateArea(5.0);  // pass one double, get a double back

// Another example — two parameters, returns int
public static int add(int a, int b)
int sum = add(3, 7);  // → 10

// void means the method returns nothing
public static void printGreeting(String name)
printGreeting("Alice");  // no return value to capture`,
              explanation:
                "A method signature tells you everything you need to call a method: the return type (what you get back), the method name, and the parameter list (what you must pass in). void means nothing is returned.",
            },
            {
              id: "1-4-ex3",
              title: "import Statements and Libraries",
              code: `import java.util.Scanner;   // import a specific class
import java.util.*;         // import all classes in java.util

// Without import, you'd need the full name every time:
java.util.Scanner sc = new java.util.Scanner(System.in); // verbose

// With import, you can use the short name:
Scanner sc = new Scanner(System.in);                      // clean`,
              explanation:
                "An API (Application Programming Interface) is the set of classes and methods a library makes available. The import statement lets you use a class by its short name instead of its full package path. You don't need to import java.lang — it's always available (that's where String, Math, Integer, etc. live).",
            },
          ],
          conceptChecks: [
            {
              id: "1-4-cc1",
              prompt: "For this method signature, identify: (a) return type, (b) method name, (c) parameter types.",
              code: `public static String formatScore(int score, double average)`,
              answer:
                "(a) Return type: String\n(b) Method name: formatScore\n(c) Parameter types: int, double\n\nThe method takes an int and a double as arguments and returns a String.",
            },
            {
              id: "1-4-cc2",
              prompt: "What does a return type of void indicate?",
              answer:
                "void means the method does not return any value. You cannot assign the result of a void method to a variable — there is nothing to assign. void methods are called for their side effects (like printing).",
            },
            {
              id: "1-4-cc3",
              prompt: "Which of these lines is a valid Java comment?",
              code: `A: // This explains the logic
B: ## This explains the logic
C: -- This explains the logic
D: ** This explains the logic`,
              answer:
                "A only.\n\nJava uses // for single-line comments and /* */ for multi-line comments. The ## syntax is Python/shell, -- is SQL/Lua, and ** is not a comment syntax in any common language.",
            },
          ],
          mcqs: [
            {
              id: "1-4-mcq1",
              question: "What is an Application Programming Interface (API)?",
              options: [
                { id: "A", text: "A type of loop used to repeat instructions" },
                { id: "B", text: "A set of pre-built classes and methods that programmers can use" },
                { id: "C", text: "A compiler error that occurs at runtime" },
                { id: "D", text: "A special comment that documents variables" },
              ],
              correctId: "B",
              explanation:
                "An API defines the available classes and methods in a library, along with how to call them. The Java API (java.lang, java.util, etc.) is a large collection of pre-built classes. You use an API by calling its methods — you don't need to know how they're implemented.",
              skill: "1.A",
            },
            {
              id: "1-4-mcq2",
              question: "What is the return type of the following method?",
              code: `public static int countVowels(String s)`,
              options: [
                { id: "A", text: "String" },
                { id: "B", text: "void" },
                { id: "C", text: "int" },
                { id: "D", text: "boolean" },
              ],
              correctId: "C",
              explanation:
                "In a method signature, the return type appears directly before the method name. Here, int appears before countVowels, so the method returns an int. String is the parameter type, not the return type.",
              skill: "1.B",
            },
            {
              id: "1-4-mcq3",
              question: "A programmer writes the following. Which statement is true?",
              code: `/* int x = 5; */
System.out.println(x);`,
              options: [
                { id: "A", text: "x is declared and 5 is printed" },
                { id: "B", text: "A compile error occurs because x is not declared" },
                { id: "C", text: "0 is printed because x was never initialized" },
                { id: "D", text: "The comment is treated as a string and printed" },
              ],
              correctId: "B",
              explanation:
                "The declaration int x = 5; is inside a comment, so the compiler ignores it entirely. When println(x) tries to use x, the compiler cannot find any declaration — resulting in a compile error.",
              skill: "2.A",
            },
          ],
        },
        {
          id: "1-5",
          slug: "calling-class-methods",
          title: "Calling Class (Static) Methods",
          cedTopics: ["1.10"],
          description:
            "How to call static methods on a class without creating an object instance.",
          objectives: [
            "Call a static method using ClassName.methodName(args)",
            "Distinguish static methods from instance methods",
            "Pass correct argument types to static methods",
          ],
          codeExamples: [
            {
              id: "1-5-ex1",
              title: "Calling Static Methods",
              code: `// Pattern: ClassName.methodName(arguments)
//           ↑ no object needed for static methods

int absVal = Math.abs(-42);          // 42
double root = Math.sqrt(25.0);       // 5.0
int parsed = Integer.parseInt("100"); // 100 (String → int)
String str = Integer.toString(55);   // "55" (int → String)
double maxVal = Math.max(3.5, 7.2);  // 7.2`,
              explanation:
                "Static methods belong to the class, not any particular object. You call them by prefixing the class name (Math, Integer, Double). No new or object reference is needed.",
            },
            {
              id: "1-5-ex2",
              title: "Static vs Instance Method Calls",
              code: `// STATIC — called on the CLASS
int x = Math.abs(-10);            // Math.abs(...)
int n = Integer.parseInt("42");   // Integer.parseInt(...)

// INSTANCE — called on an OBJECT
String s = "hello";
int len = s.length();             // s.length() — dot on the object
String up = s.toUpperCase();      // s.toUpperCase()

// You CANNOT call instance methods without an object:
// int bad = String.length(); // compile error!`,
              explanation:
                "The key distinction: static methods use ClassName.method(), instance methods use objectRef.method(). Calling an instance method on the class name (or on null) causes a compile or runtime error.",
            },
          ],
          conceptChecks: [
            {
              id: "1-5-cc1",
              prompt: "Write the correct call to find the absolute value of -15 using the Math class.",
              answer:
                "Math.abs(-15)\n\nabs is a static method on the Math class, so you call it as Math.abs(argument). It returns 15.",
            },
            {
              id: "1-5-cc2",
              prompt: "What is the return type and value of Integer.parseInt(\"256\")?",
              answer:
                "Return type: int. Value: 256.\n\nInteger.parseInt converts a String containing digits into its int equivalent. If the String contains non-numeric characters, it throws a runtime exception.",
            },
          ],
          mcqs: [
            {
              id: "1-5-mcq1",
              question: "Which of the following correctly calls a static method named square that takes one int and returns an int?",
              options: [
                { id: "A", text: "int r = MathUtils.square(4);" },
                { id: "B", text: "int r = new MathUtils().square(4);" },
                { id: "C", text: "MathUtils m; int r = m.square(4);" },
                { id: "D", text: "int r = square.MathUtils(4);" },
              ],
              correctId: "A",
              explanation:
                "Static methods are called via ClassName.methodName(). Option B uses new (valid but unnecessary for static methods). Option C declares m without initializing it — calling a method on an uninitialized variable causes a compile error. Option D reverses the class and method names.",
              skill: "2.B",
            },
            {
              id: "1-5-mcq2",
              question: "What is the value returned by Integer.parseInt(\"042\")?",
              options: [
                { id: "A", text: "42" },
                { id: "B", text: "\"042\"" },
                { id: "C", text: "0" },
                { id: "D", text: "A runtime exception is thrown" },
              ],
              correctId: "A",
              explanation:
                "Integer.parseInt parses the String as a base-10 integer. Leading zeros are ignored in decimal parsing, so \"042\" becomes 42. No exception occurs unless the String contains non-digit characters.",
              skill: "2.B",
            },
            {
              id: "1-5-mcq3",
              question: "Which of the following is an example of a static method call?",
              options: [
                { id: "A", text: "str.length()" },
                { id: "B", text: "list.size()" },
                { id: "C", text: "Math.sqrt(16.0)" },
                { id: "D", text: "obj.toString()" },
              ],
              correctId: "C",
              explanation:
                "Math.sqrt(16.0) is called on the class name Math — no object is needed. Options A, B, and D are all called on object references (str, list, obj), making them instance method calls.",
              skill: "1.B",
            },
          ],
        },
        {
          id: "1-6",
          slug: "math-class",
          title: "The Math Class",
          cedTopics: ["1.11"],
          description:
            "All Math class methods on the Java Quick Reference: abs, pow, sqrt, random, max, min, floor, ceil, round.",
          objectives: [
            "Call Math.abs(), Math.pow(), Math.sqrt(), and Math.random()",
            "Generate a random integer in a specified range using Math.random()",
            "Recall that Math methods always return double (except abs(int))",
          ],
          codeExamples: [
            {
              id: "1-6-ex1",
              title: "Core Math Methods",
              code: `System.out.println(Math.abs(-7));       // 7       (int → int)
System.out.println(Math.abs(-3.5));     // 3.5     (double → double)

System.out.println(Math.pow(2, 10));    // 1024.0  (always double)
System.out.println(Math.sqrt(144));     // 12.0    (always double)

System.out.println(Math.max(8, 13));    // 13
System.out.println(Math.min(8, 13));    // 8

System.out.println(Math.floor(3.9));    // 3.0  (round down)
System.out.println(Math.ceil(3.1));     // 4.0  (round up)
System.out.println(Math.round(3.5));    // 4    (returns long)`,
              explanation:
                "Math methods are all static — call them as Math.method(). Most return double. Math.abs is overloaded: it returns int if given an int, double if given a double. Math.pow and Math.sqrt always return double, even for whole-number results like 1024.0.",
            },
            {
              id: "1-6-ex2",
              title: "Math.random() and Random Integers",
              code: `// Math.random() returns a double in [0.0, 1.0) — includes 0, excludes 1
double r = Math.random();  // e.g. 0.0 to 0.9999...

// Scale to [0, n-1]:
int roll = (int)(Math.random() * 6);        // 0, 1, 2, 3, 4, or 5

// Shift to [1, 6] (a die roll):
int die = (int)(Math.random() * 6) + 1;    // 1, 2, 3, 4, 5, or 6

// General formula for [min, max] inclusive:
// (int)(Math.random() * (max - min + 1)) + min
int card = (int)(Math.random() * 13) + 1;  // 1 through 13`,
              explanation:
                "Math.random() × n gives a double in [0, n). Casting to int truncates to give integers in [0, n-1]. Adding min shifts the range. The formula (int)(Math.random() * (max - min + 1)) + min generates uniformly random integers in [min, max] inclusive.",
            },
          ],
          conceptChecks: [
            {
              id: "1-6-cc1",
              prompt: "What does Math.pow(2, 10) return, and what is its type?",
              answer:
                "1024.0 — type double.\n\nMath.pow always returns a double, even when the result is a whole number. If you need an int, cast it: (int) Math.pow(2, 10) → 1024.",
            },
            {
              id: "1-6-cc2",
              prompt: "What is the range of values produced by this expression?",
              code: `(int)(Math.random() * 6) + 1`,
              answer:
                "1 through 6 inclusive.\n\nMath.random() * 6 gives [0.0, 6.0). Casting to int gives 0–5. Adding 1 shifts to 1–6. This is the standard die-roll formula.",
              hint: "Math.random() is in [0.0, 1.0). Multiplying by 6 gives [0.0, 6.0).",
            },
            {
              id: "1-6-cc3",
              prompt: "What does Math.sqrt(144) return?",
              answer:
                "12.0 (a double).\n\nMath.sqrt always returns a double. Even though √144 = 12 exactly, the return value is 12.0, not 12.",
            },
          ],
          mcqs: [
            {
              id: "1-6-mcq1",
              question: "What is the return type and value of Math.sqrt(49)?",
              options: [
                { id: "A", text: "int 7" },
                { id: "B", text: "double 7.0" },
                { id: "C", text: "double 49.0" },
                { id: "D", text: "int 49" },
              ],
              correctId: "B",
              explanation:
                "Math.sqrt always returns a double. √49 = 7, but as a double the result is 7.0. If you need an int, you would write (int) Math.sqrt(49).",
              skill: "2.B",
            },
            {
              id: "1-6-mcq2",
              question: "Which expression generates a random integer from 1 to 10 inclusive?",
              options: [
                { id: "A", text: "(int)(Math.random() * 10)" },
                { id: "B", text: "(int)(Math.random() * 11)" },
                { id: "C", text: "(int)(Math.random() * 10) + 1" },
                { id: "D", text: "(int)(Math.random() * 9) + 1" },
              ],
              correctId: "C",
              explanation:
                "(int)(Math.random() * 10) gives 0–9. Adding 1 shifts it to 1–10. Option A gives 0–9. Option B gives 0–10. Option D gives 1–9.",
              skill: "2.B",
            },
            {
              id: "1-6-mcq3",
              question: "What is the value of the following expression?",
              code: `(int) Math.pow(3, 3)`,
              options: [
                { id: "A", text: "9" },
                { id: "B", text: "9.0" },
                { id: "C", text: "27" },
                { id: "D", text: "27.0" },
              ],
              correctId: "C",
              explanation:
                "Math.pow(3, 3) returns 27.0 (a double). Casting to int truncates the decimal, giving the int 27. If the cast were not there, the result would be the double 27.0.",
              skill: "2.B",
            },
            {
              id: "1-6-mcq4",
              question: "A student wants to round 4.6 to the nearest whole integer. Which call is correct?",
              options: [
                { id: "A", text: "Math.floor(4.6)  → 5" },
                { id: "B", text: "Math.ceil(4.6)   → 4" },
                { id: "C", text: "Math.round(4.6)  → 5" },
                { id: "D", text: "Math.abs(4.6)    → 5" },
              ],
              correctId: "C",
              explanation:
                "Math.round rounds to the nearest integer (4.6 → 5). Math.floor always rounds down (4.6 → 4.0). Math.ceil always rounds up (4.6 → 5.0, but returns a double). Math.abs returns the absolute value, not a rounded value.",
              skill: "2.B",
            },
          ],
        },
        {
          id: "1-7",
          slug: "objects-instantiation",
          title: "Objects & Instantiation",
          cedTopics: ["1.12", "1.13", "1.14"],
          description:
            "Classes vs. objects, the new keyword, reference variables, null, aliasing, and calling instance methods.",
          objectives: [
            "Explain the difference between a class (blueprint) and an object (instance)",
            "Use the new keyword to instantiate an object",
            "Explain what a reference variable stores",
            "Describe aliasing and its consequences",
            "Call an instance method using objectRef.methodName(args)",
          ],
          codeExamples: [
            {
              id: "1-7-ex1",
              title: "Instantiating an Object with new",
              code: `// A class is the blueprint; an object is an instance of that blueprint.
// Syntax: ClassName varName = new ClassName(constructorArgs);

String greeting = new String("Hello");   // creates a String object
// More common shorthand for String literals:
String name = "Alice";                   // Java creates a String object automatically

// A hypothetical Student class:
// Student s = new Student("Alice", 11);
// new allocates memory and calls the constructor.`,
              explanation:
                "The new keyword allocates memory on the heap and calls the constructor to initialize the object. The variable on the left is a reference variable — it stores the memory address of the object, not the object itself.",
            },
            {
              id: "1-7-ex2",
              title: "Reference Variables, null, and Aliasing",
              code: `String a = "hello";    // a references a String object
String b = a;          // b references the SAME object as a
                       // (aliasing — two names, one object)

// Null: a reference that points to no object
String c = null;
// System.out.println(c.length()); // NullPointerException at runtime!

// Primitive copy vs reference copy
int x = 5;
int y = x;   // y gets a copy of VALUE 5
x = 99;      // changing x does NOT affect y
System.out.println(y); // still 5`,
              explanation:
                "A reference variable holds a memory address, not the actual data. When you assign one reference variable to another, both point to the same object (aliasing). With primitives, you copy the value — no aliasing occurs. Calling any method on null causes a NullPointerException.",
            },
            {
              id: "1-7-ex3",
              title: "Calling Instance Methods",
              code: `// Pattern: objectRef.methodName(arguments)

String msg = "Hello, World!";

// Calling instance methods on msg:
int len = msg.length();           // 13
String upper = msg.toUpperCase(); // "HELLO, WORLD!"
boolean has = msg.contains("World"); // true

// msg itself is UNCHANGED (Strings are immutable)
System.out.println(msg); // "Hello, World!" — same as before`,
              explanation:
                "Instance methods are called on an object using the dot operator. The object you call the method on is called the implicit parameter — it's the object the method operates on. For String, all methods return new Strings; the original is never modified.",
            },
          ],
          conceptChecks: [
            {
              id: "1-7-cc1",
              prompt: "What value does an uninitialized reference variable have in Java?",
              answer:
                "null.\n\nAn uninitialized (declared but not assigned) reference variable has the value null, meaning it points to no object. Attempting to call a method on a null reference causes a NullPointerException at runtime.",
            },
            {
              id: "1-7-cc2",
              prompt: "What is aliasing? What happens in this code?",
              code: `String x = "cat";
String y = x;
// (assume we could mutate Strings — pretend y.setChar(0, 'b'))
// What would x contain?`,
              answer:
                "Aliasing means two reference variables point to the same object in memory. If y and x both reference the same object and you mutate it through y, x also sees the change — they're the same object. (String is actually immutable, but aliasing matters greatly for mutable objects like arrays and ArrayLists.)",
            },
            {
              id: "1-7-cc3",
              prompt: "What is the difference between a class and an object?",
              answer:
                "A class is the blueprint/template. An object is a specific instance created from that blueprint.\n\nExample: String is the class. \"hello\" is an object (an instance of String). You can have many String objects, all sharing the same class definition.",
            },
          ],
          mcqs: [
            {
              id: "1-7-mcq1",
              question: "What does the new keyword do when creating an object?",
              options: [
                { id: "A", text: "It deletes the old object and replaces it" },
                { id: "B", text: "It allocates memory and calls the constructor to initialize the object" },
                { id: "C", text: "It creates a copy of an existing object" },
                { id: "D", text: "It imports the class from a library" },
              ],
              correctId: "B",
              explanation:
                "new allocates memory on the heap for the new object and then calls the appropriate constructor to initialize its state. The constructor sets up the object's initial values. The reference to this newly created object is then stored in the variable on the left.",
              skill: "1.B",
            },
            {
              id: "1-7-mcq2",
              question: "What does a reference variable store?",
              options: [
                { id: "A", text: "The actual data of the object" },
                { id: "B", text: "A copy of all the object's fields" },
                { id: "C", text: "The memory address where the object is stored" },
                { id: "D", text: "The class name of the object" },
              ],
              correctId: "C",
              explanation:
                "A reference variable stores the memory address (reference) of the object, not the object's data itself. This is why assigning one reference variable to another creates aliasing — both variables end up holding the same address, pointing to the same object.",
              skill: "1.B",
            },
            {
              id: "1-7-mcq3",
              question: "What is printed by the following code?",
              code: `String s = null;
System.out.println(s);`,
              options: [
                { id: "A", text: "\"\"" },
                { id: "B", text: "null" },
                { id: "C", text: "A NullPointerException is thrown" },
                { id: "D", text: "A compile error occurs" },
              ],
              correctId: "B",
              explanation:
                "Printing a null reference with System.out.println does not throw an exception — it prints the string \"null\". A NullPointerException only occurs when you try to call a method ON the null reference (e.g., s.length()).",
              skill: "2.B",
            },
            {
              id: "1-7-mcq4",
              question: "Consider the following code. What is the value of b?",
              code: `String a = "hello";
String b = a;
a = "world";
System.out.println(b);`,
              options: [
                { id: "A", text: "world" },
                { id: "B", text: "hello" },
                { id: "C", text: "null" },
                { id: "D", text: "helloworld" },
              ],
              correctId: "B",
              explanation:
                "After String b = a, both a and b reference \"hello\". Then a = \"world\" changes a to reference a new String object — it does NOT modify the original \"hello\" String. b still references \"hello\". (String reassignment doesn't mutate; it just changes which object the variable points to.)",
              skill: "2.B",
            },
          ],
        },
        {
          id: "1-8",
          slug: "string-manipulation",
          title: "String Manipulation",
          cedTopics: ["1.15"],
          description:
            "String immutability, all Quick Reference String methods: length, substring, indexOf, equals, compareTo.",
          objectives: [
            "Explain why Strings are immutable",
            "Use length(), substring(from, to), and substring(from) correctly",
            "Use indexOf() and interpret a return value of -1",
            "Compare Strings with .equals() instead of ==",
            "Interpret compareTo() results for lexicographic ordering",
          ],
          codeExamples: [
            {
              id: "1-8-ex1",
              title: "String Methods: length, substring, indexOf",
              code: `String s = "programming";
//           indices:  0123456789...

System.out.println(s.length());         // 11

// substring(from, to) — from inclusive, to EXCLUSIVE
System.out.println(s.substring(3, 7));  // "gram"  (indices 3,4,5,6)
System.out.println(s.substring(7));     // "ming"  (index 7 to end)

// indexOf — returns first index of match, or -1 if not found
System.out.println(s.indexOf("gram"));  // 3
System.out.println(s.indexOf("java"));  // -1  (not found)`,
              explanation:
                "String indexing is zero-based. substring(from, to) includes the character at index from but EXCLUDES the character at index to — a common exam trap. indexOf returns -1 when the substring is not found.",
            },
            {
              id: "1-8-ex2",
              title: "String Immutability",
              code: `String s = "hello";

// These method calls return NEW Strings — they do NOT modify s
String upper = s.toUpperCase();  // "HELLO"
String sub   = s.substring(1);   // "ello"

System.out.println(s);     // still "hello" — unchanged!
System.out.println(upper); // "HELLO"
System.out.println(sub);   // "ello"

// To actually change s, you must reassign:
s = s.toUpperCase();
System.out.println(s);  // "HELLO"`,
              explanation:
                "String objects are immutable — no method can change the characters in an existing String. Every String method returns a brand-new String. If you don't capture or reassign the result, it is discarded.",
            },
            {
              id: "1-8-ex3",
              title: "Comparing Strings: equals and compareTo",
              code: `String a = "apple";
String b = "apple";
String c = "banana";

// ALWAYS use .equals() to compare String content
System.out.println(a.equals(b)); // true
System.out.println(a.equals(c)); // false

// == compares memory addresses — unreliable for Strings!
// (may print false even when content is identical)

// compareTo — lexicographic (dictionary) order
System.out.println(a.compareTo(c)); // negative (apple < banana)
System.out.println(c.compareTo(a)); // positive (banana > apple)
System.out.println(a.compareTo(b)); // 0        (equal)`,
              explanation:
                "Use .equals() to check if two Strings have the same characters. Using == checks if they are the same object in memory — which can give wrong results. compareTo returns a negative number if the calling string comes first alphabetically, 0 if equal, positive if it comes after.",
            },
          ],
          conceptChecks: [
            {
              id: "1-8-cc1",
              prompt: "What does the following expression return?",
              code: `"programming".substring(3, 7)`,
              answer:
                "\"gram\"\n\nsubstring(3, 7) extracts characters at indices 3, 4, 5, 6 (NOT 7 — the end index is exclusive). p=0, r=1, o=2, g=3, r=4, a=5, m=6, m=7... so indices 3-6 are 'g','r','a','m'.",
              hint: "Start index is inclusive; end index is exclusive.",
            },
            {
              id: "1-8-cc2",
              prompt: "What is printed?",
              code: `String s = "hello";
s.toUpperCase();
System.out.println(s);`,
              answer:
                "hello\n\nStrings are immutable. toUpperCase() returns a new String — it does NOT modify s. Since the return value isn't captured or reassigned, it's discarded. s still references the original \"hello\".",
              hint: "Did the code reassign s?",
            },
            {
              id: "1-8-cc3",
              prompt: "What does \"cat\".compareTo(\"dog\") return — positive, negative, or zero?",
              answer:
                "Negative.\n\n\"cat\" comes before \"dog\" alphabetically (lexicographically). compareTo returns a negative value when the calling string is less than the argument. The exact value is not important — only the sign matters for ordering.",
            },
          ],
          mcqs: [
            {
              id: "1-8-mcq1",
              question: "What is returned by the following expression?",
              code: `"hello".substring(1, 4)`,
              options: [
                { id: "A", text: "\"hell\"" },
                { id: "B", text: "\"ell\"" },
                { id: "C", text: "\"ello\"" },
                { id: "D", text: "\"hel\"" },
              ],
              correctId: "B",
              explanation:
                "\"hello\" has indices h=0, e=1, l=2, l=3, o=4. substring(1, 4) includes indices 1, 2, 3 — the characters e, l, l — giving \"ell\". Index 4 is excluded.",
              skill: "2.B",
            },
            {
              id: "1-8-mcq2",
              question: "What does indexOf return if the substring is not found?",
              options: [
                { id: "A", text: "0" },
                { id: "B", text: "null" },
                { id: "C", text: "-1" },
                { id: "D", text: "A runtime exception is thrown" },
              ],
              correctId: "C",
              explanation:
                "indexOf returns -1 when the specified substring is not found — not 0 (which would mean it was found at the very beginning), not null (it returns int, not a reference type), and no exception.",
              skill: "2.B",
            },
            {
              id: "1-8-mcq3",
              question: "A student writes the following to check if two Strings are equal. What is the problem?",
              code: `String s1 = "hello";
String s2 = "hello";
if (s1 == s2) { System.out.println("equal"); }`,
              options: [
                { id: "A", text: "== always returns true for Strings" },
                { id: "B", text: "== compares memory addresses, not content, and may return false even when content is identical" },
                { id: "C", text: "Strings cannot be compared in Java" },
                { id: "D", text: "The code will not compile" },
              ],
              correctId: "B",
              explanation:
                "== on reference types compares memory addresses. Two separate String objects with the same content may live at different addresses, causing == to return false. Always use .equals() to compare String content.",
              skill: "2.A",
            },
            {
              id: "1-8-mcq4",
              question: "What is printed by the following code?",
              code: `String s = "Java";
s.toLowerCase();
System.out.println(s.length());`,
              options: [
                { id: "A", text: "4" },
                { id: "B", text: "0" },
                { id: "C", text: "\"java\"" },
                { id: "D", text: "A compile error occurs" },
              ],
              correctId: "A",
              explanation:
                "s.toLowerCase() returns a new String \"java\" but s is never reassigned, so s still references \"Java\". length() on \"Java\" is 4. Immutability means the original String is unchanged.",
              skill: "2.B",
            },
            {
              id: "1-8-mcq5",
              question: "What is true about the return value of s1.compareTo(s2) when s1 comes after s2 alphabetically?",
              options: [
                { id: "A", text: "It returns 0" },
                { id: "B", text: "It returns a negative integer" },
                { id: "C", text: "It returns a positive integer" },
                { id: "D", text: "It throws an exception" },
              ],
              correctId: "C",
              explanation:
                "compareTo returns: negative if s1 < s2 (s1 comes first), 0 if equal, positive if s1 > s2 (s1 comes after). Since s1 comes after s2 alphabetically (s1 > s2), the result is a positive integer. The exact value is not specified and not important.",
              skill: "2.B",
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // UNIT 2: Selection and Iteration  (Topics 2.1 – 2.12)
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 2,
      slug: "selection-iteration",
      title: "Selection and Iteration",
      examWeight: "25–35%",
      suggestedPeriods: "29–31",
      description:
        "Control flow: boolean expressions, if/else conditionals, while and for loops, standard algorithms, and nested iteration.",
      color: "green",
      icon: "GitBranch",
      subUnits: [
        {
          id: "2-1",
          slug: "boolean-expressions",
          title: "Boolean Expressions",
          cedTopics: ["2.1", "2.2"],
          description:
            "Relational operators, logical operators (&&, ||, !), truth tables, De Morgan's Laws, and short-circuit evaluation.",
          objectives: [
            "Evaluate boolean expressions using ==, !=, >, <, >=, <=",
            "Apply &&, ||, and ! to combine boolean expressions",
            "Construct truth tables for compound expressions",
            "Apply De Morgan's Laws to simplify negated expressions",
            "Explain short-circuit evaluation for && and ||",
          ],
          codeExamples: [
            {
              id: "2-1-ex1",
              title: "Relational Operators",
              code: `int x = 7;

System.out.println(x == 7);  // true
System.out.println(x != 7);  // false
System.out.println(x > 5);   // true
System.out.println(x < 5);   // false
System.out.println(x >= 7);  // true
System.out.println(x <= 6);  // false

// Relational operators ALWAYS produce a boolean
boolean result = (x * 2 > 10); // true — store it in a variable`,
              explanation:
                "Relational operators compare two values and produce a boolean (true or false). They work on numbers and can be stored in boolean variables or used directly in if/while conditions.",
            },
            {
              id: "2-1-ex2",
              title: "Logical Operators: &&, ||, !",
              code: `boolean a = true;
boolean b = false;

System.out.println(a && b);  // false — both must be true
System.out.println(a || b);  // true  — at least one is true
System.out.println(!a);      // false — flips the value

// Short-circuit evaluation
int n = 0;
// && stops at first false — second part never evaluated:
if (n != 0 && 10 / n > 2) {   // safe! n != 0 is false → stops
    System.out.println("big");
}

// || stops at first true — second part never evaluated:
if (n == 0 || 10 / n > 2) {   // safe! n == 0 is true → stops
    System.out.println("zero");
}`,
              explanation:
                "&&  requires BOTH sides to be true. || requires at least ONE side to be true. Short-circuit evaluation means Java stops evaluating as soon as the result is determined — useful for guarding against division by zero or null references.",
            },
            {
              id: "2-1-ex3",
              title: "De Morgan's Laws",
              code: `int x = 4;
int y = 9;

// De Morgan's Law 1: !(a && b) == !a || !b
boolean v1 = !(x > 3 && y > 10);       // !(true && false) = !false = true
boolean v2 = !(x > 3) || !(y > 10);    // !true  || !false = false  || true = true
System.out.println(v1 == v2); // true — same result!

// De Morgan's Law 2: !(a || b) == !a && !b
boolean v3 = !(x < 0 || y < 0);        // !(false || false) = !false = true
boolean v4 = !(x < 0) && !(y < 0);     // !false && !false  = true  && true  = true
System.out.println(v3 == v4); // true`,
              explanation:
                "De Morgan's Laws let you push a ! inside a compound expression by flipping && ↔ || and negating each operand. These are frequently tested on the AP exam — both recognizing equivalence and applying the transformation.",
            },
          ],
          conceptChecks: [
            {
              id: "2-1-cc1",
              prompt: "Evaluate this expression. What does it print?",
              code: `System.out.println(!(true && false));`,
              answer:
                "true\n\ntrue && false = false (both must be true). !false = true.",
              hint: "Evaluate the inner && first, then apply !.",
            },
            {
              id: "2-1-cc2",
              prompt: "Using De Morgan's Law, write an equivalent expression for: !(x >= 5 || y == 0)",
              answer:
                "x < 5 && y != 0\n\nStep 1: flip || to &&. Step 2: negate each side — !(x >= 5) becomes x < 5, and !(y == 0) becomes y != 0.",
              hint: "!(a || b) == !a && !b. Then simplify each negation.",
            },
            {
              id: "2-1-cc3",
              prompt: "Does this code throw an exception? Why or why not?",
              code: `int n = 0;
if (n != 0 && 10 / n > 1) {
    System.out.println("yes");
}`,
              answer:
                "No exception. Short-circuit evaluation: n != 0 is false, so Java immediately skips the second condition (10 / n > 1) without evaluating it. The division by zero never occurs.",
            },
          ],
          mcqs: [
            {
              id: "2-1-mcq1",
              question: "What is the value of the following expression?",
              code: `(3 > 5) || (10 != 10) || (4 < 8)`,
              options: [
                { id: "A", text: "true" },
                { id: "B", text: "false" },
                { id: "C", text: "A compile error occurs" },
                { id: "D", text: "A runtime error occurs" },
              ],
              correctId: "A",
              explanation:
                "(3 > 5) is false. (10 != 10) is false. (4 < 8) is true. false || false || true = true. With ||, only one operand needs to be true.",
              skill: "2.B",
            },
            {
              id: "2-1-mcq2",
              question: "Which expression is equivalent to !(x < 10 && y > 5)?",
              options: [
                { id: "A", text: "x < 10 || y > 5" },
                { id: "B", text: "x >= 10 && y <= 5" },
                { id: "C", text: "x >= 10 || y <= 5" },
                { id: "D", text: "!(x < 10) && !(y > 5)" },
              ],
              correctId: "C",
              explanation:
                "By De Morgan's Law, !(a && b) = !a || !b. So !(x < 10 && y > 5) = !(x < 10) || !(y > 5) = (x >= 10) || (y <= 5).",
              skill: "2.B",
            },
            {
              id: "2-1-mcq3",
              question: "Given int x = 6, what is the result of: (x > 4) && (x < 4)?",
              options: [
                { id: "A", text: "true" },
                { id: "B", text: "false" },
                { id: "C", text: "6" },
                { id: "D", text: "A compile error occurs" },
              ],
              correctId: "B",
              explanation:
                "(x > 4) is true, (x < 4) is false. true && false = false. A number cannot be both greater and less than 4 simultaneously.",
              skill: "2.B",
            },
            {
              id: "2-1-mcq4",
              question: "Short-circuit evaluation of && means:",
              options: [
                { id: "A", text: "Both operands are always evaluated" },
                { id: "B", text: "The right operand is skipped when the left operand is true" },
                { id: "C", text: "The right operand is skipped when the left operand is false" },
                { id: "D", text: "The left operand is evaluated after the right" },
              ],
              correctId: "C",
              explanation:
                "With &&, if the left side is false, the whole expression must be false regardless of the right side, so Java skips evaluating it. This is useful for guards like (obj != null && obj.method()), where you don't want to call a method on null.",
              skill: "1.B",
            },
          ],
        },
        {
          id: "2-2",
          slug: "conditionals",
          title: "Conditionals: if, else if, else",
          cedTopics: ["2.3", "2.4", "2.5", "2.6"],
          description:
            "if/else chains, nested conditionals, compound boolean conditions, and comparing equivalent expressions.",
          objectives: [
            "Write if, else if, else chains and trace their execution",
            "Write and trace nested if statements",
            "Identify when conditions are mutually exclusive",
            "Determine whether two boolean expressions are logically equivalent",
          ],
          codeExamples: [
            {
              id: "2-2-ex1",
              title: "if / else if / else Chain",
              code: `int score = 78;

if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else if (score >= 70) {
    System.out.println("C");
} else {
    System.out.println("F");
}
// Prints: C

// Java evaluates top to bottom, runs the FIRST true branch, then skips the rest.
// score >= 70 is true, but score >= 90 and score >= 80 are checked first.`,
              explanation:
                "Conditions in an if/else if chain are tested top-to-bottom. Only the first true branch executes — all remaining branches are skipped. If no condition is true and there is an else, the else block runs.",
            },
            {
              id: "2-2-ex2",
              title: "Nested if Statements",
              code: `int x = 5;
int y = -3;

if (x > 0) {
    if (y > 0) {
        System.out.println("both positive");
    } else {
        System.out.println("x positive, y not");  // ← prints this
    }
} else {
    System.out.println("x not positive");
}

// Equivalent using && (flat style):
if (x > 0 && y > 0) {
    System.out.println("both positive");
} else if (x > 0) {
    System.out.println("x positive, y not");
}`,
              explanation:
                "Nested ifs let you check a second condition only after the first is true. The inner else belongs to the inner if, not the outer one. Nesting is equivalent to using && but can be clearer when one branch has multiple sub-cases.",
            },
            {
              id: "2-2-ex3",
              title: "Equivalent Boolean Expressions",
              code: `int n = 7;

// These pairs are logically equivalent:

// !(n == 5)   is the same as   n != 5
System.out.println(!(n == 5));  // true
System.out.println(n != 5);     // true

// !(n < 10)   is the same as   n >= 10
System.out.println(!(n < 10));  // false
System.out.println(n >= 10);    // false

// n >= 1 && n <= 10  tests if n is in [1, 10]
boolean inRange = (n >= 1 && n <= 10);  // true
// WRONG: 1 <= n <= 10 is NOT valid Java syntax!`,
              explanation:
                "Two expressions are equivalent if they produce the same boolean for every possible input. Recognizing equivalence lets you simplify conditions or spot when a rewritten version changes meaning. The range check pattern (n >= low && n <= high) is especially common on the exam.",
            },
          ],
          conceptChecks: [
            {
              id: "2-2-cc1",
              prompt: "What does this code print when score = 85?",
              code: `int score = 85;
if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else if (score >= 70) {
    System.out.println("C");
} else {
    System.out.println("F");
}`,
              answer:
                "B\n\nscore >= 90 is false. score >= 80 is true → prints \"B\" and skips the rest. Even though score >= 70 is also true, it is never reached.",
              hint: "Java runs the first true branch and skips all others.",
            },
            {
              id: "2-2-cc2",
              prompt: "What is printed?",
              code: `int x = 3;
if (x > 5) {
    System.out.println("big");
} else if (x > 1) {
    System.out.println("medium");
} else {
    System.out.println("small");
}
System.out.println("done");`,
              answer:
                "medium\ndone\n\nx > 5 is false. x > 1 is true → prints \"medium\". The code after the entire if/else block always runs, so \"done\" prints regardless.",
            },
            {
              id: "2-2-cc3",
              prompt: "Are these two expressions equivalent for all integer values of n?",
              code: `// Expression A:
!(n >= 5)

// Expression B:
n < 5`,
              answer:
                "Yes — they are equivalent.\n\n!(n >= 5) negates \"n is at least 5\", which means \"n is less than 5\" — exactly n < 5. You can verify with any value: if n = 4, both are true; if n = 5, both are false.",
            },
          ],
          mcqs: [
            {
              id: "2-2-mcq1",
              question: "What is the output of the following code when x = 15?",
              code: `int x = 15;
if (x > 20) {
    System.out.println("A");
} else if (x > 10) {
    System.out.println("B");
} else if (x > 5) {
    System.out.println("C");
} else {
    System.out.println("D");
}`,
              options: [
                { id: "A", text: "A" },
                { id: "B", text: "B" },
                { id: "C", text: "B and C" },
                { id: "D", text: "C" },
              ],
              correctId: "B",
              explanation:
                "x > 20 is false. x > 10 is true → prints \"B\" and immediately exits the chain. Even though x > 5 is also true, it is never reached because the else if already matched.",
              skill: "2.B",
            },
            {
              id: "2-2-mcq2",
              question: "Which of the following is equivalent to !(x < 3 || x > 7)?",
              options: [
                { id: "A", text: "x < 3 && x > 7" },
                { id: "B", text: "x >= 3 || x <= 7" },
                { id: "C", text: "x >= 3 && x <= 7" },
                { id: "D", text: "!(x >= 3) && !(x <= 7)" },
              ],
              correctId: "C",
              explanation:
                "By De Morgan's Law, !(a || b) = !a && !b. So !(x < 3 || x > 7) = !(x < 3) && !(x > 7) = (x >= 3) && (x <= 7). This tests whether x is in the range [3, 7] inclusive.",
              skill: "2.B",
            },
            {
              id: "2-2-mcq3",
              question: "What is the output of the following nested if code?",
              code: `int a = 4;
int b = 7;
if (a > 3) {
    if (b > 10) {
        System.out.println("X");
    } else {
        System.out.println("Y");
    }
} else {
    System.out.println("Z");
}`,
              options: [
                { id: "A", text: "X" },
                { id: "B", text: "Y" },
                { id: "C", text: "Z" },
                { id: "D", text: "XY" },
              ],
              correctId: "B",
              explanation:
                "a > 3 is true → enter outer if. b > 10 is false → skip inner if, execute inner else: print \"Y\". Z is never reached because the outer else is skipped.",
              skill: "2.B",
            },
            {
              id: "2-2-mcq4",
              question: "A programmer wants to check if n is between 1 and 100 inclusive. Which expression is correct?",
              options: [
                { id: "A", text: "1 <= n <= 100" },
                { id: "B", text: "n >= 1 || n <= 100" },
                { id: "C", text: "n >= 1 && n <= 100" },
                { id: "D", text: "!(n < 1) || !(n > 100)" },
              ],
              correctId: "C",
              explanation:
                "n >= 1 && n <= 100 correctly checks both bounds with &&. Option A is not valid Java syntax. Option B (||) is always true for any integer. Option D (||) is equivalent to !(n < 1 && n > 100) which is also always true since no number is simultaneously below 1 and above 100.",
              skill: "2.B",
            },
          ],
        },
        {
          id: "2-3",
          slug: "while-loops",
          title: "while Loops",
          cedTopics: ["2.7"],
          description:
            "while loop syntax, execution model, infinite loop risk, and off-by-one errors.",
          objectives: [
            "Write a while loop with correct initialization, condition, and update",
            "Trace a while loop and determine how many times the body executes",
            "Identify and fix an infinite loop or off-by-one error",
          ],
          codeExamples: [
            {
              id: "2-3-ex1",
              title: "while Loop Structure",
              code: `// while (condition) { body }
// Condition is checked BEFORE each iteration.

int i = 0;
while (i < 5) {
    System.out.print(i + " ");  // prints: 0 1 2 3 4
    i++;                         // update — required to avoid infinite loop
}

// If the condition is false at the start, the body never runs:
int x = 10;
while (x < 5) {
    System.out.println("never");  // skipped entirely
}
System.out.println("after");      // prints: after`,
              explanation:
                "A while loop evaluates its condition before each pass. If the condition is false from the start, the body is skipped entirely. The update inside the body (i++) is essential — omitting it creates an infinite loop.",
            },
            {
              id: "2-3-ex2",
              title: "Counting Down and Common Patterns",
              code: `// Count down from 5 to 1
int n = 5;
while (n >= 1) {
    System.out.print(n + " ");  // 5 4 3 2 1
    n--;
}

// Summing user inputs until sentinel value (-1)
int total = 0;
int value = 5;   // simulating input
while (value != -1) {
    total += value;
    value = -1;  // simulating next input (would be Scanner.nextInt() in real code)
}
System.out.println(total); // 5`,
              explanation:
                "while loops are ideal when you don't know how many iterations are needed in advance — like reading until a sentinel value. The loop variable must eventually make the condition false, or you get an infinite loop.",
            },
            {
              id: "2-3-ex3",
              title: "Off-by-One Errors",
              code: `// Print numbers 1 through 5 — common mistake versions:

// WRONG: prints 1–4 (one too few)
int i = 1;
while (i < 5) {
    System.out.print(i + " ");
    i++;
}

// WRONG: prints 1–6 (one too many)
i = 1;
while (i <= 6) {
    System.out.print(i + " ");
    i++;
}

// CORRECT: prints 1–5
i = 1;
while (i <= 5) {
    System.out.print(i + " ");
    i++;
}`,
              explanation:
                "Off-by-one errors are among the most common bugs. The key question: should the boundary value be included? Use < if you want to stop before the boundary, <= if you want to include it. Always trace with the first and last expected values to verify.",
            },
          ],
          conceptChecks: [
            {
              id: "2-3-cc1",
              prompt: "How many times does the loop body execute?",
              code: `int i = 1;
while (i <= 8) {
    i += 2;
}`,
              answer:
                "4 times.\n\ni starts at 1. After each iteration: 3, 5, 7, 9. The body runs when i = 1, 3, 5, 7 (4 times). When i becomes 9, 9 <= 8 is false, so the loop exits.",
              hint: "Trace: i = 1, 3, 5, 7, 9. When does i <= 8 become false?",
            },
            {
              id: "2-3-cc2",
              prompt: "What does this code print?",
              code: `int x = 16;
while (x > 1) {
    x /= 2;
}
System.out.println(x);`,
              answer:
                "1\n\nx starts at 16. Integer division by 2 each iteration: 16 → 8 → 4 → 2 → 1. When x = 1, x > 1 is false. After the loop, x is 1.",
            },
            {
              id: "2-3-cc3",
              prompt: "This loop is supposed to print 1 through 10, but has a bug. What is it?",
              code: `int i = 1;
while (i < 10) {
    System.out.println(i);
    i++;
}`,
              answer:
                "Off-by-one error: the loop prints 1–9 but misses 10. The condition should be i <= 10 (or i < 11) to include 10.",
            },
          ],
          mcqs: [
            {
              id: "2-3-mcq1",
              question: "How many times is \"hello\" printed?",
              code: `int i = 0;
while (i < 4) {
    System.out.println("hello");
    i++;
}`,
              options: [
                { id: "A", text: "3" },
                { id: "B", text: "4" },
                { id: "C", text: "5" },
                { id: "D", text: "0" },
              ],
              correctId: "B",
              explanation:
                "i starts at 0. The body runs when i = 0, 1, 2, 3 (four times). When i = 4, the condition i < 4 is false and the loop exits.",
              skill: "2.B",
            },
            {
              id: "2-3-mcq2",
              question: "What is the value of sum after this code executes?",
              code: `int sum = 0;
int i = 1;
while (i <= 5) {
    sum += i;
    i++;
}`,
              options: [
                { id: "A", text: "10" },
                { id: "B", text: "15" },
                { id: "C", text: "14" },
                { id: "D", text: "6" },
              ],
              correctId: "B",
              explanation:
                "The loop adds 1 + 2 + 3 + 4 + 5 = 15. i runs from 1 to 5 inclusive (five iterations). sum accumulates: 1, 3, 6, 10, 15.",
              skill: "2.B",
            },
            {
              id: "2-3-mcq3",
              question: "What is the output of the following code?",
              code: `int n = 100;
while (n > 1) {
    n /= 10;
}
System.out.println(n);`,
              options: [
                { id: "A", text: "10" },
                { id: "B", text: "0" },
                { id: "C", text: "1" },
                { id: "D", text: "100" },
              ],
              correctId: "C",
              explanation:
                "n = 100: 100 > 1 → n = 100/10 = 10. n = 10: 10 > 1 → n = 10/10 = 1. n = 1: 1 > 1 is false → loop exits. Prints 1.",
              skill: "2.B",
            },
            {
              id: "2-3-mcq4",
              question: "Which change fixes the infinite loop?",
              code: `int x = 1;
while (x > 0) {
    x += 2;
}`,
              options: [
                { id: "A", text: "Change x += 2 to x -= 2" },
                { id: "B", text: "Change while (x > 0) to while (x < 0)" },
                { id: "C", text: "Change int x = 1 to int x = 0" },
                { id: "D", text: "Remove the loop body" },
              ],
              correctId: "A",
              explanation:
                "x starts at 1 (positive) and increases — it will always be > 0, creating an infinite loop. Changing x += 2 to x -= 2 decreases x, which will eventually make x <= 0 and exit the loop.",
              skill: "2.A",
            },
          ],
        },
        {
          id: "2-4",
          slug: "for-loops",
          title: "for Loops & for-each",
          cedTopics: ["2.8"],
          description:
            "for loop syntax, equivalence to while, enhanced for-each loop, and choosing the right loop.",
          objectives: [
            "Write a for loop with initialization, condition, and update all in the header",
            "Convert between for and while loop forms",
            "Use an enhanced for-each loop for read-only traversal",
          ],
          codeExamples: [
            {
              id: "2-4-ex1",
              title: "for Loop Anatomy",
              code: `//  init       condition   update
for (int i = 0; i < 5;    i++) {
    System.out.print(i + " ");  // 0 1 2 3 4
}

// Execution order:
// 1. init runs once (int i = 0)
// 2. condition checked — if false, exit
// 3. body runs
// 4. update runs (i++)
// 5. go to step 2

// Count DOWN:
for (int i = 5; i >= 1; i--) {
    System.out.print(i + " ");  // 5 4 3 2 1
}

// Step by 3:
for (int i = 0; i <= 9; i += 3) {
    System.out.print(i + " ");  // 0 3 6 9
}`,
              explanation:
                "A for loop packs initialization, condition, and update into one line. The init runs exactly once. The condition is checked before each iteration. The update runs after each body execution. Any of the three parts can be omitted (leaving a blank), but the semicolons are required.",
            },
            {
              id: "2-4-ex2",
              title: "for vs while Equivalence",
              code: `// These two loops are completely equivalent:

// for version:
for (int i = 0; i < n; i++) {
    System.out.println(i);
}

// while version:
int i = 0;          // initialization
while (i < n) {     // condition
    System.out.println(i);
    i++;            // update
}

// Use for when you know the number of iterations in advance.
// Use while when the stopping condition is more complex or unknown.`,
              explanation:
                "Every for loop can be rewritten as a while loop and vice versa. The for loop is preferred when iterating a fixed number of times because it keeps init, condition, and update together and prevents forgetting the update.",
            },
            {
              id: "2-4-ex3",
              title: "Enhanced for-each Loop",
              code: `int[] scores = {90, 85, 78, 92, 88};

// Enhanced for-each: read-only traversal
for (int score : scores) {
    System.out.print(score + " ");  // 90 85 78 92 88
}

// Equivalent regular for loop:
for (int i = 0; i < scores.length; i++) {
    System.out.print(scores[i] + " ");
}

// LIMITATION: for-each cannot modify the array elements
// or access the index. Use a regular for loop for those.
for (int score : scores) {
    score += 10;  // modifies LOCAL copy — original array unchanged!
}`,
              explanation:
                "The enhanced for-each loop (for (Type var : collection)) is cleaner for read-only traversal — no index arithmetic, no off-by-one risk. However, you cannot use it to change array elements or access the current index. For modifications, use a regular indexed for loop.",
            },
          ],
          conceptChecks: [
            {
              id: "2-4-cc1",
              prompt: "What does this for loop print?",
              code: `for (int i = 1; i <= 10; i += 3) {
    System.out.print(i + " ");
}`,
              answer:
                "1 4 7 10\n\ni starts at 1. After each body: 4, 7, 10, 13. The loop runs when i = 1, 4, 7, 10 (all ≤ 10). When i = 13, 13 <= 10 is false.",
              hint: "Trace: i = 1, then +3 each time. Stop when i > 10.",
            },
            {
              id: "2-4-cc2",
              prompt: "How many times does the loop body execute?",
              code: `for (int i = 10; i > 0; i -= 3) {
    System.out.println("tick");
}`,
              answer:
                "4 times.\n\ni = 10 (10 > 0 ✓), 7 (✓), 4 (✓), 1 (✓), then i = -2 → -2 > 0 is false. So 4 iterations.",
            },
            {
              id: "2-4-cc3",
              prompt: "What is wrong with this code if the goal is to double every element of the array?",
              code: `int[] nums = {1, 2, 3, 4};
for (int n : nums) {
    n *= 2;
}`,
              answer:
                "The enhanced for-each creates a local copy of each element in n. Modifying n does not change the original array. To modify elements, use a regular for loop with an index: nums[i] *= 2.",
            },
          ],
          mcqs: [
            {
              id: "2-4-mcq1",
              question: "What is the output of the following code?",
              code: `for (int i = 2; i <= 8; i += 2) {
    System.out.print(i + " ");
}`,
              options: [
                { id: "A", text: "2 4 6 8 10" },
                { id: "B", text: "2 4 6 8" },
                { id: "C", text: "2 4 6" },
                { id: "D", text: "0 2 4 6 8" },
              ],
              correctId: "B",
              explanation:
                "i starts at 2, increments by 2 each time: 2, 4, 6, 8. When i would be 10, the condition i <= 8 fails. So 2, 4, 6, 8 are printed.",
              skill: "2.B",
            },
            {
              id: "2-4-mcq2",
              question: "How many times does the following loop body execute?",
              code: `for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        System.out.println(i);
    }
}`,
              options: [
                { id: "A", text: "10" },
                { id: "B", text: "5" },
                { id: "C", text: "4" },
                { id: "D", text: "6" },
              ],
              correctId: "B",
              explanation:
                "The loop body (the if statement) executes 10 times (i = 0 to 9). However, System.out.println only runs when i is even: 0, 2, 4, 6, 8 — that is 5 times. The question says \"loop body\" which runs 10 times, but the print runs 5 times. If the question asks about the print, the answer is 5.",
              skill: "2.B",
            },
            {
              id: "2-4-mcq3",
              question: "Which for loop is equivalent to the following while loop?",
              code: `int count = 0;
int i = 1;
while (i <= 20) {
    count++;
    i += 4;
}`,
              options: [
                { id: "A", text: "for (int i = 1; i < 20; i += 4) { count++; }" },
                { id: "B", text: "for (int i = 1; i <= 20; i += 4) { count++; }" },
                { id: "C", text: "for (int i = 0; i <= 20; i += 4) { count++; }" },
                { id: "D", text: "for (int i = 1; i <= 20; i++) { count++; }" },
              ],
              correctId: "B",
              explanation:
                "The while loop starts at i = 1, runs while i <= 20, and steps by 4. The equivalent for loop has the same initialization (i = 1), condition (i <= 20), and update (i += 4).",
              skill: "2.B",
            },
          ],
        },
        {
          id: "2-5",
          slug: "standard-algorithms",
          title: "Standard Algorithms",
          cedTopics: ["2.9", "2.10"],
          description:
            "CED-required algorithms: divisibility, digit extraction, frequency, min/max, sum/average, and string traversal algorithms.",
          objectives: [
            "Use % to test divisibility and extract the last digit of an integer",
            "Implement a frequency counter with a conditional inside a loop",
            "Find the minimum or maximum by initializing to the first element",
            "Compute a sum and average, avoiding integer division errors",
            "Traverse a String with charAt(i) and implement reverse, palindrome check, and substring search",
          ],
          codeExamples: [
            {
              id: "2-5-ex1",
              title: "Divisibility and Digit Extraction",
              code: `int n = 3847;

// Divisibility: use %
System.out.println(n % 2 == 0);  // false — odd
System.out.println(n % 5 == 0);  // false — doesn't end in 0 or 5
System.out.println(n % 3 == 0);  // false

// Extract the last digit: n % 10
System.out.println(n % 10);      // 7

// Remove the last digit: n / 10 (integer division)
System.out.println(n / 10);      // 384

// Extract all digits (right to left):
while (n > 0) {
    System.out.print((n % 10) + " ");  // 7 4 8 3
    n /= 10;
}`,
              explanation:
                "n % 10 isolates the ones digit. n / 10 shifts everything right (drops the ones digit). Repeating these two operations in a loop processes every digit. n % d == 0 tests whether n is divisible by d.",
            },
            {
              id: "2-5-ex2",
              title: "Sum, Count, Min, Max",
              code: `int[] scores = {72, 95, 88, 61, 77};

// Sum and average
int sum = 0;
for (int s : scores) {
    sum += s;
}
double avg = (double) sum / scores.length;  // cast before division!
System.out.println("Sum: " + sum);  // 393
System.out.println("Avg: " + avg);  // 78.6

// Min and max — initialize to first element
int min = scores[0];
int max = scores[0];
for (int i = 1; i < scores.length; i++) {
    if (scores[i] < min) min = scores[i];
    if (scores[i] > max) max = scores[i];
}
System.out.println("Min: " + min);  // 61
System.out.println("Max: " + max);  // 95`,
              explanation:
                "Initialize min and max to scores[0] (not 0 or Integer.MAX_VALUE) to correctly handle all-negative or all-positive arrays. Cast before dividing to get a decimal average — (double) sum / n, not (double)(sum / n).",
            },
            {
              id: "2-5-ex3",
              title: "String Traversal with charAt",
              code: `String s = "racecar";

// Print each character
for (int i = 0; i < s.length(); i++) {
    System.out.print(s.charAt(i) + " ");  // r a c e c a r
}

// Count vowels
int vowels = 0;
for (int i = 0; i < s.length(); i++) {
    char c = s.charAt(i);
    if (c=='a' || c=='e' || c=='i' || c=='o' || c=='u') {
        vowels++;
    }
}
System.out.println("Vowels: " + vowels);  // 3

// Reverse a String
String rev = "";
for (int i = s.length() - 1; i >= 0; i--) {
    rev += s.charAt(i);
}
System.out.println(rev);  // racecar (palindrome!)

// Palindrome check: original equals reverse
System.out.println(s.equals(rev));  // true`,
              explanation:
                "charAt(i) returns the char at index i (zero-based). Building a reversed string by iterating from the last index down to 0 is the standard reversal algorithm. A palindrome is a string that equals its reverse.",
            },
          ],
          conceptChecks: [
            {
              id: "2-5-cc1",
              prompt: "What does n % 10 return when n = 4829? What does n / 10 return?",
              answer:
                "n % 10 = 9 (the ones digit). n / 10 = 482 (removes the ones digit via integer division).",
            },
            {
              id: "2-5-cc2",
              prompt: "What is wrong with this average calculation?",
              code: `int sum = 93;
int count = 4;
double avg = (double)(sum / count);`,
              answer:
                "Integer division happens first: sum / count = 93 / 4 = 23 (truncated). Then 23 is widened to 23.0. The correct answer should be 23.25. Fix: (double) sum / count.",
              hint: "When does the cast happen relative to the division?",
            },
            {
              id: "2-5-cc3",
              prompt: "What does this code print for s = \"hello\"?",
              code: `String rev = "";
for (int i = s.length() - 1; i >= 0; i--) {
    rev += s.charAt(i);
}
System.out.println(rev);`,
              answer:
                "olleh\n\nThe loop starts at index 4 ('o') and works backward to index 0 ('h'), building: \"o\", \"ol\", \"oll\", \"olle\", \"olleh\".",
            },
          ],
          mcqs: [
            {
              id: "2-5-mcq1",
              question: "What does the following expression evaluate to when n = 253?",
              code: `n % 10`,
              options: [
                { id: "A", text: "25" },
                { id: "B", text: "2" },
                { id: "C", text: "3" },
                { id: "D", text: "253" },
              ],
              correctId: "C",
              explanation:
                "n % 10 gives the remainder when divided by 10, which is always the ones digit. 253 / 10 = 25 remainder 3, so 253 % 10 = 3.",
              skill: "2.B",
            },
            {
              id: "2-5-mcq2",
              question: "A student wants to find the maximum value in an array. Which initialization is correct?",
              code: `int[] arr = {-5, -2, -8, -1};
int max = /* ??? */;
for (int i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
}`,
              options: [
                { id: "A", text: "int max = 0;" },
                { id: "B", text: "int max = Integer.MAX_VALUE;" },
                { id: "C", text: "int max = arr[0];" },
                { id: "D", text: "int max = Integer.MIN_VALUE;" },
              ],
              correctId: "C",
              explanation:
                "Initializing max to arr[0] is always correct — the array's actual first element is a valid starting bound. Initializing to 0 fails here since all values are negative (0 > all of them). Integer.MAX_VALUE would work but is unnecessary. Integer.MIN_VALUE also works, but arr[0] is the cleanest and most general approach.",
              skill: "2.B",
            },
            {
              id: "2-5-mcq3",
              question: "What is the output of the following code?",
              code: `String s = "computer";
int count = 0;
for (int i = 0; i < s.length(); i++) {
    if (s.charAt(i) == 'o' || s.charAt(i) == 'e') {
        count++;
    }
}
System.out.println(count);`,
              options: [
                { id: "A", text: "1" },
                { id: "B", text: "2" },
                { id: "C", text: "3" },
                { id: "D", text: "4" },
              ],
              correctId: "B",
              explanation:
                "\"computer\" has: c-o-m-p-u-t-e-r. 'o' appears at index 1, 'e' appears at index 6. Count = 2.",
              skill: "2.B",
            },
            {
              id: "2-5-mcq4",
              question: "What is the value of avg after this code?",
              code: `int sum = 45;
int count = 6;
double avg = (double) sum / count;`,
              options: [
                { id: "A", text: "7" },
                { id: "B", text: "7.0" },
                { id: "C", text: "7.5" },
                { id: "D", text: "7.2" },
              ],
              correctId: "C",
              explanation:
                "(double) sum casts 45 to 45.0 before dividing. 45.0 / 6 = 7.5. The result is a double. This is the correct pattern to get a decimal average.",
              skill: "2.B",
            },
          ],
        },
        {
          id: "2-6",
          slug: "nested-iteration-runtime",
          title: "Nested Iteration & Runtime Analysis",
          cedTopics: ["2.11", "2.12"],
          description:
            "Nested loops, counting total statement executions, and informal O(n) vs O(n²) analysis.",
          objectives: [
            "Trace nested loops and count total iterations",
            "Determine the total number of times a statement inside nested loops executes",
            "Informally classify an algorithm as O(n) or O(n²) based on loop structure",
          ],
          codeExamples: [
            {
              id: "2-6-ex1",
              title: "Nested Loops: Counting Iterations",
              code: `// Inner body runs (outer iterations) × (inner iterations) times
for (int i = 0; i < 3; i++) {           // 3 iterations
    for (int j = 0; j < 4; j++) {       // 4 iterations each
        System.out.print("* ");          // runs 3 × 4 = 12 times
    }
    System.out.println();  // newline after each row
}
// Output (3 rows of 4 stars):
// * * * *
// * * * *
// * * * *`,
              explanation:
                "For each single iteration of the outer loop, the inner loop runs to completion. Total executions of the inner body = outer count × inner count. Here: 3 × 4 = 12 stars.",
            },
            {
              id: "2-6-ex2",
              title: "Variable Inner Bound (Triangle Pattern)",
              code: `int n = 5;
for (int i = 1; i <= n; i++) {       // i goes 1..5
    for (int j = 1; j <= i; j++) {   // j goes 1..i
        System.out.print("* ");
    }
    System.out.println();
}
// Output:
// *
// * *
// * * *
// * * *  *
// * * * * *
// Total stars: 1+2+3+4+5 = 15`,
              explanation:
                "When the inner loop bound depends on the outer variable, the total iterations are not a simple product. Here they are 1 + 2 + … + n = n(n+1)/2 — roughly proportional to n², which is O(n²) growth.",
            },
            {
              id: "2-6-ex3",
              title: "O(n) vs O(n²) Informal Analysis",
              code: `// O(n) — one loop through n elements
// Work grows proportionally to n
for (int i = 0; i < n; i++) {
    System.out.println(i);    // runs n times
}

// O(n²) — nested loop, both over n
// Work grows proportionally to n * n
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        System.out.println(i + "," + j);  // runs n² times
    }
}

// Example: n = 10
//   O(n)  → ~10 operations
//   O(n²) → ~100 operations
// Example: n = 100
//   O(n)  → ~100 operations
//   O(n²) → ~10,000 operations`,
              explanation:
                "A single loop over n elements is O(n) — linear growth. Two nested loops each over n elements is O(n²) — quadratic growth. On the AP exam, you're not required to use Big-O notation: describing it as \"proportional to n\" or \"proportional to n²\" or counting exact statement executions is sufficient.",
            },
          ],
          conceptChecks: [
            {
              id: "2-6-cc1",
              prompt: "How many times is System.out.println executed?",
              code: `for (int i = 0; i < 4; i++) {
    for (int j = 0; j < 5; j++) {
        System.out.println(i + j);
    }
}`,
              answer:
                "20 times.\n\nOuter loop: 4 iterations (i = 0, 1, 2, 3). Inner loop: 5 iterations per outer. Total: 4 × 5 = 20.",
            },
            {
              id: "2-6-cc2",
              prompt: "What is printed by this code?",
              code: `for (int i = 1; i <= 3; i++) {
    for (int j = i; j <= 3; j++) {
        System.out.print(j + " ");
    }
    System.out.println();
}`,
              answer:
                "1 2 3\n2 3\n3\n\nRow 1 (i=1): j runs 1,2,3. Row 2 (i=2): j runs 2,3. Row 3 (i=3): j runs 3 only.",
              hint: "The inner loop starts at j = i, not j = 1.",
            },
            {
              id: "2-6-cc3",
              prompt: "Is this algorithm O(n) or O(n²)? Explain.",
              code: `for (int i = 0; i < n; i++) {
    System.out.println(i * 2);
}`,
              answer:
                "O(n) — linear. There is one loop that executes n times. The total work grows proportionally to n. Doubling n doubles the number of operations.",
            },
          ],
          mcqs: [
            {
              id: "2-6-mcq1",
              question: "How many times does System.out.print(\"*\") execute?",
              code: `for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= 3; j++) {
        System.out.print("*");
    }
}`,
              options: [
                { id: "A", text: "8" },
                { id: "B", text: "15" },
                { id: "C", text: "25" },
                { id: "D", text: "3" },
              ],
              correctId: "B",
              explanation:
                "Outer loop runs 5 times (i = 1 to 5). Inner loop runs 3 times per outer iteration. Total: 5 × 3 = 15.",
              skill: "2.B",
            },
            {
              id: "2-6-mcq2",
              question: "What is the total number of times the inner body runs?",
              code: `for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        // inner body
    }
}`,
              options: [
                { id: "A", text: "n" },
                { id: "B", text: "2n" },
                { id: "C", text: "n²" },
                { id: "D", text: "n + n" },
              ],
              correctId: "C",
              explanation:
                "Both loops run n times. For each of the n outer iterations, the inner body runs n times. Total: n × n = n². This is the defining structure of an O(n²) algorithm.",
              skill: "2.B",
            },
            {
              id: "2-6-mcq3",
              question: "Which code has O(n²) runtime?",
              options: [
                { id: "A", text: "for (int i = 0; i < n; i++) { sum += i; }" },
                { id: "B", text: "for (int i = 0; i < n; i++) { for (int j = 0; j < 10; j++) { sum++; } }" },
                { id: "C", text: "for (int i = 0; i < n; i++) { for (int j = 0; j < n; j++) { sum++; } }" },
                { id: "D", text: "sum = n * (n + 1) / 2;" },
              ],
              correctId: "C",
              explanation:
                "Option C has two loops both bounded by n: n × n = n² operations. Option A is O(n). Option B is O(n) because the inner loop always runs exactly 10 times (a constant), so total work is 10n. Option D is O(1) — a single formula, no loop.",
              skill: "2.B",
            },
            {
              id: "2-6-mcq4",
              question: "What is the output of the following nested loop?",
              code: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 2; j++) {
        System.out.print(i * j + " ");
    }
}`,
              options: [
                { id: "A", text: "1 2 2 4 3 6" },
                { id: "B", text: "1 2 3 4 5 6" },
                { id: "C", text: "1 1 2 2 3 3" },
                { id: "D", text: "2 4 6" },
              ],
              correctId: "A",
              explanation:
                "i=1,j=1: 1×1=1. i=1,j=2: 1×2=2. i=2,j=1: 2×1=2. i=2,j=2: 2×2=4. i=3,j=1: 3×1=3. i=3,j=2: 3×2=6. Output: 1 2 2 4 3 6.",
              skill: "2.B",
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // UNIT 3: Class Creation  (Topics 3.1 – 3.9)
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 3,
      slug: "class-creation",
      title: "Class Creation",
      examWeight: "10–18%",
      suggestedPeriods: "20–22",
      description:
        "Designing and writing complete Java classes: instance variables, constructors, methods, static members, scope, and encapsulation.",
      color: "purple",
      icon: "Code2",
      subUnits: [
        {
          id: "3-1",
          slug: "abstraction-design",
          title: "Abstraction, Design & Ethics",
          cedTopics: ["3.1", "3.2"],
          description:
            "Data and procedural abstraction, UML class diagrams, and the social/ethical impacts of program design.",
          objectives: [
            "Explain data abstraction and procedural abstraction",
            "Read a UML class diagram and identify attributes vs. behaviors",
            "Describe potential unintended social, economic, or cultural effects of a program",
            "Explain why software reliability requires thorough testing",
          ],
          codeExamples: [
            {
              id: "3-1-ex1",
              title: "Data Abstraction: Hiding the 'How'",
              code: `// Users of BankAccount only know WHAT it does, not HOW it stores data
public class BankAccount {
    private double balance;   // hidden implementation detail

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public double getBalance() { return balance; }  // public interface
    public void deposit(double amount)  { balance += amount; }
    public void withdraw(double amount) { balance -= amount; }
}

// Caller code — no knowledge of internal storage needed
BankAccount acct = new BankAccount(500.0);
acct.deposit(100.0);
System.out.println(acct.getBalance()); // 600.0`,
              explanation:
                "Data abstraction means hiding how data is stored (private double balance) behind a clean public interface. The caller can use deposit() and withdraw() without knowing the internal representation could change to an int in cents tomorrow.",
            },
            {
              id: "3-1-ex2",
              title: "UML Class Diagram Layout",
              code: `// A UML class diagram has three sections:
// ┌─────────────────────┐
// │     BankAccount     │  <- Class Name
// ├─────────────────────┤
// │ - balance: double   │  <- Attributes (instance variables)
// ├─────────────────────┤
// │ + getBalance()      │  <- Behaviors (methods)
// │ + deposit(amount)   │
// │ + withdraw(amount)  │
// └─────────────────────┘
//
// '-' prefix = private   '+' prefix = public

public class BankAccount {
    private double balance;          // - balance: double
    public double getBalance() { return balance; }
    public void deposit(double amt)  { balance += amt; }
    public void withdraw(double amt) { balance -= amt; }
}`,
              explanation:
                "A UML class diagram has three sections: the class name on top, attributes (instance variables with types) in the middle, and behaviors (methods) at the bottom. The '+' prefix means public; '-' means private.",
            },
            {
              id: "3-1-ex3",
              title: "Procedural Abstraction: Method Decomposition",
              code: `// Without procedural abstraction — one large method
public void processStudent() {
    // 50 lines of validation + grade calculation + reporting all mixed together
}

// With procedural abstraction — complex task broken into named methods
public void processStudent() {
    if (isValid()) {
        double gpa = calculateGPA();
        printReport(gpa);
    }
}

private boolean isValid()               { /* checks inputs */ return true; }
private double  calculateGPA()          { /* grade logic  */ return 3.8;  }
private void    printReport(double gpa) { System.out.println("GPA: " + gpa); }`,
              explanation:
                "Procedural abstraction means calling a method by name without knowing its implementation. This lets you write, test, and change each piece independently — a core software engineering principle that makes large programs manageable.",
            },
          ],
          conceptChecks: [
            {
              id: "3-1-cc1",
              prompt: "A class has a private field 'balance' and a public method 'getBalance()'. Which term describes hiding the storage detail behind the public method?",
              answer: "Data abstraction. The caller uses getBalance() without knowing (or caring) that the data is stored as a double named 'balance'. The internal representation could change, and callers wouldn't need to update their code.",
            },
            {
              id: "3-1-cc2",
              prompt: "A UML class diagram has three horizontal sections. From top to bottom, what does each section contain?",
              answer: "Top: the class name. Middle: the attributes (instance variables) with their types, prefixed with '+' (public) or '-' (private). Bottom: the behaviors (methods) with return types and parameters.",
            },
            {
              id: "3-1-cc3",
              prompt: "A developer writes a hiring recommendation algorithm trained on historical data. What is one potential unintended societal effect the CED asks developers to consider?",
              answer: "The algorithm could perpetuate historical biases, unfairly disadvantaging certain demographic groups. The CED states developers are responsible for considering potential unintended harmful social, economic, and cultural effects — not just whether the code runs correctly.",
            },
          ],
          mcqs: [
            {
              id: "3-1-mcq1",
              question: "Which of the following best describes data abstraction in object-oriented programming?",
              options: [
                { id: "A", text: "Breaking a large program into smaller methods" },
                { id: "B", text: "Hiding implementation details behind a public interface" },
                { id: "C", text: "Using static variables to share data across objects" },
                { id: "D", text: "Declaring all variables as public for easy access" },
              ],
              correctId: "B",
              explanation:
                "Data abstraction means hiding how data is stored (e.g., private double balance) behind a public interface (getBalance(), deposit()). Callers interact with the interface without knowing the internal implementation.",
              skill: "1.B",
            },
            {
              id: "3-1-mcq2",
              question: "In a UML class diagram, the bottom section of the three-part box contains which of the following?",
              options: [
                { id: "A", text: "The class name" },
                { id: "B", text: "The static variables" },
                { id: "C", text: "The behaviors (methods)" },
                { id: "D", text: "The attributes (instance variables)" },
              ],
              correctId: "C",
              explanation:
                "A UML class diagram has three sections from top to bottom: class name, attributes (instance variables), and behaviors (methods). The bottom section lists the methods.",
              skill: "1.B",
            },
            {
              id: "3-1-mcq3",
              question: "A method named calculateTax() is called inside a payroll program. The caller does not know how the tax is computed internally. This is an example of which concept?",
              options: [
                { id: "A", text: "Data abstraction" },
                { id: "B", text: "Aliasing" },
                { id: "C", text: "Procedural abstraction" },
                { id: "D", text: "Static binding" },
              ],
              correctId: "C",
              explanation:
                "Procedural abstraction means calling a method by name without knowing its implementation. The caller uses calculateTax() as a black box — the 'how' is hidden behind the method name.",
              skill: "1.B",
            },
            {
              id: "3-1-mcq4",
              question: "Which of the following is a potential unintended effect of a facial recognition system trained on non-diverse data?",
              options: [
                { id: "A", text: "The system will always crash on invalid input" },
                { id: "B", text: "The system may perform poorly for underrepresented groups, causing unfair outcomes" },
                { id: "C", text: "The system will require more memory than expected" },
                { id: "D", text: "The system will produce slower output than a rule-based system" },
              ],
              correctId: "B",
              explanation:
                "When training data is not diverse, a model may perform poorly on underrepresented groups — an unintended discriminatory effect. The CED emphasizes that developers must consider societal impact, not just technical correctness.",
              skill: "5.E",
            },
          ],
        },
        {
          id: "3-2",
          slug: "class-anatomy-constructors",
          title: "Class Anatomy & Constructors",
          cedTopics: ["3.3", "3.4"],
          description:
            "public/private access modifiers, encapsulation, instance variable declarations, and writing constructors.",
          objectives: [
            "Write a class with private instance variables and public constructors",
            "Explain why instance variables are private (encapsulation)",
            "Write a parameterized constructor that initializes all fields",
            "Write an overloaded no-arg constructor",
          ],
          codeExamples: [
            {
              id: "3-2-ex1",
              title: "Anatomy of a Java Class",
              code: `public class Dog {
    // Instance variables — private for encapsulation
    private String name;
    private int age;

    // Parameterized constructor — called with: new Dog("Buddy", 3)
    public Dog(String name, int age) {
        this.name = name;  // 'this.name' = field, 'name' = parameter
        this.age = age;
    }

    // Accessor (getter) methods
    public String getName() { return name; }
    public int    getAge()  { return age;  }

    // Mutator (setter) methods
    public void setName(String name) { this.name = name; }
    public void setAge(int age)      { this.age  = age;  }

    // toString — human-readable representation
    public String toString() {
        return name + " (age " + age + ")";
    }
}`,
              explanation:
                "Every Java class follows this structure: private instance variables, a public constructor using this.field to assign parameters, public getter/setter methods, and optional helper methods. Classes are always public; instance variables are always private.",
            },
            {
              id: "3-2-ex2",
              title: "Constructor Overloading",
              code: `public class Dog {
    private String name;
    private int age;

    // No-arg constructor — sets default values
    public Dog() {
        this.name = "Unknown";
        this.age  = 0;
    }

    // Parameterized constructor
    public Dog(String name, int age) {
        this.name = name;
        this.age  = age;
    }

    public String getName() { return name; }
    public int    getAge()  { return age;  }
}

// Using both constructors:
Dog d1 = new Dog();           // name="Unknown", age=0
Dog d2 = new Dog("Buddy", 3); // name="Buddy",   age=3
System.out.println(d1.getName()); // Unknown
System.out.println(d2.getName()); // Buddy`,
              explanation:
                "Constructor overloading means writing multiple constructors with different parameter lists. Java selects the right one based on the arguments you pass with 'new'. If you define any constructor, Java no longer provides a free default no-arg constructor.",
            },
            {
              id: "3-2-ex3",
              title: "Default Values of Instance Variables",
              code: `public class Box {
    private int width;      // default: 0
    private double height;  // default: 0.0
    private boolean open;   // default: false
    private String label;   // default: null

    // No explicit constructor — Java provides a default no-arg one
    // All fields are initialized to their type's default value

    public void printDefaults() {
        System.out.println(width);  // 0
        System.out.println(height); // 0.0
        System.out.println(open);   // false
        System.out.println(label);  // null
    }
}`,
              explanation:
                "When a class has no explicit constructor, Java provides a default no-arg constructor and initializes all instance variables to defaults: 0 for int, 0.0 for double, false for boolean, and null for reference types like String. Local variables do NOT have defaults and must be initialized before use.",
            },
          ],
          conceptChecks: [
            {
              id: "3-2-cc1",
              prompt: "After executing: Dog d = new Dog(\"Buddy\", 3); — what are the values of d's name and age fields?",
              code: `public class Dog {
    private String name;
    private int age;
    public Dog(String name, int age) {
        this.name = name;
        this.age  = age;
    }
    public String getName() { return name; }
    public int    getAge()  { return age;  }
}`,
              answer: "name = \"Buddy\", age = 3. The constructor assigns each parameter to its corresponding instance variable using this.name = name and this.age = age.",
              hint: "Trace each assignment in the constructor body.",
            },
            {
              id: "3-2-cc2",
              prompt: "Why should instance variables be declared private rather than public?",
              answer: "Encapsulation — private fields can only be read or changed through the class's own methods (getters/setters). This lets the class enforce validation rules and change its internal representation without breaking code that calls it from outside.",
            },
            {
              id: "3-2-cc3",
              prompt: "A class defines a parameterized constructor Dog(String name, int age) but no no-arg constructor. What happens if you write: Dog d = new Dog();?",
              answer: "Compile error. Once you define any constructor, Java does NOT automatically provide a default no-arg constructor. You would need to explicitly write a public Dog() { } constructor to allow no-arg instantiation.",
            },
          ],
          mcqs: [
            {
              id: "3-2-mcq1",
              question: "Why are instance variables typically declared private in a Java class?",
              options: [
                { id: "A", text: "So they can be accessed from any class in the program" },
                { id: "B", text: "To allow subclasses to inherit them directly" },
                { id: "C", text: "To enforce encapsulation and protect internal state" },
                { id: "D", text: "Because Java requires instance variables to be private" },
              ],
              correctId: "C",
              explanation:
                "Private instance variables enforce encapsulation — the internal state can only be changed through the class's own methods. This allows the class to validate changes and change its implementation without breaking external code.",
              skill: "1.B",
            },
            {
              id: "3-2-mcq2",
              question: "Which of the following is a valid constructor definition for a class named Point?",
              options: [
                { id: "A", text: "public void Point(int x, int y) { this.x = x; this.y = y; }" },
                { id: "B", text: "public Point(int x, int y) { this.x = x; this.y = y; }" },
                { id: "C", text: "private Point(int x, int y) { this.x = x; this.y = y; }" },
                { id: "D", text: "public int Point(int x, int y) { this.x = x; this.y = y; }" },
              ],
              correctId: "B",
              explanation:
                "A valid constructor has the same name as the class, is public, and has no return type (not even void). Option A adds 'void', options C uses 'private', and D adds 'int' — all invalid.",
              skill: "2.A",
            },
            {
              id: "3-2-mcq3",
              question: "A class declares 'private int count;' but no constructor. What is the initial value of count for a new object?",
              options: [
                { id: "A", text: "Undefined — it must be set before use" },
                { id: "B", text: "1" },
                { id: "C", text: "0" },
                { id: "D", text: "null" },
              ],
              correctId: "C",
              explanation:
                "Instance variables are automatically initialized to default values when no constructor sets them: int → 0, double → 0.0, boolean → false, reference types → null. This is different from local variables, which have no default.",
              skill: "2.A",
            },
            {
              id: "3-2-mcq4",
              question: "Consider a class with two constructors: Cat() and Cat(String name). Which line of code calls the no-arg constructor?",
              options: [
                { id: "A", text: "Cat c = new Cat(\"Whiskers\");" },
                { id: "B", text: "Cat c = Cat();" },
                { id: "C", text: "Cat c = new Cat();" },
                { id: "D", text: "Cat c = new Cat;" },
              ],
              correctId: "C",
              explanation:
                "Constructors are called with 'new ClassName(args)'. 'new Cat()' passes no arguments, so it matches the no-arg constructor Cat(). Option B is missing 'new', and option D is missing the parentheses.",
              skill: "2.A",
            },
          ],
        },
        {
          id: "3-3",
          slug: "writing-methods",
          title: "Writing Methods",
          cedTopics: ["3.5", "3.6"],
          description:
            "Accessor and mutator methods, void vs. return, pass-by-value for primitives, object references passed by value, and aliasing.",
          objectives: [
            "Write accessor (getter) and mutator (setter) methods",
            "Write a method with a non-void return type and use the return statement",
            "Explain why modifying a primitive parameter does not affect the caller",
            "Explain how mutating an object through a reference parameter does affect the original",
            "Describe aliasing and when it causes unexpected behavior",
          ],
          codeExamples: [
            {
              id: "3-3-ex1",
              title: "Accessor and Mutator Methods",
              code: `public class Rectangle {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width  = width;
        this.height = height;
    }

    // Accessor (getter) — returns the stored value, no side effects
    public double getWidth()  { return width;  }
    public double getHeight() { return height; }

    // Mutator (setter) — modifies the stored value, returns void
    public void setWidth(double width)   { this.width  = width;  }
    public void setHeight(double height) { this.height = height; }

    // Computed result method — returns a value based on fields
    public double getArea()      { return width * height; }
    public double getPerimeter() { return 2 * (width + height); }
}

Rectangle r = new Rectangle(5.0, 3.0);
System.out.println(r.getArea());       // 15.0
r.setWidth(10.0);
System.out.println(r.getArea());       // 30.0`,
              explanation:
                "Accessor (getter) methods return the value of an instance variable without changing it. Mutator (setter) methods change an instance variable's value and return void. Computed methods like getArea() use multiple fields to produce a result.",
            },
            {
              id: "3-3-ex2",
              title: "Pass-by-Value for Primitives",
              code: `public class Example {
    // This method tries to add 1 to x — but it CAN'T affect the caller
    public static void addOne(int x) {
        x++;               // only changes the local COPY of x
        System.out.println("Inside: " + x);  // 6
    }

    public static void main(String[] args) {
        int n = 5;
        addOne(n);
        System.out.println("After: " + n);   // 5 — UNCHANGED!
    }
}`,
              explanation:
                "Java is pass-by-value for primitives: the method receives a copy of the value, not the original variable. Changing x inside addOne() has no effect on n in main(). This is one of the most frequently tested concepts on the AP exam.",
            },
            {
              id: "3-3-ex3",
              title: "Object References and Aliasing",
              code: `public class Dog {
    private String name;
    public Dog(String name)    { this.name = name; }
    public String getName()    { return name; }
    public void setName(String name) { this.name = name; }
}

// Calling a MUTATOR through a reference DOES affect the original object
static void changeName(Dog d) {
    d.setName("Rex");  // d points to same object as caller's variable
}

// Reassigning the reference does NOT affect the original
static void replaceRef(Dog d) {
    d = new Dog("Max"); // only changes LOCAL reference — caller unchanged
}

// ALIASING: two variables pointing to the same object
Dog a = new Dog("Spot");
Dog b = a;                    // b is an alias for the same Dog object
b.setName("Rex");
System.out.println(a.getName()); // Rex — a and b share the same object!`,
              explanation:
                "Object references are passed by value: a copy of the address is passed, so the method can call mutators on the original object. However, reassigning the reference (d = new Dog(...)) only changes the local copy. Aliasing occurs when two variables point to the same object — mutating through one affects the other.",
            },
          ],
          conceptChecks: [
            {
              id: "3-3-cc1",
              prompt: "What does this code print?",
              code: `static void addOne(int x) { x++; }

int n = 10;
addOne(n);
System.out.println(n);`,
              answer: "10. Java passes primitives by value — addOne() gets a copy of 10. Incrementing x inside the method only changes the local copy. The variable n in the caller is never modified.",
              hint: "Primitives are copied — the method cannot change the original.",
            },
            {
              id: "3-3-cc2",
              prompt: "What does this code print?",
              code: `static void changeName(Dog d) {
    d.setName("Rex");
}

Dog myDog = new Dog("Spot");
changeName(myDog);
System.out.println(myDog.getName());`,
              answer: "Rex. Even though the reference is a copy, it points to the same Dog object on the heap. Calling setName() through the copy still mutates the original object's state.",
              hint: "The copy of the reference still points to the same object.",
            },
            {
              id: "3-3-cc3",
              prompt: "After the code below executes, what does a.getName() return?",
              code: `Dog a = new Dog("Buddy");
Dog b = a;
b.setName("Max");`,
              answer: "Max. Because b = a creates an alias — both variables point to the same Dog object in memory. Calling b.setName(\"Max\") mutates that single object, so a.getName() also returns \"Max\".",
              hint: "Aliasing: b = a does NOT create a second Dog object.",
            },
          ],
          mcqs: [
            {
              id: "3-3-mcq1",
              question: "Which of the following correctly describes an accessor method?",
              options: [
                { id: "A", text: "A method that changes the value of an instance variable" },
                { id: "B", text: "A method that returns the value of an instance variable without modifying it" },
                { id: "C", text: "A method that constructs a new object" },
                { id: "D", text: "A void method that prints instance variable values" },
              ],
              correctId: "B",
              explanation:
                "An accessor (getter) method returns the value of an instance variable and has no side effects on the object's state. Mutator (setter) methods are the ones that modify instance variables.",
              skill: "2.A",
            },
            {
              id: "3-3-mcq2",
              question: "Consider the following code. What is printed?",
              code: `static void doubleIt(int n) { n = n * 2; }
int x = 4;
doubleIt(x);
System.out.println(x);`,
              options: [
                { id: "A", text: "4" },
                { id: "B", text: "8" },
                { id: "C", text: "2" },
                { id: "D", text: "A compile error occurs" },
              ],
              correctId: "A",
              explanation:
                "Java passes primitives by value. doubleIt() receives a copy of 4; assigning n = n * 2 changes the local copy only. The original variable x remains 4.",
              skill: "2.B",
            },
            {
              id: "3-3-mcq3",
              question: "A method takes a Dog parameter and calls d.setName(\"Rex\"). After the method returns, what is true about the original Dog object passed in?",
              options: [
                { id: "A", text: "The original Dog object is unchanged because references are passed by value" },
                { id: "B", text: "The original Dog object now has name \"Rex\" because the reference copy points to the same object" },
                { id: "C", text: "A NullPointerException is thrown" },
                { id: "D", text: "The method creates a new Dog object with name \"Rex\"" },
              ],
              correctId: "B",
              explanation:
                "When an object reference is passed, the method gets a copy of the reference (address), but it still points to the same object on the heap. Calling a mutator (setName) through the copied reference modifies the original object.",
              skill: "2.B",
            },
            {
              id: "3-3-mcq4",
              question: "Dog a = new Dog(\"Spot\"); Dog b = a; b.setName(\"Rex\"); — What does a.getName() return?",
              options: [
                { id: "A", text: "\"Spot\" — a is a separate copy of the Dog" },
                { id: "B", text: "null — the assignment b = a sets a to null" },
                { id: "C", text: "\"Rex\" — a and b are aliases for the same object" },
                { id: "D", text: "A compile error because two variables cannot reference the same object" },
              ],
              correctId: "C",
              explanation:
                "b = a creates an alias — both b and a point to the exact same Dog object in memory. When b.setName(\"Rex\") is called, it mutates that shared object, so a.getName() returns \"Rex\" as well.",
              skill: "2.B",
            },
            {
              id: "3-3-mcq5",
              question: "Which method signature correctly defines a mutator for a private int field named 'score'?",
              options: [
                { id: "A", text: "public int setScore() { return score; }" },
                { id: "B", text: "public void setScore(int score) { this.score = score; }" },
                { id: "C", text: "private void setScore(int score) { this.score = score; }" },
                { id: "D", text: "public int setScore(int score) { return score; }" },
              ],
              correctId: "B",
              explanation:
                "A mutator (setter) should be public (so external code can call it), void (it changes state rather than returning a value), take a parameter of the same type as the field, and assign with this.score = score to differentiate the parameter from the instance variable.",
              skill: "2.A",
            },
          ],
        },
        {
          id: "3-4",
          slug: "static-scope-this",
          title: "Static Members, Scope & the this Keyword",
          cedTopics: ["3.7", "3.8", "3.9"],
          description:
            "static variables and methods, local vs. instance scope, NullPointerException, and using this to disambiguate.",
          objectives: [
            "Declare and use static (class) variables and static methods",
            "Explain the difference between local variable scope and instance variable scope",
            "Identify code that will throw a NullPointerException",
            "Use this.field to distinguish instance variables from parameters with the same name",
            "Use this() for constructor chaining",
          ],
          codeExamples: [
            {
              id: "3-4-ex1",
              title: "Static Variables and Methods",
              code: `public class Counter {
    private static int count = 0; // ONE copy shared by all Counter objects

    private int id;               // instance variable — unique per object

    public Counter() {
        count++;          // each new Counter increments the shared count
        this.id = count;  // assign this object's unique id
    }

    // Static method — called on the class, not on an object
    public static int getCount() { return count; }

    // Instance method — called on a specific object
    public int getId() { return id; }
}

Counter c1 = new Counter();
Counter c2 = new Counter();
Counter c3 = new Counter();

System.out.println(Counter.getCount()); // 3  (class-level call)
System.out.println(c1.getId());         // 1
System.out.println(c3.getId());         // 3`,
              explanation:
                "A static variable has one copy shared across all instances — perfect for counting objects. Static methods are called with ClassName.method() rather than obj.method(), and they cannot access instance variables because there is no specific object to refer to.",
            },
            {
              id: "3-4-ex2",
              title: "The this Keyword: Disambiguation",
              code: `public class Point {
    private int x;
    private int y;

    // Parameter names shadow the instance variable names — use 'this' to disambiguate
    public Point(int x, int y) {
        this.x = x;  // 'this.x' = instance variable; 'x' = parameter
        this.y = y;
    }

    public void move(int x, int y) {
        this.x += x;  // add parameter x to instance variable x
        this.y += y;
    }

    public String toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}

Point p = new Point(3, 4);
p.move(1, 2);
System.out.println(p); // (4, 6)`,
              explanation:
                "When a parameter has the same name as an instance variable, the parameter shadows the instance variable. Using 'this.x' explicitly refers to the instance variable, while plain 'x' refers to the parameter. Omitting 'this' when the names differ is also valid — Java finds the instance variable anyway.",
            },
            {
              id: "3-4-ex3",
              title: "Constructor Chaining with this() and NullPointerException",
              code: `public class Dog {
    private String name;
    private int age;

    // No-arg constructor calls the parameterized one — avoids code duplication
    public Dog() {
        this("Unknown", 0); // must be first line in constructor
    }

    public Dog(String name, int age) {
        this.name = name;
        this.age  = age;
    }

    public String getName() { return name; }
}

Dog d1 = new Dog();
System.out.println(d1.getName()); // Unknown

// NullPointerException — calling a method on a null reference
Dog d2 = null;
System.out.println(d2.getName()); // throws NullPointerException at runtime!`,
              explanation:
                "this() calls another constructor in the same class and must appear on the very first line of the calling constructor. This avoids duplicating initialization code. A NullPointerException is thrown at runtime whenever you call a method on a variable that holds null instead of an actual object.",
            },
          ],
          conceptChecks: [
            {
              id: "3-4-cc1",
              prompt: "After executing the code below, what does Counter.getCount() return?",
              code: `Counter a = new Counter();
Counter b = new Counter();
Counter c = new Counter();`,
              answer: "3. The static variable 'count' is shared across all Counter instances. Each call to new Counter() increments the same count, so after creating three objects, count is 3.",
              hint: "Static variables belong to the class, not individual objects.",
            },
            {
              id: "3-4-cc2",
              prompt: "In the constructor below, what is the difference between 'x' and 'this.x'?",
              code: `public Point(int x, int y) {
    this.x = x;
    this.y = y;
}`,
              answer: "Plain 'x' refers to the constructor parameter. 'this.x' refers to the instance variable of the current object. Without 'this.', the parameter shadows the instance variable, so you'd accidentally assign x = x (the parameter to itself), leaving the instance variable uninitialized.",
            },
            {
              id: "3-4-cc3",
              prompt: "What exception is thrown when this code runs, and why?",
              code: `Dog d = null;
System.out.println(d.getName());`,
              answer: "NullPointerException. The variable d holds null — it doesn't reference any Dog object in memory. Calling a method on null causes Java to throw NullPointerException at runtime because there is no object to execute the method on.",
            },
          ],
          mcqs: [
            {
              id: "3-4-mcq1",
              question: "A class declares 'private static int total = 0;'. Which statement about 'total' is correct?",
              options: [
                { id: "A", text: "Each object has its own copy of total" },
                { id: "B", text: "total is shared across all instances of the class" },
                { id: "C", text: "total can only be accessed inside the constructor" },
                { id: "D", text: "total is reset to 0 each time a new object is created" },
              ],
              correctId: "B",
              explanation:
                "A static variable is a class variable — one copy shared by all instances. If one constructor increments it, the change is visible through every object and through the class name itself.",
              skill: "2.A",
            },
            {
              id: "3-4-mcq2",
              question: "Which of the following would cause a compile-time error?",
              code: `public class MyClass {
    private int value = 10;
    public static int getValue() {
        return value; // line X
    }
}`,
              options: [
                { id: "A", text: "Nothing — the code compiles successfully" },
                { id: "B", text: "Line X: a static method cannot access an instance variable" },
                { id: "C", text: "Line X: value must be public to be returned" },
                { id: "D", text: "The constructor is missing" },
              ],
              correctId: "B",
              explanation:
                "A static method has no 'this' context — it is not associated with any specific object. Therefore, it cannot reference instance variables like 'value'. To fix it, either make getValue() non-static or make 'value' static.",
              skill: "2.A",
            },
            {
              id: "3-4-mcq3",
              question: "What is the purpose of 'this.name = name;' inside a constructor whose parameter is also called 'name'?",
              options: [
                { id: "A", text: "It creates a new local variable named 'name'" },
                { id: "B", text: "It disambiguates — this.name refers to the instance variable, name refers to the parameter" },
                { id: "C", text: "It makes the instance variable public" },
                { id: "D", text: "It calls the superclass constructor" },
              ],
              correctId: "B",
              explanation:
                "When a parameter has the same name as an instance variable, 'this.name' explicitly refers to the instance variable of the current object, while plain 'name' refers to the parameter. Without 'this', the parameter shadows the instance variable.",
              skill: "2.A",
            },
            {
              id: "3-4-mcq4",
              question: "Consider: Dog d = null; String n = d.getName(); — what happens when this code executes?",
              options: [
                { id: "A", text: "n is assigned null" },
                { id: "B", text: "n is assigned an empty string" },
                { id: "C", text: "A NullPointerException is thrown at runtime" },
                { id: "D", text: "A compile error occurs because d is null" },
              ],
              correctId: "C",
              explanation:
                "The compiler allows calling methods on any variable of the correct type, but at runtime, d holds null — no Dog object exists. Java throws NullPointerException when you try to invoke a method on a null reference.",
              skill: "2.B",
            },
            {
              id: "3-4-mcq5",
              question: "Which of the following correctly uses constructor chaining with this()?",
              options: [
                { id: "A", text: "public Dog() { String s = \"Unknown\"; this(s, 0); }" },
                { id: "B", text: "public Dog() { this(\"Unknown\", 0); }" },
                { id: "C", text: "public Dog() { Dog(\"Unknown\", 0); }" },
                { id: "D", text: "public Dog() { new Dog(\"Unknown\", 0); }" },
              ],
              correctId: "B",
              explanation:
                "this() calls another constructor in the same class and must be the very first statement in the constructor body — no other statements before it. Option A executes a statement before this(), which is invalid.",
              skill: "2.A",
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // UNIT 4: Data Collections  (Topics 4.1 – 4.17)
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 4,
      slug: "data-collections",
      title: "Data Collections",
      examWeight: "30–40%",
      suggestedPeriods: "50–52",
      description:
        "Arrays, ArrayLists, 2D arrays, File I/O with Scanner, dataset ethics, searching, sorting, and recursion tracing.",
      color: "orange",
      icon: "Database",
      subUnits: [
        {
          id: "4-1",
          slug: "data-ethics-datasets",
          title: "Data Ethics & Introduction to Data Sets",
          cedTopics: ["4.1", "4.2"],
          description:
            "Privacy risks from data collection, algorithmic bias, data quality, and what a data set is.",
          objectives: [
            "Identify privacy risks created by collecting and storing personal data",
            "Explain algorithmic bias and how incomplete data produces unfair outcomes",
            "Determine whether a given data set is appropriate for a stated problem",
            "Describe what a data set is and how it can be analyzed to solve problems",
          ],
          codeExamples: [
            {
              id: "4-1-ex1",
              title: "What a Data Set Looks Like",
              code: `// A data set is a structured collection of related pieces of information.
// Example: a CSV file of student test scores

// student_scores.txt (tab-separated):
// Name        Score   Grade
// Alice       92      A
// Bob         74      C
// Carol       88      B
// David       61      D

// A program can read this file and compute statistics:
//   - average score
//   - highest/lowest score
//   - count of students above a threshold
//   - distribution across grade categories`,
              explanation:
                "A data set is a collection of specific pieces of information — here, each row is one student's record. Programs manipulate data sets by reading values, computing statistics, and filtering or sorting entries to answer questions about the data.",
            },
            {
              id: "4-1-ex2",
              title: "Privacy Risk: Collecting Sensitive Data",
              code: `// Privacy risk scenario — storing more data than needed is dangerous
public class UserRecord {
    private String name;
    private String email;
    private String password;     // risk: stored in plaintext!
    private String address;      // risk: personal location data
    private String creditCard;   // risk: financial data — high-value target
    private String healthStatus; // risk: sensitive medical information
}

// Best practices to reduce risk:
// 1. Collect ONLY what is needed for the stated purpose (data minimization)
// 2. Encrypt sensitive fields before storing
// 3. Delete data when no longer needed
// 4. Protect databases with access controls`,
              explanation:
                "Every piece of personal data stored creates a risk — if the database is breached, users are harmed. The principle of data minimization says: only collect what you actually need. Developers are responsible for considering these risks when designing systems.",
            },
            {
              id: "4-1-ex3",
              title: "Algorithmic Bias: Flawed Data Produces Unfair Outcomes",
              code: `// Algorithmic bias example — a hiring algorithm trained on past data
// If historical hires were predominantly one demographic group,
// the algorithm learns that pattern and perpetuates it.

// Pseudocode of a biased hiring model:
// trainModel(historicalHiringData)
//   → model learns: "candidates with trait X were hired more often"
//   → trait X may correlate with protected characteristics
//   → new candidates with trait X are rated higher regardless of qualifications

// Real consequences:
//   - Qualified candidates from underrepresented groups are rejected
//   - Bias is hidden inside the model — harder to spot than a human bias
//   - Scale: an algorithm makes thousands of decisions automatically

// Fix: audit training data for representation, test for disparate impact`,
              explanation:
                "Algorithmic bias occurs when flawed or incomplete training data causes a model to produce systematically unfair outcomes for certain groups. Because algorithms make decisions at scale and their logic is hidden, bias can spread further and be harder to detect than individual human bias.",
            },
          ],
          conceptChecks: [
            {
              id: "4-1-cc1",
              prompt: "What is algorithmic bias, and how can incomplete training data cause it?",
              answer: "Algorithmic bias is a systemic error in an algorithm that produces unfair outcomes for certain groups. If the training data underrepresents some populations, the model never learns their patterns correctly, so its predictions are systematically worse for those groups — even without any intentional discrimination.",
            },
            {
              id: "4-1-cc2",
              prompt: "A company wants to use a data set of social media posts from teenagers to train a medical diagnosis model for elderly patients. Is this data set appropriate? Why or why not?",
              answer: "No. The data set is not appropriate because the population (teenagers on social media) does not match the problem (diagnosing elderly patients). The language, symptoms, and health patterns described would be completely different. Using an inappropriate data set leads to incorrect or harmful conclusions.",
            },
            {
              id: "4-1-cc3",
              prompt: "A fitness app collects users' GPS location every 30 seconds, even when the app is closed. What privacy risk does this create?",
              answer: "Continuous GPS tracking reveals users' home address, workplace, daily routines, and places of worship — all highly sensitive. If the company is breached, this data could be used for stalking, burglary, or discrimination. The data is also being collected beyond what is needed for a fitness app (data minimization violation).",
            },
          ],
          mcqs: [
            {
              id: "4-1-mcq1",
              question: "Which of the following best describes algorithmic bias?",
              options: [
                { id: "A", text: "A bug that causes an algorithm to crash on certain inputs" },
                { id: "B", text: "Systematically unfair outcomes caused by flawed or unrepresentative training data" },
                { id: "C", text: "An algorithm that runs more slowly than expected" },
                { id: "D", text: "Intentional discrimination programmed into an algorithm by its developers" },
              ],
              correctId: "B",
              explanation:
                "Algorithmic bias is systematic unfairness produced by flawed or incomplete data, not necessarily intentional. An algorithm trained on non-representative data will make poor or unfair predictions for underrepresented groups.",
              skill: "5.E",
            },
            {
              id: "4-1-mcq2",
              question: "A hospital stores patient records including diagnosis, treatment history, and Social Security numbers in a database. Which risk does this data collection create?",
              options: [
                { id: "A", text: "The database may run out of storage" },
                { id: "B", text: "A data breach could expose sensitive personal and medical information, harming patients" },
                { id: "C", text: "Doctors will not be able to access records quickly enough" },
                { id: "D", text: "The hospital may violate copyright law" },
              ],
              correctId: "B",
              explanation:
                "Storing sensitive personal data creates privacy risk. A breach exposes patients to identity theft, discrimination, or harm from exposed medical history. Developers must design systems with security and data minimization in mind.",
              skill: "5.E",
            },
            {
              id: "4-1-mcq3",
              question: "A researcher wants to use a data set of English newspaper articles to build a translation model for Swahili. Which concern is most relevant?",
              options: [
                { id: "A", text: "The articles may contain copyright-protected material" },
                { id: "B", text: "The data set is inappropriate because it does not represent the target language" },
                { id: "C", text: "Newspaper articles are too long to process efficiently" },
                { id: "D", text: "The data set may contain algorithmic bias" },
              ],
              correctId: "B",
              explanation:
                "Appropriate data sets must match the problem. English newspaper articles contain no Swahili text, so they cannot train a Swahili translation model. Data quality and relevance are critical — a model is only as good as its training data.",
              skill: "5.E",
            },
            {
              id: "4-1-mcq4",
              question: "Which of the following is NOT a characteristic of a high-quality data set?",
              options: [
                { id: "A", text: "The data is complete — very few missing values" },
                { id: "B", text: "The data is representative of the population being studied" },
                { id: "C", text: "The data set is as large as possible, regardless of relevance" },
                { id: "D", text: "The data is accurate and free from systematic errors" },
              ],
              correctId: "C",
              explanation:
                "More data is not always better — irrelevant or mismatched data degrades model quality. A high-quality data set must be accurate, complete, and representative of the problem being solved. Size alone does not determine quality.",
              skill: "5.E",
            },
          ],
        },
        {
          id: "4-2",
          slug: "arrays",
          title: "Arrays",
          cedTopics: ["4.3", "4.4", "4.5"],
          description:
            "Array creation, default values, zero-based indexing, traversal patterns, and standard array algorithms.",
          objectives: [
            "Create arrays with new and with initializer lists",
            "State the default values for int, double, boolean, and reference type arrays",
            "Access and modify elements with arr[i] and read arr.length",
            "Traverse an array forward, backward, and with adjacent-element access",
            "Implement sum, average, min, max, count, and reverse algorithms on arrays",
          ],
          codeExamples: [
            {
              id: "4-2-ex1",
              title: "Array Creation and Default Values",
              code: `// Declare and allocate — elements get default values
int[]     scores = new int[5];      // [0, 0, 0, 0, 0]
double[]  prices = new double[3];   // [0.0, 0.0, 0.0]
boolean[] flags  = new boolean[2];  // [false, false]
String[]  names  = new String[4];   // [null, null, null, null]

// Initializer list — size is inferred
int[] grades = {90, 85, 78, 92, 88};

// Access by index (zero-based!)
System.out.println(grades[0]);              // 90  (first element)
System.out.println(grades[4]);              // 88  (last element)
System.out.println(grades[grades.length-1]);// 88  (last element, general form)
System.out.println(grades.length);          // 5   (field, no parentheses!)

// grades[5] would throw ArrayIndexOutOfBoundsException — index 5 doesn't exist`,
              explanation:
                "Arrays in Java are zero-indexed: a 5-element array has indices 0 through 4. Access the length with arr.length (no parentheses — it's a field, not a method). Going out of bounds at runtime throws ArrayIndexOutOfBoundsException.",
            },
            {
              id: "4-2-ex2",
              title: "Array Traversal Patterns",
              code: `int[] arr = {10, 20, 30, 40, 50};

// Forward traversal (most common)
for (int i = 0; i < arr.length; i++) {
    System.out.print(arr[i] + " "); // 10 20 30 40 50
}

// Enhanced for-each — read-only, no index available
for (int val : arr) {
    System.out.print(val + " ");    // 10 20 30 40 50
}

// Backward traversal
for (int i = arr.length - 1; i >= 0; i--) {
    System.out.print(arr[i] + " "); // 50 40 30 20 10
}

// Adjacent elements (stops one before end to avoid out-of-bounds)
for (int i = 0; i < arr.length - 1; i++) {
    System.out.println(arr[i] + " and " + arr[i + 1]);
    // 10 and 20,  20 and 30,  ...
}`,
              explanation:
                "Use a standard for loop when you need the index or want to modify elements. Use for-each when you only need to read values. The adjacent-element pattern stops at arr.length - 1 to safely access arr[i + 1] without going out of bounds.",
            },
            {
              id: "4-2-ex3",
              title: "Standard Array Algorithms",
              code: `int[] arr = {3, 7, 1, 9, 4};

// Sum and average
int sum = 0;
for (int val : arr) { sum += val; }
double avg = (double) sum / arr.length; // cast before dividing!
System.out.println("Sum: " + sum);  // 24
System.out.println("Avg: " + avg);  // 4.8

// Maximum — initialize to arr[0], NOT to 0 (fails for all-negative arrays)
int max = arr[0];
for (int i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
}
System.out.println("Max: " + max);  // 9

// Count elements meeting a condition
int count = 0;
for (int val : arr) {
    if (val > 4) count++;
}
System.out.println("Count > 4: " + count); // 2

// Reverse in-place using a temp variable
for (int i = 0; i < arr.length / 2; i++) {
    int temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
}
// arr is now {4, 9, 1, 7, 3}`,
              explanation:
                "Key traps: initialize max/min to arr[0] (not 0, which fails for all-negative arrays); cast to double before dividing to get a decimal average. The reverse algorithm swaps the first and last, second and second-to-last, etc., stopping at the midpoint to avoid double-swapping.",
            },
          ],
          conceptChecks: [
            {
              id: "4-2-cc1",
              prompt: "What does this code print, and what exception would be thrown by the final line?",
              code: `int[] nums = {5, 10, 15, 20};
System.out.println(nums[0]);
System.out.println(nums[nums.length - 1]);
System.out.println(nums[4]); // what happens here?`,
              answer: "Prints 5, then 20 (index 3 = last element). The final line throws ArrayIndexOutOfBoundsException because valid indices are 0-3; index 4 does not exist in a 4-element array.",
              hint: "A 4-element array has indices 0, 1, 2, 3.",
            },
            {
              id: "4-2-cc2",
              prompt: "What does this loop print?",
              code: `int[] arr = {2, 4, 6, 8};
int total = 0;
for (int val : arr) {
    total += val;
}
System.out.println(total);`,
              answer: "20. The for-each loop adds each element to total: 0 + 2 = 2, 2 + 4 = 6, 6 + 6 = 12, 12 + 8 = 20.",
              hint: "Trace each iteration, updating total.",
            },
            {
              id: "4-2-cc3",
              prompt: "Why is initializing max = 0 instead of max = arr[0] a bug for some inputs?",
              answer: "If all elements are negative (e.g., {-5, -3, -8}), no element is greater than 0, so max stays 0 — which is not even in the array. Initializing to arr[0] ensures max is always a real element. The loop then starts at index 1 to compare the rest.",
            },
          ],
          mcqs: [
            {
              id: "4-2-mcq1",
              question: "int[] arr = new int[6]; — what is arr[0] and arr[5]?",
              options: [
                { id: "A", text: "arr[0] = 1, arr[5] = 6" },
                { id: "B", text: "arr[0] = 0, arr[5] = 0" },
                { id: "C", text: "arr[0] = null, arr[5] = null" },
                { id: "D", text: "arr[0] = undefined, arr[5] = undefined" },
              ],
              correctId: "B",
              explanation:
                "int arrays are initialized to 0 by default. A 6-element array has indices 0–5, both of which are 0 until explicitly assigned.",
              skill: "2.D",
            },
            {
              id: "4-2-mcq2",
              question: "int[] arr = {1, 2, 3, 4, 5}; — which line throws ArrayIndexOutOfBoundsException?",
              options: [
                { id: "A", text: "arr[0]" },
                { id: "B", text: "arr[arr.length - 1]" },
                { id: "C", text: "arr[arr.length]" },
                { id: "D", text: "arr[4]" },
              ],
              correctId: "C",
              explanation:
                "arr.length is 5, so arr[arr.length] = arr[5], which is index 5. Valid indices are 0–4. This is the classic off-by-one error — always use i < arr.length, not i <= arr.length.",
              skill: "2.D",
            },
            {
              id: "4-2-mcq3",
              question: "Which traversal pattern allows you to modify array elements during the loop?",
              options: [
                { id: "A", text: "for (int val : arr)" },
                { id: "B", text: "for (int i = 0; i < arr.length; i++)" },
                { id: "C", text: "Both patterns allow modification" },
                { id: "D", text: "Neither pattern allows modification" },
              ],
              correctId: "B",
              explanation:
                "The enhanced for-each loop copies the value into a local variable (val) — assigning to val does not change the array. The indexed for loop gives you arr[i], which is the actual array element and can be modified.",
              skill: "2.D",
            },
            {
              id: "4-2-mcq4",
              question: "What is the output of the following code?",
              code: `int[] arr = {6, 2, 9, 1, 5};
int max = 0;
for (int val : arr) {
    if (val > max) max = val;
}
System.out.println(max);`,
              options: [
                { id: "A", text: "0" },
                { id: "B", text: "6" },
                { id: "C", text: "9" },
                { id: "D", text: "1" },
              ],
              correctId: "C",
              explanation:
                "Even though initializing max = 0 is technically wrong for all-negative arrays, here all elements are positive, so the loop correctly finds 9 as the largest element. The output is 9.",
              skill: "2.D",
            },
            {
              id: "4-2-mcq5",
              question: "An array has 8 elements. What is the index of its last element?",
              options: [
                { id: "A", text: "8" },
                { id: "B", text: "7" },
                { id: "C", text: "arr.length" },
                { id: "D", text: "arr.size() - 1" },
              ],
              correctId: "B",
              explanation:
                "Arrays use zero-based indexing, so an 8-element array has indices 0 through 7. The last element is at index arr.length - 1 = 7. arr.size() is an ArrayList method — arrays use arr.length.",
              skill: "2.D",
            },
          ],
        },
        {
          id: "4-3",
          slug: "file-io",
          title: "Using Text Files (File I/O)",
          cedTopics: ["4.6"],
          description:
            "Reading text files with File and Scanner: all Quick Reference methods, throws IOException, and common patterns.",
          objectives: [
            "Create a File object and a Scanner from it",
            "Write a method header with throws IOException",
            "Use hasNext() in a loop to read all tokens from a file",
            "Use nextInt(), nextDouble(), nextLine(), next(), and close() correctly",
            "Explain the nextLine() empty-string trap after another Scanner method",
          ],
          codeExamples: [
            {
              id: "4-3-ex1",
              title: "Reading a Text File Line by Line",
              code: `import java.io.File;
import java.io.IOException;
import java.util.Scanner;

public class FileReader {
    // 'throws IOException' is REQUIRED — file operations can fail
    public static void readFile() throws IOException {
        File f = new Scanner("scores.txt");   // locate the file
        Scanner scan = new Scanner(f);         // wrap it in a Scanner

        while (scan.hasNext()) {       // true while more tokens remain
            String line = scan.nextLine();
            System.out.println(line);
        }
        scan.close();                  // always close when done
    }
}`,
              explanation:
                "Reading a file requires three steps: create a File object, wrap it in a Scanner, then loop with hasNext(). The method signature must declare 'throws IOException' because file operations can fail (file not found, permission denied, etc.). Always call scan.close() when finished.",
            },
            {
              id: "4-3-ex2",
              title: "Reading Typed Data with nextInt and nextDouble",
              code: `// data.txt contains:
// 3
// Alice 92.5
// Bob 78.0
// Carol 85.5

public static void readScores() throws IOException {
    Scanner scan = new Scanner(new File("data.txt"));

    int count = scan.nextInt();           // reads "3" as an int
    scan.nextLine();                      // consume leftover newline!

    for (int i = 0; i < count; i++) {
        String name  = scan.next();       // reads next whitespace token
        double score = scan.nextDouble(); // reads next double
        scan.nextLine();                  // consume rest of line
        System.out.println(name + ": " + score);
    }
    scan.close();
}
// Output:
// Alice: 92.5
// Bob: 78.0
// Carol: 85.5`,
              explanation:
                "nextInt() and nextDouble() read only the number — they leave the newline character in the input stream. If you call nextLine() right after, it reads that leftover newline and returns an empty String. Fix: add an extra nextLine() call after nextInt()/nextDouble() to consume the newline before reading the actual next line.",
            },
            {
              id: "4-3-ex3",
              title: "Parsing CSV Data with String.split",
              code: `// students.csv contains:
// Alice,92,A
// Bob,74,C
// Carol,88,B

public static void parseCsv() throws IOException {
    Scanner scan = new Scanner(new File("students.csv"));

    while (scan.hasNextLine()) {
        String line = scan.nextLine();       // "Alice,92,A"
        String[] parts = line.split(",");    // ["Alice", "92", "A"]

        String name  = parts[0];             // "Alice"
        int score    = Integer.parseInt(parts[1]);  // 92
        String grade = parts[2];             // "A"

        System.out.println(name + " scored " + score + " (" + grade + ")");
    }
    scan.close();
}
// Output:
// Alice scored 92 (A)
// Bob scored 74 (C)
// Carol scored 88 (B)`,
              explanation:
                "String.split(delimiter) breaks a String into an array of tokens. Each part[i] is a String, so use Integer.parseInt() or Double.parseDouble() to convert numeric columns. This pattern — read a line, split it, parse the parts — is the standard way to process CSV (comma-separated value) data files.",
            },
          ],
          conceptChecks: [
            {
              id: "4-3-cc1",
              prompt: "A method reads from a file. What keyword must appear in its method signature, and why?",
              answer: "The method signature must include 'throws IOException'. File operations can fail at runtime for reasons outside the program's control (file not found, no read permission, disk error). Java requires you to declare this possibility so the caller knows to handle it.",
            },
            {
              id: "4-3-cc2",
              prompt: "What does scan.hasNext() return, and when should it be used as a loop condition?",
              answer: "hasNext() returns true if there is at least one more token remaining in the input. Use it as the loop condition when reading a file of unknown length — the loop continues as long as there is more data and stops automatically when the file ends.",
            },
            {
              id: "4-3-cc3",
              prompt: "A file contains: '5\\nHello'. The code calls nextInt() then nextLine(). What does nextLine() return, and why?",
              code: `Scanner scan = new Scanner(new File("data.txt"));
int n = scan.nextInt();       // reads 5
String s = scan.nextLine();   // what does this return?`,
              answer: "nextLine() returns an empty String \"\". nextInt() reads the '5' but leaves the newline character ('\\n') in the stream. The next nextLine() call reads up to that newline and returns everything before it — which is nothing, so it returns \"\". To get \"Hello\", you'd need an extra nextLine() call first to consume the leftover newline.",
              hint: "nextInt() stops before the newline — it doesn't consume it.",
            },
          ],
          mcqs: [
            {
              id: "4-3-mcq1",
              question: "Which import statements are required to read a text file with Scanner in Java?",
              options: [
                { id: "A", text: "import java.io.File; and import java.util.Scanner;" },
                { id: "B", text: "import java.util.Scanner; only" },
                { id: "C", text: "import java.io.*; only" },
                { id: "D", text: "No imports needed — Scanner is in java.lang" },
              ],
              correctId: "A",
              explanation:
                "Both imports are needed: java.util.Scanner for the Scanner class, and java.io.File for the File class. Scanner is not in java.lang and File is not in java.util.",
              skill: "2.D",
            },
            {
              id: "4-3-mcq2",
              question: "What is the purpose of 'throws IOException' in a file-reading method signature?",
              options: [
                { id: "A", text: "It catches all IOExceptions inside the method automatically" },
                { id: "B", text: "It declares that the method may throw an IOException, so the caller must handle it" },
                { id: "C", text: "It prevents the program from crashing if the file is not found" },
                { id: "D", text: "It is optional — Java handles file errors automatically" },
              ],
              correctId: "B",
              explanation:
                "The 'throws' clause in a method signature is a declaration, not a handler. It tells callers that this method may throw an IOException, so they must either handle it (try-catch) or propagate it further. Without it, the code will not compile.",
              skill: "2.D",
            },
            {
              id: "4-3-mcq3",
              question: "A file has 4 lines. Which method is the safest loop condition for reading every line?",
              options: [
                { id: "A", text: "scan.nextLine() != null" },
                { id: "B", text: "scan.hasNext()" },
                { id: "C", text: "scan.hasNextLine()" },
                { id: "D", text: "scan.length() > 0" },
              ],
              correctId: "C",
              explanation:
                "hasNextLine() returns true if there is another line to read, which is the most semantically correct condition when using nextLine(). scan.length() does not exist on Scanner. Comparing nextLine() != null is incorrect because nextLine() never returns null — it throws NoSuchElementException at end of file.",
              skill: "2.D",
            },
            {
              id: "4-3-mcq4",
              question: "After calling scan.nextInt() to read a number on its own line, the next call to scan.nextLine() returns \"\". Why?",
              options: [
                { id: "A", text: "The file is empty after the integer" },
                { id: "B", text: "nextLine() always returns empty on the first call" },
                { id: "C", text: "nextInt() leaves the newline in the stream; nextLine() consumes it and returns \"\"" },
                { id: "D", text: "nextInt() and nextLine() cannot be used together" },
              ],
              correctId: "C",
              explanation:
                "nextInt() reads the integer but stops before the newline. The next nextLine() call reads from the current position to the next newline — which is the leftover newline from nextInt(), so it returns \"\". Solution: add an extra nextLine() after nextInt() to discard the leftover newline.",
              skill: "2.D",
            },
          ],
        },
        {
          id: "4-4",
          slug: "arraylist",
          title: "ArrayList",
          cedTopics: ["4.7", "4.8", "4.9", "4.10"],
          description:
            "Wrapper classes, autoboxing, all ArrayList Quick Reference methods, traversal patterns, and safe removal.",
          objectives: [
            "Explain why ArrayList requires wrapper types, not primitives",
            "Use autoboxing and unboxing",
            "Call Integer.parseInt and Double.parseDouble to convert strings to numbers",
            "Use String.split to tokenize a line from a file",
            "Declare and use an ArrayList with a generic type",
            "Call size(), add(), get(), set(), and remove() on an ArrayList",
            "Traverse an ArrayList with for, for-each, and backward loops",
            "Remove elements safely from an ArrayList using a backward traversal",
          ],
          codeExamples: [
            {
              id: "4-4-ex1",
              title: "ArrayList Basics: Declare, Add, Access, Modify, Remove",
              code: `import java.util.ArrayList;

ArrayList<String> names = new ArrayList<String>();
// or shorthand with diamond operator:
ArrayList<Integer> scores = new ArrayList<>();

// add(obj)  — appends to the end
names.add("Alice");
names.add("Bob");
names.add("Carol");

// size()    — number of elements (like arr.length)
System.out.println(names.size()); // 3

// get(i)    — access by index (like arr[i])
System.out.println(names.get(0)); // Alice

// set(i, obj) — replace element, returns old value
String old = names.set(1, "Beth");
System.out.println(old);          // Bob (returned)
System.out.println(names.get(1)); // Beth (replaced)

// add(i, obj) — insert at index, shifts elements right
names.add(1, "Ann");  // ["Alice", "Ann", "Beth", "Carol"]

// remove(i)  — removes element, shifts left, returns it
String removed = names.remove(0);
System.out.println(removed);      // Alice
System.out.println(names.size()); // 3`,
              explanation:
                "ArrayList uses methods instead of bracket syntax. Key differences from arrays: size() not length, get(i) not arr[i], dynamic resizing. The remove() method shifts all subsequent elements left by one, which affects index-based traversal.",
            },
            {
              id: "4-4-ex2",
              title: "Wrapper Classes, Autoboxing, and Parsing",
              code: `// ArrayList requires object types — use wrappers for primitives
ArrayList<Integer> nums = new ArrayList<>();

// Autoboxing: int automatically converted to Integer
nums.add(42);       // Java wraps 42 as new Integer(42) automatically
nums.add(17);

// Unboxing: Integer automatically converted to int
int val = nums.get(0);  // Java unwraps Integer to int automatically
System.out.println(val); // 42

// Parsing strings to numbers — essential for reading files
String s1 = "99";
int    n1 = Integer.parseInt(s1);     // "99"  → 99
String s2 = "3.14";
double n2 = Double.parseDouble(s2);   // "3.14" → 3.14

// String.split — breaks a line into tokens
String line = "Alice,92,A";
String[] parts = line.split(",");
// parts[0] = "Alice", parts[1] = "92", parts[2] = "A"
int score = Integer.parseInt(parts[1]); // 92`,
              explanation:
                "ArrayList<Integer> stores Integer objects, not int primitives. Autoboxing lets you write nums.add(42) as if it were primitive — Java inserts the wrapping automatically. Integer.parseInt() and Double.parseDouble() convert String data read from files into usable numbers.",
            },
            {
              id: "4-4-ex3",
              title: "Safe Traversal and Backward Removal",
              code: `ArrayList<Integer> nums = new ArrayList<>();
nums.add(1); nums.add(4); nums.add(2); nums.add(6); nums.add(3);

// Forward traversal with for loop
for (int i = 0; i < nums.size(); i++) {
    System.out.print(nums.get(i) + " "); // 1 4 2 6 3
}

// Enhanced for-each (read-only)
for (int n : nums) {
    System.out.print(n + " "); // 1 4 2 6 3
}

// SAFE removal: traverse BACKWARD to avoid skipping elements
// Remove all even numbers:
for (int i = nums.size() - 1; i >= 0; i--) {
    if (nums.get(i) % 2 == 0) {
        nums.remove(i); // removes 6 (i=3), then 4 (i=1), then 2 (i=2)
    }
}
// Result: [1, 3]

// WHY backward? Forward removal at index i shifts element at i+1 to i,
// so the next iteration skips the element that just moved into position i.`,
              explanation:
                "When removing elements during traversal, always iterate backward. Going forward, after remove(i), the element that was at i+1 shifts to i — the next iteration increments i and skips it. Traversing backward means removal only affects indices already processed.",
            },
          ],
          conceptChecks: [
            {
              id: "4-4-cc1",
              prompt: "What does list.remove(0) do, and what does it return?",
              code: `ArrayList<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");
String result = list.remove(0);`,
              answer: "remove(0) removes the element at index 0 (\"A\"), shifts \"B\" to index 0 and \"C\" to index 1, and returns the removed element \"A\". After this call, list.size() is 2 and list.get(0) returns \"B\".",
              hint: "remove() returns the element it removed and shifts everything else left.",
            },
            {
              id: "4-4-cc2",
              prompt: "Why does removing elements while traversing forward with an index loop cause elements to be skipped?",
              answer: "When you call list.remove(i), all elements after index i shift left by one. On the next iteration, i is incremented to i+1, but the element that was at i+1 is now at i — so the loop never visits it. Traversing backward avoids this because removal only shifts elements at indices already processed.",
            },
            {
              id: "4-4-cc3",
              prompt: "What is the output of this code?",
              code: `ArrayList<Integer> nums = new ArrayList<>();
nums.add(10);
nums.add(20);
nums.add(30);
nums.add(1, 15);
System.out.println(nums.get(2));`,
              answer: "20. add(1, 15) inserts 15 at index 1, shifting the existing elements right: [10, 15, 20, 30]. So index 2 is now 20.",
              hint: "add(index, obj) inserts — it doesn't replace.",
            },
          ],
          mcqs: [
            {
              id: "4-4-mcq1",
              question: "Why must ArrayList<int> be written as ArrayList<Integer>?",
              options: [
                { id: "A", text: "ArrayList does not support numeric types" },
                { id: "B", text: "Generic types require object types, and int is a primitive" },
                { id: "C", text: "Integer is faster than int for list operations" },
                { id: "D", text: "Java requires capital letters for all ArrayList element types" },
              ],
              correctId: "B",
              explanation:
                "Java generics (the <T> in ArrayList<T>) require object types, not primitives. Since int is a primitive, you must use its wrapper class Integer. Autoboxing makes the conversion transparent in most cases.",
              skill: "2.D",
            },
            {
              id: "4-4-mcq2",
              question: "After ArrayList<String> list has 3 elements, list.add(1, \"X\") is called. What is list.size()?",
              options: [
                { id: "A", text: "2 — the element at index 1 was replaced" },
                { id: "B", text: "3 — the size doesn't change on add with index" },
                { id: "C", text: "4 — a new element was inserted" },
                { id: "D", text: "This throws an IndexOutOfBoundsException" },
              ],
              correctId: "C",
              explanation:
                "add(index, obj) inserts a new element at the given index and shifts all elements at that index and beyond one position to the right. The list grows by one — it is not a replacement. list.set(1, \"X\") would replace without growing.",
              skill: "2.D",
            },
            {
              id: "4-4-mcq3",
              question: "What does Integer.parseInt(\"47\") return?",
              options: [
                { id: "A", text: "The String \"47\"" },
                { id: "B", text: "The Integer object 47" },
                { id: "C", text: "The int value 47" },
                { id: "D", text: "A NumberFormatException" },
              ],
              correctId: "C",
              explanation:
                "Integer.parseInt(String) parses the string and returns a primitive int. It's essential for converting file data (which is always read as strings) into numbers for computation.",
              skill: "2.D",
            },
            {
              id: "4-4-mcq4",
              question: "A list has elements [5, 3, 8, 2]. The code calls list.remove(2). What does the list look like after?",
              options: [
                { id: "A", text: "[5, 3, 2]" },
                { id: "B", text: "[5, 8, 2]" },
                { id: "C", text: "[3, 8, 2]" },
                { id: "D", text: "[5, 3, 8]" },
              ],
              correctId: "A",
              explanation:
                "remove(2) removes the element at index 2, which is 8. The element at index 3 (value 2) shifts left to index 2. The remaining list is [5, 3, 2].",
              skill: "2.D",
            },
            {
              id: "4-4-mcq5",
              question: "Which loop correctly removes all elements equal to 0 from an ArrayList<Integer>?",
              options: [
                { id: "A", text: "for (int i = 0; i < list.size(); i++) { if (list.get(i) == 0) list.remove(i); }" },
                { id: "B", text: "for (int i = list.size()-1; i >= 0; i--) { if (list.get(i) == 0) list.remove(i); }" },
                { id: "C", text: "for (int n : list) { if (n == 0) list.remove(n); }" },
                { id: "D", text: "for (int i = 0; i < list.size()-1; i++) { if (list.get(i) == 0) list.remove(i); }" },
              ],
              correctId: "B",
              explanation:
                "Backward traversal is safe for removal because removing index i only affects indices at i and above — indices below i (already visited) are unaffected. Forward traversal (A) skips elements after a removal. For-each (C) throws ConcurrentModificationException when you modify the list while iterating it.",
              skill: "2.D",
            },
          ],
        },
        {
          id: "4-5",
          slug: "2d-arrays",
          title: "2D Arrays",
          cedTopics: ["4.11", "4.12", "4.13"],
          description:
            "2D array creation, row/column access, row-major and column-major traversal, and 2D algorithms.",
          objectives: [
            "Create a 2D array with new int[rows][cols] and with an initializer list",
            "Access elements with grid[row][col]",
            "Use grid.length for row count and grid[0].length for column count",
            "Traverse a 2D array in row-major and column-major order",
            "Implement sum, max, and count algorithms on a 2D array",
          ],
          codeExamples: [
            {
              id: "4-5-ex1",
              title: "2D Array Creation and Element Access",
              code: `// Create with dimensions (all zeros)
int[][] grid = new int[3][4]; // 3 rows, 4 columns

// Create with initializer list
int[][] matrix = {
    {1, 2, 3},   // row 0
    {4, 5, 6},   // row 1
    {7, 8, 9}    // row 2
};

// Access: grid[row][col]
System.out.println(matrix[0][0]); // 1 — top-left
System.out.println(matrix[1][2]); // 6 — row 1, col 2
System.out.println(matrix[2][1]); // 8 — row 2, col 1

// Dimensions
System.out.println(matrix.length);    // 3 — number of rows
System.out.println(matrix[0].length); // 3 — number of columns
// matrix[r].length gives cols for row r (use for non-rectangular arrays)

// Modify an element
matrix[0][0] = 99;
System.out.println(matrix[0][0]); // 99`,
              explanation:
                "A 2D array is an array of arrays. grid[r][c] accesses row r, column c. grid.length gives the number of rows; grid[0].length gives the number of columns. Both dimensions are zero-indexed.",
            },
            {
              id: "4-5-ex2",
              title: "Row-Major and Column-Major Traversal",
              code: `int[][] grid = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Row-major traversal — outer loop over rows, inner over columns
System.out.println("Row-major:");
for (int r = 0; r < grid.length; r++) {
    for (int c = 0; c < grid[r].length; c++) {
        System.out.print(grid[r][c] + " ");
    }
    System.out.println();
}
// 1 2 3
// 4 5 6
// 7 8 9

// Enhanced for-each (row-major, read-only)
for (int[] row : grid) {
    for (int val : row) {
        System.out.print(val + " ");
    }
}

// Column-major traversal — outer loop over columns, inner over rows
System.out.println("Column-major:");
for (int c = 0; c < grid[0].length; c++) {
    for (int r = 0; r < grid.length; r++) {
        System.out.print(grid[r][c] + " ");
    }
}
// 1 4 7 2 5 8 3 6 9`,
              explanation:
                "Row-major (outer = rows, inner = columns) is the standard order. Column-major (outer = columns, inner = rows) visits elements column by column. The for-each version uses int[] row as the loop variable to represent each row array.",
            },
            {
              id: "4-5-ex3",
              title: "2D Array Algorithms: Sum, Max, Count",
              code: `int[][] grid = {
    {3, 7, 1},
    {9, 2, 5},
    {4, 8, 6}
};

// Sum all elements
int total = 0;
for (int[] row : grid) {
    for (int val : row) {
        total += val;
    }
}
System.out.println("Sum: " + total); // 45

// Maximum — initialize to first element, not 0
int max = grid[0][0];
for (int[] row : grid) {
    for (int val : row) {
        if (val > max) max = val;
    }
}
System.out.println("Max: " + max); // 9

// Count elements above a threshold
int count = 0;
for (int[] row : grid) {
    for (int val : row) {
        if (val > 5) count++;
    }
}
System.out.println("Count > 5: " + count); // 4  (7, 9, 8, 6)`,
              explanation:
                "2D array algorithms follow the same patterns as 1D algorithms but with nested loops. The outer loop handles rows; the inner loop handles columns within each row. Always initialize max to grid[0][0], not 0.",
            },
          ],
          conceptChecks: [
            {
              id: "4-5-cc1",
              prompt: "Given: int[][] m = {{1,2,3},{4,5,6},{7,8,9}}; — what is the value of m[2][0]? What is m.length and m[0].length?",
              answer: "m[2][0] = 7 (row 2, column 0 — the first element of the last row). m.length = 3 (three rows). m[0].length = 3 (three columns in row 0).",
              hint: "First index is row, second is column. Both are zero-based.",
            },
            {
              id: "4-5-cc2",
              prompt: "What is the output of the column-major traversal below?",
              code: `int[][] grid = {{1, 2}, {3, 4}, {5, 6}};
for (int c = 0; c < grid[0].length; c++) {
    for (int r = 0; r < grid.length; r++) {
        System.out.print(grid[r][c] + " ");
    }
}`,
              answer: "1 3 5 2 4 6. The outer loop goes through columns 0 and 1. For column 0: rows 0,1,2 give values 1, 3, 5. For column 1: rows 0,1,2 give values 2, 4, 6.",
              hint: "Column-major: outer loop = columns, inner = rows.",
            },
            {
              id: "4-5-cc3",
              prompt: "A 2D array has 4 rows and 6 columns. How many total elements does it contain, and what is the index of the last element?",
              answer: "4 × 6 = 24 total elements. The last element is at grid[3][5] — row index 3 (last of 4) and column index 5 (last of 6), using zero-based indexing.",
            },
          ],
          mcqs: [
            {
              id: "4-5-mcq1",
              question: "int[][] grid = new int[5][3]; — what does grid.length return?",
              options: [
                { id: "A", text: "3" },
                { id: "B", text: "5" },
                { id: "C", text: "15" },
                { id: "D", text: "8" },
              ],
              correctId: "B",
              explanation:
                "grid.length returns the number of rows, which is the first dimension: 5. To get the number of columns, use grid[0].length, which returns 3.",
              skill: "2.D",
            },
            {
              id: "4-5-mcq2",
              question: "What value is stored at index [1][2] in the following 2D array?",
              code: `int[][] m = {{10, 20, 30},
              {40, 50, 60},
              {70, 80, 90}};`,
              options: [
                { id: "A", text: "30" },
                { id: "B", text: "50" },
                { id: "C", text: "60" },
                { id: "D", text: "80" },
              ],
              correctId: "C",
              explanation:
                "m[1][2] means row 1, column 2. Row 1 is {40, 50, 60}. Column 2 of that row is 60.",
              skill: "2.D",
            },
            {
              id: "4-5-mcq3",
              question: "Which loop traverses a 2D array in column-major order?",
              options: [
                { id: "A", text: "for (int r = 0; r < grid.length; r++) for (int c = 0; c < grid[r].length; c++)" },
                { id: "B", text: "for (int[] row : grid) for (int val : row)" },
                { id: "C", text: "for (int c = 0; c < grid[0].length; c++) for (int r = 0; r < grid.length; r++)" },
                { id: "D", text: "for (int r = grid.length-1; r >= 0; r--) for (int c = 0; c < grid[r].length; c++)" },
              ],
              correctId: "C",
              explanation:
                "Column-major order means the outer loop iterates over columns and the inner loop iterates over rows for that column. Options A and B are row-major; D is reverse row-major.",
              skill: "2.D",
            },
            {
              id: "4-5-mcq4",
              question: "What is the sum of all elements in the array {{2, 4}, {6, 8}, {1, 3}}?",
              options: [
                { id: "A", text: "20" },
                { id: "B", text: "24" },
                { id: "C", text: "18" },
                { id: "D", text: "28" },
              ],
              correctId: "B",
              explanation:
                "2 + 4 = 6, 6 + 8 = 14, 1 + 3 = 4. Total = 6 + 14 + 4 = 24.",
              skill: "2.D",
            },
          ],
        },
        {
          id: "4-6",
          slug: "searching-sorting",
          title: "Searching & Sorting Algorithms",
          cedTopics: ["4.14", "4.15"],
          description:
            "Linear search, selection sort, and insertion sort — the only three required algorithms.",
          objectives: [
            "Implement and trace linear search on arrays and ArrayLists",
            "Explain that linear search works on unsorted data",
            "Implement and trace selection sort (find min, swap into position)",
            "Implement and trace insertion sort (shift elements to insert)",
            "Compare the performance of linear search, selection sort, and insertion sort",
          ],
          codeExamples: [
            {
              id: "4-6-ex1",
              title: "Linear Search",
              code: `// Linear search — checks each element in order
// Works on ANY array (sorted or unsorted)
// Returns the index of target, or -1 if not found

public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;          // found — return index immediately
        }
    }
    return -1;                 // not found
}

// Example:
int[] data = {5, 3, 9, 1, 7};
System.out.println(linearSearch(data, 9)); // 2 (index of 9)
System.out.println(linearSearch(data, 4)); // -1 (not found)

// Worst case: target is last element or not present — checks ALL n elements
// Best case: target is first element — checks 1 element
// Average: checks n/2 elements — O(n) overall`,
              explanation:
                "Linear search checks each element one at a time from the beginning. It works on unsorted data, which makes it universally applicable. The downside is O(n) time — for 1,000,000 elements, it may check all 1,000,000. Return -1 (not an index) to signal 'not found'.",
            },
            {
              id: "4-6-ex2",
              title: "Selection Sort",
              code: `// Selection sort — repeatedly select the minimum and swap it into place
// After pass i, arr[0..i] is sorted

public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        // Find index of minimum in arr[i..end]
        int minIndex = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Swap arr[i] with arr[minIndex]
        int temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}

// Trace on {5, 1, 4, 2, 3}:
// Pass 0: min=1 at idx 1 → swap with idx 0 → {1, 5, 4, 2, 3}
// Pass 1: min=2 at idx 3 → swap with idx 1 → {1, 2, 4, 5, 3}
// Pass 2: min=3 at idx 4 → swap with idx 2 → {1, 2, 3, 5, 4}
// Pass 3: min=4 at idx 4 → swap with idx 3 → {1, 2, 3, 4, 5}`,
              explanation:
                "Selection sort divides the array into a sorted left portion and an unsorted right portion. Each pass finds the smallest element in the unsorted portion and swaps it to the end of the sorted portion. It always makes exactly n-1 passes regardless of input order — O(n²).",
            },
            {
              id: "4-6-ex3",
              title: "Insertion Sort",
              code: `// Insertion sort — take next element, insert into correct position in sorted portion
// Efficient for nearly-sorted arrays; same O(n²) worst case as selection sort

public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];   // the element to insert
        int j = i - 1;
        // Shift elements > key one position to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;  // insert key in its correct position
    }
}

// Trace on {5, 1, 4, 2}:
// i=1: key=1, shift 5 right → {5, 5, 4, 2}, insert 1 → {1, 5, 4, 2}
// i=2: key=4, shift 5 right → {1, 5, 5, 2}, insert 4 → {1, 4, 5, 2}
// i=3: key=2, shift 5,4 right → {1, 4, 4, 5}, insert 2 → {1, 2, 4, 5}`,
              explanation:
                "Insertion sort builds the sorted portion from left to right. For each new element, it shifts larger elements right to make room, then drops the element into position. Best case O(n) when already sorted (no shifts needed); worst case O(n²) for reverse-sorted input.",
            },
          ],
          conceptChecks: [
            {
              id: "4-6-cc1",
              prompt: "What does linearSearch({3, 7, 2, 9, 5}, 9) return, and how many comparisons does it make?",
              answer: "Returns 3 (the index of 9). It makes 4 comparisons: arr[0]=3 (no), arr[1]=7 (no), arr[2]=2 (no), arr[3]=9 (yes, return 3). Linear search stops as soon as it finds the target.",
              hint: "Start at index 0 and count comparisons until you find the target.",
            },
            {
              id: "4-6-cc2",
              prompt: "After the first pass of selection sort on {8, 3, 6, 1, 5}, what does the array look like?",
              answer: "{1, 3, 6, 8, 5}. The first pass scans all 5 elements to find the minimum (1 at index 3), then swaps it with arr[0] (the value 8). The sorted portion is now just {1}.",
              hint: "Pass 0: find the minimum of the entire array, swap it with arr[0].",
            },
            {
              id: "4-6-cc3",
              prompt: "During insertion sort on {2, 5, 4}, when i=2 and key=4: what elements get shifted right, and where does 4 land?",
              answer: "The value 5 (at index 1) is greater than key=4, so it shifts right: arr[2] = arr[1] = 5. Now j=0, and arr[0]=2 is not greater than 4, so the while loop stops. arr[j+1] = arr[1] = 4. Final array: {2, 4, 5}.",
              hint: "The while loop shifts arr[j] right as long as arr[j] > key.",
            },
          ],
          mcqs: [
            {
              id: "4-6-mcq1",
              question: "Which of the following is true about linear search?",
              options: [
                { id: "A", text: "It requires the array to be sorted before searching" },
                { id: "B", text: "It always finds the element in O(log n) comparisons" },
                { id: "C", text: "It works on both sorted and unsorted arrays" },
                { id: "D", text: "It is always faster than binary search" },
              ],
              correctId: "C",
              explanation:
                "Linear search makes no assumptions about order — it simply checks each element sequentially. This makes it universally applicable but O(n), while binary search is O(log n) but requires sorted data.",
              skill: "2.D",
            },
            {
              id: "4-6-mcq2",
              question: "After the first pass of selection sort on {6, 4, 2, 8, 1}, what is the state of the array?",
              options: [
                { id: "A", text: "{1, 2, 4, 8, 6}" },
                { id: "B", text: "{1, 4, 2, 8, 6}" },
                { id: "C", text: "{6, 4, 2, 1, 8}" },
                { id: "D", text: "{2, 4, 6, 8, 1}" },
              ],
              correctId: "B",
              explanation:
                "Pass 0 scans the entire array for the minimum. The minimum is 1 at index 4. It swaps arr[0]=6 with arr[4]=1, giving {1, 4, 2, 8, 6}. The sorted portion is now just {1}; the rest is still unsorted.",
              skill: "2.D",
            },
            {
              id: "4-6-mcq3",
              question: "What is the key operation performed by insertion sort on each element?",
              options: [
                { id: "A", text: "Find the minimum of the unsorted portion and swap it forward" },
                { id: "B", text: "Compare adjacent pairs and swap if out of order" },
                { id: "C", text: "Shift larger elements right to make room, then insert the element" },
                { id: "D", text: "Divide the array in half and sort each half separately" },
              ],
              correctId: "C",
              explanation:
                "Insertion sort takes each new element (the 'key') and slides larger elements one position to the right until it finds the correct position for the key. Option A describes selection sort; B describes bubble sort; D describes merge sort.",
              skill: "2.D",
            },
            {
              id: "4-6-mcq4",
              question: "An array is nearly sorted with only one element out of place. Which algorithm is most efficient?",
              options: [
                { id: "A", text: "Selection sort — it always finds the minimum quickly" },
                { id: "B", text: "Linear search — it can handle any order" },
                { id: "C", text: "Insertion sort — it runs in near O(n) time on nearly-sorted data" },
                { id: "D", text: "Both selection and insertion sort take the same time on nearly-sorted data" },
              ],
              correctId: "C",
              explanation:
                "Insertion sort's best case is O(n) — when the array is already sorted, the inner while loop never executes. For nearly-sorted data, only a few shifts are needed per element. Selection sort is always O(n²) regardless of input order because it always scans the entire unsorted portion.",
              skill: "2.D",
            },
          ],
        },
        {
          id: "4-7",
          slug: "recursion",
          title: "Recursion (Trace Only)",
          cedTopics: ["4.16", "4.17"],
          description:
            "Tracing recursive methods, base cases, binary search, and merge sort. Writing recursive methods is not required.",
          objectives: [
            "Identify the base case and recursive call in a recursive method",
            "Trace a recursive method call by hand and determine the return value",
            "Explain that each recursive call has its own local variables",
            "Describe binary search and explain why the data must be sorted first",
            "Explain merge sort's divide-and-conquer approach and O(n log n) efficiency",
          ],
          codeExamples: [
            {
              id: "4-7-ex1",
              title: "Anatomy of a Recursive Method",
              code: `// A recursive method calls ITSELF — must have:
//   1. A BASE CASE that stops the recursion
//   2. A RECURSIVE CALL that moves toward the base case

public static int factorial(int n) {
    if (n == 0) return 1;           // BASE CASE: factorial(0) = 1
    return n * factorial(n - 1);    // RECURSIVE CALL: moves toward n=0
}

// Trace: factorial(4)
//   = 4 * factorial(3)
//   = 4 * (3 * factorial(2))
//   = 4 * (3 * (2 * factorial(1)))
//   = 4 * (3 * (2 * (1 * factorial(0))))
//   = 4 * (3 * (2 * (1 * 1)))
//   = 4 * 3 * 2 * 1 * 1
//   = 24

// Each call has its own copy of 'n' — local variables are NOT shared`,
              explanation:
                "Every recursive method must have at least one base case (a condition where it returns directly without calling itself) and at least one recursive call that makes progress toward the base case. Without a base case, recursion never ends and causes a StackOverflowError.",
            },
            {
              id: "4-7-ex2",
              title: "Tracing Binary Search (Recursive)",
              code: `// Binary search — data MUST be sorted first!
// Repeatedly cuts the search space in half → O(log n)

public static int binarySearch(int[] arr, int target, int low, int high) {
    if (low > high) return -1;              // BASE CASE: not found
    int mid = (low + high) / 2;
    if (arr[mid] == target) return mid;     // BASE CASE: found
    else if (arr[mid] > target)
        return binarySearch(arr, target, low, mid - 1);  // search left
    else
        return binarySearch(arr, target, mid + 1, high); // search right
}

// Trace: searching for 7 in {1, 3, 5, 7, 9, 11, 13}
// Call 1: low=0, high=6, mid=3, arr[3]=7 — FOUND, return 3

// Trace: searching for 6 in {1, 3, 5, 7, 9}
// Call 1: low=0, high=4, mid=2, arr[2]=5 < 6 → search right
// Call 2: low=3, high=4, mid=3, arr[3]=7 > 6 → search left
// Call 3: low=3, high=2 → low > high → return -1 (not found)`,
              explanation:
                "Binary search eliminates half the remaining elements on each call, giving O(log n) performance. For 1,000,000 elements, it takes at most 20 comparisons. The requirement: data must already be sorted. On the AP exam you trace binary search — you don't write it from scratch.",
            },
            {
              id: "4-7-ex3",
              title: "Merge Sort: Divide and Conquer",
              code: `// Merge sort — recursively splits the array in half,
// then merges sorted halves back together
// O(n log n) — most efficient sort on the AP exam

// High-level idea (tracing, not writing):
// mergeSort({5, 2, 8, 1, 9, 3})
//   split → mergeSort({5, 2, 8}) and mergeSort({1, 9, 3})
//     split → mergeSort({5, 2}) and mergeSort({8})
//       split → mergeSort({5}) and mergeSort({2})
//         base case: single-element arrays are already sorted
//       merge {5} and {2} → {2, 5}
//     merge {2, 5} and {8} → {2, 5, 8}
//     split → mergeSort({1, 9}) and mergeSort({3})
//       merge {1} and {9} → {1, 9}
//     merge {1, 9} and {3} → {1, 3, 9}
//   merge {2, 5, 8} and {1, 3, 9} → {1, 2, 3, 5, 8, 9}

// Complexity:
//   log(n) levels of splitting
//   n total comparisons per level during merge
//   Total: O(n log n)`,
              explanation:
                "Merge sort is the most efficient sorting algorithm on the AP exam. It divides the array in half recursively until sub-arrays have 1 element (the base case — a 1-element array is always sorted). It then merges pairs of sorted sub-arrays. You only need to trace merge sort, not write it.",
            },
          ],
          conceptChecks: [
            {
              id: "4-7-cc1",
              prompt: "Trace factorial(3) step by step and determine the final return value.",
              code: `public static int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}`,
              answer: "factorial(3) = 3 * factorial(2) = 3 * (2 * factorial(1)) = 3 * (2 * (1 * factorial(0))) = 3 * (2 * (1 * 1)) = 6. Each call reduces n by 1 until the base case n=0 returns 1.",
              hint: "Expand each call one level at a time.",
            },
            {
              id: "4-7-cc2",
              prompt: "What are the two required components of every recursive method, and what happens if the base case is missing?",
              answer: "Every recursive method needs (1) a base case — a condition that returns a value directly without recursing — and (2) a recursive call that makes progress toward the base case. Without a base case, the method calls itself forever, eventually causing a StackOverflowError when the call stack runs out of memory.",
            },
            {
              id: "4-7-cc3",
              prompt: "Binary search is performed on {2, 5, 8, 12, 16, 23, 30} looking for 23. What is mid on the first call, and which half is searched next?",
              answer: "low=0, high=6, mid=(0+6)/2=3. arr[3]=12. Since 23 > 12, the right half is searched: low=4, high=6, mid=5, arr[5]=23 — found at index 5. Binary search makes only 2 comparisons here instead of checking all 7 elements.",
              hint: "mid = (low + high) / 2 (integer division). Compare arr[mid] to target.",
            },
          ],
          mcqs: [
            {
              id: "4-7-mcq1",
              question: "What is a base case in a recursive method?",
              options: [
                { id: "A", text: "The line that calls the method recursively" },
                { id: "B", text: "A condition under which the method returns directly without making a recursive call" },
                { id: "C", text: "The first time the method is called from main" },
                { id: "D", text: "A loop that replaces recursion" },
              ],
              correctId: "B",
              explanation:
                "A base case is a condition where the recursive method returns a value directly, stopping the chain of recursive calls. Without a base case, the method recurses forever and eventually causes a StackOverflowError.",
              skill: "2.D",
            },
            {
              id: "4-7-mcq2",
              question: "What is the value of mystery(4)?",
              code: `public static int mystery(int n) {
    if (n <= 1) return 1;
    return n + mystery(n - 1);
}`,
              options: [
                { id: "A", text: "4" },
                { id: "B", text: "10" },
                { id: "C", text: "24" },
                { id: "D", text: "7" },
              ],
              correctId: "B",
              explanation:
                "mystery(4) = 4 + mystery(3) = 4 + 3 + mystery(2) = 4 + 3 + 2 + mystery(1) = 4 + 3 + 2 + 1 = 10. This method sums all integers from n down to 1.",
              skill: "2.D",
            },
            {
              id: "4-7-mcq3",
              question: "Which precondition is required before performing binary search?",
              options: [
                { id: "A", text: "The array must contain only positive integers" },
                { id: "B", text: "The array must have an odd number of elements" },
                { id: "C", text: "The array must be sorted" },
                { id: "D", text: "The target must be present in the array" },
              ],
              correctId: "C",
              explanation:
                "Binary search works by comparing the target to the middle element and discarding half the array. This only works if the array is sorted — otherwise, discarding a half might eliminate the target. Linear search is used when the data is unsorted.",
              skill: "2.D",
            },
            {
              id: "4-7-mcq4",
              question: "Which statement about merge sort is correct?",
              options: [
                { id: "A", text: "Merge sort is O(n²) in the worst case" },
                { id: "B", text: "Merge sort is O(n log n) and is the most efficient sort on the AP exam" },
                { id: "C", text: "Merge sort works by finding and swapping the minimum element each pass" },
                { id: "D", text: "Writing a merge sort implementation is required on the AP exam" },
              ],
              correctId: "B",
              explanation:
                "Merge sort is O(n log n) — faster than selection sort and insertion sort (both O(n²)). It uses divide-and-conquer: split in half recursively, then merge sorted halves. The AP exam requires you to trace merge sort, not write it.",
              skill: "2.D",
            },
            {
              id: "4-7-mcq5",
              question: "Each recursive call has its own local variables. What does this mean for the variable n in recursive factorial calls?",
              options: [
                { id: "A", text: "All recursive calls share the same n — the last call sets the final value" },
                { id: "B", text: "Each call has its own copy of n; changing it in one call does not affect others" },
                { id: "C", text: "n is a static variable, so all calls read the same value" },
                { id: "D", text: "n is destroyed after the first base case returns" },
              ],
              correctId: "B",
              explanation:
                "Each method call — recursive or not — gets its own stack frame with its own local variables. factorial(4) has n=4, factorial(3) has n=3, etc. These are independent copies. When factorial(3) returns, factorial(4)'s n is still 4.",
              skill: "2.D",
            },
          ],
        },
      ],
    },
  ],
};

// ─── Derived helpers ─────────────────────────────────────────────────────────

/** Flat list of all sub-units in curriculum order, with unit context. */
export const allSubUnits = curriculum.units.flatMap((unit) =>
  unit.subUnits.map((sub) => ({ ...sub, unit }))
);

/** Total number of sub-units across all units. */
export const totalSubUnits = allSubUnits.length;

/**
 * Returns the sub-unit immediately before the given sub-unit in linear order,
 * or null if it is the first.
 */
export function prevSubUnit(subUnitId: string) {
  const idx = allSubUnits.findIndex((s) => s.id === subUnitId);
  return idx > 0 ? allSubUnits[idx - 1] : null;
}

/**
 * Returns the sub-unit immediately after the given sub-unit in linear order,
 * or null if it is the last.
 */
export function nextSubUnit(subUnitId: string) {
  const idx = allSubUnits.findIndex((s) => s.id === subUnitId);
  return idx >= 0 && idx < allSubUnits.length - 1
    ? allSubUnits[idx + 1]
    : null;
}

/** Looks up a unit by its numeric id (1–4). */
export function getUnit(id: number) {
  return curriculum.units.find((u) => u.id === id) ?? null;
}

/** Looks up a sub-unit by its id string (e.g. "1-3"). */
export function getSubUnit(id: string) {
  return allSubUnits.find((s) => s.id === id) ?? null;
}
