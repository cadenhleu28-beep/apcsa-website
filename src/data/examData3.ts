import type { ExamMCQ, ExamFRQ } from "../types/exam";

// ─────────────────────────────────────────────────────────────────────────────
// 42 MCQ  —  2025-2026 AP CSA distribution  (Practice Exam 3)
//   Unit 1 (Using Objects & Methods):    Q1–Q10   (~10 qs, 15–25%)
//   Unit 2 (Selection & Iteration):      Q11–Q22  (~12 qs, 25–35%)
//   Unit 3 (Class Creation):             Q23–Q29  (~7  qs, 10–18%)
//   Unit 4 (Data Collections):           Q30–Q42  (~13 qs, 30–40%)
//
// Question Sets:
//   QS1: Q15 & Q16 share a while-loop code block
//   QS2: Q37 & Q38 share a 2D-array code block
// ─────────────────────────────────────────────────────────────────────────────

export const examMCQs3: ExamMCQ[] = [
  // ── UNIT 1 ──────────────────────────────────────────────────────────────
  {
    id: 1,
    unit: 1,
    cedTopic: "1.3",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String s = "ProgrammingClass";
int a = 3;
int b = 2;
String result = s.substring(a, a + b + 4) + "_" + (a + b);
System.out.println(result);`,
    options: [
      { id: "A", text: '"gramm_5"' },
      { id: "B", text: '"grammi_5"' },
      { id: "C", text: '"grammi_32"' },
      { id: "D", text: '"rammin_5"' },
    ],
    correctId: "B",
    explanation:
      '"ProgrammingClass" indices: P=0, r=1, o=2, g=3, r=4, a=5, m=6, m=7, i=8, n=9. substring(a, a + b + 4) = substring(3, 9). Because the end index is exclusive, substring(3, 9) returns characters at indices 3,4,5,6,7,8 → g,r,a,m,m,i → "grammi" (6 characters). Then "grammi" + "_" gives "grammi_". Finally (a + b) is parenthesized so the ints add first → 5, and concatenating "grammi_" + 5 → "grammi_5". Option A is the off-by-one (treating the end index as inclusive, giving 5 letters). Option C forgets the parentheses and concatenates 3 and 2 as "32". Option D miscounts the start index.',
    trap: "substring end index is EXCLUSIVE — substring(3, 9) gives 6 characters from index 3 to 8; parentheses around (a + b) force numeric addition before concatenation",
  },
  {
    id: 2,
    unit: 1,
    cedTopic: "1.2",
    skill: "3.A",
    question:
      "Which of the following assignments will cause a compile error in Java?",
    options: [
      { id: "A", text: "int n = 5.0;", isCode: true },
      { id: "B", text: "double d = 5;", isCode: true },
      { id: "C", text: "int m = 'A';", isCode: true },
      { id: "D", text: "boolean flag = false;", isCode: true },
    ],
    correctId: "A",
    explanation:
      "5.0 is a double literal. Assigning a double to an int requires an explicit cast because precision could be lost (narrowing conversion). Java prohibits this without a cast: int n = (int) 5.0; would compile. Options B, C, and D are valid: double can receive an int (widening), int can receive a char (char is an integral type, 'A' = 65), and boolean assignment of a boolean literal is always valid.",
    trap: "widening conversions (int→double, char→int) are automatic; narrowing conversions (double→int) require an explicit cast",
  },
  {
    id: 3,
    unit: 1,
    cedTopic: "1.5",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `double temp = -5.8;
int t = (int) temp;
System.out.println(t);`,
    options: [
      { id: "A", text: "-5.8" },
      { id: "B", text: "-6" },
      { id: "C", text: "-5" },
      { id: "D", text: "5" },
    ],
    correctId: "C",
    explanation:
      "Casting a double to int truncates toward zero — it removes the decimal portion without rounding. (int)(-5.8) drops the .8 and yields -5, not -6. Floor(-5.8) would be -6, but integer casting is not the same as Math.floor().",
    trap: "casting truncates toward zero, not toward negative infinity — (int)(-5.8) = -5, not -6",
  },
  {
    id: 4,
    unit: 1,
    cedTopic: "1.6",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int x = 10;
x++;
x += 3;
x /= 2;
System.out.println(x);`,
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "5" },
      { id: "C", text: "8" },
      { id: "D", text: "7" },
    ],
    correctId: "D",
    explanation:
      "Step by step: x=10 → x++ → 11 → x+=3 → 14 → x/=2 → 7 (integer division: 14/2 = 7 exactly, no truncation needed here). Compound operators modify x in place, left to right.",
    trap: "trace each operator in order: x++ increments first, then += adds, then /= divides",
  },
  {
    id: 5,
    unit: 1,
    cedTopic: "1.11",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `System.out.println(Math.abs(-7));
System.out.println(Math.pow(2, 4));`,
    options: [
      { id: "A", text: "7\n8.0" },
      { id: "B", text: "-7\n16.0" },
      { id: "C", text: "7\n16" },
      { id: "D", text: "7\n16.0" },
    ],
    correctId: "D",
    explanation:
      "Math.abs(-7) returns 7 (an int, since the argument is int). Math.pow(2, 4) returns 2^4 = 16 as a double, so it prints as 16.0. Math.pow always returns double. Math.pow(2,4) is not 8 — that would be 2^3.",
    trap: "Math.pow always returns double → prints 16.0 not 16; Math.pow(2,4) = 2⁴ = 16, not 2×4 = 8",
  },
  {
    id: 6,
    unit: 1,
    cedTopic: "1.15",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String s = "JavaProg";
System.out.println(s.charAt(4));
System.out.println(s.length());`,
    options: [
      { id: "A", text: "a\n8" },
      { id: "B", text: "P\n7" },
      { id: "C", text: "P\n8" },
      { id: "D", text: "r\n8" },
    ],
    correctId: "C",
    explanation:
      '"JavaProg": J=0, a=1, v=2, a=3, P=4, r=5, o=6, g=7. charAt(4) returns \'P\'. length() counts all 8 characters.',
    trap: "charAt uses zero-based indexing — index 4 is the 5th character",
  },
  {
    id: 7,
    unit: 1,
    cedTopic: "1.13",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String a = "Hi";
String b = null;
String c = null;
if (a.length() > 1) {
    c = a;
}
if (b == null) {
    b = c.substring(0, 1);
}
System.out.println(b + "-" + c.length());`,
    options: [
      { id: "A", text: '"H-2"' },
      { id: "B", text: '"Hi-2"' },
      { id: "C", text: "A NullPointerException is thrown" },
      { id: "D", text: '"null-0"' },
    ],
    correctId: "A",
    explanation:
      'a = "Hi", b = null, c = null. First if: a.length() = 2 > 1 is true → c = a, so c now references "Hi". Second if: b == null is true → b = c.substring(0, 1). Because c was reassigned to "Hi", c.substring(0, 1) is safe and returns "H", so b = "H". Final print: b + "-" + c.length() → "H" + "-" + 2 → "H-2". No NPE because c is no longer null by the time substring is called. Option C is the trap if you assume c is still null when substring runs.',
    trap: "trace assignments carefully — c is conditionally reassigned before being dereferenced, so the NullPointerException distractor is wrong; a method call on a reference that was reassigned to a non-null value is safe",
  },
  {
    id: 8,
    unit: 1,
    cedTopic: "1.14",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String s = "  Hello  ";
System.out.println(s.trim().length());`,
    options: [
      { id: "A", text: "5" },
      { id: "B", text: "9" },
      { id: "C", text: "7" },
      { id: "D", text: "4" },
    ],
    correctId: "A",
    explanation:
      'trim() removes leading and trailing whitespace: "  Hello  " → "Hello". Then length() is called on the trimmed String "Hello" → 5. Method calls chain left to right: trim() executes first, then length() is called on its result.',
    trap: "trim() removes only the surrounding spaces before length() counts — s still has 9 characters, but the trimmed result has 5",
  },
  {
    id: 9,
    unit: 1,
    cedTopic: "1.11",
    skill: "4.A",
    question:
      "Which of the following code segments correctly generates a random integer from 1 to 10, inclusive?",
    options: [
      {
        id: "A",
        text: "(int)(Math.random() * 10) + 1",
        isCode: true,
      },
      {
        id: "B",
        text: "(int)(Math.random() * 10)",
        isCode: true,
      },
      {
        id: "C",
        text: "(int)(Math.random() * 11) + 1",
        isCode: true,
      },
      {
        id: "D",
        text: "(int)(Math.random() * 9) + 1",
        isCode: true,
      },
    ],
    correctId: "A",
    explanation:
      "Math.random() returns [0.0, 1.0). Multiplied by 10 gives [0.0, 10.0). Casting to int gives {0, 1, ..., 9}. Adding 1 shifts to {1, 2, ..., 10}. Option B gives 0–9. Option C gives 1–11 (Math.random()*11 can yield [0.0,11.0), cast gives 0–10, +1 gives 1–11). Option D gives 1–9.",
    trap: "the multiplier equals the count of possible values (10 values: 1 through 10); +1 shifts the range up",
  },
  {
    id: 10,
    unit: 1,
    cedTopic: "1.15",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String word = "computer";
int idx = word.indexOf("put");
System.out.println(idx);
System.out.println(word.substring(idx, idx + 3));`,
    options: [
      { id: "A", text: '3\n"pute"' },
      { id: "B", text: '2\n"mpu"' },
      { id: "C", text: '4\n"ute"' },
      { id: "D", text: '3\n"put"' },
    ],
    correctId: "D",
    explanation:
      '"computer": c=0, o=1, m=2, p=3, u=4, t=5, e=6, r=7. The substring "put" starts at index 3 (p→3, u→4, t→5). substring(3, 3+3) = substring(3, 6) extracts indices 3,4,5 → "put". The end index in substring is exclusive.',
    trap: "indexOf returns the starting index of the first character of the match; substring end is exclusive",
  },

  // ── UNIT 2 ──────────────────────────────────────────────────────────────
  {
    id: 11,
    unit: 2,
    cedTopic: "2.2",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int x = 4;
boolean result = (x != 0) && (10 / x > 1);
System.out.println(result);`,
    options: [
      { id: "A", text: "An ArithmeticException is thrown" },
      { id: "B", text: "false" },
      { id: "C", text: "true" },
      { id: "D", text: "1" },
    ],
    correctId: "C",
    explanation:
      "x != 0 → 4 != 0 → true. Because the left operand of && is true, the right operand IS evaluated: 10 / 4 = 2 (integer division), 2 > 1 → true. true && true = true. In Java, booleans print as true/false, not 1/0.",
    trap: "&& evaluates the right side only when the left is true (short-circuit); here x != 0 is true so both sides are checked",
  },
  {
    id: 12,
    unit: 2,
    cedTopic: "2.3",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int n = 20;
String label;
if (n > 10) label = "big";
if (n > 15) label = "huge";
else if (n >= 20) label = "massive";
else label = "small";
System.out.println(label);`,
    options: [
      { id: "A", text: '"big"' },
      { id: "B", text: '"huge"' },
      { id: "C", text: '"massive"' },
      { id: "D", text: '"small"' },
    ],
    correctId: "B",
    explanation:
      'The first if is an INDEPENDENT statement (not chained): n > 10 → 20 > 10 → true, so label = "big". The second if begins a separate if/else-if/else chain: n > 15 → 20 > 15 → true, so label = "huge". Because the second condition matched, the else-if (n >= 20) is skipped — even though it would ALSO be true for n = 20. The final value of label is "huge". The first assignment to "big" is overwritten by the second statement.',
    trap: "two separate if statements both execute; once an else-if chain matches earlier, later branches are skipped even when their condition would also be true",
  },
  {
    id: 13,
    unit: 2,
    cedTopic: "2.4",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int x = 5;
int y = -3;
if (x > 0) {
    if (y > 0) {
        System.out.println("both positive");
    } else {
        System.out.println("x positive, y not");
    }
} else {
    System.out.println("x not positive");
}`,
    options: [
      { id: "A", text: '"both positive"' },
      { id: "B", text: '"x positive, y not"' },
      { id: "C", text: '"x not positive"' },
      { id: "D", text: "Nothing is printed" },
    ],
    correctId: "B",
    explanation:
      'x > 0 → 5 > 0 → true (enter outer if). y > 0 → -3 > 0 → false (skip inner if, enter inner else). Output: "x positive, y not". The outer else is never reached because x > 0 was true.',
    trap: "nested if: only the outer condition is tested first; the inner else belongs to the inner if, not the outer one",
  },
  {
    id: 14,
    unit: 2,
    cedTopic: "2.6",
    skill: "3.A",
    question:
      "Which of the following expressions is equivalent to !(a > 5 && b < 10)?",
    options: [
      { id: "A", text: "!(a <= 5) || !(b >= 10)", isCode: true },
      { id: "B", text: "a <= 5 && b >= 10", isCode: true },
      { id: "C", text: "a > 5 || b < 10", isCode: true },
      { id: "D", text: "a <= 5 || b >= 10", isCode: true },
    ],
    correctId: "D",
    explanation:
      "De Morgan's Law: !(P && Q) = !P || !Q. Negating (a > 5) gives (a <= 5). Negating (b < 10) gives (b >= 10). The && flips to ||: a <= 5 || b >= 10.",
    trap: "De Morgan's: NOT(A AND B) = NOT A OR NOT B — the operator flips from && to ||",
  },
  {
    id: 15,
    unit: 2,
    cedTopic: "2.7",
    skill: "3.A",
    questionSetId: "qs1c",
    questionSetLabel: "Questions 15 and 16 refer to the following code segment.",
    sharedCode: `int x = 1;
int sum = 0;
while (x <= 5) {
    sum += x;
    x++;
}
System.out.println(sum);
System.out.println(x);`,
    question: "What is printed as a result of executing the code segment above?",
    options: [
      { id: "A", text: "10\n5" },
      { id: "B", text: "15\n5" },
      { id: "C", text: "15\n6" },
      { id: "D", text: "14\n6" },
    ],
    correctId: "C",
    explanation:
      "The loop runs while x <= 5. x takes values 1, 2, 3, 4, 5. sum = 1+2+3+4+5 = 15. After x=5 is processed, x++ makes x=6, then the condition x <= 5 (6 <= 5) is false and the loop exits. sum=15, x=6.",
    trap: "after the last iteration x is incremented to 6 before the condition is re-checked — x prints as 6, not 5",
  },
  {
    id: 16,
    unit: 2,
    cedTopic: "2.7",
    skill: "3.A",
    questionSetId: "qs1c",
    question:
      "How many times is the body of the while loop in the code segment above executed?",
    options: [
      { id: "A", text: "4" },
      { id: "B", text: "5" },
      { id: "C", text: "6" },
      { id: "D", text: "15" },
    ],
    correctId: "B",
    explanation:
      "The loop body executes once for each value x takes: x=1, x=2, x=3, x=4, x=5 — exactly 5 times. When x reaches 6, the condition fails before the body runs again.",
    trap: "count the iterations (5), not the final value of x (6) or the final value of sum (15)",
  },
  {
    id: 17,
    unit: 2,
    cedTopic: "2.8",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `for (int i = 5; i >= 1; i--) {
    System.out.print(i + " ");
}`,
    options: [
      { id: "A", text: '"1 2 3 4 "' },
      { id: "B", text: '"1 2 3 4 5 "' },
      { id: "C", text: '"5 4 3 2 "' },
      { id: "D", text: '"5 4 3 2 1 "' },
    ],
    correctId: "D",
    explanation:
      "The loop starts at i=5 and decrements (i--) as long as i >= 1. i takes values: 5, 4, 3, 2, 1. Each iteration prints i followed by a space. Condition i >= 1 is true when i=1 (so 1 is printed), then i becomes 0 and the loop exits.",
    trap: "i >= 1 means i=1 is included — the count goes down to 1, not stopping before it",
  },
  {
    id: 18,
    unit: 2,
    cedTopic: "2.8",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int[] arr = {1, 2, 3, 4, 5};
int total = 0;
for (int i = arr.length - 1; i >= 0; i--) {
    total += arr[i];
}
System.out.println(total);`,
    options: [
      { id: "A", text: "14" },
      { id: "B", text: "15" },
      { id: "C", text: "5" },
      { id: "D", text: "An ArrayIndexOutOfBoundsException is thrown" },
    ],
    correctId: "B",
    explanation:
      "The loop traverses the array from the last index (arr.length-1 = 4) down to index 0. It visits arr[4]=5, arr[3]=4, arr[2]=3, arr[1]=2, arr[0]=1. total = 5+4+3+2+1 = 15. The sum is the same regardless of traversal direction.",
    trap: "starting at arr.length-1 = 4 (not arr.length = 5) prevents an out-of-bounds exception; the sum is 15 not 14",
  },
  {
    id: 19,
    unit: 2,
    cedTopic: "2.9",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int[] data = {8, 3, 11, 5, 2, 9};
int min = data[0];
for (int i = 1; i < data.length; i++) {
    if (data[i] < min) {
        min = data[i];
    }
}
System.out.println(min);`,
    options: [
      { id: "A", text: "8" },
      { id: "B", text: "2" },
      { id: "C", text: "3" },
      { id: "D", text: "11" },
    ],
    correctId: "B",
    explanation:
      "Standard minimum-finding algorithm. min starts at data[0]=8. i=1: 3 < 8 → min=3. i=2: 11 < 3? No. i=3: 5 < 3? No. i=4: 2 < 3 → min=2. i=5: 9 < 2? No. Final min=2.",
    trap: "trace all elements — min is updated every time a smaller value is found, not just the first time",
  },
  {
    id: 20,
    unit: 2,
    cedTopic: "2.10",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String s = "hello world";
int vowelCount = 0;
for (int i = 0; i < s.length(); i++) {
    char c = s.charAt(i);
    if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
        vowelCount++;
    }
}
System.out.println(vowelCount);`,
    options: [
      { id: "A", text: "2" },
      { id: "B", text: "3" },
      { id: "C", text: "4" },
      { id: "D", text: "5" },
    ],
    correctId: "B",
    explanation:
      '"hello world": h, e, l, l, o, (space), w, o, r, l, d. Vowels: e (index 1), o (index 4), o (index 7). Total = 3. The space and consonants are not counted.',
    trap: "count carefully: only e, o, o are vowels — 3 total, not 2 or 4",
  },
  {
    id: 21,
    unit: 2,
    cedTopic: "2.11",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int total = 0;
for (int i = 1; i <= 3; i++) {
    for (int j = i; j <= 3; j++) {
        for (int k = 1; k <= j; k++) {
            total++;
        }
    }
}
System.out.println(total);`,
    options: [
      { id: "A", text: "14" },
      { id: "B", text: "13" },
      { id: "C", text: "18" },
      { id: "D", text: "9" },
    ],
    correctId: "A",
    explanation:
      "Trace each (i, j) pair and count the innermost iterations (k runs from 1 to j, so j times). i=1: j=1 → k runs 1 time; j=2 → 2 times; j=3 → 3 times. Subtotal = 1+2+3 = 6. i=2: j=2 → 2 times; j=3 → 3 times. Subtotal = 2+3 = 5. i=3: j=3 → 3 times. Subtotal = 3. Grand total = 6 + 5 + 3 = 14. Option B is the off-by-one if you stop j at j < 3 instead of j <= 3. Option C is the result if j started at 0 (or i started at 0). Option D is incorrect if you only count outer-loop iterations.",
    trap: "the middle loop starts at j = i (depends on the outer variable), and the innermost loop bound depends on j — substitute the current value before counting iterations",
  },
  {
    id: 22,
    unit: 2,
    cedTopic: "2.11",
    skill: "3.B",
    question:
      "How many times is the body of the inner loop executed when the following code segment is run?",
    code: `for (int i = 0; i < 3; i++) {
    for (int j = i; j < 5; j++) {
        System.out.println(i + "," + j);
    }
}`,
    options: [
      { id: "A", text: "12" },
      { id: "B", text: "15" },
      { id: "C", text: "9" },
      { id: "D", text: "8" },
    ],
    correctId: "A",
    explanation:
      "The inner loop starts at j=i and runs while j < 5. i=0: j goes 0..4 → 5 iterations. i=1: j goes 1..4 → 4 iterations. i=2: j goes 2..4 → 3 iterations. Total: 5 + 4 + 3 = 12.",
    trap: "the inner bound starts at i, not 0, so each successive outer iteration shrinks the inner range by one",
  },

  // ── UNIT 3 ──────────────────────────────────────────────────────────────
  {
    id: 23,
    unit: 3,
    cedTopic: "3.3",
    skill: "2.B",
    question:
      "Which of the following class definitions correctly encapsulates a private field with a public accessor?",
    options: [
      {
        id: "A",
        text: "public class Box {\n    private int size;\n    public int getSize() { return size; }\n}",
        isCode: true,
      },
      {
        id: "B",
        text: "public class Box {\n    public int size;\n    public int getSize() { return size; }\n}",
        isCode: true,
      },
      {
        id: "C",
        text: "public class Box {\n    private int size;\n    private int getSize() { return size; }\n}",
        isCode: true,
      },
      {
        id: "D",
        text: "public class Box {\n    private int size;\n    public void getSize() { return size; }\n}",
        isCode: true,
      },
    ],
    correctId: "A",
    explanation:
      "Correct encapsulation: the field is private (hidden from outside) and the getter is public (accessible from outside) and returns the correct type (int). Option B has a public field — this breaks encapsulation. Option C has a private getter — callers cannot access it. Option D declares void but returns a value — this won't compile.",
    trap: "encapsulation: field = private, getter = public with matching return type",
  },
  {
    id: 24,
    unit: 3,
    cedTopic: "3.4",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `public class Rectangle {
    private int width;
    private int height;

    public Rectangle(int w, int h) {
        width = w;
        height = h;
    }

    public int area() {
        return width * height;
    }
}

// Code segment:
Rectangle r = new Rectangle(4, 6);
System.out.println(r.area());`,
    options: [
      { id: "A", text: "24" },
      { id: "B", text: "20" },
      { id: "C", text: "10" },
      { id: "D", text: "48" },
    ],
    correctId: "A",
    explanation:
      "new Rectangle(4, 6) sets width=4 and height=6. area() returns width * height = 4 * 6 = 24.",
    trap: "the constructor parameters are width and height (4 and 6) — area is the product, not the sum",
  },
  {
    id: 25,
    unit: 3,
    cedTopic: "3.5",
    skill: "2.B",
    question:
      "Which of the following correctly defines a method that takes two ints and returns the larger one?",
    options: [
      {
        id: "A",
        text: "public int max(int a, int b) {\n    if (a > b) return a;\n    return b;\n}",
        isCode: true,
      },
      {
        id: "B",
        text: "public void max(int a, int b) {\n    if (a > b) return a;\n    return b;\n}",
        isCode: true,
      },
      {
        id: "C",
        text: "public int max(int a, int b) {\n    if (a > b) return a;\n}",
        isCode: true,
      },
      {
        id: "D",
        text: "public int max(a, b) {\n    if (a > b) return a;\n    return b;\n}",
        isCode: true,
      },
    ],
    correctId: "A",
    explanation:
      "A method returning an int must be declared with return type int, have typed parameters, and return a value on every possible path. Option B is void — it cannot return a value. Option C is missing a return for the else case (compile error: not all code paths return). Option D is missing type declarations for the parameters (compile error).",
    trap: "a non-void method must return a value on EVERY path — if (a>b) return a alone is not enough",
  },
  {
    id: 26,
    unit: 3,
    cedTopic: "3.6",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `public class Counter {
    private int count;

    public Counter(int start) {
        count = start;
    }

    public void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}

// Code segment:
Counter c = new Counter(5);
c.increment();
c.increment();
System.out.println(c.getCount());`,
    options: [
      { id: "A", text: "5" },
      { id: "B", text: "7" },
      { id: "C", text: "6" },
      { id: "D", text: "10" },
    ],
    correctId: "B",
    explanation:
      "new Counter(5) sets count=5. c.increment() runs twice: count becomes 6, then 7. getCount() returns 7.",
    trap: "increment() is called TWICE, so count increases by 2 (from 5 to 7), not 1",
  },
  {
    id: 27,
    unit: 3,
    cedTopic: "3.7",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `public class Converter {
    public static double celsiusToFahrenheit(double c) {
        return c * 9.0 / 5.0 + 32;
    }
}

// Code segment:
System.out.println(Converter.celsiusToFahrenheit(0));
System.out.println(Converter.celsiusToFahrenheit(100));`,
    options: [
      { id: "A", text: "32.0\n100.0" },
      { id: "B", text: "32\n212" },
      { id: "C", text: "0.0\n100.0" },
      { id: "D", text: "32.0\n212.0" },
    ],
    correctId: "D",
    explanation:
      "0°C → 0 × 9.0/5.0 + 32 = 0 + 32 = 32.0 (double). 100°C → 100 × 9.0/5.0 + 32 = 180.0 + 32 = 212.0. Because the method returns double, both print with a decimal point. Static methods are called on the class name: Converter.celsiusToFahrenheit().",
    trap: "the return type is double, so output always includes a decimal point (32.0, not 32)",
  },
  {
    id: 28,
    unit: 3,
    cedTopic: "3.8",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `public class Example {
    private int x = 10;

    public void printX(int x) {
        System.out.println(x);
        System.out.println(this.x);
    }
}

// Code segment:
Example e = new Example();
e.printX(99);`,
    options: [
      { id: "A", text: "99\n10" },
      { id: "B", text: "10\n99" },
      { id: "C", text: "99\n99" },
      { id: "D", text: "10\n10" },
    ],
    correctId: "A",
    explanation:
      "Inside printX, the parameter x shadows the instance variable x. Unqualified x refers to the parameter (99). this.x explicitly refers to the instance variable (10). The parameter does NOT change the instance variable.",
    trap: "a parameter with the same name shadows the instance variable — use this.x to access the instance variable explicitly",
  },
  {
    id: 29,
    unit: 3,
    cedTopic: "3.2",
    skill: "5.A",
    question:
      "A hospital uses an algorithm to prioritize patient follow-up appointments. An analysis finds that patients from lower-income zip codes consistently receive lower priority scores, resulting in longer wait times, despite having comparable medical urgency. This outcome is best described as:",
    options: [
      {
        id: "A",
        text: "Algorithmic bias that systematically disadvantages lower-income patients",
      },
      {
        id: "B",
        text: "An integer overflow in the priority score calculation",
      },
      {
        id: "C",
        text: "A NullPointerException in the scheduling algorithm",
      },
      {
        id: "D",
        text: "A compile-time error in the patient database query",
      },
    ],
    correctId: "A",
    explanation:
      "When an algorithm consistently produces unequal outcomes correlated with a protected or socioeconomic characteristic — regardless of intent — this is algorithmic bias. It is an ethical concern about computing's societal impact, not a programming error. Runtime errors and compile errors are technical faults; this is a design/fairness concern.",
    trap: "disparate outcomes from an algorithm are an ethical issue, not a runtime or syntax error",
  },

  // ── UNIT 4 ──────────────────────────────────────────────────────────────
  {
    id: 30,
    unit: 4,
    cedTopic: "4.3",
    skill: "3.B",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `int[] nums = new int[5];
nums[0] = 10;
nums[4] = 20;
System.out.println(nums[2]);
System.out.println(nums[0] + nums[4]);`,
    options: [
      { id: "A", text: "0\n15" },
      { id: "B", text: "5\n30" },
      { id: "C", text: "null\n30" },
      { id: "D", text: "0\n30" },
    ],
    correctId: "D",
    explanation:
      "new int[5] allocates an array of 5 ints and initializes all elements to 0 (the default for int). nums[0] is set to 10, nums[4] to 20. nums[2] was never assigned, so it remains 0. nums[0] + nums[4] = 10 + 20 = 30.",
    trap: "int arrays default to 0 (not null — that's for reference types like String[])",
  },
  {
    id: 31,
    unit: 4,
    cedTopic: "4.4",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `String[] fruits = {"apple", "banana", "cherry"};
for (String f : fruits) {
    System.out.println(f.length());
}`,
    options: [
      { id: "A", text: '"apple"\n"banana"\n"cherry"' },
      { id: "B", text: "5\n7\n6" },
      { id: "C", text: "5\n6\n6" },
      { id: "D", text: "3" },
    ],
    correctId: "C",
    explanation:
      '"apple".length() = 5. "banana".length() = 6. "cherry".length() = 6. The for-each loop iterates over each String in fruits and calls length() on it.',
    trap: 'count characters carefully: "banana" has 6 letters (b-a-n-a-n-a), not 7',
  },
  {
    id: 32,
    unit: 4,
    cedTopic: "4.5",
    skill: "3.D",
    question:
      "Which of the following code segments correctly finds and stores the index of the largest element in int[] arr?",
    options: [
      {
        id: "A",
        text: "int maxIdx = 0;\nfor (int i = 0; i < arr.length; i++) {\n    if (arr[i] > arr[maxIdx]) maxIdx = arr[i];\n}",
        isCode: true,
      },
      {
        id: "B",
        text: "int maxIdx = 0;\nfor (int i = 1; i < arr.length; i++) {\n    if (arr[i] > arr[maxIdx]) maxIdx = i;\n}",
        isCode: true,
      },
      {
        id: "C",
        text: "int maxIdx = arr[0];\nfor (int i = 1; i < arr.length; i++) {\n    if (arr[i] > arr[maxIdx]) maxIdx = i;\n}",
        isCode: true,
      },
      {
        id: "D",
        text: "int maxIdx = 0;\nfor (int i = 1; i <= arr.length; i++) {\n    if (arr[i] > arr[maxIdx]) maxIdx = i;\n}",
        isCode: true,
      },
    ],
    correctId: "B",
    explanation:
      "A: maxIdx starts as the index 0. When a larger element is found at index i, maxIdx is updated to i (the index, not the value). This correctly tracks the position of the maximum. B: assigns arr[i] (the value, not the index) to maxIdx — incorrect. C: initializes maxIdx to arr[0] (a value) then uses it as an index in arr[maxIdx] — likely out of bounds or wrong. D: loop bound i <= arr.length causes ArrayIndexOutOfBoundsException when i equals arr.length.",
    trap: "store the INDEX, not the value; loop bound must be < arr.length (not <=)",
  },
  {
    id: 33,
    unit: 4,
    cedTopic: "4.6",
    skill: "2.A",
    question:
      'Which of the following code segments correctly reads integer values from a text file named "numbers.txt" one at a time?',
    options: [
      {
        id: "A",
        text: 'Scanner sc = new Scanner("numbers.txt");\nwhile (sc.hasNextInt()) {\n    int n = sc.nextInt();\n}',
        isCode: true,
      },
      {
        id: "B",
        text: 'Scanner sc = new Scanner(new File("numbers.txt"));\nwhile (sc.hasNextInt()) {\n    int n = sc.nextInt();\n}',
        isCode: true,
      },
      {
        id: "C",
        text: 'File f = new File("numbers.txt");\nwhile (f.hasNextInt()) {\n    int n = f.nextInt();\n}',
        isCode: true,
      },
      {
        id: "D",
        text: "Scanner sc = new Scanner(System.in);\nwhile (sc.hasNextInt()) {\n    int n = sc.nextInt();\n}",
        isCode: true,
      },
    ],
    correctId: "B",
    explanation:
      'A Scanner must be constructed with a File object to read from a file: new Scanner(new File("numbers.txt")). hasNextInt() checks for another integer token. Option A passes a String literal — the Scanner treats the string itself as the input stream (not the file). Option C calls scanner methods on a File object — File has no hasNextInt() or nextInt() methods. Option D reads from standard input (keyboard), not a file.',
    trap: 'Scanner(new File("name")) reads from a file; Scanner("text") treats the string as the data itself',
  },
  {
    id: 34,
    unit: 4,
    cedTopic: "4.7",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `ArrayList<Integer> nums = new ArrayList<Integer>();
nums.add(5);
nums.add(10);
int sum = nums.get(0) + nums.get(1);
System.out.println(sum);`,
    options: [
      { id: "A", text: "510" },
      { id: "B", text: "15" },
      {
        id: "C",
        text: "A compile error — Integer objects cannot be added with +",
      },
      { id: "D", text: "5" },
    ],
    correctId: "B",
    explanation:
      "nums.get(0) returns the Integer 5 and nums.get(1) returns the Integer 10. Java automatically unboxes these Integer objects to primitive ints when the + operator is applied. 5 + 10 = 15. Autoboxing/unboxing makes Integer and int interchangeable in arithmetic expressions.",
    trap: "Java automatically unboxes Integer to int for arithmetic — no manual conversion needed",
  },
  {
    id: 35,
    unit: 4,
    cedTopic: "4.8",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `ArrayList<String> words = new ArrayList<String>();
words.add("cat");
words.add("dog");
words.add(1, "bat");
System.out.println(words.get(0));
System.out.println(words.get(1));
System.out.println(words.size());`,
    options: [
      { id: "A", text: '"cat"\n"bat"\n3' },
      { id: "B", text: '"bat"\n"dog"\n3' },
      { id: "C", text: '"cat"\n"dog"\n3' },
      { id: "D", text: '"cat"\n"bat"\n2' },
    ],
    correctId: "A",
    explanation:
      'After add("cat"): [cat]. After add("dog"): [cat, dog]. After add(1, "bat"): inserts "bat" at index 1, shifting "dog" right → [cat, bat, dog]. get(0)="cat", get(1)="bat", size()=3.',
    trap: "add(index, element) INSERTS at that index and shifts everything after it — it does NOT replace",
  },
  {
    id: 36,
    unit: 4,
    cedTopic: "4.9",
    skill: "3.A",
    question:
      "What is printed as a result of executing the following code segment?",
    code: `ArrayList<Integer> vals = new ArrayList<Integer>();
vals.add(3);
vals.add(7);
vals.add(2);
vals.add(8);
int max = vals.get(0);
for (int i = 1; i < vals.size(); i++) {
    if (vals.get(i) > max) {
        max = vals.get(i);
    }
}
System.out.println(max);`,
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "7" },
      { id: "C", text: "8" },
      { id: "D", text: "20" },
    ],
    correctId: "C",
    explanation:
      "max starts at vals.get(0)=3. i=1: 7 > 3 → max=7. i=2: 2 > 7? No. i=3: 8 > 7 → max=8. The loop exits. max=8.",
    trap: "initialization matters — max starts at 3, then is updated twice: first to 7, then to 8",
  },
  {
    id: 37,
    unit: 4,
    cedTopic: "4.11",
    skill: "3.B",
    questionSetId: "qs2c",
    questionSetLabel: "Questions 37 and 38 refer to the following 2D array.",
    sharedCode: `int[][] grid = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};`,
    question: "Using the grid array defined above, what is the value of grid[2][0]?",
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "4" },
      { id: "C", text: "7" },
      { id: "D", text: "9" },
    ],
    correctId: "C",
    explanation:
      "grid[row][col]. Row 2 is {7, 8, 9}. Column 0 of that row is 7. grid[2][0] = 7.",
    trap: "first index is row (2 → third row), second is column (0 → first column) — grid[2][0] = 7",
  },
  {
    id: 38,
    unit: 4,
    cedTopic: "4.12",
    skill: "3.B",
    questionSetId: "qs2c",
    question:
      "What is printed as a result of executing the following code segment using the grid array defined above?",
    code: `int colSum = 0;
for (int r = 0; r < grid.length; r++) {
    colSum += grid[r][1];
}
System.out.println(colSum);`,
    options: [
      { id: "A", text: "15" },
      { id: "B", text: "6" },
      { id: "C", text: "24" },
      { id: "D", text: "5" },
    ],
    correctId: "A",
    explanation:
      "The loop iterates over all rows and accesses column 1 each time. grid[0][1]=2, grid[1][1]=5, grid[2][1]=8. colSum = 2+5+8 = 15.",
    trap: "grid[r][1] fixes the column at 1 (the middle column) — this sums a column, not all elements",
  },
  {
    id: 39,
    unit: 4,
    cedTopic: "4.15",
    skill: "3.A",
    question:
      "Consider selection sort applied to the array {9, 4, 7, 2, 6}. After the first pass (finding the minimum and placing it in position 0), what is the array state?",
    options: [
      { id: "A", text: "{2, 4, 7, 6, 9}" },
      { id: "B", text: "{4, 9, 7, 2, 6}" },
      { id: "C", text: "{2, 4, 7, 9, 6}" },
      { id: "D", text: "{9, 4, 7, 2, 6}" },
    ],
    correctId: "C",
    explanation:
      "Selection sort finds the minimum of the entire unsorted portion (indices 0–4) and swaps it with the element at the current position (index 0). The minimum is 2, at index 3. Swapping arr[0]=9 and arr[3]=2 gives {2, 4, 7, 9, 6}. The rest of the array is untouched.",
    trap: "selection sort swaps only the minimum with position 0 — the middle elements (4, 7) are unchanged after the first pass",
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
      { id: "B", text: "10" },
      { id: "C", text: "16" },
      { id: "D", text: "24" },
    ],
    correctId: "D",
    explanation:
      "Trace: mystery(4) = 4 × mystery(3) = 4 × (3 × mystery(2)) = 4 × (3 × (2 × mystery(1))) = 4 × (3 × (2 × 1)) = 4 × 6 = 24. This is the factorial function (4! = 24).",
    trap: "trace all the way to the base case (n<=1 returns 1) and multiply back up — mystery(4) = 4! = 24, not 4+3+2+1 = 10",
  },
  {
    id: 41,
    unit: 4,
    cedTopic: "4.10",
    skill: "3.D",
    question:
      "Which of the following code segments correctly removes all strings of length exactly 3 from ArrayList<String> words?",
    options: [
      {
        id: "A",
        text: "for (int i = 0; i < words.size(); i++) {\n    if (words.get(i).length() == 3) words.remove(i);\n}",
        isCode: true,
      },
      {
        id: "B",
        text: "for (int i = words.size() - 1; i >= 0; i--) {\n    if (words.get(i).length() == 3) words.remove(i);\n}",
        isCode: true,
      },
      {
        id: "C",
        text: "for (String w : words) {\n    if (w.length() == 3) words.remove(w);\n}",
        isCode: true,
      },
      {
        id: "D",
        text: "words.remove(3);",
        isCode: true,
      },
    ],
    correctId: "B",
    explanation:
      "Backward traversal (high index to low) is correct: after removing element i, the elements at indices i+1 and beyond shift left — but those have already been visited. Option A (forward) skips the element right after each removal. Option C modifies the list during a for-each loop, causing ConcurrentModificationException. Option D removes the element at index 3 (an int argument), not elements of length 3.",
    trap: "forward removal skips the next element after each removal — always traverse backward when removing from an ArrayList",
  },
  {
    id: 42,
    unit: 4,
    cedTopic: "4.1",
    skill: "5.A",
    question:
      "A company collects detailed browsing histories and location data from millions of users without prominently disclosing this in their terms of service, then sells the data to third parties for targeted advertising. Which of the following best describes the primary ethical concern?",
    options: [
      {
        id: "A",
        text: "A stack overflow error in the data collection pipeline",
      },
      {
        id: "B",
        text: "Violation of user privacy and lack of informed consent about data collection and sharing",
      },
      {
        id: "C",
        text: "An off-by-one error in the data indexing algorithm",
      },
      {
        id: "D",
        text: "The data cannot be encrypted because it exceeds the array size limit",
      },
    ],
    correctId: "B",
    explanation:
      "Collecting and monetizing personal data without clear, informed consent is a privacy violation — a core ethical issue in computing. Users should know what data is collected, how it is used, and who receives it. Options A, C, and D describe technical errors, not ethical concerns.",
    trap: "privacy violations are ethical concerns, not runtime or logic errors",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 4 FRQs — fixed structure every year  (Practice Exam 3)
// ─────────────────────────────────────────────────────────────────────────────

export const examFRQs3: ExamFRQ[] = [
  // ── FRQ 1: Methods and Control Structures (7 pts) ───────────────────────
  {
    id: 1,
    type: "Methods and Control Structures",
    totalPoints: 7,
    title: "ScoreFileReader",
    scenario:
      "A ScoreFileReader object reads integer test scores one at a time from a Scanner that is already open on a file. The class has three private instance variables: scoreScanner (a Scanner connected to the score file), maxScore (the highest score that will be recorded — any score above this is capped), and readCount (a running count of scores read so far, starting at 0). You will write two methods for this class.",
    givenCode: `import java.util.Scanner;

public class ScoreFileReader {
    private Scanner scoreScanner;  // already opened on the score file
    private int maxScore;
    private int readCount;

    public ScoreFileReader(Scanner sc, int max) {
        scoreScanner = sc;
        maxScore = max;
        readCount = 0;
    }

    /**
     * Returns true if there is at least one more integer left to read
     * in the file; false otherwise.
     */
    public boolean hasMore() { return scoreScanner.hasNextInt(); }

    /** Reads and returns the next integer score, as described in part (a). */
    public int readNextScore()
    { /* to be implemented in part (a) */ }

    /**
     * Returns the count of scores (read via readNextScore) that exceed
     * threshold, as described in part (b).
     * Precondition: threshold >= 0
     */
    public int countAboveThreshold(double threshold)
    { /* to be implemented in part (b) */ }
}`,
    parts: [
      {
        letter: "A",
        points: 4,
        prompt:
          "Write the method readNextScore(). The method should read the next integer from scoreScanner using nextInt(). If the value exceeds maxScore, use maxScore instead (cap it). Increment readCount by 1. Return the capped score.",
        sampleAnswer: `public int readNextScore() {
    int score = scoreScanner.nextInt();
    if (score > maxScore) {
        score = maxScore;
    }
    readCount++;
    return score;
}`,
        rubricPoints: [
          {
            text: "Reads the next integer by calling scoreScanner.nextInt() and storing or using the result",
            points: 1,
          },
          {
            text: "Correctly caps the score at maxScore (if score > maxScore use maxScore, or Math.min equivalent)",
            points: 1,
          },
          {
            text: "Increments readCount by 1",
            points: 1,
          },
          { text: "Returns the capped score", points: 1 },
        ],
        commonMistakes: [
          "Calling scoreScanner.nextLine() instead of nextInt() — reads a String, not an int",
          "Capping with Math.max(score, maxScore) — this returns the larger value, not the cap",
          "Forgetting to increment readCount",
          "Returning the uncapped score instead of the capped one",
          "Calling hasNextInt() inside this method — Part A reads exactly one value; the loop belongs in Part B",
        ],
      },
      {
        letter: "B",
        points: 3,
        prompt:
          "Write the method countAboveThreshold(double threshold). The method should repeatedly call readNextScore() while more scores remain in the file. Count and return the number of scores whose capped value exceeds threshold. Assume that readNextScore works as intended, regardless of what you wrote in part (a). You must call readNextScore appropriately in order to receive full credit.",
        sampleAnswer: `public int countAboveThreshold(double threshold) {
    int count = 0;
    while (hasMore()) {
        int score = readNextScore();
        if (score > threshold) {
            count++;
        }
    }
    return count;
}`,
        rubricPoints: [
          {
            text: "Loop continues while hasMore() (or scoreScanner.hasNextInt()) is true — loop runs until all scores are read",
            points: 1,
          },
          {
            text: "Calls readNextScore() exactly once per iteration — not scoreScanner.nextInt() directly — and uses the return value",
            points: 1,
          },
          {
            text: "Correctly counts iterations where return value > threshold and returns the count",
            points: 1,
          },
        ],
        commonMistakes: [
          "Calling scoreScanner.nextInt() directly instead of readNextScore() — bypasses the cap logic and misses the required call",
          "Using a for loop with a fixed count instead of a while (hasMore()) loop — file length is unknown",
          "Comparing score >= threshold instead of score > threshold",
          "Not returning count at the end of the method",
          "Calling readNextScore() twice per iteration — once for the comparison and once for the count — which skips scores",
        ],
      },
    ],
  },

  // ── FRQ 2: Class Design (7 pts) ─────────────────────────────────────────
  {
    id: 2,
    type: "Class Design",
    totalPoints: 7,
    title: "Movie",
    scenario:
      "Write a complete class called Movie that represents a movie in a streaming catalog. The class stores the movie's title, its rating (an integer from 1 to 10), and its release year. It provides a method that formats a display label and a method that determines the movie's recommendation status.",
    givenCode: `/* Write the complete Movie class below.
 *
 * The class must have:
 *   - private String title
 *   - private int rating   (a value from 1 to 10)
 *   - private int year
 *
 *   Constructor: Movie(String title, int rating, int year)
 *
 *   Methods:
 *     String getLabel()    — returns: title + " (" + year + ")"
 *                            Example: "Inception (2010)"
 *
 *     String getStatus()   — returns "Recommended"     if rating >= 7
 *                            returns "Not Recommended" if rating < 7
 */`,
    parts: [
      {
        letter: "A",
        points: 7,
        prompt:
          "Write the complete Movie class. Include all private instance variables, the constructor, the getLabel method, and the getStatus method as described above.",
        sampleAnswer: `public class Movie {
    private String title;
    private int rating;
    private int year;

    public Movie(String title, int rating, int year) {
        this.title = title;
        this.rating = rating;
        this.year = year;
    }

    public String getLabel() {
        return title + " (" + year + ")";
    }

    public String getStatus() {
        if (rating >= 7) return "Recommended";
        else return "Not Recommended";
    }
}`,
        rubricPoints: [
          {
            text: "Class header: public class Movie",
            points: 1,
          },
          {
            text: "All three instance variables declared private with correct types (String, int, int)",
            points: 1,
          },
          {
            text: "Constructor header correct: public Movie(String title, int rating, int year)",
            points: 1,
          },
          {
            text: "Constructor body correctly assigns all three fields (this.title = title, this.rating = rating, this.year = year)",
            points: 1,
          },
          {
            text: "getLabel() returns correct String in format title + \" (\" + year + \")\"",
            points: 1,
          },
          {
            text: "getStatus() correctly identifies rating >= 7 and returns \"Recommended\"",
            points: 1,
          },
          {
            text: "getStatus() handles both cases and returns the correct String for each",
            points: 1,
          },
        ],
        commonMistakes: [
          "Declaring instance variables public instead of private",
          "Not using this.field = param in the constructor when parameter names match field names",
          "getLabel() uses wrong parenthesis format, e.g., \"title [year]\" or missing the space before (",
          "getStatus() returns a boolean instead of a String",
          "getStatus() uses > 7 instead of >= 7 (a movie rated exactly 7 should be \"Recommended\")",
          "Missing return statement in one branch of getStatus()",
          "Declaring getLabel() or getStatus() as void instead of String",
        ],
      },
    ],
  },

  // ── FRQ 3: Data Analysis with ArrayList (5 pts) ──────────────────────────
  {
    id: 3,
    type: "Data Analysis with ArrayList",
    totalPoints: 5,
    title: "StudentRoster",
    scenario:
      "A StudentRoster class manages a list of students, storing their names and exam grades using two parallel ArrayLists. The class has two instance variables already declared: an ArrayList<String> named names and an ArrayList<Integer> named grades. You will write the constructor that populates both lists and a method that builds a list of honor roll students.",
    givenCode: `public class StudentRoster {
    private ArrayList<String> names;
    private ArrayList<Integer> grades;

    // Part (a): write the constructor here

    // Part (b): write getHonorRoll here
}`,
    parts: [
      {
        letter: "A",
        points: 2,
        prompt:
          "Write the constructor StudentRoster(String[] studentNames, int[] studentGrades). The constructor should initialize both names and grades as new ArrayLists (do NOT redeclare their types). Then use a single index-based loop to add each student's name and grade at the same index from the two input arrays into the respective lists.",
        sampleAnswer: `public StudentRoster(String[] studentNames, int[] studentGrades) {
    names = new ArrayList<String>();
    grades = new ArrayList<Integer>();
    for (int i = 0; i < studentNames.length; i++) {
        names.add(studentNames[i]);
        grades.add(studentGrades[i]);
    }
}`,
        rubricPoints: [
          {
            text: "Initializes both names and grades as new ArrayLists without redeclaring their types",
            points: 1,
          },
          {
            text: "Uses an index-based loop to add both studentNames[i] and studentGrades[i] to the respective lists for each i",
            points: 1,
          },
        ],
        commonMistakes: [
          "Redeclaring with type: ArrayList<String> names = new ArrayList<>() — creates a local variable that shadows the instance variable",
          "Only initializing one of the two lists",
          "Using a for-each loop (cannot access both arrays at the same index simultaneously)",
          "Adding to the wrong list (e.g., names.add(studentGrades[i]))",
          "Using studentGrades.length instead of studentNames.length (both are the same length, but studentGrades is an int[], not an ArrayList)",
        ],
      },
      {
        letter: "B",
        points: 3,
        prompt:
          "Write the method getHonorRoll() that creates and returns a new ArrayList<String> containing the names of all students whose grade is 90 or higher. Use the parallel structure of names and grades to find the qualifying students.",
        sampleAnswer: `public ArrayList<String> getHonorRoll() {
    ArrayList<String> honorRoll = new ArrayList<String>();
    for (int i = 0; i < grades.size(); i++) {
        if (grades.get(i) >= 90) {
            honorRoll.add(names.get(i));
        }
    }
    return honorRoll;
}`,
        rubricPoints: [
          {
            text: "Creates a new ArrayList<String> to accumulate results",
            points: 1,
          },
          {
            text: "Loop correctly traverses the grades list by index and accesses the corresponding name at the same index",
            points: 1,
          },
          {
            text: "Correctly uses >= 90 condition and returns the populated honorRoll list",
            points: 1,
          },
        ],
        commonMistakes: [
          "Returning the names list itself instead of a new filtered list",
          "Using > 90 instead of >= 90 (a grade of exactly 90 qualifies for honor roll)",
          "Accessing names.get(i) but forgetting to check grades.get(i) — or vice versa",
          "Not returning honorRoll at the end",
          "Using grades.size() for the loop bound (correct) but then accessing names.get(grades.size()) — off by one",
          "Adding grades.get(i) to honorRoll instead of names.get(i) (adding numbers, not names)",
        ],
      },
    ],
  },

  // ── FRQ 4: 2D Array (6 pts) ──────────────────────────────────────────────
  {
    id: 4,
    type: "2D Array",
    totalPoints: 6,
    title: "RainGrid",
    scenario:
      "A RainGrid class stores hourly rainfall measurements (in millimeters) collected from multiple weather stations over several days. Each row represents one day and each column represents one weather station. The class has one instance variable: a 2D int array named rain. You will write the constructor that initializes the grid with random data and a method to compute a station's total rainfall.",
    givenCode: `public class RainGrid {
    private int[][] rain;

    // Part (a): write the constructor here

    // Part (b): write getStationTotal here
}`,
    parts: [
      {
        letter: "A",
        points: 3,
        prompt:
          "Write the constructor RainGrid(int days, int stations). The constructor should allocate rain as a 2D int array with days rows and stations columns. Initialize every cell to a random integer in the range [0, 10] inclusive using the expression (int)(Math.random() * 11).",
        sampleAnswer: `public RainGrid(int days, int stations) {
    rain = new int[days][stations];
    for (int r = 0; r < rain.length; r++) {
        for (int c = 0; c < rain[0].length; c++) {
            rain[r][c] = (int)(Math.random() * 11);
        }
    }
}`,
        rubricPoints: [
          {
            text: "Allocates rain as new int[days][stations] with correct dimension order",
            points: 1,
          },
          {
            text: "Nested loop structure is correct: outer iterates rows (rain.length), inner iterates columns (rain[0].length)",
            points: 1,
          },
          {
            text: "Each cell assigned (int)(Math.random() * 11) or equivalent expression yielding integers in [0, 10]",
            points: 1,
          },
        ],
        commonMistakes: [
          "Swapping days and stations: new int[stations][days]",
          "Using rain.length for both loop bounds (correct for rows, wrong for columns)",
          "Wrong random range: (int)(Math.random() * 10) gives [0, 9], not [0, 10]",
          "Accessing rain[c][r] instead of rain[r][c] (transposes the array)",
          "Forgetting the nested loop — only allocating the array without filling it",
        ],
      },
      {
        letter: "B",
        points: 3,
        prompt:
          "Write the method getStationTotal(int station). The method should traverse all rows of the rain array for the given column index (station) and return the sum of all values in that column — the total rainfall recorded at that station across all days.",
        sampleAnswer: `public int getStationTotal(int station) {
    int total = 0;
    for (int r = 0; r < rain.length; r++) {
        total += rain[r][station];
    }
    return total;
}`,
        rubricPoints: [
          {
            text: "Loop correctly iterates over all rows using rain.length",
            points: 1,
          },
          {
            text: "Correctly accesses rain[r][station] — row varies, column is the fixed parameter",
            points: 1,
          },
          { text: "Returns the accumulated total", points: 1 },
        ],
        commonMistakes: [
          "Accessing rain[station][r] instead of rain[r][station] (transposes row and column)",
          "Using rain[0].length instead of rain.length as the loop bound (iterates over column count, not row count)",
          "Not initializing total to 0 before the loop",
          "Not returning total at the end",
          "Using a nested loop when only a single loop over rows is needed (the column is fixed by the parameter)",
        ],
      },
    ],
  },
];
