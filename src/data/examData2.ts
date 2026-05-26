
import type { ExamMCQ, ExamFRQ } from "../types/exam";

// ─────────────────────────────────────────────────────────────────────────────
// 42 MCQ  —  2025-2026 AP CSA distribution  (Practice Exam 2)
//   Unit 1 (Using Objects & Methods):    Q1–Q10   (~10 qs, 15–25%)
//   Unit 2 (Selection & Iteration):      Q11–Q22  (~12 qs, 25–35%)
//   Unit 3 (Class Creation):             Q23–Q29  (~7  qs, 10–18%)
//   Unit 4 (Data Collections):           Q30–Q42  (~13 qs, 30–40%)
//
// Question Sets:
//   QS1: Q15 & Q16 share a nested-loop code block
//   QS2: Q37 & Q38 share a 2D-array code block
// ─────────────────────────────────────────────────────────────────────────────

export const examMCQs2: ExamMCQ[] = [
  // ── UNIT 1 ──────────────────────────────────────────────────────────────
  {
    id: 1,
    unit: 1,
    cedTopic: "1.5",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int a = 15;
int b = 4;
System.out.println(a / b);
System.out.println(a % b);
System.out.println((double) a / b);`,
    options: [
      { id: "A", text: "3\n3.0\n3.75" },
      { id: "B", text: "3\n3\n3.0" },
      { id: "C", text: "3\n3\n3.75" },
      { id: "D", text: "3.75\n3\n3.75" },
    ],
    correctId: "C",
    explanation:
      "15 / 4 = 3 (integer division truncates). 15 % 4 = 3 (remainder). (double) a / b casts a to double first, then divides: 15.0 / 4 = 3.75.",
    trap: "cast must precede the operand, not wrap the whole expression, to produce a double result",
  },
  {
    id: 2,
    unit: 1,
    cedTopic: "1.15",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String s = "abracadabra";
int start = s.indexOf("cad");
int end = s.indexOf("bra", start);
System.out.println(s.substring(start, end));`,
    options: [
      { id: "A", text: '"cadab"' },
      { id: "B", text: '"cadabra"' },
      { id: "C", text: '"acad"' },
      { id: "D", text: '"cada"' },
    ],
    correctId: "D",
    explanation:
      '"abracadabra": a=0,b=1,r=2,a=3,c=4,a=5,d=6,a=7,b=8,r=9,a=10. indexOf("cad") finds c at index 4, so start=4. indexOf("bra", 4) searches for "bra" starting at index 4; the b at index 1 is skipped, and the next "bra" begins at index 8, so end=8. substring(4, 8) returns characters at indices 4,5,6,7 → "cada" (end index 8 is exclusive).',
    trap: "indexOf(str, fromIndex) skips occurrences before fromIndex; substring end index is exclusive — substring(4,8) is 4 characters, not 5",
  },
  {
    id: 3,
    unit: 1,
    cedTopic: "1.15",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String s = "abstract";
System.out.println(s.substring(0, 3));
System.out.println(s.indexOf("str"));`,
    options: [
      { id: "A", text: '"abst"\n2' },
      { id: "B", text: '"abs"\n3' },
      { id: "C", text: '"abs"\n2' },
      { id: "D", text: '"abs"\n-1' },
    ],
    correctId: "C",
    explanation:
      'substring(0, 3) returns characters at indices 0, 1, 2 → "abs" (end index 3 is exclusive). "abstract": a=0,b=1,s=2,t=3,r=4,a=5,c=6,t=7. "str" starts at index 2 (s→2,t→3,r→4).',
    trap: "substring end index is exclusive; indexOf returns the starting index of the first match",
  },
  {
    id: 4,
    unit: 1,
    cedTopic: "1.4",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int x = 5;
int y = 2;
double result = (double)(x / y);
System.out.println(result);`,
    options: [
      { id: "A", text: "2.0" },
      { id: "B", text: "2" },
      { id: "C", text: "3.0" },
      { id: "D", text: "2.5" },
    ],
    correctId: "A",
    explanation:
      "(x / y) is evaluated first as integer division: 5 / 2 = 2. Then (double) casts the integer result 2 to 2.0. To get 2.5, the cast must appear before the division: (double) x / y.",
    trap: "(double)(x/y) casts after division; (double)x/y casts before division",
  },
  {
    id: 5,
    unit: 1,
    cedTopic: "1.6",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int[] vals = {8, 3, 11, 6, 2};
int a = vals[1];
int b = vals[vals.length - 2];
a += b;
a *= 2;
a -= vals[0];
a /= 3;
System.out.println(a);`,
    options: [
      { id: "A", text: "10" },
      { id: "B", text: "3" },
      { id: "C", text: "4" },
      { id: "D", text: "5" },
    ],
    correctId: "B",
    explanation:
      "vals = {8, 3, 11, 6, 2}, length 5. a = vals[1] = 3. b = vals[5-2] = vals[3] = 6 (NOT vals[4]). Then a += b → 9, a *= 2 → 18, a -= vals[0] → 18 - 8 = 10, a /= 3 → 10/3 = 3 (integer division truncates).",
    trap: "vals.length-2 indexes the second-to-last element (index 3), not the last (index 4); the final division is integer division: 10/3 = 3, not 3.33",
  },
  {
    id: 6,
    unit: 1,
    cedTopic: "1.15",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String s = "programming";
System.out.println(s.substring(0, 4));
System.out.println(s.indexOf("gram"));`,
    options: [
      { id: "A", text: '"prog"\n4' },
      { id: "B", text: '"progr"\n3' },
      { id: "C", text: '"prog"\n3' },
      { id: "D", text: '"prog"\n-1' },
    ],
    correctId: "C",
    explanation:
      'substring(0, 4) returns characters at indices 0,1,2,3 → "prog" (end index 4 is exclusive). "programming": p=0,r=1,o=2,g=3,r=4,a=5,m=6,m=7,i=8,n=9,g=10. "gram" starts at index 3 (g,r,a,m → 3,4,5,6).',
    trap: "substring end index is exclusive; indexOf finds the starting index of the substring",
  },
  {
    id: 7,
    unit: 1,
    cedTopic: "1.11",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int x = 50;
int result = (int) Math.pow((int) Math.sqrt(x), 2) + (int) Math.sqrt(x);
System.out.println(result);`,
    options: [
      { id: "A", text: "56" },
      { id: "B", text: "57" },
      { id: "C", text: "50" },
      { id: "D", text: "55" },
    ],
    correctId: "A",
    explanation:
      "Math.sqrt(50) returns ~7.0710678 (a double). (int) Math.sqrt(50) truncates to 7. Math.pow(7, 2) returns 49.0 (a double); cast to int gives 49. The second (int) Math.sqrt(x) is also 7. Final: 49 + 7 = 56. Note that (int)Math.sqrt(x) truncates before squaring, so (int)Math.pow((int)Math.sqrt(50), 2) = 49, not 50.",
    trap: "Math.sqrt returns double — casting (int) truncates BEFORE squaring, losing the fractional part; (int)(Math.sqrt(50))^2 ≠ 50",
  },
  {
    id: 8,
    unit: 1,
    cedTopic: "1.3",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int p = 2;
int q = 3;
System.out.println(p + q + " total");
System.out.println("count: " + p + q);`,
    options: [
      { id: "A", text: '"5 total"\n"count: 5"' },
      { id: "B", text: '"23 total"\n"count: 23"' },
      { id: "C", text: '"23 total"\n"count: 5"' },
      { id: "D", text: '"5 total"\n"count: 23"' },
    ],
    correctId: "D",
    explanation:
      'Line 1: p + q evaluates first (both ints) → 5, then 5 + " total" → "5 total". Line 2: "count: " + p evaluates left-to-right → "count: 2", then + q → "count: 23". Once a String is part of +, remaining additions become concatenation.',
    trap: "int+int evaluates before String concat; String+int is always concat",
  },
  {
    id: 9,
    unit: 1,
    cedTopic: "1.11",
    skill: "4.A",
    question:
      "Consider the following code segment. Which of the values listed below is NEVER assigned to k?",
    code: `int k = (int)(Math.random() * 8) + 3;`,
    options: [
      { id: "A", text: "11" },
      { id: "B", text: "5" },
      { id: "C", text: "3" },
      { id: "D", text: "10" },
    ],
    correctId: "A",
    explanation:
      "Math.random() returns a double in [0.0, 1.0) — strictly less than 1. Multiplied by 8 gives [0.0, 8.0). Casting to int truncates the fractional part, producing integers 0 through 7 inclusive (8 is excluded because the upper bound is exclusive). Adding 3 shifts the range to 3 through 10 inclusive. So 11 is never produced; 3, 5, and 10 are all possible.",
    trap: "Math.random()*n produces integers 0..n-1 (upper bound exclusive); with +offset the max value is offset + n − 1, NOT offset + n",
  },
  {
    id: 10,
    unit: 1,
    cedTopic: "1.12",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String s = new String("hello");
String t = new String("hello");
System.out.println(s == t);
System.out.println(s.equals(t));`,
    options: [
      { id: "A", text: "false\ntrue" },
      { id: "B", text: "false\nfalse" },
      { id: "C", text: "true\ntrue" },
      { id: "D", text: "true\nfalse" },
    ],
    correctId: "A",
    explanation:
      "new String() explicitly creates a new object in memory. s and t are two distinct objects, so s == t (reference equality) is false. s.equals(t) compares the character content, which is identical, so it returns true.",
    trap: "== compares references; .equals() compares content — always use .equals() for Strings",
  },

  // ── UNIT 2 ──────────────────────────────────────────────────────────────
  {
    id: 11,
    unit: 2,
    cedTopic: "2.1",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int x = 3;
boolean b = (x < 0) || (x % 3 == 0);
System.out.println(b);`,
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "0" },
      { id: "C", text: "true" },
      { id: "D", text: "false" },
    ],
    correctId: "C",
    explanation:
      "x < 0 is false (3 is positive). x % 3 = 0, so x % 3 == 0 is true. false || true = true. In Java, booleans print as true/false, not 1/0.",
    trap: "only one operand of || needs to be true for the result to be true",
  },
  {
    id: 12,
    unit: 2,
    cedTopic: "2.3",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int temp = 85;
String weather;
if (temp >= 90) weather = "hot";
else if (temp >= 70) weather = "warm";
else if (temp >= 50) weather = "cool";
else weather = "cold";
System.out.println(weather);`,
    options: [
      { id: "A", text: '"cool"' },
      { id: "B", text: '"cold"' },
      { id: "C", text: '"warm"' },
      { id: "D", text: '"hot"' },
    ],
    correctId: "C",
    explanation:
      '85 is not >= 90 (skip). 85 IS >= 70, so weather = "warm" and the remaining else-if branches are skipped.',
    trap: "only the first matching branch executes; later branches are not checked",
  },
  {
    id: 13,
    unit: 2,
    cedTopic: "2.6",
    skill: "3.A",
    question:
      "Which of the following expressions is equivalent to !(x < 10 || y > 20)?",
    options: [
      { id: "A", text: "x < 10 && y > 20", isCode: true },
      { id: "B", text: "!(x >= 10) || !(y <= 20)", isCode: true },
      { id: "C", text: "x >= 10 && y <= 20", isCode: true },
      { id: "D", text: "x >= 10 || y <= 20", isCode: true },
    ],
    correctId: "C",
    explanation:
      "De Morgan's Law: !(P || Q) = !P && !Q. Negating (x < 10) gives (x >= 10). Negating (y > 20) gives (y <= 20). The || flips to &&: x >= 10 && y <= 20.",
    trap: "De Morgan's: NOT(A OR B) = NOT A AND NOT B; the operator flips from || to &&",
  },
  {
    id: 14,
    unit: 2,
    cedTopic: "2.7",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int x = 100;
int count = 0;
while (x > 1) {
    x /= 2;
    count++;
}
System.out.println(count);`,
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "7" },
      { id: "C", text: "100" },
      { id: "D", text: "5" },
    ],
    correctId: "A",
    explanation:
      "x progresses: 100→50(1)→25(2)→12(3)→6(4)→3(5)→1(6). When x = 1, the condition x > 1 is false and the loop exits. count = 6.",
    trap: "the loop runs when x > 1, so it stops when x reaches exactly 1 — not before",
  },
  {
    id: 15,
    unit: 2,
    cedTopic: "2.11",
    skill: "3.A",
    questionSetId: "qs1b",
    questionSetLabel: "Questions 15 and 16 refer to the following code segment.",
    sharedCode: `for (int i = 1; i <= 4; i++) {
    for (int j = i; j <= 4; j++) {
        System.out.print("* ");
    }
    System.out.println();
}`,
    question: "What is printed as a result of executing the code segment above?",
    options: [
      { id: "A", text: "* * * * \n* * * * \n* * * * \n* * * * " },
      { id: "B", text: "* * * \n* * \n* " },
      { id: "C", text: "* * * * \n* * * \n* * \n* " },
      { id: "D", text: "* \n* * \n* * * \n* * * * " },
    ],
    correctId: "C",
    explanation:
      "i=1: inner loop j runs from 1 to 4 → 4 stars. i=2: j runs from 2 to 4 → 3 stars. i=3: j runs from 3 to 4 → 2 stars. i=4: j runs from 4 to 4 → 1 star. Each row starts at j=i, so the count decreases each row.",
    trap: "inner loop starts at j=i, not j=1 — each row has one fewer star than the last",
  },
  {
    id: 16,
    unit: 2,
    cedTopic: "2.11",
    skill: "3.A",
    questionSetId: "qs1b",
    question:
      "How many total stars are printed by the code segment above?",
    options: [
      { id: "A", text: "4" },
      { id: "B", text: "10" },
      { id: "C", text: "16" },
      { id: "D", text: "8" },
    ],
    correctId: "B",
    explanation:
      "Row totals: i=1 → 4, i=2 → 3, i=3 → 2, i=4 → 1. Total: 4 + 3 + 2 + 1 = 10.",
    trap: "sum the inner loop counts per outer iteration: 4+3+2+1 = 10",
  },
  {
    id: 17,
    unit: 2,
    cedTopic: "2.8",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int[] arr = {3, 7, 2, 9, 5};
int result = 0;
for (int i = 0; i < arr.length; i++) {
    result += arr[i];
}
System.out.println(result / arr.length);`,
    options: [
      { id: "A", text: "An ArithmeticException is thrown" },
      { id: "B", text: "5" },
      { id: "C", text: "5.2" },
      { id: "D", text: "26" },
    ],
    correctId: "B",
    explanation:
      "The loop sums all elements: 3+7+2+9+5 = 26. result / arr.length is 26 / 5. Both are int, so integer division truncates: 26 / 5 = 5, not 5.2.",
    trap: "int / int produces an int — 26/5 = 5 (not 5.2); cast to double to get the decimal",
  },
  {
    id: 18,
    unit: 2,
    cedTopic: "2.8",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int count = 0;
for (int i = 0; i <= 10; i += 2) {
    count++;
}
System.out.println(count);`,
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "11" },
      { id: "C", text: "5" },
      { id: "D", text: "10" },
    ],
    correctId: "A",
    explanation:
      "i takes values: 0, 2, 4, 6, 8, 10. The condition i <= 10 is still true when i = 10, so the loop body executes 6 times.",
    trap: "i <= 10 (not i < 10) means i=10 is included — 6 iterations, not 5",
  },
  {
    id: 19,
    unit: 2,
    cedTopic: "2.7",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int n = 1024;
int count = 0;
while (n > 0) {
    n /= 10;
    count++;
}
System.out.println(count);`,
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "4" },
      { id: "C", text: "5" },
      { id: "D", text: "1024" },
    ],
    correctId: "B",
    explanation:
      "Each iteration removes one digit by dividing by 10. 1024→102(1)→10(2)→1(3)→0(4). When n=0, the condition n > 0 is false. count = 4 (the number of digits in 1024).",
    trap: "trace each division carefully — the loop body executes once for each digit, not for each value of n",
  },
  {
    id: 20,
    unit: 2,
    cedTopic: "2.9",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int[] arr = {4, 7, 1, 9, 3};
int target = 9;
int found = -1;
for (int i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
        found = i;
    }
}
System.out.println(found);`,
    options: [
      { id: "A", text: "9" },
      { id: "B", text: "-1" },
      { id: "C", text: "4" },
      { id: "D", text: "3" },
    ],
    correctId: "D",
    explanation:
      "Sequential search: the loop scans every element. 9 is found at index 3. found is set to 3 and the loop continues (does not break early). Final value is 3.",
    trap: "found stores the index (3), not the value (9); -1 would print only if target was never found",
  },
  {
    id: 21,
    unit: 2,
    cedTopic: "2.2",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int x = 5;
boolean result = (x > 0) || (x++ > 10);
System.out.println(x);`,
    options: [
      { id: "A", text: "The code does not compile" },
      { id: "B", text: "6" },
      { id: "C", text: "11" },
      { id: "D", text: "5" },
    ],
    correctId: "D",
    explanation:
      "Short-circuit evaluation: (x > 0) is true. With ||, if the left operand is true, the right operand is NEVER evaluated. So x++ is not executed. x remains 5.",
    trap: "|| short-circuits: right side is skipped when left is true — x++ never runs",
  },
  {
    id: 22,
    unit: 2,
    cedTopic: "2.11",
    skill: "3.B",
    question:
      "How many times is the statement count++ executed when the following code segment is run?",
    code: `int count = 0;
for (int i = 1; i <= 4; i++) {
    for (int j = 0; j < i; j++) {
        count++;
    }
}`,
    options: [
      { id: "A", text: "10" },
      { id: "B", text: "4" },
      { id: "C", text: "8" },
      { id: "D", text: "16" },
    ],
    correctId: "A",
    explanation:
      "The inner loop runs i times for each outer iteration. i=1 → 1 increment, i=2 → 2, i=3 → 3, i=4 → 4. Total: 1 + 2 + 3 + 4 = 10.",
    trap: "the inner bound depends on i, so the total is a triangular sum (1+2+3+4), not 4 × 4",
  },

  // ── UNIT 3 ──────────────────────────────────────────────────────────────
  {
    id: 23,
    unit: 3,
    cedTopic: "3.3",
    skill: "3.C",
    question:
      "Assume the following class definition exists. What is printed when the given code segment executes?",
    code: `public class Circle {
    private double radius;

    public Circle(double r) {
        radius = r;
    }

    public double getRadius() {
        return radius;
    }
}

// Code segment:
Circle c = new Circle(3.0);
System.out.println(c.getRadius());`,
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "9.0" },
      { id: "C", text: "3.0" },
      { id: "D", text: "6.0" },
    ],
    correctId: "C",
    explanation:
      "new Circle(3.0) sets radius = 3.0. getRadius() returns the double field, which prints as 3.0 — not the integer 3. Java prints doubles with a decimal point.",
    trap: "getRadius() returns a double, so it prints as 3.0, not 3",
  },
  {
    id: 24,
    unit: 3,
    cedTopic: "5.A",
    skill: "2.B",
    question:
      "Which of the following correctly defines a mutator (setter) method for a private int field named score?",
    options: [
      {
        id: "A",
        text: "public int setScore(int newScore) { score = newScore; }",
        isCode: true,
      },
      {
        id: "B",
        text: "private void setScore(int newScore) { score = newScore; }",
        isCode: true,
      },
      {
        id: "C",
        text: "public void setScore() { score = score; }",
        isCode: true,
      },
      {
        id: "D",
        text: "public void setScore(int newScore) { score = newScore; }",
        isCode: true,
      },
    ],
    correctId: "D",
    explanation:
      "A mutator should be public (so callers can use it), return void (it modifies state, not returns a value), and accept the new value as a parameter. Option A returns int unnecessarily. Option B is private, so callers cannot access it. Option C has no parameter and assigns score to itself.",
    trap: "mutator: public, void, one parameter of the field's type",
  },
  {
    id: 25,
    unit: 3,
    cedTopic: "3.7",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `public class MathHelper {
    public static int square(int n) {
        return n * n;
    }
}

// Code segment:
System.out.println(MathHelper.square(5));`,
    options: [
      { id: "A", text: "25" },
      { id: "B", text: "10" },
      { id: "C", text: "5" },
      { id: "D", text: "Compile error — square() must be called on an instance" },
    ],
    correctId: "A",
    explanation:
      "square(5) returns 5 * 5 = 25. Because square is declared static, it is called on the class name (MathHelper.square(5)), not on an object instance. This is valid and correct.",
    trap: "static methods are called on the class name, not on an object — no instance needed",
  },
  {
    id: 26,
    unit: 3,
    cedTopic: "3.4",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `public class Student {
    private String name;
    private int grade;

    public Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }

    public String getName() { return name; }
    public int getGrade() { return grade; }
}

// Code segment:
Student s = new Student("Alice", 95);
System.out.println(s.getName() + " " + s.getGrade());`,
    options: [
      { id: "A", text: '"Alice grade"' },
      { id: "B", text: '"Alice 95"' },
      { id: "C", text: '"name 0"' },
      { id: "D", text: '"null 0"' },
    ],
    correctId: "B",
    explanation:
      "this.name = name and this.grade = grade correctly assign the constructor parameters to the instance variables. getName() returns \"Alice\" and getGrade() returns 95.",
    trap: "this. distinguishes instance variable from parameter — both are assigned correctly here",
  },
  {
    id: 27,
    unit: 3,
    cedTopic: "3.8",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `public class Account {
    private int balance = 100;

    public void add(int balance) {
        balance += 50;
        System.out.println(balance);
    }

    public int getBalance() { return balance; }
}

// Code segment:
Account a = new Account();
a.add(30);
System.out.println(a.getBalance());`,
    options: [
      { id: "A", text: "150\n100" },
      { id: "B", text: "80\n100" },
      { id: "C", text: "150\n150" },
      { id: "D", text: "80\n150" },
    ],
    correctId: "B",
    explanation:
      "In add(30), the parameter balance = 30. balance += 50 modifies only the parameter → 80. The instance variable balance is never touched because add() has no this.balance statement. getBalance() returns the untouched instance variable → 100.",
    trap: "a parameter with the same name as an instance variable shadows it; modifying the parameter does NOT change the instance variable",
  },
  {
    id: 28,
    unit: 3,
    cedTopic: "3.5",
    skill: "3.D",
    question:
      "Which of the following best describes the error in the method below?",
    code: `public int getDoubleValue(int x) {
    int result = x * 2;
}`,
    options: [
      { id: "A", text: "int is the wrong return type for this operation" },
      { id: "B", text: "result is not declared correctly" },
      { id: "C", text: "x * 2 may overflow for large values of x" },
      { id: "D", text: "The method is missing a return statement" },
    ],
    correctId: "D",
    explanation:
      "The method declares a return type of int, so it must return an int value with a return statement. The method computes result but never returns it. Adding return result; before the closing brace fixes the error.",
    trap: "a non-void method that computes a value but lacks a return statement will not compile",
  },
  {
    id: 29,
    unit: 3,
    cedTopic: "3.2",
    skill: "5.A",
    question:
      "A social media platform uses an algorithm to rank posts in users' feeds. An analysis finds the algorithm consistently amplifies content from accounts with large follower counts, regardless of content quality, making it harder for new accounts to gain visibility. This outcome is best described as:",
    options: [
      { id: "A", text: "A compile-time error in the sorting algorithm" },
      { id: "B", text: "A NullPointerException in the recommendation engine" },
      {
        id: "C",
        text: "Integer overflow in the engagement score calculation",
      },
      { id: "D", text: "Algorithmic amplification that systematically disadvantages smaller creators" },
    ],
    correctId: "D",
    explanation:
      "When an algorithm consistently produces outcomes that favor one group over another — regardless of merit — this is a form of algorithmic bias or amplification. It is an ethical concern about computing's societal impact, not a programming error.",
    trap: "unequal outcomes from an algorithm are an ethical concern, not a runtime or syntax error",
  },

  // ── UNIT 4 ──────────────────────────────────────────────────────────────
  {
    id: 30,
    unit: 4,
    cedTopic: "4.3",
    skill: "3.B",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String[] names = new String[3];
System.out.println(names[0]);
System.out.println(names[0] == null);`,
    options: [
      { id: "A", text: "null\ntrue" },
      { id: "B", text: "null\nfalse" },
      { id: "C", text: '""\nfalse' },
      { id: "D", text: '""\ntrue' },
    ],
    correctId: "A",
    explanation:
      "Arrays of reference types (like String[]) are initialized to null, not \"\". names[0] is null, so printing it outputs the word null. null == null is true.",
    trap: "String arrays default to null — not empty string; int arrays default to 0",
  },
  {
    id: 31,
    unit: 4,
    cedTopic: "4.5",
    skill: "3.B",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int[] grades = {85, 92, 78, 65, 90, 88};
int count = 0;
for (int g : grades) {
    if (g >= 90) count++;
}
System.out.println(count);`,
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "6" },
      { id: "C", text: "1" },
      { id: "D", text: "2" },
    ],
    correctId: "D",
    explanation:
      "Values >= 90: 92 ✓ and 90 ✓. 85, 78, 65, and 88 do not qualify. count = 2.",
    trap: "90 >= 90 is true (use >= not >); count only the elements meeting the condition",
  },
  {
    id: 32,
    unit: 4,
    cedTopic: "4.6",
    skill: "2.A",
    question:
      "Which of the following code segments correctly reads all lines from a text file named \"data.txt\" one line at a time?",
    options: [
      {
        id: "A",
        text: 'Scanner sc = new Scanner("data.txt");\nwhile (sc.hasNext()) {\n    System.out.println(sc.next());\n}',
        isCode: true,
      },
      {
        id: "B",
        text: 'Scanner sc = new Scanner(new File("data.txt"));\nwhile (sc.hasNextLine()) {\n    String line = sc.nextLine();\n}',
        isCode: true,
      },
      {
        id: "C",
        text: 'File f = new File("data.txt");\nwhile (f.hasNextLine()) {\n    System.out.println(f.nextLine());\n}',
        isCode: true,
      },
      {
        id: "D",
        text: 'Scanner sc = new Scanner(System.in);\nwhile (sc.hasNextLine()) {\n    sc.nextLine();\n}',
        isCode: true,
      },
    ],
    correctId: "B",
    explanation:
      "Scanner must be constructed with a File object to read from a file. hasNextLine() checks whether another line exists. Option A passes a String literal (Scanner treats it as data). Option C calls methods on File directly — File has no hasNextLine() method. Option D reads from standard input.",
    trap: "Scanner(new File(\"name\")) reads a file; Scanner(\"text\") treats the string itself as input",
  },
  {
    id: 33,
    unit: 4,
    cedTopic: "4.9",
    skill: "3.B",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `ArrayList<String> list = new ArrayList<String>();
list.add("cat");
list.add("dog");
list.add("bird");
list.remove(1);
System.out.println(list.get(1));
System.out.println(list.size());`,
    options: [
      { id: "A", text: '"bird"\n3' },
      { id: "B", text: '"dog"\n2' },
      { id: "C", text: '"bird"\n2' },
      { id: "D", text: '"cat"\n3' },
    ],
    correctId: "C",
    explanation:
      'After three add() calls: [cat, dog, bird]. remove(1) removes the element at index 1 ("dog") and shifts remaining elements left: [cat, bird]. get(1) = "bird". size() = 2.',
    trap: "remove(int) removes by index and shifts subsequent elements — size decreases by 1",
  },
  {
    id: 34,
    unit: 4,
    cedTopic: "4.10",
    skill: "3.D",
    question:
      "Which of the following code segments correctly removes all elements greater than 10 from ArrayList<Integer> nums?",
    options: [
      {
        id: "A",
        text: "for (int n : nums) {\n    if (n > 10) nums.remove(n);\n}",
        isCode: true,
      },
      {
        id: "B",
        text: "for (int i = nums.size() - 1; i >= 0; i--) {\n    if (nums.get(i) > 10) nums.remove(i);\n}",
        isCode: true,
      },
      {
        id: "C",
        text: "for (int i = 0; i < nums.size(); i++) {\n    if (nums.get(i) > 10) nums.remove(i);\n}",
        isCode: true,
      },
      {
        id: "D",
        text: "nums.remove(10);",
        isCode: true,
      },
    ],
    correctId: "B",
    explanation:
      "Backward traversal (high to low index) is correct: removing at index i does not affect the indices of elements already visited (those at i+1 and above, which have already been processed). Option C skips the element after each removal. Option A modifies the list during a for-each loop, causing a ConcurrentModificationException. Option D removes at index 10, not the value 10.",
    trap: "removing during forward traversal skips the next element — always traverse backward when removing",
  },
  {
    id: 35,
    unit: 4,
    cedTopic: "4.9",
    skill: "3.B",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `ArrayList<Integer> nums = new ArrayList<Integer>();
nums.add(5);
nums.add(10);
nums.add(15);
nums.add(20);
nums.set(2, 99);
System.out.println(nums.get(2));
System.out.println(nums.size());`,
    options: [
      { id: "A", text: "99\n4" },
      { id: "B", text: "99\n3" },
      { id: "C", text: "15\n3" },
      { id: "D", text: "15\n4" },
    ],
    correctId: "A",
    explanation:
      "After four add() calls: [5, 10, 15, 20]. set(2, 99) replaces the element at index 2 without changing size: [5, 10, 99, 20]. get(2) = 99. size() remains 4.",
    trap: "set() replaces an existing element — it does NOT insert or change the list's size",
  },
  {
    id: 36,
    unit: 4,
    cedTopic: "4.11",
    skill: "3.B",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int[][] table = new int[4][2];
System.out.println(table.length);
System.out.println(table[0].length);
System.out.println(table.length * table[0].length);`,
    options: [
      { id: "A", text: "2\n4\n8" },
      { id: "B", text: "4\n2\n6" },
      { id: "C", text: "4\n2\n8" },
      { id: "D", text: "8\n0\n0" },
    ],
    correctId: "C",
    explanation:
      "new int[4][2] creates 4 rows and 2 columns. table.length = 4 (rows). table[0].length = 2 (columns). Total elements = 4 × 2 = 8.",
    trap: "table.length = rows (first dimension); table[0].length = columns (second dimension)",
  },
  {
    id: 37,
    unit: 4,
    cedTopic: "4.12",
    skill: "3.B",
    questionSetId: "qs2b",
    questionSetLabel: "Questions 37 and 38 refer to the following 2D array.",
    sharedCode: `int[][] scores = {
    {10, 20, 30},
    {40, 50, 60},
    {70, 80, 90},
    {100, 110, 120}
};`,
    question:
      "Using the scores array defined above, what is the value of scores[3][1]?",
    options: [
      { id: "A", text: "110" },
      { id: "B", text: "100" },
      { id: "C", text: "80" },
      { id: "D", text: "120" },
    ],
    correctId: "A",
    explanation:
      "scores[row][col]. Row 3 is {100, 110, 120}. Column 1 of that row is 110. scores[3][1] = 110.",
    trap: "first index is row, second is column — scores[3][1] is row 3, column 1",
  },
  {
    id: 38,
    unit: 4,
    cedTopic: "4.13",
    skill: "3.B",
    questionSetId: "qs2b",
    question:
      "What is printed as a result of executing the following code segment using the scores array defined above?",
    code: `int total = 0;
for (int c = 0; c < scores[0].length; c++) {
    total += scores[0][c];
}
System.out.println(total);`,
    options: [
      { id: "A", text: "30" },
      { id: "B", text: "60" },
      { id: "C", text: "150" },
      { id: "D", text: "220" },
    ],
    correctId: "B",
    explanation:
      "The loop iterates over columns of row 0: scores[0][0]=10, scores[0][1]=20, scores[0][2]=30. Total = 10 + 20 + 30 = 60.",
    trap: "loop uses scores[0].length (columns), so it sums only row 0 — not all rows",
  },
  {
    id: 39,
    unit: 4,
    cedTopic: "4.15",
    skill: "4.A",
    question:
      "A sorted array contains 64 elements. What is the maximum number of comparisons needed to determine whether a target value exists in the array using binary search?",
    options: [
      { id: "A", text: "8" },
      { id: "B", text: "6" },
      { id: "C", text: "32" },
      { id: "D", text: "64" },
    ],
    correctId: "B",
    explanation:
      "Binary search halves the search space each step. Starting with 64 elements: after 1 comparison, 32 candidates remain; then 16, 8, 4, 2, 1. That's 6 halvings, so at most 6 comparisons are needed to find the target or rule it out.",
    trap: "binary search counts halvings (64 → 32 → 16 → 8 → 4 → 2 → 1), not n or n/2",
  },
  {
    id: 40,
    unit: 4,
    cedTopic: "4.16",
    skill: "3.C",
    question:
      "Assume the following method exists. What value is returned by the call mystery(5)?",
    code: `public static int mystery(int n) {
    if (n == 0) return 0;
    return mystery(n - 1) + n;
}`,
    options: [
      { id: "A", text: "10" },
      { id: "B", text: "20" },
      { id: "C", text: "5" },
      { id: "D", text: "15" },
    ],
    correctId: "D",
    explanation:
      "Trace: mystery(5) = mystery(4)+5 = mystery(3)+4+5 = mystery(2)+3+4+5 = mystery(1)+2+3+4+5 = mystery(0)+1+2+3+4+5 = 0+1+2+3+4+5 = 15. This computes the sum 1 through n.",
    trap: "trace recursive calls all the way to the base case before adding back up",
  },
  {
    id: 41,
    unit: 4,
    cedTopic: "4.14",
    skill: "3.A",
    question:
      "Consider insertion sort applied to the array {6, 3, 8, 2, 5}. After the first pass of the outer loop (inserting the second element into its correct position), what is the array state?",
    options: [
      { id: "A", text: "{6, 3, 8, 2, 5}" },
      { id: "B", text: "{3, 2, 8, 6, 5}" },
      { id: "C", text: "{2, 3, 8, 6, 5}" },
      { id: "D", text: "{3, 6, 8, 2, 5}" },
    ],
    correctId: "D",
    explanation:
      "Insertion sort starts at index 1. The key is 3. Comparing 3 < 6: shift 6 right. Insert 3 at index 0. The rest of the array is untouched: {3, 6, 8, 2, 5}.",
    trap: "insertion sort only moves the key and shifts elements one pass at a time — the rest of the array is unchanged",
  },
  {
    id: 42,
    unit: 4,
    cedTopic: "4.2",
    skill: "1.B",
    question:
      "A program needs to store exactly 30 student test scores (all integers). The number of students is fixed and known at compile time, and the program must access scores by index. Which data structure is most appropriate?",
    options: [
      { id: "A", text: "int[] of length 30" },
      { id: "B", text: "ArrayList<Integer>" },
      { id: "C", text: "A single int variable" },
      { id: "D", text: "A 2D int array" },
    ],
    correctId: "A",
    explanation:
      "When the count is fixed and known, an int[] is more appropriate than an ArrayList — it is simpler, avoids autoboxing overhead, and has fixed-size semantics that match the problem. ArrayList is best when the count is unknown or changes dynamically. B 2D array would be overkill for a flat list. B single int can only hold one value.",
    trap: "fixed known count → array; unknown or growing count → ArrayList",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 4 FRQs — fixed structure every year  (Practice Exam 2)
// ─────────────────────────────────────────────────────────────────────────────

export const examFRQs2: ExamFRQ[] = [
  // ── FRQ 1: Methods and Control Structures (7 pts) ───────────────────────
  {
    id: 1,
    type: "Methods and Control Structures",
    totalPoints: 7,
    title: "TextStats",
    scenario:
      "A TextStats object analyzes the word counts of lines of text. The class has instance variables for the maximum words allowed per line (maxWordsPerLine) and a running total of words processed (totalWords). One helper method is provided: countWords(String line) returns the number of words in the given line. Another method, addToTotal(int n), is already fully implemented and adds n to totalWords. You will write two new methods for this class.",
    givenCode: `public class TextStats {
    private int maxWordsPerLine;
    private int totalWords;

    public TextStats(int maxWords) {
        maxWordsPerLine = maxWords;
        totalWords = 0;
    }

    /**
     * Returns the number of words in the given line.
     * Precondition: line is not null
     */
    public int countWords(String line) { /* implementation not shown */ }

    /** Adds n to the running total of words processed. */
    public void addToTotal(int n) { totalWords += n; }

    /** Returns the capped word count for line, as described in part (a). */
    public int processLine(String line)
    { /* to be implemented in part (a) */ }

    /**
     * Returns the number of lines in lines whose processed word count
     * equals maxWordsPerLine, as described in part (b).
     * Precondition: lines is not null
     */
    public int countLongLines(String[] lines)
    { /* to be implemented in part (b) */ }
}`,
    parts: [
      {
        letter: "A",
        points: 4,
        prompt:
          "Write the method processLine(String line). The method should count the words in line using the provided helper. The processed count is determined as follows: if the raw word count is less than or equal to maxWordsPerLine, the processed count equals the raw count; otherwise, the processed count is maxWordsPerLine (the count is capped). In addition, every time a line exceeds maxWordsPerLine, a penalty of 1 must be added to the running total (using addToTotal). The processed count itself must also be added to the running total (using addToTotal). Return the processed count. Each call to addToTotal must use the smallest correct argument; do not combine the processed count and the penalty into a single addToTotal call.",
        sampleAnswer: `public int processLine(String line) {
    int count = countWords(line);
    int processed;
    if (count > maxWordsPerLine) {
        processed = maxWordsPerLine;
        addToTotal(1);
    } else {
        processed = count;
    }
    addToTotal(processed);
    return processed;
}`,
        rubricPoints: [
          {
            text: "Calls countWords(line) and stores the result for later use",
            points: 1,
          },
          {
            text: "Conditional correctly distinguishes count > maxWordsPerLine from count <= maxWordsPerLine and assigns processed accordingly (count in the under/equal case, maxWordsPerLine in the over case)",
            points: 1,
          },
          {
            text: "Calls addToTotal(1) only when the line exceeded maxWordsPerLine (penalty is applied exactly when over the cap)",
            points: 1,
          },
          {
            text: "Calls addToTotal(processed) with the capped value AND returns the processed count",
            points: 1,
          },
        ],
        commonMistakes: [
          "Applying the penalty unconditionally (calling addToTotal(1) outside the if-branch)",
          "Using >= instead of > so the penalty fires when count equals maxWordsPerLine",
          "Passing the raw count to addToTotal instead of the capped value",
          "Combining the penalty and processed count into a single addToTotal(processed + 1) call — the rubric requires separate calls",
          "Returning the raw count instead of the capped (processed) count",
          "Forgetting to return a value (method must return int)",
        ],
      },
      {
        letter: "B",
        points: 3,
        prompt:
          "Write the method countLongLines(String[] lines). The method should call processLine for each String in the lines array. Count and return the number of lines whose processed word count equals maxWordsPerLine (i.e., lines that were at or over the cap). Assume that processLine works as intended, regardless of what you wrote in part (a). You must call processLine appropriately in order to receive full credit.",
        sampleAnswer: `public int countLongLines(String[] lines) {
    int longCount = 0;
    for (String line : lines) {
        int processed = processLine(line);
        if (processed == maxWordsPerLine) {
            longCount++;
        }
    }
    return longCount;
}`,
        rubricPoints: [
          {
            text: "Loop correctly iterates over every element in the lines array",
            points: 1,
          },
          {
            text: "Calls processLine(line) exactly once per iteration with the current element — not a constant, index, or the wrong variable — and uses the return value",
            points: 1,
          },
          {
            text: "Correctly counts lines where the return value equals maxWordsPerLine and returns the count",
            points: 1,
          },
        ],
        commonMistakes: [
          "Calling processLine with the wrong argument (e.g., the index instead of the element)",
          "Calling processLine twice per loop iteration",
          "Using > maxWordsPerLine instead of == maxWordsPerLine in the condition",
          "Not returning longCount at the end",
          "Using lines.size() instead of lines.length (String[] uses .length, not .size())",
        ],
      },
    ],
  },

  // ── FRQ 2: Class Design (7 pts) ─────────────────────────────────────────
  {
    id: 2,
    type: "Class Design",
    totalPoints: 7,
    title: "BankAccount",
    scenario:
      "Write a complete class called BankAccount that models a simple bank account. The class stores the account owner's name, the current balance (which always starts at 0.0 when the account is opened), and an interest rate. It provides a method to deposit money and a method that returns the account's current status as a String.",
    givenCode: `/* Write the complete BankAccount class below.
 *
 * The class must have:
 *   - private String ownerName
 *   - private double balance   (initialized to 0.0 in the constructor)
 *   - private double interestRate
 *
 *   Constructor: BankAccount(String name, double rate)
 *
 *   Methods:
 *     void deposit(double amount)   — adds amount to balance
 *     String getStatus()            — returns account status:
 *                                       "Positive" if balance > 0
 *                                       "Zero"     if balance == 0
 *                                       "Negative" if balance < 0
 */`,
    parts: [
      {
        letter: "A",
        points: 7,
        prompt:
          "Write the complete BankAccount class. Include all private instance variables, the constructor, the deposit method, and the getStatus method as described above.",
        sampleAnswer: `public class BankAccount {
    private String ownerName;
    private double balance;
    private double interestRate;

    public BankAccount(String name, double rate) {
        ownerName = name;
        balance = 0.0;
        interestRate = rate;
    }

    public void deposit(double amount) {
        balance += amount;
    }

    public String getStatus() {
        if (balance > 0) return "Positive";
        else if (balance == 0) return "Zero";
        else return "Negative";
    }
}`,
        rubricPoints: [
          {
            text: "Class header: public class BankAccount",
            points: 1,
          },
          {
            text: "All three instance variables declared private with correct types (String, double, double)",
            points: 1,
          },
          {
            text: "Constructor header correct: public BankAccount(String name, double rate)",
            points: 1,
          },
          {
            text: "Constructor body correctly assigns all fields, including balance = 0.0",
            points: 1,
          },
          {
            text: "deposit() correctly adds amount to balance",
            points: 1,
          },
          {
            text: "getStatus() correctly identifies the balance > 0 case",
            points: 1,
          },
          {
            text: "getStatus() handles all three cases and returns the correct String for each",
            points: 1,
          },
        ],
        commonMistakes: [
          "Declaring instance variables public instead of private",
          "Not initializing balance to 0.0 in the constructor",
          "Returning int (0, 1, -1) instead of String in getStatus()",
          "Checking balance < 0 before balance == 0 — order matters for edge cases",
          "Missing return statement in a branch of getStatus()",
          "Declaring getStatus() as void instead of String",
          "Using == to compare double values in the 'Zero' case — acceptable on AP exam but floating-point equality is fragile in practice",
        ],
      },
    ],
  },

  // ── FRQ 3: Data Analysis with ArrayList (5 pts) ──────────────────────────
  {
    id: 3,
    type: "Data Analysis with ArrayList",
    totalPoints: 5,
    title: "Leaderboard",
    scenario:
      "A Leaderboard class tracks player names and their corresponding scores using two parallel ArrayLists. The class has two instance variables already declared: an ArrayList<String> named names and an ArrayList<Integer> named scores. You will write the constructor that populates both lists and a method that finds the top player.",
    givenCode: `public class Leaderboard {
    private ArrayList<String> names;
    private ArrayList<Integer> scores;

    // Part (a): write the constructor here

    // Part (b): write getTopPlayer here
}`,
    parts: [
      {
        letter: "A",
        points: 2,
        prompt:
          "Write the constructor Leaderboard(String[] playerNames, int[] playerScores). The constructor should initialize both names and scores as new ArrayLists (do NOT redeclare their types). Then use a single index-based loop to add each player's name and score at the same index from the two input arrays into the respective lists.",
        sampleAnswer: `public Leaderboard(String[] playerNames, int[] playerScores) {
    names = new ArrayList<String>();
    scores = new ArrayList<Integer>();
    for (int i = 0; i < playerNames.length; i++) {
        names.add(playerNames[i]);
        scores.add(playerScores[i]);
    }
}`,
        rubricPoints: [
          {
            text: "Initializes both names and scores as new ArrayLists without redeclaring their types",
            points: 1,
          },
          {
            text: "Uses an index-based loop to add both playerNames[i] and playerScores[i] to the respective lists for each i",
            points: 1,
          },
        ],
        commonMistakes: [
          "Redeclaring with type: ArrayList<String> names = new ArrayList<>() — creates a local variable",
          "Only initializing one of the two lists",
          "Using a for-each loop (cannot access both arrays at the same index simultaneously)",
          "Adding to the wrong list (e.g., names.add(playerScores[i]))",
        ],
      },
      {
        letter: "B",
        points: 3,
        prompt:
          "Write the method getTopPlayer() that finds and returns the name of the player with the highest score. You may assume the lists are non-empty and that scores contains no ties for the maximum. Use the parallel structure of names and scores to retrieve the correct name.",
        sampleAnswer: `public String getTopPlayer() {
    int maxScore = scores.get(0);
    int maxIndex = 0;
    for (int i = 1; i < scores.size(); i++) {
        if (scores.get(i) > maxScore) {
            maxScore = scores.get(i);
            maxIndex = i;
        }
    }
    return names.get(maxIndex);
}`,
        rubricPoints: [
          {
            text: "Correctly initializes maxScore and maxIndex from index 0 before the loop",
            points: 1,
          },
          {
            text: "Loop correctly traverses scores list and updates maxIndex when a higher score is found",
            points: 1,
          },
          {
            text: "Returns names.get(maxIndex) — the player name at the index of the maximum score",
            points: 1,
          },
        ],
        commonMistakes: [
          "Initializing maxScore to 0 instead of scores.get(0) — fails if all scores are negative",
          "Returning the max score (an int) instead of the player name (a String)",
          "Using names.get(i) inside the loop instead of maxIndex to track position",
          "Starting the loop at i=0 and forgetting to initialize maxIndex before the loop",
          "Accessing scores.get(scores.size()) — off-by-one causing ArrayIndexOutOfBoundsException",
        ],
      },
    ],
  },

  // ── FRQ 4: 2D Array (6 pts) ──────────────────────────────────────────────
  {
    id: 4,
    type: "2D Array",
    totalPoints: 6,
    title: "HeatMap",
    scenario:
      "A HeatMap class stores hourly temperature readings in a 2D integer array, where each row represents a day and each column represents an hour within that day. Temperatures are generated randomly. The class has one instance variable: a 2D int array named temps. You will write the constructor and a method to count heat-wave hours.",
    givenCode: `public class HeatMap {
    private int[][] temps;

    // Part (a): write the constructor here

    // Part (b): write countHeatWaveHours here
}`,
    parts: [
      {
        letter: "A",
        points: 3,
        prompt:
          "Write the constructor HeatMap(int days, int hoursPerDay). The constructor should allocate temps as a 2D int array with days rows and hoursPerDay columns. Initialize every cell to a random integer in the range [60, 99] inclusive using the expression (int)(Math.random() * 40) + 60.",
        sampleAnswer: `public HeatMap(int days, int hoursPerDay) {
    temps = new int[days][hoursPerDay];
    for (int r = 0; r < temps.length; r++) {
        for (int c = 0; c < temps[0].length; c++) {
            temps[r][c] = (int)(Math.random() * 40) + 60;
        }
    }
}`,
        rubricPoints: [
          {
            text: "Allocates temps as new int[days][hoursPerDay] with correct dimension order",
            points: 1,
          },
          {
            text: "Nested loop structure is correct: outer iterates rows (temps.length), inner iterates columns (temps[0].length)",
            points: 1,
          },
          {
            text: "Each cell assigned (int)(Math.random() * 40) + 60 (or equivalent expression yielding integers in [60, 99])",
            points: 1,
          },
        ],
        commonMistakes: [
          "Swapping days and hoursPerDay: new int[hoursPerDay][days]",
          "Confusing temps.length (rows) and temps[0].length (cols) in loop bounds",
          "Wrong random range: (int)(Math.random() * 100) gives [0,99], not [60,99]",
          "Accessing temps[c][r] instead of temps[r][c]",
          "Forgetting the + 60 offset — produces values in [0, 39] instead of [60, 99]",
        ],
      },
      {
        letter: "B",
        points: 3,
        prompt:
          "Write the method countHeatWaveHours(int threshold). The method should traverse every cell in the temps array and count the number of cells where the temperature is greater than or equal to threshold. Return the total count.",
        sampleAnswer: `public int countHeatWaveHours(int threshold) {
    int count = 0;
    for (int r = 0; r < temps.length; r++) {
        for (int c = 0; c < temps[0].length; c++) {
            if (temps[r][c] >= threshold) {
                count++;
            }
        }
    }
    return count;
}`,
        rubricPoints: [
          {
            text: "Correct nested loop traversal: outer over rows (temps.length), inner over columns (temps[0].length)",
            points: 1,
          },
          {
            text: "Correctly checks temps[r][c] >= threshold (not > threshold)",
            points: 1,
          },
          { text: "Returns the accumulated count", points: 1 },
        ],
        commonMistakes: [
          "Using temps.length for both loop bounds (visits wrong cells for non-square arrays)",
          "Using > threshold instead of >= threshold (excludes cells equal to the threshold)",
          "Accessing temps[c][r] instead of temps[r][c]",
          "Not initializing count before the loops",
          "Not returning count at the end",
        ],
      },
    ],
  },
];
