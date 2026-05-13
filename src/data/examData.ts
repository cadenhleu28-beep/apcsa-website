import type { ExamMCQ, ExamFRQ } from "../types/exam";

// ─────────────────────────────────────────────────────────────────────────────
// 42 MCQ  —  2025-2026 AP CSA distribution
//   Unit 1 (Using Objects & Methods):    Q1–Q10   (~10 qs, 15–25%)
//   Unit 2 (Selection & Iteration):      Q11–Q22  (~12 qs, 25–35%)
//   Unit 3 (Class Creation):             Q23–Q29  (~7  qs, 10–18%)
//   Unit 4 (Data Collections):           Q30–Q42  (~13 qs, 30–40%)
//
// Question Sets:
//   QS1: Q15 & Q16 share a nested-loop code block
//   QS2: Q37 & Q38 share a 2D-array code block
// ─────────────────────────────────────────────────────────────────────────────

export const examMCQs: ExamMCQ[] = [
  // ── UNIT 1 ──────────────────────────────────────────────────────────────
  {
    id: 1,
    unit: 1,
    cedTopic: "1.5",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int x = 17;
int y = 5;
System.out.println(x / y);
System.out.println(x % y);`,
    options: [
      { id: "A", text: "3\n2" },
      { id: "B", text: "3.4\n2" },
      { id: "C", text: "3\n2.0" },
      { id: "D", text: "3.4\n2.0" },
    ],
    correctId: "A",
    explanation:
      "Integer division truncates: 17 / 5 = 3 (not 3.4). The remainder 17 % 5 = 2. Both x and y are int, so the results stay int.",
    trap: "integer division truncation",
  },
  {
    id: 2,
    unit: 1,
    cedTopic: "1.15",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String s = "APCSA";
System.out.println(s.substring(1, 4));`,
    options: [
      { id: "A", text: '"APCS"' },
      { id: "B", text: '"APC"' },
      { id: "C", text: '"PCSA"' },
      { id: "D", text: '"PCS"' },
    ],
    correctId: "D",
    explanation:
      'substring(1, 4) returns characters from index 1 up to but NOT including index 4: indices 1, 2, 3 → "P", "C", "S" → "PCS". The end index is exclusive.',
    trap: "substring end index is exclusive",
  },
  {
    id: 3,
    unit: 1,
    cedTopic: "1.15",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String word = "Java";
System.out.println(word.length());
System.out.println(word.charAt(2));`,
    options: [
      { id: "A", text: "5\na" },
      { id: "B", text: "4\na" },
      { id: "C", text: "3\nv" },
      { id: "D", text: "4\nv" },
    ],
    correctId: "D",
    explanation:
      '"Java" has 4 characters so length() returns 4. Indices: J=0, a=1, v=2, a=3. charAt(2) returns \'v\'.',
    trap: "zero-based string indexing",
  },
  {
    id: 4,
    unit: 1,
    cedTopic: "1.4",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `double d = 9.99;
int n = (int) d;
System.out.println(n);`,
    options: [
      { id: "A", text: "9.0" },
      { id: "B", text: "10" },
      { id: "C", text: "9.99" },
      { id: "D", text: "9" },
    ],
    correctId: "D",
    explanation:
      "Casting a double to int truncates the decimal portion — it does NOT round. (int)9.99 drops the .99 and yields 9.",
    trap: "casting truncates, does not round",
  },
  {
    id: 5,
    unit: 1,
    cedTopic: "1.6",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int a = 10;
a += 3;
a *= 2;
a -= 5;
System.out.println(a);`,
    options: [
      { id: "A", text: "31" },
      { id: "B", text: "21" },
      { id: "C", text: "26" },
      { id: "D", text: "20" },
    ],
    correctId: "B",
    explanation:
      "Step by step: a=10 → a+=3 → 13 → a*=2 → 26 → a-=5 → 21. Compound operators execute left to right, modifying a each time.",
    trap: "compound operator ordering",
  },
  {
    id: 6,
    unit: 1,
    cedTopic: "1.15",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String s = "computer";
System.out.println(s.indexOf("put"));
System.out.println(s.indexOf("z"));`,
    options: [
      { id: "A", text: "4\n-1" },
      { id: "B", text: "3\n0" },
      { id: "C", text: "3\n-1" },
      { id: "D", text: "2\n-1" },
    ],
    correctId: "C",
    explanation:
      '"computer": c=0,o=1,m=2,p=3,u=4,t=5,e=6,r=7. "put" begins at index 3. indexOf returns -1 when the substring is not found.',
    trap: 'indexOf returns -1 for "not found"',
  },
  {
    id: 7,
    unit: 1,
    cedTopic: "1.11",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `System.out.println(Math.abs(-7));
System.out.println(Math.pow(2, 4));`,
    options: [
      { id: "A", text: "-7\n16.0" },
      { id: "B", text: "7\n16.0" },
      { id: "C", text: "7\n16" },
      { id: "D", text: "7\n8.0" },
    ],
    correctId: "B",
    explanation:
      "Math.abs(-7) = 7. Math.pow returns a double, so 2^4 prints as 16.0, not 16. Math.pow(2, 3) would be 8.0.",
    trap: "Math.pow always returns double",
  },
  {
    id: 8,
    unit: 1,
    cedTopic: "1.3",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int a = 3;
int b = 4;
System.out.println("Sum: " + a + b);
System.out.println(a + b + " is the sum");`,
    options: [
      { id: "A", text: '"Sum: 7"\n"7 is the sum"' },
      { id: "B", text: '"Sum: 34"\n"7 is the sum"' },
      { id: "C", text: '"Sum: 7"\n"34 is the sum"' },
      { id: "D", text: '"Sum: 34"\n"34 is the sum"' },
    ],
    correctId: "B",
    explanation:
      'Line 1: "Sum: " + a evaluates left-to-right → "Sum: 3", then + b → "Sum: 34". Line 2: a + b is evaluated first (both ints) → 7, then + " is the sum" → "7 is the sum".',
    trap: "string concatenation is left-to-right; int+int evaluates before string concat",
  },
  {
    id: 9,
    unit: 1,
    cedTopic: "1.11",
    skill: "4.A",
    question:
      "Consider the following code segment. Which of the following best describes the set of possible values of result?",
    code: `int result = (int)(Math.random() * 10) + 1;`,
    options: [
      { id: "A", text: "Integers from 0 to 10, inclusive" },
      { id: "B", text: "Integers from 0 to 9, inclusive" },
      { id: "C", text: "Integers from 1 to 10, inclusive" },
      { id: "D", text: "Integers from 1 to 11, inclusive" },
    ],
    correctId: "C",
    explanation:
      "Math.random() returns [0.0, 1.0). Multiplied by 10 gives [0.0, 10.0). Casting to int gives 0–9. Adding 1 gives 1–10.",
    trap: "Math.random() upper bound is exclusive",
  },
  {
    id: 10,
    unit: 1,
    cedTopic: "1.14",
    skill: "3.D",
    question:
      "What happens when the following code segment is executed?",
    code: `String s = null;
System.out.println(s.length());`,
    options: [
      { id: "A", text: "Prints 0" },
      { id: "B", text: "Prints null" },
      { id: "C", text: "A NullPointerException is thrown at runtime" },
      { id: "D", text: "A compiler error prevents the code from running" },
    ],
    correctId: "C",
    explanation:
      "Calling a method on a null reference throws a NullPointerException at runtime. The compiler cannot detect this because s is declared as a valid String type.",
    trap: "null reference throws NullPointerException, not a compile error",
  },

  // ── UNIT 2 ──────────────────────────────────────────────────────────────
  {
    id: 11,
    unit: 2,
    cedTopic: "2.1",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int x = 8;
boolean b = (x > 5) && (x % 2 == 0);
System.out.println(b);`,
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "false" },
      { id: "C", text: "true" },
      { id: "D", text: "0" },
    ],
    correctId: "C",
    explanation:
      "x > 5 is true (8 > 5). x % 2 == 0 is true (8 is even). true && true = true.",
    trap: "boolean prints as true/false not 1/0",
  },
  {
    id: 12,
    unit: 2,
    cedTopic: "2.3",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int score = 75;
String grade;
if (score >= 90) grade = "A";
else if (score >= 80) grade = "B";
else if (score >= 70) grade = "C";
else grade = "D";
System.out.println(grade);`,
    options: [
      { id: "A", text: '"C"' },
      { id: "B", text: '"B"' },
      { id: "C", text: '"D"' },
      { id: "D", text: '"A"' },
    ],
    correctId: "A",
    explanation:
      "75 is not >= 90, not >= 80, but IS >= 70, so grade = \"C\". Once a branch executes, the remaining else-if branches are skipped.",
    trap: "only the first matching branch executes",
  },
  {
    id: 13,
    unit: 2,
    cedTopic: "2.6",
    skill: "3.A",
    question:
      "Which of the following expressions is equivalent to !(a > 5 && b < 3)?",
    options: [
      { id: "A", text: "a > 5 || b < 3", isCode: true },
      { id: "B", text: "a <= 5 || b >= 3", isCode: true },
      { id: "C", text: "a <= 5 && b >= 3", isCode: true },
      { id: "D", text: "!(a > 5) && !(b < 3)", isCode: true },
    ],
    correctId: "B",
    explanation:
      "De Morgan's Law: !(P && Q) = !P || !Q. Negating (a > 5) gives (a <= 5). Negating (b < 3) gives (b >= 3). Combined with ||: a <= 5 || b >= 3.",
    trap: "De Morgan's: NOT(A AND B) = NOT A OR NOT B",
  },
  {
    id: 14,
    unit: 2,
    cedTopic: "2.7",
    skill: "3.A",
    question:
      "How many times is the body of the following loop executed?",
    code: `int count = 0;
int n = 1;
while (n <= 32) {
    n *= 2;
    count++;
}
System.out.println(count);`,
    options: [
      { id: "A", text: "4" },
      { id: "B", text: "6" },
      { id: "C", text: "5" },
      { id: "D", text: "32" },
    ],
    correctId: "B",
    explanation:
      "n progresses: 1 → 2 → 4 → 8 → 16 → 32 → 64. The loop runs once for each starting value of n (1, 2, 4, 8, 16, 32) — including when n=32 because 32 ≤ 32 is true. That gives 6 iterations; then n=64 > 32 and the loop exits with count=6.",
    trap: "off-by-one: the loop still runs when n equals the boundary value (32 ≤ 32 is true)",
  },
  {
    id: 15,
    unit: 2,
    cedTopic: "2.11",
    skill: "3.A",
    questionSetId: "qs1",
    questionSetLabel: "Questions 15 and 16 refer to the following code segment.",
    sharedCode: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print(j + " ");
    }
    System.out.println();
}`,
    question: "What is printed as a result of executing the code segment above?",
    options: [
      { id: "A", text: "1 \n2 \n3" },
      { id: "B", text: "1 2 3 \n1 2 \n1" },
      { id: "C", text: "1 \n1 2 \n1 2 3" },
      { id: "D", text: "1 2 3 \n1 2 3 \n1 2 3" },
    ],
    correctId: "C",
    explanation:
      "i=1: inner loop j runs 1 time → prints \"1 \" then newline. i=2: j runs twice → \"1 2 \" then newline. i=3: j runs 3 times → \"1 2 3 \" then newline. The inner loop bound is j <= i.",
    trap: "inner loop bound depends on outer loop variable",
  },
  {
    id: 16,
    unit: 2,
    cedTopic: "2.11",
    skill: "3.A",
    questionSetId: "qs1",
    question:
      "How many total integer values are printed by the code segment above?",
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "6" },
      { id: "C", text: "9" },
      { id: "D", text: "4" },
    ],
    correctId: "B",
    explanation:
      "When i=1, 1 value is printed. When i=2, 2 values. When i=3, 3 values. Total: 1 + 2 + 3 = 6 values.",
    trap: "sum the inner loop iterations: 1+2+3=6",
  },
  {
    id: 17,
    unit: 2,
    cedTopic: "2.8",
    skill: "3.D",
    question:
      "What is the result of executing the following code segment?",
    code: `int[] arr = {4, 8, 2, 6, 1};
int max = arr[0];
for (int i = 1; i <= arr.length; i++) {
    if (arr[i] > max) max = arr[i];
}
System.out.println(max);`,
    options: [
      { id: "A", text: "Prints 8" },
      { id: "B", text: "Prints 6" },
      { id: "C", text: "An ArrayIndexOutOfBoundsException is thrown" },
      { id: "D", text: "Prints 4" },
    ],
    correctId: "C",
    explanation:
      "The condition i <= arr.length allows i to reach 5. Valid indices for a 5-element array are 0–4. Accessing arr[5] throws an ArrayIndexOutOfBoundsException. The correct condition is i < arr.length.",
    trap: "< vs <= with array.length: use < to avoid out-of-bounds",
  },
  {
    id: 18,
    unit: 2,
    cedTopic: "2.8",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int[] nums = {3, 7, 1, 9, 4};
int sum = 0;
for (int n : nums) {
    sum += n;
}
System.out.println(sum);`,
    options: [
      { id: "A", text: "24" },
      { id: "B", text: "23" },
      { id: "C", text: "25" },
      { id: "D", text: "14" },
    ],
    correctId: "A",
    explanation: "3 + 7 + 1 + 9 + 4 = 24. The for-each loop visits every element exactly once.",
    trap: "basic for-each accumulation",
  },
  {
    id: 19,
    unit: 2,
    cedTopic: "2.7",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String s = "hello";
int count = 0;
int i = 0;
while (i < s.length()) {
    if (s.charAt(i) == 'l') count++;
    i++;
}
System.out.println(count);`,
    options: [
      { id: "A", text: "2" },
      { id: "B", text: "1" },
      { id: "C", text: "3" },
      { id: "D", text: "0" },
    ],
    correctId: "A",
    explanation:
      "\"hello\": h=0, e=1, l=2, l=3, o=4. 'l' appears at indices 2 and 3, so count = 2.",
    trap: "count occurrences — must trace all positions",
  },
  {
    id: 20,
    unit: 2,
    cedTopic: "2.9",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int[] values = {5, 3, 8, 1, 7};
int min = values[0];
for (int i = 1; i < values.length; i++) {
    if (values[i] < min) {
        min = values[i];
    }
}
System.out.println(min);`,
    options: [
      { id: "A", text: "5" },
      { id: "B", text: "1" },
      { id: "C", text: "3" },
      { id: "D", text: "8" },
    ],
    correctId: "B",
    explanation:
      "Standard minimum-finding algorithm. Starts with min=5, compares 3 (new min), then 8 (no), then 1 (new min), then 7 (no). Final min = 1.",
    trap: "standard min algorithm — must initialize to arr[0]",
  },
  {
    id: 21,
    unit: 2,
    cedTopic: "2.2",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int x = 0;
boolean result = (x != 0) && (10 / x > 2);
System.out.println(result);`,
    options: [
      { id: "A", text: "true" },
      { id: "B", text: "The code does not compile" },
      { id: "C", text: "An ArithmeticException is thrown" },
      { id: "D", text: "false" },
    ],
    correctId: "D",
    explanation:
      "Short-circuit evaluation: (x != 0) evaluates to false. With &&, if the left side is false, the right side is NEVER evaluated. So 10/x is never computed and no exception is thrown. result = false.",
    trap: "&& short-circuits: right side not evaluated when left is false",
  },
  {
    id: 22,
    unit: 2,
    cedTopic: "2.11",
    skill: "3.B",
    question:
      "How many times is the statement System.out.print(\"*\") executed when the following code segment is run?",
    code: `for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 3; j++) {
        System.out.print("*");
    }
}`,
    options: [
      { id: "A", text: "15" },
      { id: "B", text: "8" },
      { id: "C", text: "3" },
      { id: "D", text: "5" },
    ],
    correctId: "A",
    explanation:
      "Each iteration of the outer loop (5 total) triggers a full pass of the inner loop (3 iterations). The inner statement runs 5 × 3 = 15 times.",
    trap: "nested loops multiply: outer iterations × inner iterations, not outer + inner",
  },

  // ── UNIT 3 ──────────────────────────────────────────────────────────────
  {
    id: 23,
    unit: 3,
    cedTopic: "3.3",
    skill: "3.C",
    question:
      "Assume the following class definition exists. What is printed when the given code segment executes?",
    code: `public class Box {
    private int width;
    private int height;

    public Box(int w, int h) {
        width = w;
        height = h;
    }

    public int area() {
        return width * height;
    }
}

// Code segment:
Box b = new Box(4, 6);
System.out.println(b.area());`,
    options: [
      { id: "A", text: "24" },
      { id: "B", text: "10" },
      { id: "C", text: "46" },
      { id: "D", text: "12" },
    ],
    correctId: "A",
    explanation:
      "new Box(4, 6) sets width=4 and height=6. area() returns width * height = 4 * 6 = 24.",
    trap: "trace constructor assignment then method call",
  },
  {
    id: 24,
    unit: 3,
    cedTopic: "3.5",
    skill: "2.B",
    question:
      "Which of the following method signatures correctly declares a public accessor for a private String field named name?",
    options: [
      {
        id: "A",
        text: "public String getName() { return name; }",
        isCode: true,
      },
      {
        id: "B",
        text: "private String getName() { return name; }",
        isCode: true,
      },
      {
        id: "C",
        text: "public void getName() { return name; }",
        isCode: true,
      },
      {
        id: "D",
        text: "public String name() { return getName; }",
        isCode: true,
      },
    ],
    correctId: "A",
    explanation:
      "An accessor (getter) should be public so callers can access it, return the same type as the field (String), and return the field value. Option B is private. Option C is void but tries to return a value. Option D has a syntax error.",
    trap: "accessor must be public with matching return type",
  },
  {
    id: 25,
    unit: 3,
    cedTopic: "3.7",
    skill: "3.A",
    question:
      "Assume the following class definition exists. What is printed when the code segment executes?",
    code: `public class Counter {
    private static int total = 0;
    private int id;

    public Counter(int id) {
        this.id = id;
        total++;
    }

    public static int getTotal() { return total; }
}

// Code segment:
Counter a = new Counter(1);
Counter b = new Counter(2);
Counter c = new Counter(3);
System.out.println(Counter.getTotal());`,
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "2" },
      { id: "C", text: "3" },
      { id: "D", text: "0" },
    ],
    correctId: "C",
    explanation:
      "total is a static variable shared across all instances. Each constructor call increments total by 1. After 3 objects are created, total = 3.",
    trap: "static variables are shared across all instances",
  },
  {
    id: 26,
    unit: 3,
    cedTopic: "3.4",
    skill: "3.D",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `public class Rectangle {
    private int width;
    private int height;

    public Rectangle(int width, int height) {
        width = width;    // missing this.
        height = height;  // missing this.
    }

    public int getWidth() { return width; }
}

// Code segment:
Rectangle r = new Rectangle(5, 3);
System.out.println(r.getWidth());`,
    options: [
      { id: "A", text: "5" },
      { id: "B", text: "3" },
      { id: "C", text: "0" },
      { id: "D", text: "This code does not compile" },
    ],
    correctId: "C",
    explanation:
      "Without this., the statement width = width assigns the parameter to itself. The instance variable width is never assigned, so it retains its default value of 0.",
    trap: "missing this. assigns parameter to itself; instance variable stays default (0)",
  },
  {
    id: 27,
    unit: 3,
    cedTopic: "3.8",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `public class Thing {
    private int x = 10;

    public void show() {
        int x = 20;
        System.out.println(x);
    }

    public void getX() {
        System.out.println(x);
    }
}

// Code segment:
Thing t = new Thing();
t.show();
t.getX();`,
    options: [
      { id: "A", text: "20\n10" },
      { id: "B", text: "20\n20" },
      { id: "C", text: "10\n10" },
      { id: "D", text: "10\n20" },
    ],
    correctId: "A",
    explanation:
      "In show(), the local variable x=20 shadows the instance variable x=10. System.out.println(x) prints the local 20. In getX(), there is no local x, so x refers to the instance variable x=10.",
    trap: "local variable shadows instance variable in its own method scope",
  },
  {
    id: 28,
    unit: 3,
    cedTopic: "3.5",
    skill: "3.D",
    question:
      "Which of the following best describes the error in the method below?",
    code: `public void computeDouble() {
    return value * 2;
}`,
    options: [
      { id: "A", text: "value is not declared as a local variable" },
      {
        id: "B",
        text: "A void method cannot contain a return statement with a value",
      },
      { id: "C", text: "The method is missing a parameter" },
      { id: "D", text: "value * 2 requires a cast to int" },
    ],
    correctId: "B",
    explanation:
      "A method declared void cannot return a value. The return type must be changed to int (or the appropriate type) to allow return value * 2.",
    trap: "void methods cannot return a value",
  },
  {
    id: 29,
    unit: 3,
    cedTopic: "3.2",
    skill: "5.A",
    question:
      "A school district uses a program that automatically assigns students to academic tracks based on past student performance data. A civil rights organization notices that students from lower-income zip codes are consistently placed in remedial courses. This outcome is best described as an example of:",
    options: [
      { id: "A", text: "A compile-time error in the assignment algorithm" },
      {
        id: "B",
        text: "Algorithmic bias caused by patterns in historical data",
      },
      { id: "C", text: "A runtime exception due to invalid input data" },
      {
        id: "D",
        text: "Integer overflow in the scoring calculation",
      },
    ],
    correctId: "B",
    explanation:
      "When an algorithm is trained on or evaluated with biased historical data, it can reproduce and amplify those biases. This is algorithmic bias — a computing ethics concern, not a programming error.",
    trap: "algorithmic bias vs. programming errors",
  },

  // ── UNIT 4 ──────────────────────────────────────────────────────────────
  {
    id: 30,
    unit: 4,
    cedTopic: "4.3",
    skill: "3.B",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int[] arr = new int[5];
System.out.println(arr[0]);
System.out.println(arr[4]);`,
    options: [
      { id: "A", text: "1\n5" },
      { id: "B", text: "null\nnull" },
      { id: "C", text: "An ArrayIndexOutOfBoundsException is thrown" },
      { id: "D", text: "0\n0" },
    ],
    correctId: "D",
    explanation:
      "In Java, integer arrays are automatically initialized to 0. arr[4] is the last valid index (indices 0–4 for a size-5 array), so no exception is thrown.",
    trap: "int arrays default to 0, not null",
  },
  {
    id: 31,
    unit: 4,
    cedTopic: "4.5",
    skill: "3.B",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int[] data = {2, 5, 8, 1, 9, 3};
int result = 0;
for (int i = 0; i < data.length; i++) {
    if (data[i] > result) result = data[i];
}
System.out.println(result);`,
    options: [
      { id: "A", text: "9" },
      { id: "B", text: "2" },
      { id: "C", text: "28" },
      { id: "D", text: "3" },
    ],
    correctId: "A",
    explanation:
      "Standard maximum-finding algorithm. result starts at 0. As the loop progresses: 2>0 → result=2, 5>2 → result=5, 8>5 → result=8, 1<8, 9>8 → result=9, 3<9. Final: 9.",
    trap: "max-finding algorithm — result stays highest value seen",
  },
  {
    id: 32,
    unit: 4,
    cedTopic: "4.6",
    skill: "2.B",
    question:
      "A text file named \"data.txt\" contains the following values on a single line:\n\n12  7  25  3\n\nThe following code segment is executed. What is printed?",
    code: `Scanner sc = new Scanner(new File("data.txt"));
int sum = 0;
while (sc.hasNextInt()) {
    int val = sc.nextInt();
    if (val > 10) {
        sum += val;
    }
}
System.out.println(sum);`,
    options: [
      { id: "A", text: "47" },
      { id: "B", text: "2" },
      { id: "C", text: "25" },
      { id: "D", text: "37" },
    ],
    correctId: "D",
    explanation:
      "The loop reads each integer with hasNextInt()/nextInt(). Only values greater than 10 are added to sum. 12 > 10 → sum = 12. 7 is not > 10. 25 > 10 → sum = 37. 3 is not > 10. Result: 37. Option A (47) is the sum of all four values — the condition is ignored. Option C (25) is just the largest value. Option B (2) is the count of values > 10.",
    trap: "Reading all values vs. conditionally accumulating — the if (val > 10) filters which values contribute to sum",
  },
  {
    id: 33,
    unit: 4,
    cedTopic: "4.8",
    skill: "3.B",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `ArrayList<Integer> list = new ArrayList<Integer>();
list.add(10);
list.add(20);
list.add(1, 15);
System.out.println(list.size());
System.out.println(list.get(1));`,
    options: [
      { id: "A", text: "2\n15" },
      { id: "B", text: "3\n15" },
      { id: "C", text: "3\n20" },
      { id: "D", text: "2\n20" },
    ],
    correctId: "B",
    explanation:
      "After add(10) and add(20): [10, 20]. add(1, 15) inserts 15 at index 1, shifting 20 right: [10, 15, 20]. size() = 3. get(1) = 15.",
    trap: "add(index, element) inserts at that index, shifting elements right",
  },
  {
    id: 34,
    unit: 4,
    cedTopic: "4.10",
    skill: "3.D",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `ArrayList<Integer> nums = new ArrayList<Integer>();
nums.add(1); nums.add(2); nums.add(4); nums.add(5); nums.add(6);

for (int i = 0; i < nums.size(); i++) {
    if (nums.get(i) % 2 == 0) {
        nums.remove(i);
    }
}
System.out.println(nums);`,
    options: [
      { id: "A", text: "[1, 5]" },
      { id: "B", text: "[1, 3, 5]" },
      { id: "C", text: "[1, 2, 4, 5, 6]" },
      { id: "D", text: "[1, 4, 5]" },
    ],
    correctId: "D",
    explanation:
      "Trace: [1,2,4,5,6]. i=0: 1 odd, skip. i=1: 2 even, remove(1) → [1,4,5,6]. i=2: get(2)=5 (4 was skipped because removal shifted indices). i=3: get(3)=6 even, remove(3) → [1,4,5]. i=4: 4 < 3 false (size is now 3), stop. 4 was never checked.",
    trap: "forward removal skips the element after the removed one — use backward traversal",
  },
  {
    id: 35,
    unit: 4,
    cedTopic: "4.9",
    skill: "3.B",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `ArrayList<String> words = new ArrayList<String>();
words.add("apple");
words.add("banana");
words.add("cherry");
words.set(1, "blueberry");
words.remove(0);
System.out.println(words.get(0));
System.out.println(words.size());`,
    options: [
      { id: "A", text: '"blueberry"\n2' },
      { id: "B", text: '"apple"\n2' },
      { id: "C", text: '"banana"\n2' },
      { id: "D", text: '"blueberry"\n3' },
    ],
    correctId: "A",
    explanation:
      'Start: [apple, banana, cherry]. set(1, "blueberry") → [apple, blueberry, cherry]. remove(0) → [blueberry, cherry]. get(0) = "blueberry". size() = 2.',
    trap: "trace set() then remove() in order — indices shift after remove",
  },
  {
    id: 36,
    unit: 4,
    cedTopic: "4.11",
    skill: "3.B",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int[][] grid = new int[3][4];
System.out.println(grid.length);
System.out.println(grid[0].length);`,
    options: [
      { id: "A", text: "4\n3" },
      { id: "B", text: "12\n0" },
      { id: "C", text: "3\n3" },
      { id: "D", text: "3\n4" },
    ],
    correctId: "D",
    explanation:
      "new int[3][4] creates 3 rows and 4 columns. grid.length is the number of rows = 3. grid[0].length is the number of columns = 4.",
    trap: "grid.length = rows; grid[0].length = columns",
  },
  {
    id: 37,
    unit: 4,
    cedTopic: "4.13",
    skill: "3.B",
    questionSetId: "qs2",
    questionSetLabel: "Questions 37 and 38 refer to the following code segment.",
    sharedCode: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};`,
    question:
      "What is printed as a result of executing the following code segment using the matrix defined above?",
    code: `int sum = 0;
for (int r = 0; r < matrix.length; r++) {
    for (int c = 0; c < matrix[0].length; c++) {
        if (r == c) {
            sum += matrix[r][c];
        }
    }
}
System.out.println(sum);`,
    options: [
      { id: "A", text: "45" },
      { id: "B", text: "6" },
      { id: "C", text: "15" },
      { id: "D", text: "9" },
    ],
    correctId: "C",
    explanation:
      "r == c selects the main diagonal: matrix[0][0]=1, matrix[1][1]=5, matrix[2][2]=9. Sum = 1 + 5 + 9 = 15.",
    trap: "r==c selects the main diagonal only",
  },
  {
    id: 38,
    unit: 4,
    cedTopic: "4.12",
    skill: "3.B",
    questionSetId: "qs2",
    question:
      "Using the matrix defined above, what is the value of matrix[2][1]?",
    options: [
      { id: "A", text: "7" },
      { id: "B", text: "8" },
      { id: "C", text: "9" },
      { id: "D", text: "6" },
    ],
    correctId: "B",
    explanation:
      "matrix[row][col]. Row 2 is {7, 8, 9}. Column 1 of that row is 8. matrix[2][1] = 8.",
    trap: "matrix[row][col] — first index is row, second is column",
  },
  {
    id: 39,
    unit: 4,
    cedTopic: "4.15",
    skill: "4.A",
    question:
      "A sorted array contains 1000 elements. In the best case, binary search finds the target element in how many comparisons?",
    options: [
      { id: "A", text: "1000" },
      { id: "B", text: "500" },
      { id: "C", text: "10" },
      { id: "D", text: "1" },
    ],
    correctId: "D",
    explanation:
      "In the best case, the target is exactly the middle element. Binary search compares it on the first check and returns immediately — 1 comparison. (Worst case would need about 10 comparisons, since each step halves the remaining 1000 elements.)",
    trap: "best case binary search = 1 comparison (middle element)",
  },
  {
    id: 40,
    unit: 4,
    cedTopic: "4.16",
    skill: "3.C",
    question:
      "Assume the following method exists. What value is returned by the call mystery(4)?",
    code: `public static int mystery(int n) {
    if (n <= 1) return 1;
    return n * mystery(n - 1);
}`,
    options: [
      { id: "A", text: "4" },
      { id: "B", text: "8" },
      { id: "C", text: "24" },
      { id: "D", text: "10" },
    ],
    correctId: "C",
    explanation:
      "mystery(4) = 4 * mystery(3) = 4 * 3 * mystery(2) = 4 * 3 * 2 * mystery(1) = 4 * 3 * 2 * 1 = 24. This is the factorial function.",
    trap: "trace recursive calls all the way to the base case",
  },
  {
    id: 41,
    unit: 4,
    cedTopic: "4.14",
    skill: "3.A",
    question:
      "Consider selection sort applied to the array {5, 2, 8, 1, 4}. After the first pass of the outer loop (finding and swapping the minimum element into position), which array state is correct?",
    options: [
      { id: "A", text: "{1, 2, 8, 5, 4}" },
      { id: "B", text: "{2, 5, 8, 1, 4}" },
      { id: "C", text: "{1, 2, 5, 8, 4}" },
      { id: "D", text: "{5, 2, 8, 1, 4}" },
    ],
    correctId: "A",
    explanation:
      "Selection sort finds the minimum of the entire unsorted portion (1 at index 3) and swaps it with the element at the current position (index 0, value 5). Result: {1, 2, 8, 5, 4}.",
    trap: "selection sort swaps the global minimum with index 0, not adjacent elements",
  },
  {
    id: 42,
    unit: 4,
    cedTopic: "4.2",
    skill: "1.B",
    question:
      "A program reads an unknown number of student test scores from a file and computes the class average. Which data structure is most appropriate for storing the scores before processing?",
    options: [
      { id: "A", text: "A single int variable" },
      { id: "B", text: "A String variable" },
      { id: "C", text: "A 2D int array" },
      { id: "D", text: "An ArrayList<Integer>" },
    ],
    correctId: "D",
    explanation:
      "An ArrayList<Integer> is ideal because the number of scores is unknown — ArrayList grows dynamically. A single int stores only one value. A String is not appropriate for numeric computation. A 2D array would be overkill for a flat list of scores.",
    trap: "unknown count → ArrayList; known fixed count → array",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 4 FRQs — fixed structure every year
// ─────────────────────────────────────────────────────────────────────────────

export const examFRQs: ExamFRQ[] = [
  // ── FRQ 1: Methods and Control Structures (7 pts) ───────────────────────
  {
    id: 1,
    type: "Methods and Control Structures",
    totalPoints: 7,
    title: "LibrarySystem",
    scenario:
      "A library uses a LibrarySystem object to manage hourly book checkouts. The class has instance variables for the library's name and maximum daily checkout limit per hour. Two helper methods are already written: getBooksAvailable(int hour) returns the number of books available at that hour, and recordCheckout(int hour, int count) records that count books were checked out. You will write two methods for this class.",
    givenCode: `public class LibrarySystem {
    private String libraryName;
    private int maxDailyCheckouts;

    /** Postcondition: All instance variables have been initialized. */
    public LibrarySystem(String name, int max) {
        libraryName = name;
        maxDailyCheckouts = max;
    }

    /**
     * Returns the number of books available to check out at the given hour.
     * Precondition: 0 <= hour <= 23
     */
    public int getBooksAvailable(int hour) { /* implementation not shown */ }

    /**
     * Records that count books were checked out at the given hour.
     * Precondition: 0 <= hour <= 23; count >= 0
     */
    public void recordCheckout(int hour, int count) { /* implementation not shown */ }

    /** Returns the number of books checked out at hour, as described in part (a). */
    public int processHourlyCheckout(int hour)
    { /* to be implemented in part (a) */ }

    /**
     * Returns total revenue earned from openHour to closeHour, inclusive,
     * as described in part (b).
     * Precondition: 0 <= openHour <= closeHour <= 23
     */
    public double calculateDailyRevenue(int openHour, int closeHour)
    { /* to be implemented in part (b) */ }
}`,
    parts: [
      {
        letter: "A",
        points: 4,
        prompt:
          "Write the method processHourlyCheckout(int hour). The method should determine how many books will be checked out: the smaller of the books available that hour and the library's maxDailyCheckouts. It should record the checkout using the provided helper method and return the number of books checked out.",
        sampleAnswer: `public int processHourlyCheckout(int hour) {
    int available = getBooksAvailable(hour);
    int checkout = Math.min(available, maxDailyCheckouts);
    recordCheckout(hour, checkout);
    return checkout;
}`,
        rubricPoints: [
          {
            text: "Calls getBooksAvailable(hour) and stores or uses the result",
            points: 1,
          },
          {
            text: "Correctly computes the minimum of available books and maxDailyCheckouts",
            points: 1,
          },
          {
            text: "Calls recordCheckout(hour, checkout) with correct arguments",
            points: 1,
          },
          { text: "Returns the number of books checked out", points: 1 },
        ],
        commonMistakes: [
          "Calling getBooksAvailable without parentheses or with wrong argument",
          "Using if/else instead of Math.min() (acceptable, but must be logically correct)",
          "Calling recordCheckout with the wrong argument order",
          "Not returning a value (method must return int)",
        ],
      },
      {
        letter: "B",
        points: 3,
        prompt:
          "Write the method calculateDailyRevenue(int openHour, int closeHour). The library is open from openHour to closeHour inclusive. For each hour, call processHourlyCheckout to get the books checked out that hour. Each book earns $2.50 in revenue. If the number checked out equals maxDailyCheckouts, add a $1.00 bonus for that hour. Return the total revenue as a double.\n\nAssume that processHourlyCheckout works as intended, regardless of what you wrote in part (a). You must call processHourlyCheckout appropriately in order to receive full credit.",
        sampleAnswer: `public double calculateDailyRevenue(int openHour, int closeHour) {
    double total = 0.0;
    for (int hour = openHour; hour <= closeHour; hour++) {
        int checked = processHourlyCheckout(hour);
        total += checked * 2.50;
        if (checked == maxDailyCheckouts) {
            total += 1.00;
        }
    }
    return total;
}`,
        rubricPoints: [
          {
            text: "Loop executes for each hour from openHour to closeHour inclusive (correct bounds and loop variable)",
            points: 1,
          },
          {
            text: "Calls processHourlyCheckout(hour) exactly once per loop iteration and uses the return value — not called with a constant or the wrong variable",
            points: 1,
          },
          {
            text: "Correctly accumulates revenue (checked * 2.50) with bonus condition (+1.00 when checked == maxDailyCheckouts) and returns the total",
            points: 1,
          },
        ],
        commonMistakes: [
          "Loop condition uses < closeHour instead of <= closeHour (misses last hour)",
          "Calling processHourlyCheckout twice per loop iteration",
          "Using a constant 2.50 instead of checked * 2.50",
          "Using || or && incorrectly in the bonus condition",
          "Using openHour or closeHour instead of the loop variable hour",
        ],
      },
    ],
  },

  // ── FRQ 2: Class Design (7 pts) ─────────────────────────────────────────
  {
    id: 2,
    type: "Class Design",
    totalPoints: 7,
    title: "GradeTracker",
    scenario:
      "Write a complete class called GradeTracker that tracks a student's point total for a course. The class stores the student's name, the total points earned so far (starting at 0), and the maximum possible points in the course. It provides a method to add points and a method to return the student's current letter grade.",
    givenCode: `/* Write the complete GradeTracker class below.
 *
 * The class must have:
 *   - private String studentName
 *   - private int totalPoints  (initialized to 0 in the constructor)
 *   - private int maxPoints
 *
 *   Constructor: GradeTracker(String name, int maxPts)
 *
 *   Methods:
 *     void addPoints(int pts)     — adds pts to totalPoints
 *     String getGrade()           — returns letter grade:
 *                                     "A" if totalPoints/maxPoints >= 0.90
 *                                     "B" if >= 0.80
 *                                     "C" if >= 0.70
 *                                     "F" otherwise
 *                                   Use double division to compute the ratio.
 */`,
    parts: [
      {
        letter: "A",
        points: 7,
        prompt:
          "Write the complete GradeTracker class. Include all private instance variables, the constructor, the addPoints method, and the getGrade method as described above.",
        sampleAnswer: `public class GradeTracker {
    private String studentName;
    private int totalPoints;
    private int maxPoints;

    public GradeTracker(String name, int maxPts) {
        studentName = name;
        totalPoints = 0;
        maxPoints = maxPts;
    }

    public void addPoints(int pts) {
        totalPoints += pts;
    }

    public String getGrade() {
        double ratio = (double) totalPoints / maxPoints;
        if (ratio >= 0.90) return "A";
        else if (ratio >= 0.80) return "B";
        else if (ratio >= 0.70) return "C";
        else return "F";
    }
}`,
        rubricPoints: [
          {
            text: "Class header: public class GradeTracker",
            points: 1,
          },
          {
            text: "All three instance variables declared private with correct types (String, int, int)",
            points: 1,
          },
          {
            text: "Constructor header correct: public GradeTracker(String name, int maxPts)",
            points: 1,
          },
          {
            text: "Constructor body initializes all fields correctly, including totalPoints = 0",
            points: 1,
          },
          {
            text: "addPoints method correctly adds pts to totalPoints",
            points: 1,
          },
          {
            text: "getGrade uses double division (cast or double literal) to compute ratio",
            points: 1,
          },
          {
            text: "getGrade correctly handles all four grade thresholds in descending order",
            points: 1,
          },
        ],
        commonMistakes: [
          "Declaring instance variables public instead of private",
          "Not initializing totalPoints to 0 in the constructor",
          "Using integer division in getGrade (ratio = totalPoints / maxPoints gives 0 or 1)",
          "Checking grade thresholds in wrong order (e.g., checking 0.70 before 0.80)",
          "Missing return statement in getGrade",
          "Declaring getGrade as void instead of returning String",
        ],
      },
    ],
  },

  // ── FRQ 3: ArrayList (5 pts) ─────────────────────────────────────────────
  {
    id: 3,
    type: "Data Analysis with ArrayList",
    totalPoints: 5,
    title: "SurveyAnalysis",
    scenario:
      "A SurveyAnalysis class analyzes survey responses submitted by users. Each response is stored as a String in a Survey object. The SurveyAnalysis class has one instance variable: a Survey[] array named allResponses, initialized in the constructor. You will write two methods of the SurveyAnalysis class.",
    givenCode: `public class Survey {
    private int score;        // 1–5 rating
    private String comment;   // user comment, may be empty string ""

    /** Precondition: 1 <= s <= 5; c is not null */
    public Survey(int s, String c) { score = s; comment = c; }

    public int getScore() { return score; }
    public String getComment() { return comment; }
}

public class SurveyAnalysis {
    /** All survey responses to be analyzed. Guaranteed non-null. */
    private Survey[] allResponses;

    /** Initializes allResponses to contain all Survey objects to be analyzed.
     * Precondition: allResponses contains at least one Survey.
     */
    public SurveyAnalysis() { /* implementation not shown */ }

    /**
     * Returns the average score of all responses, as described in part (a).
     * Precondition: allResponses contains at least one Survey.
     *               No element of allResponses is null.
     */
    public double getAverageScore()
    { /* to be implemented in part (a) */ }

    /**
     * Returns an ArrayList of formatted comments from high-scoring responses,
     * as described in part (b).
     * Precondition: allResponses contains at least one Survey.
     *               No element of allResponses is null.
     * Postcondition: allResponses is unchanged.
     */
    public ArrayList<String> collectHighScoreComments(int minScore)
    { /* to be implemented in part (b) */ }
}`,
    parts: [
      {
        letter: "A",
        points: 2,
        prompt:
          "Write the SurveyAnalysis method getAverageScore, which returns the arithmetic mean of all scores in allResponses as a double.",
        sampleAnswer: `public double getAverageScore() {
    double total = 0;
    for (Survey s : allResponses) {
        total += s.getScore();
    }
    return total / allResponses.length;
}`,
        rubricPoints: [
          {
            text: "Accumulates scores across all elements of allResponses using getScore()",
            points: 1,
          },
          {
            text: "Returns the sum divided by allResponses.length as a double (not integer division)",
            points: 1,
          },
        ],
        commonMistakes: [
          "Using integer division: total / allResponses.length when total is int — cast to double or declare total as double",
          "Using allResponses.size() — arrays use .length, not .size()",
          "Calling getScore without () or using getComment() by mistake",
          "Not dividing by the count (returning the sum instead of average)",
        ],
      },
      {
        letter: "B",
        points: 3,
        prompt:
          "Write the SurveyAnalysis method collectHighScoreComments(int minScore), which returns an ArrayList<String> of formatted comments from responses whose score is at least minScore AND whose comment is not the empty string. Each string added to the ArrayList should have the format: index + \"-\" + comment. If the comment does not already end with '.' or '!', append a '.' to it. An empty ArrayList is returned if no qualifying responses exist.\n\nFor example, if allResponses[2] has score 5 and comment \"Great service\", the formatted string is \"2-Great service.\" If the comment is \"Amazing!\", it is \"2-Amazing!\" with no period added.\n\nAssume that getAverageScore works as intended, regardless of what you wrote in part (a).",
        sampleAnswer: `public ArrayList<String> collectHighScoreComments(int minScore) {
    ArrayList<String> result = new ArrayList<String>();
    for (int i = 0; i < allResponses.length; i++) {
        Survey s = allResponses[i];
        if (s.getScore() >= minScore && !s.getComment().equals("")) {
            String c = s.getComment();
            char last = c.charAt(c.length() - 1);
            if (last != '.' && last != '!') {
                c = c + ".";
            }
            result.add(i + "-" + c);
        }
    }
    return result;
}`,
        rubricPoints: [
          {
            text: "Creates a new ArrayList<String> to accumulate results (not reusing allResponses)",
            points: 1,
          },
          {
            text: "Correctly filters: score >= minScore AND comment is not the empty string, using getScore() and getComment()",
            points: 1,
          },
          {
            text: "Formats each entry as index + \"-\" + comment and appends '.' when comment doesn't end in '.' or '!'; returns the ArrayList",
            points: 1,
          },
        ],
        commonMistakes: [
          "Using == to compare comment to \"\" instead of .equals(\"\")",
          "Using i instead of the Survey index in the formatted string (should be the array index i, not some counter)",
          "Forgetting to check the last character before appending '.' (always appending '.' even when it ends in '!')",
          "Using .length instead of .length() — allResponses is an array (.length), comment is a String (.length())",
          "Not returning result at the end of the method",
          "Returning allResponses.length instead of result (common confusion between the input array and the output list)",
        ],
      },
    ],
  },

  // ── FRQ 4: 2D Array (6 pts) ──────────────────────────────────────────────
  {
    id: 4,
    type: "2D Array",
    totalPoints: 6,
    title: "RainfallTracker",
    scenario:
      "A RainfallTracker class stores daily rainfall data in a 2D array, where each row represents a week and each column represents a day of the week (0 = Monday, 1 = Tuesday, … 6 = Sunday). The class has one instance variable: a 2D double array named rainfall. You will write the constructor and a method that sums rainfall for a specific day of the week across all recorded weeks.",
    givenCode: `public class RainfallTracker {
    private double[][] rainfall;

    /**
     * Allocates rainfall as a 2D double array with the given number of weeks
     * (rows) and days per week (columns). All values are initialized to 0.0.
     * Precondition: weeks > 0; daysPerWeek > 0
     */
    public RainfallTracker(int weeks, int daysPerWeek)
    { /* to be implemented in part (a) */ }

    /**
     * Returns the total rainfall recorded on the given day of the week,
     * summed across all weeks.
     * Precondition: 0 <= day < daysPerWeek
     */
    public double getDayTotal(int day)
    { /* to be implemented in part (b) */ }
}`,
    parts: [
      {
        letter: "A",
        points: 3,
        prompt:
          "Write the constructor RainfallTracker(int weeks, int daysPerWeek). The constructor should allocate rainfall as a 2D double array with weeks rows and daysPerWeek columns. Initialize all elements to 0.0.",
        sampleAnswer: `public RainfallTracker(int weeks, int daysPerWeek) {
    rainfall = new double[weeks][daysPerWeek];
    for (int r = 0; r < rainfall.length; r++) {
        for (int c = 0; c < rainfall[0].length; c++) {
            rainfall[r][c] = 0.0;
        }
    }
}`,
        rubricPoints: [
          {
            text: "Allocates rainfall as new double[weeks][daysPerWeek] with correct dimension order",
            points: 1,
          },
          {
            text: "Nested loop structure is correct: outer iterates rows (rainfall.length), inner iterates columns (rainfall[0].length)",
            points: 1,
          },
          {
            text: "All elements set to 0.0 (explicit initialization loop OR reliance on Java's default 0.0 for double arrays is acceptable)",
            points: 1,
          },
        ],
        commonMistakes: [
          "Swapping weeks and daysPerWeek: new double[daysPerWeek][weeks]",
          "Confusing rainfall.length (rows) with rainfall[0].length (columns) in loop bounds",
          "Using < weeks and < daysPerWeek as literals instead of .length expressions",
          "Accessing rainfall[c][r] instead of rainfall[r][c]",
        ],
      },
      {
        letter: "B",
        points: 3,
        prompt:
          "Write the method getDayTotal(int day). The method should sum the rainfall values for column day across all rows (weeks) and return the total as a double. For example, if day is 0, the method returns the total Monday rainfall across every recorded week.",
        sampleAnswer: `public double getDayTotal(int day) {
    double total = 0.0;
    for (int week = 0; week < rainfall.length; week++) {
        total += rainfall[week][day];
    }
    return total;
}`,
        rubricPoints: [
          {
            text: "Loop iterates over all rows using rainfall.length (not rainfall[0].length — the column count)",
            points: 1,
          },
          {
            text: "Accesses rainfall[week][day] with row index first and the day parameter as the column — not rainfall[day][week]",
            points: 1,
          },
          {
            text: "Accumulator correctly initialized to 0.0 and total returned",
            points: 1,
          },
        ],
        commonMistakes: [
          "Looping with rainfall[0].length instead of rainfall.length — iterates over the wrong dimension",
          "Accessing rainfall[day][week] — row and column indices swapped",
          "Using a hardcoded column index instead of the day parameter",
          "Not initializing total before the loop",
          "Not returning the total",
        ],
      },
    ],
  },
];
