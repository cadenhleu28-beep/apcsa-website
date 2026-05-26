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
            "Your first look at how Java runs, what data types it uses, and how to print output to the screen.",
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
                "Every Java program lives inside a class. Think of main as the starting line — Java finds it and runs it first. The difference between println and print is simple: println moves the cursor to a new line after printing, print leaves the cursor right where it stopped. That's why the last two print statements in this example share a line.",
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
                "Three primitive types come up constantly on the exam: int for whole numbers, double for decimals, and boolean for true or false. String looks like a fourth primitive but it isn't — it's an object that stores a memory address pointing to the actual text, not the text itself. That distinction feels minor now but becomes important when you start comparing Strings later.",
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
                "Here's the one that surprises people: when both numbers are ints, Java throws away the decimal. 7 / 2 gives you 3, not 3.5 — no rounding, just truncation. The % operator gives you the remainder after division. Think of it like long division: 7 ÷ 2 = 3 remainder 1, so 7 % 2 is 1. To get a decimal result, at least one number needs to be a double: 7.0 / 2 gives 3.5.",
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
                "When + sits next to a String, Java concatenates instead of adding. The trap is that Java works left to right. So \"Sum: \" + 1 becomes the String \"Sum: 1\", and then \"Sum: 1\" + 2 becomes \"Sum: 12\" — not 3. Wrap the numbers in parentheses to force the addition first: \"Sum: \" + (1 + 2) gives you \"Sum: 3\".",
            },
          ],
          conceptChecks: [
            {
              id: "1-1-cc1",
              prompt: "What does the following code print?",
              code: `System.out.println(17 / 5);
System.out.println(17 % 5);`,
              answer:
                "3\n2\n\nBoth 17 and 5 are ints, so Java uses integer division. 5 goes into 17 three times (5 × 3 = 15), so 17 / 5 = 3. The remainder is 17 − 15 = 2, and that's exactly what % gives you.",
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
                "AB\nCD\n\nprint() leaves the cursor right where it stopped — no new line. So A and B end up on the same line. println() prints B and then moves to a new line, so C and D start fresh together on the next line.",
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
                "2\n2\n\n10 / 4 truncates to 2 — it's not 2.5 because both are ints. Then 10 % 4 asks: how much is left over? 4 × 2 = 8, and 10 − 8 = 2. So the remainder is 2.",
            },
          ],
          mcqs: [
            {
              id: "1-1-mcq1",
              question: "What is the value of x after the following code executes?",
              code: `int x = 15 / 4;`,
              options: [
                { id: "A", text: "3.75" },
                { id: "B", text: "4" },
                { id: "C", text: "3.0" },
                { id: "D", text: "3" },
              ],
              correctId: "D",
              explanation:
                "Neither 15 nor 4 has a decimal point, so Java treats them as ints and uses integer division. 4 goes into 15 three times (4 × 3 = 12) with 3 left over — the result is 3. Java doesn't round. It truncates. If you want 3.75, you'd write 15.0 / 4 or use double variables.",
              skill: "2.B",
            },
            {
              id: "1-1-mcq2",
              question:
                "Which of the following correctly declares a variable to store the value 4.5?",
              options: [
                { id: "A", text: "boolean x = 4.5;" },
                { id: "B", text: "int x = (int) 4.5;" },
                { id: "C", text: "int x = 4.5;" },
                { id: "D", text: "double x = 4.5;" },
              ],
              correctId: "D",
              explanation:
                "4.5 has a decimal, so it needs double — int only holds whole numbers, and int x = 4.5 is a compile error. Option B casts to int first, which truncates 4.5 to 4 and loses the decimal entirely. boolean is for true/false, never numbers.",
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
                'Java works left to right. The first + sees a String on the left ("Score: ") and concatenates: "Score: " + 10 = "Score: 10". Now the second + also has a String on the left, so it concatenates again: "Score: 10" + 5 = "Score: 105". The fix is simple — use parentheses: "Score: " + (10 + 5) forces the addition to happen before the String gets involved.',
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
                "Think of it like long division: how many times does 7 go into 23? Three times (7 × 3 = 21). What's left over? 23 − 21 = 2. That leftover is the remainder, which is what % returns.",
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
                "The right side (a / b) is evaluated first. Both a and b are int, so Java does integer division: 5 / 2 = 2. That 2 is then converted to a double and stored in c, giving 2.0 — not 2.5. The double in the variable type doesn't change how the division was done. By the time c gets involved, the answer is already 2.",
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
            "How variables update over time, and what happens when you convert between number types.",
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
                "Java always evaluates the right side of = completely before storing the result. One thing that trips people up: when you write int b = a, b gets a copy of a's value at that moment — not a link to a. So when a later changes to 99, b doesn't follow along. Primitives copy their value, not their identity.",
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
                "Converting from int to double is automatic — Java does it for you because there's no risk of losing data. Going the other direction (double to int) loses the decimal, so Java makes you be explicit with a cast. Important: casting always truncates toward zero, not toward the nearest integer. -2.9 becomes -2, not -3. That trips a lot of people up.",
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
                "The cast only reaches the very next value or expression in parentheses. So (double)(7 / 2) evaluates 7 / 2 first — which gives 3 as an int — and then casts 3 to 3.0. The decimal was already gone. To get 3.5, cast before the division: (double) 7 / 2 turns 7 into 7.0, and then 7.0 / 2 = 3.5. This is one of the most common exam traps in Unit 1.",
            },
          ],
          conceptChecks: [
            {
              id: "1-2-cc1",
              prompt: "What is the value of result after this code?",
              code: `double result = (double)(9 / 2);`,
              answer:
                "4.0\n\nThe parentheses mean 9 / 2 runs first. Both are ints, so integer division gives 4 — not 4.5. Then (double) 4 converts it to 4.0. By the time the cast runs, the decimal is already gone.",
              hint: "Which happens first — the division or the cast?",
            },
            {
              id: "1-2-cc2",
              prompt: "What does (int)(-3.1) evaluate to?",
              answer:
                "-3\n\nThe cast drops everything after the decimal and moves toward zero — not downward. -3.1 is between -4 and -3, and toward zero is -3. If you said -4, you were thinking of Math.floor() — which always rounds down. A cast does not.",
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
                "16\n\nTrace it step by step: x = 5 + 3 = 8, then x = 8 × 2 = 16.",
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
                "The cast only reaches 3.9 — it turns it into 3. Then 3 + 1 = 4. The + 1 is outside the cast's reach, so it happens after as plain integer addition.",
              skill: "2.B",
            },
            {
              id: "1-2-mcq2",
              question: "Which of the following results in the double value 4.5?",
              options: [
                { id: "A", text: "double r = (double) 9 / 2;" },
                { id: "B", text: "double r = (int) 9.0 / (int) 2.0;" },
                { id: "C", text: "double r = (double)(9 / 2);" },
                { id: "D", text: "double r = 9 / 2;" },
              ],
              correctId: "A",
              explanation:
                "Option A casts 9 before the division, giving 9.0 / 2 = 4.5. Option C puts the cast outside the division — 9 / 2 = 4 first, then cast to 4.0. Option D stores an integer division result in a double — same problem. Option B casts both operands to int, so division is int ÷ int = 4.",
              skill: "2.B",
            },
            {
              id: "1-2-mcq3",
              question: "Which conversion happens automatically (without an explicit cast)?",
              options: [
                { id: "A", text: "int to double" },
                { id: "B", text: "double to boolean" },
                { id: "C", text: "double to int" },
                { id: "D", text: "int to boolean" },
              ],
              correctId: "A",
              explanation:
                "int to double is safe because a double can represent every integer exactly — no information is lost, so Java does it automatically. The others all require explicit casts or are simply invalid: you can't go from double to int without losing the decimal, and int/double to boolean isn't a thing in Java.",
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
                "Casting to int moves toward zero, not downward. -7.8 is between -8 and -7, and toward zero is -7. Math.floor(-7.8) would give -8.0 — but that's floor, not a cast. Know the difference; the exam tests exactly this.",
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
            "Shorthand ways to update a variable, and the tricky distinction between pre- and post-increment.",
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
                "Each compound operator is just a shortcut — x += 5 means exactly the same as x = x + 5. One thing to watch: if the variable is an int, /= still uses integer division. 11 /= 4 stores 2, not 2.75.",
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
                "The difference between n++ and ++n only matters when they're inside a larger expression. Post-increment (n++) means \"use the current value, then add 1.\" Pre-increment (++n) means \"add 1 first, then use the value.\" On a line by itself, they do exactly the same thing. The exam often puts them inside a println, so pay attention to which comes first.",
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
                "21\n\nTrace it step by step: 10 + 3 = 13, then 13 × 2 = 26, then 26 − 5 = 21.",
            },
            {
              id: "1-3-cc2",
              prompt: "What does this code print — two lines?",
              code: `int n = 5;
System.out.println(n++);
System.out.println(n);`,
              answer:
                "5\n6\n\nPost-increment: println gets n's current value (5) first, prints it, and only then does n increase to 6. The second println sees the updated value.",
              hint: "Post-increment: use the value, then increment.",
            },
            {
              id: "1-3-cc3",
              prompt: "What does this code print?",
              code: `int n = 5;
System.out.println(++n);
System.out.println(n);`,
              answer:
                "6\n6\n\nPre-increment: n becomes 6 before println even sees it. Both lines print 6 because the increment happened before the first print.",
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
                "x += 7 unpacks to x = x + 7 — the old value gets 7 added to it, and the result goes back into x. Option A just sets x to 7, ignoring whatever x was before. Option C is an expression but not an assignment — nothing changes. Option D (=+) sets x to +7, which is just 7.",
              skill: "2.B",
            },
            {
              id: "1-3-mcq2",
              question: "What is the value of x after the following code?",
              code: `int x = 17;
x /= 5;`,
              options: [
                { id: "A", text: "3" },
                { id: "B", text: "4" },
                { id: "C", text: "2" },
                { id: "D", text: "3.4" },
              ],
              correctId: "A",
              explanation:
                "x /= 5 expands to x = x / 5 = 17 / 5. x is an int, so integer division truncates: 17 / 5 = 3 (not 3.4). That 3 gets stored back into x.",
              skill: "2.B",
            },
            {
              id: "1-3-mcq3",
              question: "What is printed by the following code?",
              code: `int n = 7;
System.out.println(n--);`,
              options: [
                { id: "A", text: "6" },
                { id: "B", text: "7" },
                { id: "C", text: "8" },
                { id: "D", text: "5" },
              ],
              correctId: "B",
              explanation:
                "Post-decrement means use the value first, then subtract. println gets 7 (n's current value), prints it, and only after that does n drop to 6.",
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
                "x *= 3 gives x = 4 × 3 = 12. Then x %= 5: how many times does 5 go into 12? Twice (5 × 2 = 10). Remainder = 12 − 10 = 2. That's what prints.",
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
            "How to read a method's documentation, write code comments, and understand what a method signature tells you before you call it.",
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
                "The compiler skips every comment completely — they exist only for you and other readers. Single-line (//) comments end when the line ends. Multi-line (/* */) comments can span as many lines as you need. Javadoc comments (/** */) follow a special format that tools can parse to auto-generate documentation pages, like the ones on the official Java API website.",
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
                "A method signature is like a contract — it tells you exactly what to pass in and what you get back, without needing to see the code inside. The return type comes first, then the method name, then the parameters in parentheses. void means the method doesn't hand anything back — it just does something, like printing to the screen.",
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
                "An API is a menu of tools someone else already wrote for you. The import statement is just a shortcut — without it, you'd have to type the full package path every single time. One important detail: java.lang is loaded automatically. You never need to import String, Math, or Integer — Java brings them in for you.",
            },
          ],
          conceptChecks: [
            {
              id: "1-4-cc1",
              prompt: "For this method signature, identify: (a) return type, (b) method name, (c) parameter types.",
              code: `public static String formatScore(int score, double average)`,
              answer:
                "(a) Return type: String — it's the word right before the method name\n(b) Method name: formatScore\n(c) Parameter types: int and double — listed in order inside the parentheses\n\nWhen you call this method, you pass an int and a double in, and you get a String back.",
            },
            {
              id: "1-4-cc2",
              prompt: "What does a return type of void indicate?",
              answer:
                "void means the method doesn't hand anything back. You can't write String result = printGreeting(\"Alice\") because there's no value coming back to store. void methods are all about their side effects — printing output, saving a file, updating state.",
            },
            {
              id: "1-4-cc3",
              prompt: "Which of these lines is a valid Java comment?",
              code: `A: // This explains the logic
B: ## This explains the logic
C: -- This explains the logic
D: ** This explains the logic`,
              answer:
                "A only. Java comments use // for single lines and /* */ for multi-line blocks. The ## style comes from Python and shell scripts, and -- is used in SQL. Neither of those works in Java.",
            },
          ],
          mcqs: [
            {
              id: "1-4-mcq1",
              question: "What is an Application Programming Interface (API)?",
              options: [
                { id: "A", text: "A compiler error that occurs at runtime" },
                { id: "B", text: "A special comment that documents variables" },
                { id: "C", text: "A type of loop used to repeat instructions" },
                { id: "D", text: "A set of pre-built classes and methods that programmers can use" },
              ],
              correctId: "D",
              explanation:
                "An API is the set of classes and methods a library offers for other programmers to use. When you call Math.sqrt() or String.length(), you're using the Java API. You don't need to know how those methods are built internally — the API just tells you what to pass in and what you get back.",
              skill: "1.A",
            },
            {
              id: "1-4-mcq2",
              question: "What is the return type of the following method?",
              code: `public static int countVowels(String s)`,
              options: [
                { id: "A", text: "boolean" },
                { id: "B", text: "String" },
                { id: "C", text: "void" },
                { id: "D", text: "int" },
              ],
              correctId: "D",
              explanation:
                "The return type always sits directly before the method name. Here, int comes right before countVowels — so the method returns an int. String is the type of the input parameter s, not the return type. Easy to mix up if you're reading fast.",
              skill: "1.B",
            },
            {
              id: "1-4-mcq3",
              question: "A programmer writes the following. Which statement is true?",
              code: `/* int x = 5; */
System.out.println(x);`,
              options: [
                { id: "A", text: "0 is printed because x was never initialized" },
                { id: "B", text: "The comment is treated as a string and printed" },
                { id: "C", text: "x is declared and 5 is printed" },
                { id: "D", text: "A compile error occurs because x is not declared" },
              ],
              correctId: "D",
              explanation:
                "Everything inside /* */ is invisible to the compiler — it's as if that line doesn't exist. When the compiler reaches println(x), it searches for a declaration of x and finds nothing. That's a compile error, not a runtime error.",
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
            "How to call methods that belong to the class itself rather than to any specific object.",
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
                "Static methods live on the class itself — you don't need to create an object to use them. Just write ClassName.methodName(arguments) and you're done. Math, Integer, and Double all have useful static methods you'll reach for constantly.",
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
                "Static methods are called on the class (Math.abs(...)), instance methods are called on an object (s.length()). You can't call an instance method on the class name because there's no specific object to operate on — Java doesn't know whose data to use.",
            },
          ],
          conceptChecks: [
            {
              id: "1-5-cc1",
              prompt: "Write the correct call to find the absolute value of -15 using the Math class.",
              answer:
                "Math.abs(-15) — returns 15.\n\nabs is static, so you call it on the class name itself. No object needed.",
            },
            {
              id: "1-5-cc2",
              prompt: "What is the return type and value of Integer.parseInt(\"256\")?",
              answer:
                "Return type: int. Value: 256.\n\nparseInt reads the digits in the String and converts them to an int. If the String has anything that isn't a digit — like \"abc\" or \"2.5\" — it throws a runtime exception.",
            },
          ],
          mcqs: [
            {
              id: "1-5-mcq1",
              question: "Which of the following correctly calls a static method named square that takes one int and returns an int?",
              options: [
                { id: "A", text: "MathUtils m; int r = m.square(4);" },
                { id: "B", text: "int r = square.MathUtils(4);" },
                { id: "C", text: "int r = MathUtils.square(4);" },
                { id: "D", text: "int r = new MathUtils().square(4);" },
              ],
              correctId: "C",
              explanation:
                "Static methods are called on the class: MathUtils.square(4). Option D creates an object first — technically valid but unnecessary for static. Option A declares m but never initializes it, so m.square(4) is a compile error. Option B swaps the class and method names, which isn't valid Java syntax.",
              skill: "2.B",
            },
            {
              id: "1-5-mcq2",
              question: "What is the value returned by Integer.parseInt(\"042\")?",
              options: [
                { id: "A", text: "\"042\"" },
                { id: "B", text: "0" },
                { id: "C", text: "A runtime exception is thrown" },
                { id: "D", text: "42" },
              ],
              correctId: "D",
              explanation:
                "parseInt reads the string as a base-10 number. Leading zeros don't change the value — \"042\" is just 42. An exception would only happen if the String contained letters or symbols.",
              skill: "2.B",
            },
            {
              id: "1-5-mcq3",
              question: "Which of the following is an example of a static method call?",
              options: [
                { id: "A", text: "obj.toString()" },
                { id: "B", text: "str.length()" },
                { id: "C", text: "list.size()" },
                { id: "D", text: "Math.sqrt(16.0)" },
              ],
              correctId: "D",
              explanation:
                "Math.sqrt(16.0) is called on the class name directly — no object variable on the left of the dot. The others (str.length(), list.size(), obj.toString()) all call on specific objects, making them instance method calls.",
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
            "Every Math method on your AP Quick Reference card, including the random number formula you'll use on the exam.",
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
                "All Math methods are static — call them as Math.method(). Nearly all return double, even when the answer is a whole number. Math.pow(2, 10) gives 1024.0, not 1024. Math.abs is the one exception: it matches the type you give it (int in → int out, double in → double out).",
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
                "Math.random() gives you a decimal from 0.0 up to (but not including) 1.0. Multiply by 6 to stretch that to [0.0, 6.0), then cast to int to get 0–5. Add 1 to shift up to 1–6. The general formula — (int)(Math.random() * (max - min + 1)) + min — works for any range you need. Memorize this one; it shows up on the exam.",
            },
          ],
          conceptChecks: [
            {
              id: "1-6-cc1",
              prompt: "What does Math.pow(2, 10) return, and what is its type?",
              answer:
                "1024.0 — type double.\n\nMath.pow always returns double. The result might be a whole number, but the type is still double. Cast it if you need an int: (int) Math.pow(2, 10) gives 1024.",
            },
            {
              id: "1-6-cc2",
              prompt: "What is the range of values produced by this expression?",
              code: `(int)(Math.random() * 6) + 1`,
              answer:
                "1 through 6 inclusive.\n\nMath.random() × 6 gives a decimal in [0.0, 6.0). Casting to int chops off the decimal, leaving 0, 1, 2, 3, 4, or 5. Adding 1 shifts everything up by one: 1, 2, 3, 4, 5, or 6.",
              hint: "Math.random() is in [0.0, 1.0). Multiplying by 6 gives [0.0, 6.0).",
            },
            {
              id: "1-6-cc3",
              prompt: "What does Math.sqrt(144) return?",
              answer:
                "12.0 — type double.\n\nMath.sqrt always returns double, even when the answer is a perfect whole number. √144 = 12, but the return value is 12.0.",
            },
          ],
          mcqs: [
            {
              id: "1-6-mcq1",
              question: "What is the return type and value of Math.sqrt(49)?",
              options: [
                { id: "A", text: "double 7.0" },
                { id: "B", text: "double 49.0" },
                { id: "C", text: "int 49" },
                { id: "D", text: "int 7" },
              ],
              correctId: "A",
              explanation:
                "Math.sqrt always returns double. The math gives you 7, but the type is double — so it's 7.0. To store it as an int, you'd cast: (int) Math.sqrt(49) = 7.",
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
                "You need exactly 10 possible values (1 through 10), so multiply by 10 to get 0–9, then add 1 to shift to 1–10. Option A gives 0–9 (missing the +1). Option B multiplies by 11, giving 0–10 — that's eleven values, not ten. Option D multiplies by 9, giving 1–9 — missing 10.",
              skill: "2.B",
            },
            {
              id: "1-6-mcq3",
              question: "What is the value of the following expression?",
              code: `(int) Math.pow(3, 3)`,
              options: [
                { id: "A", text: "27" },
                { id: "B", text: "27.0" },
                { id: "C", text: "9" },
                { id: "D", text: "9.0" },
              ],
              correctId: "A",
              explanation:
                "Math.pow(3, 3) = 27.0 as a double. The (int) cast strips the decimal and gives you the int 27. Without the cast, the result stays 27.0.",
              skill: "2.B",
            },
            {
              id: "1-6-mcq4",
              question: "A student wants to round 4.6 to the nearest whole integer. Which call is correct?",
              options: [
                { id: "A", text: "Math.ceil(4.6)   → 4" },
                { id: "B", text: "Math.round(4.6)  → 5" },
                { id: "C", text: "Math.abs(4.6)    → 5" },
                { id: "D", text: "Math.floor(4.6)  → 5" },
              ],
              correctId: "B",
              explanation:
                "Math.round does what you'd expect — it rounds 4.6 to 5. Math.floor always goes down (4.6 → 4.0, a double). Math.ceil always goes up (4.6 → 5.0, still a double). Math.abs gives the absolute value — it has nothing to do with rounding.",
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
            "The difference between a class and an object, how reference variables actually work under the hood, and what happens when two variables point to the same thing.",
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
                "Think of a class as a blueprint and an object as a house built from that blueprint. new does two things: it reserves memory for the object, then calls the constructor to set up its initial state. The variable on the left doesn't hold the object itself — it holds a memory address that points to where the object lives.",
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
                "When you write String b = a, you're not copying the object — you're copying the address. Now a and b both point to the same object in memory. That's aliasing. With primitives (like int x, int y), you copy the actual value, so they're completely independent. null means the reference points nowhere — call any method on a null reference and you get a NullPointerException at runtime.",
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
                "Instance methods need an actual object to work on — that's what goes on the left of the dot. The object provides the data the method uses. For String specifically, none of these calls change msg. Strings are immutable: every method returns a brand-new String and leaves the original completely untouched. If you don't save the result, it's gone.",
            },
          ],
          conceptChecks: [
            {
              id: "1-7-cc1",
              prompt: "What value does an uninitialized reference variable have in Java?",
              answer:
                "null.\n\nA reference variable that hasn't been assigned yet holds null — it points to nothing. Try to call a method on it and you get a NullPointerException at runtime. Primitives behave differently: they get default values like 0 or false.",
            },
            {
              id: "1-7-cc2",
              prompt: "What is aliasing? What happens in this code?",
              code: `String x = "cat";
String y = x;
// (assume we could mutate Strings — pretend y.setChar(0, 'b'))
// What would x contain?`,
              answer:
                "Aliasing means two variables hold the same memory address — they point to the same object. If the object were mutable and you changed it through y, x would see the change too, because they're both just pointing to the same place. String is immutable so this doesn't cause a visible issue here, but the same concept applies directly to arrays and ArrayLists, which are mutable.",
            },
            {
              id: "1-7-cc3",
              prompt: "What is the difference between a class and an object?",
              answer:
                "A class is the blueprint. An object is one specific thing built from that blueprint.\n\nString is the class — the definition. \"hello\" is an object — a specific instance of String. You can create a thousand different String objects, all from the same class definition.",
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
                "new does two things: it reserves memory on the heap for the new object, then calls the constructor to set up its initial state. The memory address of that freshly created object is what gets stored in the variable on the left.",
              skill: "1.B",
            },
            {
              id: "1-7-mcq2",
              question: "What does a reference variable store?",
              options: [
                { id: "A", text: "The memory address where the object is stored" },
                { id: "B", text: "The class name of the object" },
                { id: "C", text: "The actual data of the object" },
                { id: "D", text: "A copy of all the object's fields" },
              ],
              correctId: "A",
              explanation:
                "A reference variable holds a memory address — a pointer to where the object lives — not the object's data itself. That's exactly why assigning one reference to another creates aliasing: both variables end up holding the same address, both pointing to the same object.",
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
                "println handles null gracefully — it just prints the word \"null\". A NullPointerException only happens when you try to call a method on null (like s.length() or s.toUpperCase()). Simply passing null to println is fine.",
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
                { id: "A", text: "helloworld" },
                { id: "B", text: "world" },
                { id: "C", text: "hello" },
                { id: "D", text: "null" },
              ],
              correctId: "C",
              explanation:
                "After b = a, both variables point to \"hello\". Then a = \"world\" doesn't change the \"hello\" String — it just changes which object a points to. b still points to \"hello\" because reassigning a has no effect on b. This is different from aliasing on a mutable object, where a change through one variable would be visible through the other.",
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
            "All the String methods on your AP Quick Reference card — and the two common traps: substring's exclusive end index and immutability.",
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
                "String characters are numbered starting at 0, not 1. The trickiest part of substring: the end index is exclusive. substring(3, 7) gives you characters at positions 3, 4, 5, and 6 — not 7. If you forget this, your substring will always be one character too short. indexOf returns -1 (not null, not 0) when the search string isn't found.",
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
                "String objects are immutable — once created, the characters inside can never change. Every String method that looks like it modifies the String actually creates a brand-new one and returns it. If you call s.toUpperCase() but don't save the result, it disappears. To actually \"change\" s, you have to reassign: s = s.toUpperCase().",
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
                "Always use .equals() to compare String content. The == operator compares memory addresses, not characters — two separate String objects can have identical text but different addresses, so == might return false when you'd expect true. compareTo is for ordering: negative if the calling string comes first alphabetically, 0 if equal, positive if it comes after. You don't need the exact number — just the sign.",
            },
          ],
          conceptChecks: [
            {
              id: "1-8-cc1",
              prompt: "What does the following expression return?",
              code: `"programming".substring(3, 7)`,
              answer:
                "\"gram\"\n\nsubstring(3, 7) takes positions 3, 4, 5, 6 — not 7. The end index is always exclusive. Count from zero: p=0, r=1, o=2, g=3, r=4, a=5, m=6. Positions 3 through 6 spell \"gram\".",
              hint: "Start index is inclusive; end index is exclusive.",
            },
            {
              id: "1-8-cc2",
              prompt: "What is printed?",
              code: `String s = "hello";
s.toUpperCase();
System.out.println(s);`,
              answer:
                "hello\n\ntoUpperCase() creates a new String (\"HELLO\") and returns it, but the result is never saved. s isn't reassigned, so s still points to the original \"hello\". To get the uppercase version, you'd write s = s.toUpperCase().",
              hint: "Did the code reassign s?",
            },
            {
              id: "1-8-cc3",
              prompt: "What does \"cat\".compareTo(\"dog\") return — positive, negative, or zero?",
              answer:
                "Negative.\n\n\"cat\" comes before \"dog\" in the dictionary, so it's \"less than\" \"dog\". compareTo returns a negative number when the calling string comes first. You never need the exact number — just know: negative means first, zero means equal, positive means after.",
            },
          ],
          mcqs: [
            {
              id: "1-8-mcq1",
              question: "What is returned by the following expression?",
              code: `"hello".substring(1, 4)`,
              options: [
                { id: "A", text: "\"ell\"" },
                { id: "B", text: "\"ello\"" },
                { id: "C", text: "\"hel\"" },
                { id: "D", text: "\"hell\"" },
              ],
              correctId: "A",
              explanation:
                "Map the indices first: h=0, e=1, l=2, l=3, o=4. substring(1, 4) takes positions 1, 2, and 3 — characters e, l, l. Position 4 is excluded. That spells \"ell\".",
              skill: "2.B",
            },
            {
              id: "1-8-mcq2",
              question: "What does indexOf return if the substring is not found?",
              options: [
                { id: "A", text: "-1" },
                { id: "B", text: "A runtime exception is thrown" },
                { id: "C", text: "0" },
                { id: "D", text: "null" },
              ],
              correctId: "A",
              explanation:
                "indexOf uses -1 as its \"not found\" signal. This is intentional — 0 means \"found at position 0\", and null isn't valid here since indexOf returns int, not a reference. Check for -1 when you need to know whether a substring exists.",
              skill: "2.B",
            },
            {
              id: "1-8-mcq3",
              question: "A student writes the following to check if two Strings are equal. What is the problem?",
              code: `String s1 = "hello";
String s2 = "hello";
if (s1 == s2) { System.out.println("equal"); }`,
              options: [
                { id: "A", text: "Strings cannot be compared in Java" },
                { id: "B", text: "The code will not compile" },
                { id: "C", text: "== always returns true for Strings" },
                { id: "D", text: "== compares memory addresses, not content, and may return false even when content is identical" },
              ],
              correctId: "D",
              explanation:
                "== compares memory addresses, not content. Two String objects can contain the same characters but live at different locations in memory — so == might return false even when the text is identical. Always use .equals() when you care about the actual letters.",
              skill: "2.A",
            },
            {
              id: "1-8-mcq4",
              question: "What is printed by the following code?",
              code: `String s = "Java";
s.toLowerCase();
System.out.println(s.length());`,
              options: [
                { id: "A", text: "A compile error occurs" },
                { id: "B", text: "4" },
                { id: "C", text: "0" },
                { id: "D", text: "\"java\"" },
              ],
              correctId: "B",
              explanation:
                "s.toLowerCase() creates a new \"java\" String but s is never reassigned. Immutability means the original \"Java\" is completely untouched. s.length() is called on the still-unchanged \"Java\", which has 4 characters.",
              skill: "2.B",
            },
            {
              id: "1-8-mcq5",
              question: "What is true about the return value of s1.compareTo(s2) when s1 comes after s2 alphabetically?",
              options: [
                { id: "A", text: "It returns a positive integer" },
                { id: "B", text: "It throws an exception" },
                { id: "C", text: "It returns 0" },
                { id: "D", text: "It returns a negative integer" },
              ],
              correctId: "A",
              explanation:
                "compareTo's sign tells you the order: negative means s1 comes first, zero means equal, positive means s1 comes after. Since s1 is alphabetically after s2, the result is positive. The exact number doesn't matter — only the sign.",
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
        "How Java decides what to do: comparing values, chaining conditions, looping until something changes, and repeating work with nested loops.",
      color: "green",
      icon: "GitBranch",
      subUnits: [
        {
          id: "2-1",
          slug: "boolean-expressions",
          title: "Boolean Expressions",
          cedTopics: ["2.1", "2.2"],
          description:
            "How Java makes decisions: comparing values with relational operators, combining conditions with &&, ||, and !, and the shortcut Java uses to avoid unnecessary evaluation.",
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
                "Every relational operator produces one thing: true or false. Nothing else. You can print the result directly, store it in a boolean variable, or drop it straight into an if or while condition — all three work.",
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
                "Think of && as 'both must pass' and || as 'either one works.' Short-circuit evaluation is Java's safety mechanism: with &&, if the left side is already false, Java doesn't bother checking the right side — the result can't change. This is how the division-by-zero guard in the code above stays safe.",
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
                "De Morgan's Laws give you a recipe for distributing a ! into a compound expression: flip && to || (or vice versa), then negate each part. The AP exam tests this heavily — both recognizing when two expressions are equivalent and writing the transformed version yourself.",
            },
          ],
          conceptChecks: [
            {
              id: "2-1-cc1",
              prompt: "Evaluate this expression. What does it print?",
              code: `System.out.println(!(true && false));`,
              answer:
                "true\n\nWork inside out. true && false = false (both must pass, one doesn't). Then !false = true.",
              hint: "Start with what's inside the parentheses.",
            },
            {
              id: "2-1-cc2",
              prompt: "Using De Morgan's Law, write an equivalent expression for: !(x >= 5 || y == 0)",
              answer:
                "x < 5 && y != 0\n\nTwo moves: flip || to &&, then negate each piece. !(x >= 5) becomes x < 5. !(y == 0) becomes y != 0.",
              hint: "!(a || b) = !a && !b. Apply that, then simplify each negated comparison.",
            },
            {
              id: "2-1-cc3",
              prompt: "Does this code throw an exception? Why or why not?",
              code: `int n = 0;
if (n != 0 && 10 / n > 1) {
    System.out.println("yes");
}`,
              answer:
                "No exception. n != 0 is false, so Java stops right there — short-circuit evaluation means the second condition never runs. The dangerous division by zero is never attempted.",
            },
          ],
          mcqs: [
            {
              id: "2-1-mcq1",
              question: "What is the value of the following expression?",
              code: `(3 > 5) || (10 != 10) || (4 < 8)`,
              options: [
                { id: "A", text: "false" },
                { id: "B", text: "A compile error occurs" },
                { id: "C", text: "A runtime error occurs" },
                { id: "D", text: "true" },
              ],
              correctId: "D",
              explanation:
                "Evaluate left to right: (3 > 5) is false, (10 != 10) is false, (4 < 8) is true. With ||, you only need one true — and you got one.",
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
                "Apply De Morgan's: !(a && b) = !a || !b. Flip && to ||, then negate each part. !(x < 10) is x >= 10. !(y > 5) is y <= 5. Combined: x >= 10 || y <= 5.",
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
                "x is 6. x > 4 is true. x < 4 is false. true && false is false. No number can be both greater than and less than 4 at once — so this && will always be false for any value.",
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
                "With &&, if the left side is already false, the whole thing must be false — nothing the right side says can change that. So Java skips it. The classic use case: (obj != null && obj.method()) — check the object exists before you call anything on it.",
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
            "How Java chooses which code to run: chaining if/else if/else blocks, nesting conditions inside each other, and recognizing when two different-looking conditions mean the same thing.",
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
                "Java reads your conditions from top to bottom and stops at the first one that's true. Once a branch runs, the rest are skipped — even if they'd also be true. If nothing matches, the else catches it. If there's no else and nothing matches, nothing happens.",
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
                "A nested if is just an if inside another if. The inner else belongs to the inner if — not the outer one. The two styles (nested vs. &&) produce identical results, but nesting is clearer when you need separate sub-cases for the inner branch.",
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
                "Two expressions are equivalent if they always produce the same result for every possible input. Testing one or two values isn't enough to prove equivalence — you'd need to verify all inputs. The range check (n >= low && n <= high) comes up constantly on the exam, and you need to know it's the only valid Java way to express it — the chain 1 <= n <= 10 is not valid Java syntax.",
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
                "B\n\nJava checks conditions in order. score >= 90? No. score >= 80? Yes — prints \"B\" and jumps out of the chain. The score >= 70 branch is never even looked at.",
              hint: "Which condition is checked first? Which one does 85 satisfy?",
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
                "medium\ndone\n\nx > 5 is false. x > 1 is true — \"medium\" prints and the chain exits. The last println is outside the if/else entirely, so it always runs.",
            },
            {
              id: "2-2-cc3",
              prompt: "Are these two expressions equivalent for all integer values of n?",
              code: `// Expression A:
!(n >= 5)

// Expression B:
n < 5`,
              answer:
                "Yes — equivalent.\n\n!(n >= 5) means 'n is NOT at least 5,' which is the same as 'n is less than 5.' Test it: n = 4 makes both true; n = 5 makes both false; n = 6 makes both false.",
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
                "x = 15. x > 20? No. x > 10? Yes — prints \"B\" and the chain is done. It doesn't matter that x > 5 is also true; the first match wins.",
              skill: "2.B",
            },
            {
              id: "2-2-mcq2",
              question: "Which of the following is equivalent to !(x < 3 || x > 7)?",
              options: [
                { id: "A", text: "!(x >= 3) && !(x <= 7)" },
                { id: "B", text: "x < 3 && x > 7" },
                { id: "C", text: "x >= 3 || x <= 7" },
                { id: "D", text: "x >= 3 && x <= 7" },
              ],
              correctId: "D",
              explanation:
                "De Morgan's: !(a || b) = !a && !b. Flip || to &&, negate each part. !(x < 3) is x >= 3. !(x > 7) is x <= 7. Result: x >= 3 && x <= 7 — the range check for [3, 7].",
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
                { id: "A", text: "Z" },
                { id: "B", text: "XY" },
                { id: "C", text: "X" },
                { id: "D", text: "Y" },
              ],
              correctId: "D",
              explanation:
                "a > 3 is true, so we enter the outer if. Inside, b > 10 is false — skip the inner if, run the inner else: print \"Y\". The outer else (\"Z\") is never touched.",
              skill: "2.B",
            },
            {
              id: "2-2-mcq4",
              question: "A programmer wants to check if n is between 1 and 100 inclusive. Which expression is correct?",
              options: [
                { id: "A", text: "n >= 1 || n <= 100" },
                { id: "B", text: "n >= 1 && n <= 100" },
                { id: "C", text: "!(n < 1) || !(n > 100)" },
                { id: "D", text: "1 <= n <= 100" },
              ],
              correctId: "B",
              explanation:
                "n >= 1 && n <= 100 is the correct range check — you need && because n must satisfy both bounds at once. Option D (1 <= n <= 100) looks right but doesn't compile in Java. Option A (||) is true for almost any integer — a number just needs to be at least 1 or at most 100, which is nearly everything. Option C has the same problem.",
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
            "How while loops work, what happens if you forget to update the loop variable, and the exact mistake that makes your loop run one time too many or too few.",
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
                "A while loop checks its condition before anything runs. If the condition is false on the very first check, the body is never executed — not even once. The update (i++) is what eventually makes the condition false. Forget it and the loop runs forever.",
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
                "Use a while loop when you don't know up front how many times you need to loop — like 'keep reading input until the user types -1.' The sentinel pattern (stop when you see a special value) is a classic while loop use case. Just make sure something inside the loop will eventually make the condition false.",
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
                "Off-by-one errors are the most common loop bug. Ask yourself: should the last value be included? If yes, use <=. If no, use <. When you're not sure, trace the loop with the first and last value you expect. Does the body run for both? Then you're good.",
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
                "4 times.\n\nTrace it: i starts at 1. Each iteration adds 2, so i goes 1 → 3 → 5 → 7 → 9. The body runs for i = 1, 3, 5, 7. When i reaches 9, the condition 9 <= 8 is false and the loop ends.",
              hint: "Write out the values of i after each iteration.",
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
                "1\n\nx starts at 16. Integer division by 2: 16 → 8 → 4 → 2 → 1. When x = 1, the condition x > 1 is false and the loop stops. x is printed as 1.",
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
                "Off-by-one error. The loop stops when i reaches 10, but i < 10 is false at that point — so 10 is never printed. Change the condition to i <= 10.",
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
                { id: "A", text: "4" },
                { id: "B", text: "5" },
                { id: "C", text: "0" },
                { id: "D", text: "3" },
              ],
              correctId: "A",
              explanation:
                "i starts at 0 and runs as long as i < 4. The body executes for i = 0, 1, 2, 3 — that's four times. When i hits 4, the condition fails and the loop exits.",
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
                { id: "A", text: "14" },
                { id: "B", text: "6" },
                { id: "C", text: "10" },
                { id: "D", text: "15" },
              ],
              correctId: "D",
              explanation:
                "The loop runs for i = 1, 2, 3, 4, 5. Each iteration adds i to sum. Trace: 0 + 1 = 1, then + 2 = 3, then + 3 = 6, then + 4 = 10, then + 5 = 15.",
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
                { id: "A", text: "0" },
                { id: "B", text: "1" },
                { id: "C", text: "100" },
                { id: "D", text: "10" },
              ],
              correctId: "B",
              explanation:
                "Trace the value of n: 100 → 10 → 1. When n = 1, the condition 1 > 1 is false. The loop exits. 1 is printed.",
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
                { id: "A", text: "Change int x = 1 to int x = 0" },
                { id: "B", text: "Remove the loop body" },
                { id: "C", text: "Change x += 2 to x -= 2" },
                { id: "D", text: "Change while (x > 0) to while (x < 0)" },
              ],
              correctId: "C",
              explanation:
                "x starts at 1 and keeps increasing — it will always be positive, so the condition x > 0 is always true. The loop never exits. Changing x += 2 to x -= 2 makes x decrease, which will eventually reach 0 or below and end the loop.",
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
            "How to write a for loop, when to use it instead of while, and the for-each shortcut that reads cleaner but can't modify the collection.",
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
                "A for loop puts all three parts of loop control — start, stop, step — in one line. The initialization runs once at the beginning. The condition is checked before each iteration. The update runs after each body execution. You can omit any of the three parts, but you must keep both semicolons.",
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
                "A for loop and a while loop are interchangeable — every for can be rewritten as a while and vice versa. Prefer for when you know the number of iterations in advance, because keeping init, condition, and update on one line makes it harder to accidentally forget the update.",
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
                "The for-each loop is cleaner when you just need to visit every element — no index bookkeeping, no off-by-one risk. The trade-off: you can't use it to change array elements or know which index you're on. The variable inside the loop (score) is a local copy, not a reference to the original slot. Any changes you make to it disappear. For modifications, use a regular for loop.",
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
                "1 4 7 10\n\ni starts at 1. After each body execution, i jumps up by 3: 1 → 4 → 7 → 10 → 13. All values up to 10 are printed. At i = 13, the condition fails.",
              hint: "Write out i after each update: 1, 4, 7, ...",
            },
            {
              id: "2-4-cc2",
              prompt: "How many times does the loop body execute?",
              code: `for (int i = 10; i > 0; i -= 3) {
    System.out.println("tick");
}`,
              answer:
                "4 times.\n\ni starts at 10 and drops by 3 each iteration: 10, 7, 4, 1. All four pass the condition i > 0. At i = -2, the condition fails and the loop ends.",
            },
            {
              id: "2-4-cc3",
              prompt: "What is wrong with this code if the goal is to double every element of the array?",
              code: `int[] nums = {1, 2, 3, 4};
for (int n : nums) {
    n *= 2;
}`,
              answer:
                "The for-each variable n is a copy of the array element, not a reference to the original slot. Doubling n just changes the copy — the original array is untouched. To actually modify the array, you need the index: use a regular for loop and write nums[i] *= 2.",
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
                "i starts at 2 and steps by 2: 2, 4, 6, 8. At i = 10, the condition i <= 8 fails. So exactly 2, 4, 6, 8 are printed.",
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
                { id: "A", text: "6" },
                { id: "B", text: "10" },
                { id: "C", text: "5" },
                { id: "D", text: "4" },
              ],
              correctId: "C",
              explanation:
                "The outer loop runs 10 times (i = 0 through 9). But System.out.println only fires when i % 2 == 0 — that is, when i is even: 0, 2, 4, 6, 8. That's 5 prints.",
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
                { id: "A", text: "for (int i = 1; i <= 20; i++) { count++; }" },
                { id: "B", text: "for (int i = 1; i < 20; i += 4) { count++; }" },
                { id: "C", text: "for (int i = 1; i <= 20; i += 4) { count++; }" },
                { id: "D", text: "for (int i = 0; i <= 20; i += 4) { count++; }" },
              ],
              correctId: "C",
              explanation:
                "Match all three parts: start at i = 1, run while i <= 20, step by i += 4. Option C mirrors all three exactly. Option B uses i < 20 (wrong bound), Option D starts at i = 0 (wrong init), Option A uses i++ (wrong step).",
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
            "The loop-based algorithms the AP exam tests directly: checking divisibility, pulling individual digits out of a number, finding min and max, computing averages without losing the decimal, and walking through Strings character by character.",
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
                "n % 10 is the ones digit — always. n / 10 drops the ones digit (integer division). Put them in a loop and you peel off one digit per iteration, right to left. To check divisibility: n % d == 0 means 'n divides evenly by d.'",
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
                "Always start min and max at scores[0] — the actual first element. If you initialize to 0 and all values are negative, 0 will look like the max forever. For the average, cast before you divide: (double) sum / count. If you write (double)(sum / count) instead, the integer division already happened — you cast the truncated result and the decimal is gone.",
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
                "charAt(i) gives you the character at position i, starting from 0. To reverse a String, iterate from the last index down to 0, building a new String as you go. A palindrome is any string that equals its own reverse — use .equals() to compare, not ==.",
            },
          ],
          conceptChecks: [
            {
              id: "2-5-cc1",
              prompt: "What does n % 10 return when n = 4829? What does n / 10 return?",
              answer:
                "n % 10 = 9 — that's the ones digit of 4829. n / 10 = 482 — integer division drops the ones digit entirely.",
            },
            {
              id: "2-5-cc2",
              prompt: "What is wrong with this average calculation?",
              code: `int sum = 93;
int count = 4;
double avg = (double)(sum / count);`,
              answer:
                "The parentheses make the cast happen too late. Java evaluates sum / count first (both ints) → 93 / 4 = 23, decimal dropped. Then (double) 23 = 23.0. The fix is (double) sum / count, which casts sum to 93.0 before the division.",
              hint: "Look at which part is in parentheses — that's what gets cast.",
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
                "olleh\n\n\"hello\" has 5 characters (indices 0–4). The loop starts at index 4 ('o') and works backward: builds \"o\", \"ol\", \"oll\", \"olle\", \"olleh\".",
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
                "n % 10 is always the ones digit. Think long division: 253 ÷ 10 = 25 remainder 3. The remainder is 3.",
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
                { id: "A", text: "int max = Integer.MAX_VALUE;" },
                { id: "B", text: "int max = arr[0];" },
                { id: "C", text: "int max = Integer.MIN_VALUE;" },
                { id: "D", text: "int max = 0;" },
              ],
              correctId: "B",
              explanation:
                "arr[0] is the right choice because it's guaranteed to be a real element from the array. Starting at 0 fails when all values are negative — 0 is bigger than all of them and stays as 'max' forever. Integer.MIN_VALUE technically works but arr[0] is cleaner. Integer.MAX_VALUE is backwards — you'd use that when looking for a minimum.",
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
                "Scan \"computer\" for 'o' and 'e': c-o-m-p-u-t-e-r. 'o' is at index 1, 'e' is at index 6. Two matches, count = 2.",
              skill: "2.B",
            },
            {
              id: "2-5-mcq4",
              question: "What is the value of avg after this code?",
              code: `int sum = 45;
int count = 6;
double avg = (double) sum / count;`,
              options: [
                { id: "A", text: "7.5" },
                { id: "B", text: "7.2" },
                { id: "C", text: "7" },
                { id: "D", text: "7.0" },
              ],
              correctId: "A",
              explanation:
                "The cast (double) sum turns 45 into 45.0 before the division happens. 45.0 / 6 = 7.5. That's the correct pattern — cast first, then divide.",
              skill: "2.B",
            },
          ],
        },
        {
          id: "2-6",
          slug: "nested-iteration-runtime",
          title: "Nested Iteration & Counting Executions",
          cedTopics: ["2.11", "2.12"],
          description:
            "How nested loops multiply work — and how to count exactly how many times a statement runs as the input size grows.",
          objectives: [
            "Trace nested loops and count total iterations",
            "Determine the total number of times a statement inside nested loops executes",
            "Describe informally how the work of a loop grows as n grows (proportional to n, n × n, etc.)",
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
                "Every time the outer loop runs once, the inner loop runs its full cycle. So the inner body executes outer-count × inner-count times total. Here that's 3 × 4 = 12 stars. That multiplication is how you count nested loop iterations on the exam.",
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
                "When the inner loop's limit depends on the outer variable, you can't just multiply. Here the inner loop runs 1 time on the first pass, 2 on the second, up to n on the last. Total: 1 + 2 + ... + n = n(n+1)/2. For large n, this grows roughly as n² — so the performance cost scales up fast.",
            },
            {
              id: "2-6-ex3",
              title: "How Loop Work Grows with n",
              code: `// One loop through n elements
// Work grows proportionally to n
for (int i = 0; i < n; i++) {
    System.out.println(i);    // runs n times
}

// Nested loop, both over n
// Work grows proportionally to n × n
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        System.out.println(i + "," + j);  // runs n² times
    }
}

// Example: n = 10
//   single loop → ~10 operations
//   nested loop → ~100 operations
// Example: n = 100
//   single loop → ~100 operations
//   nested loop → ~10,000 operations`,
              explanation:
                "One loop over n items: work grows in step with n (double n, double the work). Two loops each over n items: work grows like n × n (double n, do four times the work). That gap matters enormously at scale. On the AP exam you describe the growth informally — 'proportional to n' or 'proportional to n²' — or count exact statement executions. You don't need asymptotic notation.",
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
                "20 times.\n\nOuter loop runs 4 times (i = 0, 1, 2, 3). For each outer iteration, the inner loop runs 5 times. 4 × 5 = 20.",
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
                "1 2 3\n2 3\n3\n\nThe inner loop starts at j = i, not at 1. When i = 1: j runs 1, 2, 3. When i = 2: j runs 2, 3. When i = 3: j runs only 3.",
              hint: "What is j's starting value on each outer iteration?",
            },
            {
              id: "2-6-cc3",
              prompt:
                "How does the number of times println runs grow as n grows? If n doubles, what happens to the work?",
              code: `for (int i = 0; i < n; i++) {
    System.out.println(i * 2);
}`,
              answer:
                "The loop runs n times, so the work grows in step with n (proportional to n). If n doubles, the work doubles. There's no nesting, so the work does not grow like n × n.",
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
                { id: "A", text: "25" },
                { id: "B", text: "3" },
                { id: "C", text: "8" },
                { id: "D", text: "15" },
              ],
              correctId: "D",
              explanation:
                "Outer loop: i = 1, 2, 3, 4, 5 → 5 iterations. Inner loop: j = 1, 2, 3 → 3 iterations per outer. 5 × 3 = 15 total prints.",
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
                { id: "A", text: "n + n" },
                { id: "B", text: "n" },
                { id: "C", text: "2n" },
                { id: "D", text: "n²" },
              ],
              correctId: "D",
              explanation:
                "Both loops are bounded by n. For each of the n outer iterations, the inner body runs n times. Total: n × n = n².",
              skill: "2.B",
            },
            {
              id: "2-6-mcq3",
              question:
                "If n is doubled, the body of which code segment runs roughly four times as often?",
              options: [
                { id: "A", text: "for (int i = 0; i < n; i++) { for (int j = 0; j < n; j++) { sum++; } }" },
                { id: "B", text: "sum = n * (n + 1) / 2;" },
                { id: "C", text: "for (int i = 0; i < n; i++) { sum += i; }" },
                { id: "D", text: "for (int i = 0; i < n; i++) { for (int j = 0; j < 10; j++) { sum++; } }" },
              ],
              correctId: "A",
              explanation:
                "Option A runs n × n times. Doubling n turns n² into (2n)² = 4n² — four times the work. Option C runs n times, so doubling n only doubles the work. Option D's inner loop is fixed at 10, so the total is 10n; doubling n doubles the work. Option B has no loop — the work is constant regardless of n.",
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
                { id: "A", text: "1 2 3 4 5 6" },
                { id: "B", text: "1 1 2 2 3 3" },
                { id: "C", text: "2 4 6" },
                { id: "D", text: "1 2 2 4 3 6" },
              ],
              correctId: "D",
              explanation:
                "Trace each (i, j) pair: (1,1)→1, (1,2)→2, (2,1)→2, (2,2)→4, (3,1)→3, (3,2)→6. Output: 1 2 2 4 3 6.",
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
        "You'll go from using other people's classes to writing your own: defining what an object stores, how it's built, how it behaves, and how you protect its data from outside interference.",
      color: "purple",
      icon: "Code2",
      subUnits: [
        {
          id: "3-1",
          slug: "abstraction-design",
          title: "Abstraction, Design & Ethics",
          cedTopics: ["3.1", "3.2"],
          description:
            "Why hiding details makes code easier to use, how to read a blueprint-style class diagram, and why programs that seem technically correct can still cause real-world harm.",
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
                "The caller doesn't need to know that balance is a double — or that it might change to an int in cents tomorrow. They just call deposit() and withdraw(). That's data abstraction: hiding the storage detail behind a clean public interface so callers never have to care how it works internally.",
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
                "Think of a UML diagram as a blueprint card for a class. Top section: the class name. Middle: what it stores — instance variables with their types. Bottom: what it can do — the methods. The '+' prefix means public (accessible from outside); '-' means private (internal only).",
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
                "The caller just writes isValid() — they don't know or care what's inside. That's procedural abstraction: naming a task and hiding its implementation. You can now test isValid(), calculateGPA(), and printReport() independently. If the grading formula changes, only calculateGPA() needs to change — nothing else is affected.",
            },
          ],
          conceptChecks: [
            {
              id: "3-1-cc1",
              prompt: "A class has a private field 'balance' and a public method 'getBalance()'. Which term describes hiding the storage detail behind the public method?",
              answer: "Data abstraction. The field balance is private — the caller can't see it. They can only interact with the object through getBalance(), deposit(), and withdraw(). If you changed balance from a double to an int stored in cents, no caller would need to update their code.",
            },
            {
              id: "3-1-cc2",
              prompt: "A UML class diagram has three horizontal sections. From top to bottom, what does each section contain?",
              answer: "Top section: the class name. Middle section: the attributes — the data the object stores — with their types. Bottom section: the behaviors — the methods — with return types and parameters. The '+' prefix means public; '-' means private.",
            },
            {
              id: "3-1-cc3",
              prompt: "A developer writes a hiring recommendation algorithm trained on historical data. What is one potential unintended societal effect the CED asks developers to consider?",
              answer: "The algorithm could perpetuate historical bias. If past hiring decisions unfairly excluded certain groups, training on that data teaches the algorithm to do the same — even though no one programmed it to discriminate. The AP CED puts this responsibility on developers: code that runs correctly can still cause real harm.",
            },
          ],
          mcqs: [
            {
              id: "3-1-mcq1",
              question: "Which of the following best describes data abstraction in object-oriented programming?",
              options: [
                { id: "A", text: "Hiding implementation details behind a public interface" },
                { id: "B", text: "Using static variables to share data across objects" },
                { id: "C", text: "Declaring all variables as public for easy access" },
                { id: "D", text: "Breaking a large program into smaller methods" },
              ],
              correctId: "A",
              explanation:
                "Data abstraction hides the 'how' behind the 'what.' The caller doesn't see or care that balance is a private double — they just call getBalance() or deposit(). D describes procedural abstraction (breaking into methods), not data abstraction.",
              skill: "1.B",
            },
            {
              id: "3-1-mcq2",
              question: "In a UML class diagram, the bottom section of the three-part box contains which of the following?",
              options: [
                { id: "A", text: "The static variables" },
                { id: "B", text: "The behaviors (methods)" },
                { id: "C", text: "The attributes (instance variables)" },
                { id: "D", text: "The class name" },
              ],
              correctId: "B",
              explanation:
                "Top to bottom: class name, then attributes (the data it stores), then behaviors (the methods). D common mix-up: students confuse the middle and bottom sections — attributes (variables) go in the middle, and behaviors (methods) go at the bottom.",
              skill: "1.B",
            },
            {
              id: "3-1-mcq3",
              question: "A method named calculateTax() is called inside a payroll program. The caller does not know how the tax is computed internally. This is an example of which concept?",
              options: [
                { id: "A", text: "Aliasing" },
                { id: "B", text: "Procedural abstraction" },
                { id: "C", text: "Static binding" },
                { id: "D", text: "Data abstraction" },
              ],
              correctId: "B",
              explanation:
                "Calling calculateTax() without seeing its implementation is procedural abstraction — the caller treats it as a black box. Data abstraction (D) is about hiding how data is stored, not how a computation works. Those are related but distinct concepts.",
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
                "The system doesn't 'know' it's being unfair — it just reflects its training data. If that data underrepresents certain groups, accuracy for those groups will be lower. That's an unintended societal effect: a technically working system that produces unfair outcomes.",
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
            "How to write the skeleton of any Java class: what to keep private, how constructors set up a new object, and what happens when you don't write a constructor at all.",
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
                "Every Java class follows this skeleton. Private variables protect the data — outside code can't reach them directly. The constructor runs once at new Dog(...) and sets everything up. The this keyword tells Java to use the instance variable (this.name) instead of the parameter (name) when both have the same name. Accessors and mutators give controlled outside access.",
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
                "Java picks the right constructor by matching your arguments to a parameter list. new Dog() matches the no-arg version; new Dog(\"Buddy\", 3) matches the parameterized version. Watch out: the moment you define any constructor, Java stops providing a free default no-arg constructor. If you want both, you have to write both.",
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
                "If you don't write a constructor, Java quietly provides one that sets each instance variable to its type's zero value: int → 0, double → 0.0, boolean → false, reference types like String → null. Local variables inside methods don't get this safety net — you must initialize them yourself before using them.",
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
              answer: "name = \"Buddy\", age = 3. The constructor receives \"Buddy\" and 3 as arguments. It runs this.name = name, storing \"Buddy\" in the instance variable, then this.age = age, storing 3. Both assignments use this. to target the instance variable rather than the local parameter.",
              hint: "Follow each this.field = param assignment one at a time.",
            },
            {
              id: "3-2-cc2",
              prompt: "Why should instance variables be declared private rather than public?",
              answer: "Encapsulation. Making fields private means outside code can't directly read or change them — it must go through the class's methods. This gives the class control: a setter can reject invalid values (like a negative age), and the internal storage can change without breaking any code that uses the class.",
            },
            {
              id: "3-2-cc3",
              prompt: "A class defines a parameterized constructor Dog(String name, int age) but no no-arg constructor. What happens if you write: Dog d = new Dog();?",
              answer: "Compile error. Java only provides the free default no-arg constructor when you haven't written any constructor at all. The moment you define Dog(String name, int age), that free default disappears. If you need new Dog() to work, you must write a no-arg constructor yourself.",
            },
          ],
          mcqs: [
            {
              id: "3-2-mcq1",
              question: "Why are instance variables typically declared private in a Java class?",
              options: [
                { id: "A", text: "To enforce encapsulation and protect internal state" },
                { id: "B", text: "Because Java requires instance variables to be private" },
                { id: "C", text: "So they can be accessed from any class in the program" },
                { id: "D", text: "To allow subclasses to inherit them directly" },
              ],
              correctId: "A",
              explanation:
                "Private fields enforce encapsulation: the only way to read or change them is through the class's own methods. This means the class controls its own state. C is wrong — that describes public fields, not private ones. B is wrong — Java doesn't require it; it's a best practice.",
              skill: "1.B",
            },
            {
              id: "3-2-mcq2",
              question: "Which of the following is a valid constructor definition for a class named Point?",
              options: [
                { id: "A", text: "public Point(int x, int y) { this.x = x; this.y = y; }" },
                { id: "B", text: "private Point(int x, int y) { this.x = x; this.y = y; }" },
                { id: "C", text: "public int Point(int x, int y) { this.x = x; this.y = y; }" },
                { id: "D", text: "public void Point(int x, int y) { this.x = x; this.y = y; }" },
              ],
              correctId: "A",
              explanation:
                "A constructor must match the class name exactly, be public, and have no return type — not even void. Option D adds 'void' (turning it into a regular method). Option B uses 'private' (won't be accessible from outside). Option C adds 'int' (same problem as A — it's now a method, not a constructor).",
              skill: "2.A",
            },
            {
              id: "3-2-mcq3",
              question: "A class declares 'private int count;' but no constructor. What is the initial value of count for a new object?",
              options: [
                { id: "A", text: "null" },
                { id: "B", text: "Undefined — it must be set before use" },
                { id: "C", text: "1" },
                { id: "D", text: "0" },
              ],
              correctId: "D",
              explanation:
                "Java automatically initializes instance variables to their type's zero value: int → 0, double → 0.0, boolean → false, String → null. B (undefined) describes local variables, not instance variables. A (null) is only for reference types — int gets 0, not null.",
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
                "Creating any object requires new ClassName(). Option B is missing new — that's method call syntax, not object creation. Option D is missing the parentheses after Cat. The argument list (empty here) is what tells Java which overloaded constructor to call.",
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
            "How to write methods that read or change an object's data, and Java's tricky rule about what methods can and can't do to variables outside themselves.",
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
                "Accessors (getters) are read-only: they return a value and leave the object unchanged. Mutators (setters) are write-only: they change a value and return void. Computed methods like getArea() don't store width * height anywhere — they calculate it fresh every time from the current field values.",
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
                "When you call addOne(n), Java copies the value 5 and hands that copy to the method. The method works on its own copy of x. Whatever happens to x inside there — n in main() never knows about it. This rule applies to all primitive types: int, double, boolean, char.",
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
                "An object reference is an address — a number that says 'the Dog lives at memory location 1042.' When you pass myDog to a method, Java copies that address. The method has its own copy of the address, but it still points to the same Dog. Calling setName() through the copy reaches the original object. But d = new Dog(...) just replaces the local copy of the address — the caller's variable is untouched. Aliasing is when two variables hold the same address: they look separate but they're both windows into the same object.",
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
              answer: "10. When addOne(n) is called, Java copies the value 10 and gives that copy to the method as x. x++ changes the copy from 10 to 11. n back in the caller is a separate variable — it was never touched. n still holds 10.",
              hint: "Ask: did the method receive n itself, or a copy of n?",
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
              answer: "Rex. Java copies the reference (the address of the Dog object) and gives it to changeName(). The copy still points to the same Dog. When setName(\"Rex\") is called through that copy, it mutates the actual Dog in memory. myDog still holds the same address — and now that Dog's name is Rex.",
              hint: "The copy of the reference still points to the same object.",
            },
            {
              id: "3-3-cc3",
              prompt: "After the code below executes, what does a.getName() return?",
              code: `Dog a = new Dog("Buddy");
Dog b = a;
b.setName("Max");`,
              answer: "Max. The line b = a doesn't create a second Dog — it copies the address stored in a into b. Now both a and b hold the same address, pointing at the same Dog in memory. When b.setName(\"Max\") runs, it changes that one Dog. Since a still points to the same Dog, a.getName() returns \"Max\".",
              hint: "Aliasing: b = a does NOT create a second Dog object.",
            },
          ],
          mcqs: [
            {
              id: "3-3-mcq1",
              question: "Which of the following correctly describes an accessor method?",
              options: [
                { id: "A", text: "A method that returns the value of an instance variable without modifying it" },
                { id: "B", text: "A method that constructs a new object" },
                { id: "C", text: "A void method that prints instance variable values" },
                { id: "D", text: "A method that changes the value of an instance variable" },
              ],
              correctId: "A",
              explanation:
                "An accessor's job is to report — it returns a value and changes nothing. D mutator's job is to update — it changes an instance variable and returns void. D and D describe mutators or other operations, not accessors.",
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
                "doubleIt() receives a copy of 4 — not x itself. n = n * 2 doubles the copy inside the method. When the method ends, that copy disappears. x in main() was never touched, so it still holds 4.",
              skill: "2.B",
            },
            {
              id: "3-3-mcq3",
              question: "A method takes a Dog parameter and calls d.setName(\"Rex\"). After the method returns, what is true about the original Dog object passed in?",
              options: [
                { id: "A", text: "The method creates a new Dog object with name \"Rex\"" },
                { id: "B", text: "The original Dog object is unchanged because references are passed by value" },
                { id: "C", text: "The original Dog object now has name \"Rex\" because the reference copy points to the same object" },
                { id: "D", text: "A NullPointerException is thrown" },
              ],
              correctId: "C",
              explanation:
                "The method gets a copy of the reference — a copy of the address pointing to the Dog. That address still points to the same Dog. Calling setName(\"Rex\") through that copied address mutates the real object. B is a common misconception: references are passed by value, but that doesn't mean the object itself is protected.",
              skill: "2.B",
            },
            {
              id: "3-3-mcq4",
              question: "Dog a = new Dog(\"Spot\"); Dog b = a; b.setName(\"Rex\"); — What does a.getName() return?",
              options: [
                { id: "A", text: "A compile error because two variables cannot reference the same object" },
                { id: "B", text: "\"Spot\" — a is a separate copy of the Dog" },
                { id: "C", text: "null — the assignment b = a sets a to null" },
                { id: "D", text: "\"Rex\" — a and b are aliases for the same object" },
              ],
              correctId: "D",
              explanation:
                "b = a copies the address, not the object. Now a and b both hold the same address — they're aliases. There's only one Dog in memory. When b.setName(\"Rex\") runs, that one Dog changes its name. Reading a.getName() reads from the same Dog, so you get \"Rex\".",
              skill: "2.B",
            },
            {
              id: "3-3-mcq5",
              question: "Which method signature correctly defines a mutator for a private int field named 'score'?",
              options: [
                { id: "A", text: "public int setScore(int score) { return score; }" },
                { id: "B", text: "public int setScore() { return score; }" },
                { id: "C", text: "public void setScore(int score) { this.score = score; }" },
                { id: "D", text: "private void setScore(int score) { this.score = score; }" },
              ],
              correctId: "C",
              explanation:
                "A mutator must be public (callable from outside), void (it changes state, not returns it), and take a parameter matching the field's type. The this.score = score assignment stores the parameter value into the instance variable — without this., the parameter shadows the instance variable and you'd just be assigning score to itself.",
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
            "How static members differ from instance members, why Java throws NullPointerException when you call a method on nothing, and what this actually means inside a class.",
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
                "Think of a static variable as a shared whiteboard for the entire class. Every time you create a new Counter, all of them see the same count. A static method belongs to the class, not to any object — that's why you call it with Counter.getCount() rather than c1.getCount(). Because no specific object is involved, static methods can't access instance variables like id.",
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
                "The parameter x and the instance variable x have the same name — they collide. Inside the constructor, plain x means the parameter. this.x means 'the x that belongs to this object.' Without this., the assignment becomes x = x — assigning the parameter to itself, a no-op. The instance variable never gets set. If the names were different (like int xVal), you wouldn't need this. at all.",
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
                "this(\"Unknown\", 0) is constructor chaining: instead of duplicating initialization code, the no-arg constructor delegates to the parameterized one. It must be the very first line — nothing can come before it. The NullPointerException at the bottom is a runtime error, not a compile error. The compiler sees that d is declared as Dog and allows the method call. But at runtime, d holds null — there's no Dog to call getName() on, so Java throws NullPointerException.",
            },
          ],
          conceptChecks: [
            {
              id: "3-4-cc1",
              prompt: "After executing the code below, what does Counter.getCount() return?",
              code: `Counter a = new Counter();
Counter b = new Counter();
Counter c = new Counter();`,
              answer: "3. The static variable count belongs to the class, not to any individual Counter object. Every call to new Counter() increments the same count. After creating a, b, and c, count has been incremented three times — it equals 3. Create a fourth Counter and it becomes 4.",
              hint: "Static variables belong to the class, not individual objects.",
            },
            {
              id: "3-4-cc2",
              prompt: "In the constructor below, what is the difference between 'x' and 'this.x'?",
              code: `public Point(int x, int y) {
    this.x = x;
    this.y = y;
}`,
              answer: "Plain x is the constructor parameter — the value passed in. this.x is the instance variable stored inside the object. When both have the same name, the parameter shadows the instance variable. Without this., the line x = x assigns the parameter to itself — a no-op. The instance variable stays at its default (0 for int), and you'd have a hard-to-spot bug.",
            },
            {
              id: "3-4-cc3",
              prompt: "What exception is thrown when this code runs, and why?",
              code: `Dog d = null;
System.out.println(d.getName());`,
              answer: "NullPointerException, thrown at runtime. d is declared as type Dog, so the compiler doesn't flag the method call. But when the program runs, d holds null — it's not pointing to any Dog. Java has no object to call getName() on, so it throws NullPointerException. This is one of the most common runtime errors you'll encounter.",
            },
          ],
          mcqs: [
            {
              id: "3-4-mcq1",
              question: "A class declares 'private static int total = 0;'. Which statement about 'total' is correct?",
              options: [
                { id: "A", text: "total is reset to 0 each time a new object is created" },
                { id: "B", text: "Each object has its own copy of total" },
                { id: "C", text: "total is shared across all instances of the class" },
                { id: "D", text: "total can only be accessed inside the constructor" },
              ],
              correctId: "C",
              explanation:
                "Static variables are class-level — one copy, shared by every object. If Counter's constructor increments count, every Counter object sees the updated value. B is wrong: each object having its own copy describes instance variables, not static ones.",
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
                { id: "A", text: "The constructor is missing" },
                { id: "B", text: "Nothing — the code compiles successfully" },
                { id: "C", text: "Line X: a static method cannot access an instance variable" },
                { id: "D", text: "Line X: value must be public to be returned" },
              ],
              correctId: "C",
              explanation:
                "Static methods don't have a this reference — they're not tied to any specific object. value is an instance variable that belongs to a specific object. When getValue() is static, it can't ask 'which object's value?' — there's no object in context. Fix: either remove static from getValue(), or make value static too.",
              skill: "2.A",
            },
            {
              id: "3-4-mcq3",
              question: "What is the purpose of 'this.name = name;' inside a constructor whose parameter is also called 'name'?",
              options: [
                { id: "A", text: "It calls the superclass constructor" },
                { id: "B", text: "It creates a new local variable named 'name'" },
                { id: "C", text: "It disambiguates — this.name refers to the instance variable, name refers to the parameter" },
                { id: "D", text: "It makes the instance variable public" },
              ],
              correctId: "C",
              explanation:
                "Inside the constructor, name by itself refers to the parameter. this.name refers to the instance variable. Without this., the line becomes name = name — the parameter assigned to itself, a no-op. The instance variable is never set, leaving it at null. This bug compiles without error but breaks the object silently.",
              skill: "2.A",
            },
            {
              id: "3-4-mcq4",
              question: "Consider: Dog d = null; String n = d.getName(); — what happens when this code executes?",
              options: [
                { id: "A", text: "A NullPointerException is thrown at runtime" },
                { id: "B", text: "A compile error occurs because d is null" },
                { id: "C", text: "n is assigned null" },
                { id: "D", text: "n is assigned an empty string" },
              ],
              correctId: "A",
              explanation:
                "This compiles fine — the compiler sees that d is declared as Dog and allows the method call. But at runtime, d holds null. There's no Dog in memory. Java throws NullPointerException when you call a method on null. C and D are wrong: null doesn't behave like an empty string and doesn't return null from a method — it crashes.",
              skill: "2.B",
            },
            {
              id: "3-4-mcq5",
              question: "Which of the following correctly uses constructor chaining with this()?",
              options: [
                { id: "A", text: "public Dog() { new Dog(\"Unknown\", 0); }" },
                { id: "B", text: "public Dog() { String s = \"Unknown\"; this(s, 0); }" },
                { id: "C", text: "public Dog() { this(\"Unknown\", 0); }" },
                { id: "D", text: "public Dog() { Dog(\"Unknown\", 0); }" },
              ],
              correctId: "C",
              explanation:
                "this() must be the very first line in the constructor — no statements before it. Option B declares String s before calling this(), which violates this rule and causes a compile error. Options D and A are wrong syntax entirely: you can't call a constructor with the class name alone, and new Dog() inside the constructor creates a separate object rather than chaining.",
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
        "The biggest unit on the exam: storing lists of data in arrays and ArrayLists, reading from files, searching and sorting that data, and tracing code that calls itself.",
      color: "orange",
      icon: "Database",
      subUnits: [
        {
          id: "4-1",
          slug: "data-ethics-datasets",
          title: "Data Ethics & Introduction to Data Sets",
          cedTopics: ["4.1", "4.2"],
          description:
            "How software can cause real harm through poor data practices — and how to recognize a data set that's actually appropriate for the problem being solved.",
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
                "A data set is just structured, organized information. Each row is one record; each column is one attribute. Once a program reads a data set, it can answer questions about it: What's the average? Who scored highest? How many students passed? That's what data analysis is.",
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
                "Every field you store is a liability. If the database is ever breached, every piece of sensitive data gets exposed — and the harm is real. Data minimization means only collect what you actually need for the job. As the developer, you're responsible for making that call.",
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
                "The algorithm isn't malicious — it's just doing what the data told it to do. If the training data reflects historical unfairness, the model learns that unfairness and repeats it. Worse: algorithms make thousands of decisions automatically, and the bias is buried in statistics, not visible in any single decision.",
            },
          ],
          conceptChecks: [
            {
              id: "4-1-cc1",
              prompt: "What is algorithmic bias, and how can incomplete training data cause it?",
              answer: "Algorithmic bias is when an algorithm consistently produces unfair outcomes for certain groups — not because of any intention, but because the training data didn't represent them fairly. The model can't predict well for people it never learned from.",
            },
            {
              id: "4-1-cc2",
              prompt: "A company wants to use a data set of social media posts from teenagers to train a medical diagnosis model for elderly patients. Is this data set appropriate? Why or why not?",
              answer: "No — and it's not even close. The population writing the data (teenagers) has almost nothing in common with the population being diagnosed (elderly patients). Their language, health concerns, and symptoms are completely different. A model trained on this data would make unreliable — and potentially dangerous — predictions.",
            },
            {
              id: "4-1-cc3",
              prompt: "A fitness app collects users' GPS location every 30 seconds, even when the app is closed. What privacy risk does this create?",
              answer: "GPS data collected every 30 seconds builds a detailed picture of someone's life — where they sleep, where they work, where they worship. If that data is stolen, it enables stalking, burglary, and targeted harassment. A fitness app doesn't need continuous background tracking to count steps — collecting it anyway violates data minimization.",
            },
          ],
          mcqs: [
            {
              id: "4-1-mcq1",
              question: "Which of the following best describes algorithmic bias?",
              options: [
                { id: "A", text: "Intentional discrimination programmed into an algorithm by its developers" },
                { id: "B", text: "A bug that causes an algorithm to crash on certain inputs" },
                { id: "C", text: "Systematically unfair outcomes caused by flawed or unrepresentative training data" },
                { id: "D", text: "An algorithm that runs more slowly than expected" },
              ],
              correctId: "C",
              explanation:
                "The key word is 'systematic.' Bias isn't a one-off error — it's consistent unfairness baked into the model by the data it learned from. It doesn't require intentional discrimination from the developer.",
              skill: "5.E",
            },
            {
              id: "4-1-mcq2",
              question: "A hospital stores patient records including diagnosis, treatment history, and Social Security numbers in a database. Which risk does this data collection create?",
              options: [
                { id: "A", text: "Doctors will not be able to access records quickly enough" },
                { id: "B", text: "The hospital may violate copyright law" },
                { id: "C", text: "The database may run out of storage" },
                { id: "D", text: "A data breach could expose sensitive personal and medical information, harming patients" },
              ],
              correctId: "D",
              explanation:
                "Health records and SSNs are high-value targets for attackers. C breach exposes patients to identity theft and discrimination based on medical history. The developer's job is to minimize what's stored and protect what must be.",
              skill: "5.E",
            },
            {
              id: "4-1-mcq3",
              question: "A researcher wants to use a data set of English newspaper articles to build a translation model for Swahili. Which concern is most relevant?",
              options: [
                { id: "A", text: "Newspaper articles are too long to process efficiently" },
                { id: "B", text: "The data set may contain algorithmic bias" },
                { id: "C", text: "The articles may contain copyright-protected material" },
                { id: "D", text: "The data set is inappropriate because it does not represent the target language" },
              ],
              correctId: "D",
              explanation:
                "The data has to match the problem. English articles contain no Swahili — you can't learn to translate a language from data that never uses it. C model is only as good as the data it learned from.",
              skill: "5.E",
            },
            {
              id: "4-1-mcq4",
              question: "Which of the following is NOT a characteristic of a high-quality data set?",
              options: [
                { id: "A", text: "The data set is as large as possible, regardless of relevance" },
                { id: "B", text: "The data is accurate and free from systematic errors" },
                { id: "C", text: "The data is complete — very few missing values" },
                { id: "D", text: "The data is representative of the population being studied" },
              ],
              correctId: "A",
              explanation:
                "More data sounds better, but irrelevant data adds noise, not signal. Quality over quantity: a good data set is accurate, complete, and representative of the actual population being studied. Garbage in, garbage out.",
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
            "Java's built-in list structure: how to create arrays, why indices start at 0, what defaults you get for free, and the loop patterns that power every array algorithm.",
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
                "Java arrays start at index 0, not 1. A 5-element array goes from index 0 to index 4 — the last valid index is always arr.length - 1. One important syntax trap: arr.length has no parentheses. It's a field, not a method call. Go past the last index and you get ArrayIndexOutOfBoundsException at runtime.",
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
                "Use the standard for loop when you need the index or want to modify elements. For-each is cleaner when you're just reading — but you lose the index. For adjacent pairs, stop at arr.length - 1 so arr[i + 1] doesn't go out of bounds.",
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
                "Two traps that catch nearly everyone. First: initialize max to arr[0], not 0 — if all elements are negative, 0 is larger than everything and stays as 'max' permanently. Second: cast before dividing — (double) sum / arr.length, not (double)(sum / arr.length). The reverse uses a temp variable to hold one value during the swap, and stops at the midpoint so you don't swap elements back to where they started.",
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
              answer: "Prints 5 (index 0), then 20 (nums.length - 1 = index 3). The third line throws ArrayIndexOutOfBoundsException. A 4-element array has valid indices 0, 1, 2, 3 — index 4 doesn't exist.",
              hint: "The valid index range is 0 to nums.length - 1.",
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
              answer: "20. The for-each visits every element in order. total builds up: 0 + 2 = 2, + 4 = 6, + 6 = 12, + 8 = 20.",
              hint: "Track the value of total after each element is added.",
            },
            {
              id: "4-2-cc3",
              prompt: "Why is initializing max = 0 instead of max = arr[0] a bug for some inputs?",
              answer: "Try {-5, -3, -8}: no element is greater than 0, so max never gets updated and stays 0 — which isn't even in the array. That's wrong. Starting at arr[0] means max is always a real element from the data. The loop then starts at index 1 since arr[0] is already accounted for.",
            },
          ],
          mcqs: [
            {
              id: "4-2-mcq1",
              question: "int[] arr = new int[6]; — what is arr[0] and arr[5]?",
              options: [
                { id: "A", text: "arr[0] = 0, arr[5] = 0" },
                { id: "B", text: "arr[0] = null, arr[5] = null" },
                { id: "C", text: "arr[0] = undefined, arr[5] = undefined" },
                { id: "D", text: "arr[0] = 1, arr[5] = 6" },
              ],
              correctId: "A",
              explanation:
                "int arrays fill with 0 by default. The array has indices 0 through 5 — both are 0 until you assign something else.",
              skill: "2.D",
            },
            {
              id: "4-2-mcq2",
              question: "int[] arr = {1, 2, 3, 4, 5}; — which line throws ArrayIndexOutOfBoundsException?",
              options: [
                { id: "A", text: "arr[4]" },
                { id: "B", text: "arr[0]" },
                { id: "C", text: "arr[arr.length - 1]" },
                { id: "D", text: "arr[arr.length]" },
              ],
              correctId: "D",
              explanation:
                "arr.length is 5. So arr[arr.length] is arr[5]. But valid indices only go up to 4. That's an off-by-one error — use i < arr.length in your loop condition, never i <= arr.length.",
              skill: "2.D",
            },
            {
              id: "4-2-mcq3",
              question: "Which traversal pattern allows you to modify array elements during the loop?",
              options: [
                { id: "A", text: "Neither pattern allows modification" },
                { id: "B", text: "for (int val : arr)" },
                { id: "C", text: "for (int i = 0; i < arr.length; i++)" },
                { id: "D", text: "Both patterns allow modification" },
              ],
              correctId: "C",
              explanation:
                "The for-each loop gives you a copy of each value in val. Changing val changes the copy, not the array. The indexed for loop gives you arr[i] — a direct reference to the slot in the array. That's the one you need when modifying values.",
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
                "All elements in this array are positive, so starting max at 0 doesn't cause a problem here — every element is greater than 0. The loop correctly finds 9 as the largest. The code is still bad practice for the general case.",
              skill: "2.D",
            },
            {
              id: "4-2-mcq5",
              question: "An array has 8 elements. What is the index of its last element?",
              options: [
                { id: "A", text: "arr.size() - 1" },
                { id: "B", text: "8" },
                { id: "C", text: "7" },
                { id: "D", text: "arr.length" },
              ],
              correctId: "C",
              explanation:
                "Zero-based indexing: 8 elements → indices 0 through 7. Last index = arr.length - 1 = 7. Watch the trap in option A: arr.size() is an ArrayList method. Arrays use arr.length.",
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
            "How to read data from a text file using File and Scanner — including the one gotcha that catches almost everyone: what happens after you call nextInt() and then nextLine().",
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
        File f = new File("scores.txt");       // locate the file
        Scanner scan = new Scanner(f);         // wrap it in a Scanner

        while (scan.hasNext()) {       // true while more tokens remain
            String line = scan.nextLine();
            System.out.println(line);
        }
        scan.close();                  // always close when done
    }
}`,
              explanation:
                "Reading a file takes three steps: create a File object with the filename, wrap it in a Scanner, then loop through tokens with hasNext(). You must add throws IOException to the method signature — the compiler requires it because file operations can fail for reasons outside your code's control. Close the scanner when you're done.",
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
                "Here's the trap: nextInt() reads the number but stops before the newline. The newline is still sitting there in the stream. When you call nextLine() next, it reads up to that newline and returns an empty string — not the next line of data. Fix: add a throwaway nextLine() call right after nextInt() or nextDouble() to flush the leftover newline.",
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
                "String.split(delimiter) chops a string into pieces, returning an array of strings. Every piece is a String — even if the value looks like a number. Use Integer.parseInt() to convert to int, Double.parseDouble() to convert to double. This read-split-parse pattern is how almost every CSV file gets processed.",
            },
          ],
          conceptChecks: [
            {
              id: "4-3-cc1",
              prompt: "A method reads from a file. What keyword must appear in its method signature, and why?",
              answer: "throws IOException must appear in the method signature. File operations can fail for reasons beyond your code's control — wrong filename, no read permission, disk error. Java forces you to declare this so the caller knows it needs to handle the possibility.",
            },
            {
              id: "4-3-cc2",
              prompt: "What does scan.hasNext() return, and when should it be used as a loop condition?",
              answer: "hasNext() returns true when there's at least one more token to read. Use it as your loop condition when you don't know how long the file is — the loop runs until the file ends and stops automatically.",
            },
            {
              id: "4-3-cc3",
              prompt: "A file contains: '5\\nHello'. The code calls nextInt() then nextLine(). What does nextLine() return, and why?",
              code: `Scanner scan = new Scanner(new File("data.txt"));
int n = scan.nextInt();       // reads 5
String s = scan.nextLine();   // what does this return?`,
              answer: "nextLine() returns an empty string \"\". nextInt() read the '5' but left the newline sitting in the stream. nextLine() reads everything up to the next newline — which is immediately, so it returns nothing. Add an extra nextLine() after nextInt() to discard that leftover, then call nextLine() again to get \"Hello\".",
              hint: "What's left in the stream right after nextInt() reads '5'?",
            },
          ],
          mcqs: [
            {
              id: "4-3-mcq1",
              question: "Which import statements are required to read a text file with Scanner in Java?",
              options: [
                { id: "A", text: "import java.util.Scanner; only" },
                { id: "B", text: "import java.io.*; only" },
                { id: "C", text: "No imports needed — Scanner is in java.lang" },
                { id: "D", text: "import java.io.File; and import java.util.Scanner;" },
              ],
              correctId: "D",
              explanation:
                "You need both. java.util.Scanner is for the Scanner class; java.io.File is for the File class. Neither is in java.lang, which is the only package automatically imported.",
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
                "throws IOException is a declaration, not a solution. It says: 'this method might throw an IOException, and I'm not handling it here — the caller will.' Leave it out and the code won't compile.",
              skill: "2.D",
            },
            {
              id: "4-3-mcq3",
              question: "A file has 4 lines. Which method is the safest loop condition for reading every line?",
              options: [
                { id: "A", text: "scan.hasNext()" },
                { id: "B", text: "scan.hasNextLine()" },
                { id: "C", text: "scan.length() > 0" },
                { id: "D", text: "scan.nextLine() != null" },
              ],
              correctId: "B",
              explanation:
                "When using nextLine(), use hasNextLine() as the condition — it directly checks whether another line exists. scan.length() isn't a method on Scanner. Don't try nextLine() != null either — nextLine() never returns null, it throws an exception at end of file.",
              skill: "2.D",
            },
            {
              id: "4-3-mcq4",
              question: "After calling scan.nextInt() to read a number on its own line, the next call to scan.nextLine() returns \"\". Why?",
              options: [
                { id: "A", text: "nextInt() and nextLine() cannot be used together" },
                { id: "B", text: "The file is empty after the integer" },
                { id: "C", text: "nextLine() always returns empty on the first call" },
                { id: "D", text: "nextInt() leaves the newline in the stream; nextLine() consumes it and returns \"\"" },
              ],
              correctId: "D",
              explanation:
                "nextInt() reads the number and stops right before the newline. The stream still has '\\n' sitting at the front. The next nextLine() gobbles up that newline and returns \"\". Fix: add a throwaway nextLine() right after nextInt() to clear the stream.",
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
            "The resizable alternative to arrays — how to add, access, modify, and remove elements, and the one traversal order that keeps you safe when deleting.",
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
                "ArrayList swaps bracket syntax for method calls. Four differences to memorize: size() not length, get(i) not arr[i], set(i, val) to replace, and it resizes automatically. When you call remove(i), every element after index i shifts left by one — that's important when you're removing inside a loop.",
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
                "ArrayList can't hold primitives like int — it needs objects. That's why you write ArrayList<Integer>. Autoboxing is Java's shortcut: when you write nums.add(42), Java automatically wraps 42 into an Integer object. Going the other direction — Integer back to int — is called unboxing, and it's also automatic. Integer.parseInt() and Double.parseDouble() are separate tools for converting file data (which is always strings) into numbers.",
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
                "When you remove while looping forward, you create a skip bug: remove(i) shifts the next element into position i, but then i increments — that element never gets visited. Going backward solves this because you only remove indices you've already passed. Going forward will silently skip elements; backward is safe.",
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
              answer: "remove(0) removes \"A\", shifts \"B\" to index 0 and \"C\" to index 1, and returns \"A\" as its return value. After the call: size is 2, get(0) returns \"B\".",
              hint: "What does the list look like after everything shifts left by one?",
            },
            {
              id: "4-4-cc2",
              prompt: "Why does removing elements while traversing forward with an index loop cause elements to be skipped?",
              answer: "After remove(i), the element that was at i+1 is now at i. But on the next iteration, i increments to i+1 — skipping the element that just moved. Going backward works because removal only shifts elements at higher indices, which you've already visited.",
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
              answer: "20. add(1, 15) inserts 15 at index 1, pushing the rest right: the list becomes [10, 15, 20, 30]. Index 2 is now 20.",
              hint: "Does add(index, obj) replace the element or insert before it?",
            },
          ],
          mcqs: [
            {
              id: "4-4-mcq1",
              question: "Why must ArrayList<int> be written as ArrayList<Integer>?",
              options: [
                { id: "A", text: "Integer is faster than int for list operations" },
                { id: "B", text: "Java requires capital letters for all ArrayList element types" },
                { id: "C", text: "ArrayList does not support numeric types" },
                { id: "D", text: "Generic types require object types, and int is a primitive" },
              ],
              correctId: "D",
              explanation:
                "Java generics only work with object types, not primitives. int is a primitive, so ArrayList<int> won't compile. Use Integer — the wrapper class for int. Autoboxing takes care of the conversion automatically in most situations.",
              skill: "2.D",
            },
            {
              id: "4-4-mcq2",
              question: "After ArrayList<String> list has 3 elements, list.add(1, \"X\") is called. What is list.size()?",
              options: [
                { id: "A", text: "4 — a new element was inserted" },
                { id: "B", text: "This throws an IndexOutOfBoundsException" },
                { id: "C", text: "2 — the element at index 1 was replaced" },
                { id: "D", text: "3 — the size doesn't change on add with index" },
              ],
              correctId: "A",
              explanation:
                "add(index, obj) inserts — it doesn't replace. Everything at that index and beyond shifts right by one, and the list grows. If you want to replace without growing, use set(1, \"X\") instead.",
              skill: "2.D",
            },
            {
              id: "4-4-mcq3",
              question: "What does Integer.parseInt(\"47\") return?",
              options: [
                { id: "A", text: "A NumberFormatException" },
                { id: "B", text: "The String \"47\"" },
                { id: "C", text: "The Integer object 47" },
                { id: "D", text: "The int value 47" },
              ],
              correctId: "D",
              explanation:
                "Integer.parseInt(String) converts a string to a primitive int. File data always comes in as strings, so this is how you turn a text '47' into the number 47 for math.",
              skill: "2.D",
            },
            {
              id: "4-4-mcq4",
              question: "A list has elements [5, 3, 8, 2]. The code calls list.remove(2). What does the list look like after?",
              options: [
                { id: "A", text: "[3, 8, 2]" },
                { id: "B", text: "[5, 3, 8]" },
                { id: "C", text: "[5, 3, 2]" },
                { id: "D", text: "[5, 8, 2]" },
              ],
              correctId: "C",
              explanation:
                "remove(2) removes the element at index 2, which is 8. The value 2 (previously at index 3) shifts left to index 2. Remaining list: [5, 3, 2].",
              skill: "2.D",
            },
            {
              id: "4-4-mcq5",
              question: "Which loop correctly removes all elements equal to 0 from an ArrayList<Integer>?",
              options: [
                { id: "A", text: "for (int n : list) { if (n == 0) list.remove(n); }" },
                { id: "B", text: "for (int i = 0; i < list.size()-1; i++) { if (list.get(i) == 0) list.remove(i); }" },
                { id: "C", text: "for (int i = 0; i < list.size(); i++) { if (list.get(i) == 0) list.remove(i); }" },
                { id: "D", text: "for (int i = list.size()-1; i >= 0; i--) { if (list.get(i) == 0) list.remove(i); }" },
              ],
              correctId: "D",
              explanation:
                "Going backward is the safe removal pattern. When you remove index i, only elements at i and above shift — you've already processed those lower indices, so nothing gets skipped. Forward traversal (C) causes skipping after every removal. For-each (A) throws ConcurrentModificationException the moment you modify the list while iterating it.",
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
            "Storing data in a grid: how to think about rows and columns, the two traversal orders, and how the same sum/max/count algorithms you know from 1D arrays extend to two dimensions.",
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
                "A 2D array is an array whose elements are themselves arrays. Think of it as a table: the first index is the row, the second is the column — both starting at 0. grid.length is the number of rows. grid[0].length is the number of columns.",
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
                "Row-major (outer loop = rows, inner = columns) is the default way to read a 2D array — left to right, top to bottom. Column-major flips the loops: outer = columns, inner = rows. In the for-each version, the outer variable is int[] row because each element of a 2D array is itself an array (one row).",
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
                "Every 1D algorithm you know works in 2D — just add a second loop. The outer loop handles rows; the inner handles columns within each row. The only change from 1D: initialize max to grid[0][0] instead of arr[0].",
            },
          ],
          conceptChecks: [
            {
              id: "4-5-cc1",
              prompt: "Given: int[][] m = {{1,2,3},{4,5,6},{7,8,9}}; — what is the value of m[2][0]? What is m.length and m[0].length?",
              answer: "m[2][0] = 7. Row 2 is {7, 8, 9}, and column 0 of that row is 7. m.length = 3 (three rows). m[0].length = 3 (three columns).",
              hint: "grid[row][column]. Which row is the last row? What's the first element of that row?",
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
              answer: "1 3 5 2 4 6. The outer loop iterates over columns (0 then 1). For column 0, rows 0, 1, 2 give values 1, 3, 5. For column 1, rows 0, 1, 2 give values 2, 4, 6.",
              hint: "The outer loop controls which column you're in.",
            },
            {
              id: "4-5-cc3",
              prompt: "A 2D array has 4 rows and 6 columns. How many total elements does it contain, and what is the index of the last element?",
              answer: "4 rows × 6 columns = 24 total elements. The last element is at grid[3][5]: row 3 is the 4th row (zero-based), column 5 is the 6th column.",
            },
          ],
          mcqs: [
            {
              id: "4-5-mcq1",
              question: "int[][] grid = new int[5][3]; — what does grid.length return?",
              options: [
                { id: "A", text: "15" },
                { id: "B", text: "8" },
                { id: "C", text: "3" },
                { id: "D", text: "5" },
              ],
              correctId: "D",
              explanation:
                "grid.length is always the number of rows — the first dimension. Here that's 5. To get columns, use grid[0].length, which gives 3.",
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
                "Read it as [row][column]. Row 1 is the second row: {40, 50, 60}. Column 2 of that row is 60.",
              skill: "2.D",
            },
            {
              id: "4-5-mcq3",
              question: "Which loop traverses a 2D array in column-major order?",
              options: [
                { id: "A", text: "for (int[] row : grid) for (int val : row)" },
                { id: "B", text: "for (int c = 0; c < grid[0].length; c++) for (int r = 0; r < grid.length; r++)" },
                { id: "C", text: "for (int r = grid.length-1; r >= 0; r--) for (int c = 0; c < grid[r].length; c++)" },
                { id: "D", text: "for (int r = 0; r < grid.length; r++) for (int c = 0; c < grid[r].length; c++)" },
              ],
              correctId: "B",
              explanation:
                "Column-major means outer loop = columns, inner loop = rows. Option B does exactly that: outer iterates c over columns, inner iterates r over rows. Options D and A are row-major; C is reverse row-major.",
              skill: "2.D",
            },
            {
              id: "4-5-mcq4",
              question: "What is the sum of all elements in the array {{2, 4}, {6, 8}, {1, 3}}?",
              options: [
                { id: "A", text: "28" },
                { id: "B", text: "20" },
                { id: "C", text: "24" },
                { id: "D", text: "18" },
              ],
              correctId: "C",
              explanation:
                "Row by row: 2 + 4 = 6. 6 + 8 = 14. 1 + 3 = 4. Grand total: 6 + 14 + 4 = 24.",
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
            "The three algorithms you must know: how to find an element with linear search, how selection sort repeatedly claims the minimum, and how insertion sort builds a sorted section one element at a time.",
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
// Average: checks about n/2 elements`,
              explanation:
                "Linear search checks every element from the start until it finds the target or runs out of array. It works on any data — sorted or not — which is its main advantage. The cost: in the worst case, it checks every element. Return -1 to mean 'not found' — it can never be a valid index.",
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
                "Think of selection sort as moving a wall between the sorted and unsorted parts. Each pass, you scan the entire unsorted portion to find the minimum, then swap it to the boundary. After each pass, the wall moves one step right. Whether the array is already sorted or completely backwards, it always takes exactly n-1 passes — and each pass still scans the entire unsorted portion.",
            },
            {
              id: "4-6-ex3",
              title: "Insertion Sort",
              code: `// Insertion sort — take next element, insert into correct position in sorted portion
// Efficient for nearly-sorted arrays

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
                "Insertion sort is like sorting a hand of cards: pick up the next card and slide it left until it's in the right spot. Each new element (the 'key') compares against elements to its left, shifting them right until it finds where it belongs. If the array is already sorted, nothing shifts — that's the best case. Reverse-sorted data requires the maximum number of shifts — that's the worst case.",
            },
          ],
          conceptChecks: [
            {
              id: "4-6-cc1",
              prompt: "What does linearSearch({3, 7, 2, 9, 5}, 9) return, and how many comparisons does it make?",
              answer: "Returns 3. Linear search starts at index 0 and checks each element: 3 (no), 7 (no), 2 (no), 9 (yes — return index 3). It made 4 comparisons and stopped as soon as it found the target.",
              hint: "Work through the array one element at a time from the beginning.",
            },
            {
              id: "4-6-cc2",
              prompt: "After the first pass of selection sort on {8, 3, 6, 1, 5}, what does the array look like?",
              answer: "{1, 3, 6, 8, 5}. Pass 0 scans all 5 elements: the minimum is 1 at index 3. Swap arr[0] (which is 8) with arr[3] (which is 1). Sorted portion: {1}. Unsorted: {3, 6, 8, 5}.",
              hint: "Find the smallest element in the whole array. Where does it go?",
            },
            {
              id: "4-6-cc3",
              prompt: "During insertion sort on {2, 5, 4}, when i=2 and key=4: what elements get shifted right, and where does 4 land?",
              answer: "key = 4, j starts at index 1. arr[1] = 5 > 4, so 5 shifts right: arr[2] = 5. Now j = 0. arr[0] = 2, which is not greater than 4, so the while loop stops. key (4) goes into arr[j+1] = arr[1]. Final array: {2, 4, 5}.",
              hint: "Keep shifting right as long as the element to the left is bigger than key.",
            },
          ],
          mcqs: [
            {
              id: "4-6-mcq1",
              question: "Which of the following is true about linear search?",
              options: [
                { id: "A", text: "It works on both sorted and unsorted arrays" },
                { id: "B", text: "It is always faster than binary search" },
                { id: "C", text: "It requires the array to be sorted before searching" },
                { id: "D", text: "It always finds the element in a single comparison" },
              ],
              correctId: "A",
              explanation:
                "Linear search has no prerequisites — it works on any array regardless of order. That universality is its strength. The downside: it may have to check every element in the worst case, while binary search can finish in far fewer comparisons (but requires the array to be sorted first).",
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
                "Pass 0: scan all 5 elements for the minimum. The minimum is 1 at index 4. Swap arr[0]=6 with arr[4]=1 → {1, 4, 2, 8, 6}. The sorted portion is just {1}. The rest (4, 2, 8, 6) remains unsorted.",
              skill: "2.D",
            },
            {
              id: "4-6-mcq3",
              question: "What is the key operation performed by insertion sort on each element?",
              options: [
                { id: "A", text: "Shift larger elements right to make room, then insert the element" },
                { id: "B", text: "Divide the array in half and sort each half separately" },
                { id: "C", text: "Find the minimum of the unsorted portion and swap it forward" },
                { id: "D", text: "Compare adjacent pairs and swap if out of order" },
              ],
              correctId: "A",
              explanation:
                "Insertion sort picks up each element as a 'key,' shifts larger elements right to make room, then places the key in the correct spot — that's option C. Option C describes selection sort (find min, swap). Option D is bubble sort. Option B is merge sort.",
              skill: "2.D",
            },
            {
              id: "4-6-mcq4",
              question: "An array is nearly sorted with only one element out of place. Which algorithm is most efficient?",
              options: [
                { id: "A", text: "Selection sort — it always finds the minimum quickly" },
                { id: "B", text: "Linear search — it can handle any order" },
                { id: "C", text: "Insertion sort — when elements are already near their correct positions, the inner shift loop barely runs" },
                { id: "D", text: "Both selection and insertion sort take the same time on nearly-sorted data" },
              ],
              correctId: "C",
              explanation:
                "Insertion sort shines on nearly-sorted data: if an element is already close to its correct position, the inner shift loop barely runs, so each element is placed with very few comparisons. Selection sort doesn't care about input order — it always scans the entire unsorted portion every pass, so it does the same amount of work regardless of how sorted the input already is.",
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
            "How to trace a method that calls itself — you need to read recursion, not write it. That includes factorial, mystery methods, binary search, and the idea behind merge sort.",
          objectives: [
            "Identify the base case and recursive call in a recursive method",
            "Trace a recursive method call by hand and determine the return value",
            "Explain that each recursive call has its own local variables",
            "Describe binary search and explain why the data must be sorted first",
            "Explain merge sort's divide-and-conquer approach",
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
                "Every recursive method needs two things: a base case that stops the chain (returns a value directly), and a recursive call that makes the problem smaller each time. Without a base case, the method calls itself forever until Java runs out of stack space and throws a StackOverflowError. Without the recursive call moving toward the base case, you also never stop.",
            },
            {
              id: "4-7-ex2",
              title: "Tracing Binary Search (Recursive)",
              code: `// Binary search — data MUST be sorted first!
// Repeatedly cuts the search space in half

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
                "Each binary search call cuts the search space in half: look at the middle, discard the half that can't contain the target, repeat. For 1,000,000 elements, it takes at most 20 steps — because 2²⁰ > 1,000,000. The requirement: the array must be sorted first, or the 'discard half' logic falls apart. On the AP exam you trace binary search — you don't write it from scratch.",
            },
            {
              id: "4-7-ex3",
              title: "Merge Sort: Divide and Conquer",
              code: `// Merge sort — recursively splits the array in half,
// then merges sorted halves back together
// The fastest sort you'll see on the AP exam

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

// Performance idea:
//   The array is halved repeatedly until each piece has 1 element
//   Each level of merging walks through all n elements once`,
              explanation:
                "Merge sort's insight: a 1-element array is already sorted. So keep splitting in half until every piece has one element, then merge pieces back together in order. Because the array is split in half each step, the number of split levels grows very slowly — far fewer than n. That's why merge sort runs much faster than selection or insertion sort on large arrays. You only need to trace merge sort on the AP exam — not write it.",
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
              answer: "Expand one call at a time. factorial(3) = 3 × factorial(2). factorial(2) = 2 × factorial(1). factorial(1) = 1 × factorial(0). factorial(0) = 1 (base case). Now collapse back: 1 × 1 = 1, then 2 × 1 = 2, then 3 × 2 = 6.",
              hint: "Write out each call as 'n * factorial(n-1)' until you hit the base case.",
            },
            {
              id: "4-7-cc2",
              prompt: "What are the two required components of every recursive method, and what happens if the base case is missing?",
              answer: "Every recursive method needs (1) a base case: a condition that returns a value without calling itself, stopping the chain; and (2) a recursive call that makes the problem smaller each time, eventually reaching the base case. Without a base case, the method never stops — Java runs out of stack memory and throws a StackOverflowError.",
            },
            {
              id: "4-7-cc3",
              prompt: "Binary search is performed on {2, 5, 8, 12, 16, 23, 30} looking for 23. What is mid on the first call, and which half is searched next?",
              answer: "First call: low=0, high=6, mid=3. arr[3]=12. 23 > 12, so search the right half: low=4, high=6. Second call: mid=5. arr[5]=23 — found. Index 5 is returned. Two comparisons instead of potentially seven.",
              hint: "Compute mid = (low + high) / 2. Is arr[mid] equal to, less than, or greater than the target?",
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
                "A base case is the condition that stops the recursion — when it's true, the method returns immediately without making another call. Without it, the chain never ends and Java throws a StackOverflowError.",
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
                { id: "A", text: "10" },
                { id: "B", text: "24" },
                { id: "C", text: "7" },
                { id: "D", text: "4" },
              ],
              correctId: "A",
              explanation:
                "Trace it: mystery(4) = 4 + mystery(3) = 4 + 3 + mystery(2) = 4 + 3 + 2 + mystery(1). mystery(1): 1 <= 1, return 1. Collapse: 4 + 3 + 2 + 1 = 10. The method sums 1 through n.",
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
                "Binary search's logic depends entirely on the array being sorted. When arr[mid] < target, you know the target must be in the right half — but only because the array is sorted. If it's unsorted, you can't safely discard either half. Use linear search for unsorted data.",
              skill: "2.D",
            },
            {
              id: "4-7-mcq4",
              question: "Which statement about merge sort is correct?",
              options: [
                { id: "A", text: "Merge sort splits the array in half, sorts each half recursively, and merges the sorted halves back together" },
                { id: "B", text: "Merge sort works by finding and swapping the minimum element each pass" },
                { id: "C", text: "Writing a merge sort implementation is required on the AP exam" },
                { id: "D", text: "Merge sort iterates through the array a single time and is always faster than insertion sort" },
              ],
              correctId: "A",
              explanation:
                "Merge sort is a divide-and-conquer algorithm: keep splitting the array in half until each piece has one element (already sorted), then merge the pieces back together in sorted order. Option D misstates the algorithm — merge sort uses recursive splitting, not a single pass. Option B describes selection sort. Option C is incorrect: the CED only requires you to trace merge sort, not write it.",
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
                "Each method call — including recursive ones — gets its own stack frame with its own copy of every local variable. factorial(4) has its own n=4; factorial(3) has its own n=3. They don't share memory. When factorial(3) finishes, factorial(4)'s n is still sitting at 4, untouched.",
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
