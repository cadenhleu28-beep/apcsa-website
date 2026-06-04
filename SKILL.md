# How to Build an AP Study Website — Complete Playbook

This document explains every decision, method, and process used to build this APCSA study site. Follow it to build a study website for any AP course: AP Biology, AP US History, AP Physics, AP Statistics, AP Chemistry, or any other College Board exam.

---

## Table of Contents

1. [Phase 0 — Mindset and Goals](#phase-0--mindset-and-goals)
2. [Phase 1 — Researching the Official Curriculum](#phase-1--researching-the-official-curriculum)
3. [Phase 2 — Researching the Exam Format](#phase-2--researching-the-exam-format)
4. [Phase 3 — Researching MCQ Format and Patterns](#phase-3--researching-mcq-format-and-patterns)
5. [Phase 4 — Researching FRQ Format and Rubrics](#phase-4--researching-frq-format-and-rubrics)
6. [Phase 5 — Researching How to Teach by Text](#phase-5--researching-how-to-teach-by-text)
7. [Phase 6 — Structuring the Research Files](#phase-6--structuring-the-research-files)
8. [Phase 7 — Site Architecture Decisions](#phase-7--site-architecture-decisions)
9. [Phase 8 — Building the Curriculum Data Layer](#phase-8--building-the-curriculum-data-layer)
10. [Phase 9 — Writing Lesson Content](#phase-9--writing-lesson-content)
11. [Phase 10 — Humanizing the Text](#phase-10--humanizing-the-text)
12. [Phase 11 — Building the MCQ Question Bank](#phase-11--building-the-mcq-question-bank)
13. [Phase 12 — Building the Adaptive Engine: Algorithm, Scroll Feed, Stats Dashboard](#phase-12--building-the-adaptive-engine-algorithm-scroll-feed-stats-dashboard)
14. [Phase 13 — Building Practice Exams](#phase-13--building-practice-exams)
15. [Phase 14 — Building the UI Components](#phase-14--building-the-ui-components)
16. [Phase 15 — Visual Design: Avoiding AI Slop](#phase-15--visual-design-avoiding-ai-slop)
17. [Phase 16 — Quality Control Checklist](#phase-16--quality-control-checklist)
18. [Replication Guide for Any AP Course](#replication-guide-for-any-ap-course)

---

## Phase 0 — Mindset and Goals

Before writing a single line of code, define exactly what this site needs to do.

**The core goal is not to summarize content. It is to replace a textbook for a motivated student who wants to pass a specific, known exam.**

That single principle drives every other decision:
- Research comes directly from the official exam document, not secondary sources
- Every MCQ mirrors actual exam archetypes, not generic quiz formats
- Lesson content is ordered to match the exam's topic weighting
- Nothing is included that isn't on the exam; nothing tested on the exam is missing

**What this site is NOT:**
- A comprehensive Java course (for APCSA)
- A Wikipedia-style reference
- A place for enrichment topics the exam doesn't cover

**What this site IS:**
- A direct path from zero to exam-ready
- Structured around the official Course and Exam Description (CED)
- Practice-first — students should spend more time answering questions than reading

---

## Phase 1 — Researching the Official Curriculum

### The primary source: the CED

Every AP course has a single authoritative document published by College Board called the **Course and Exam Description (CED)**. For APCSA, this is document AP D-531.

The CED contains:
- The complete list of units and topics with official topic numbers (e.g., "4.6")
- The exact Java methods and classes that appear on the exam quick reference card
- The exam weights per unit (expressed as percentage ranges)
- Exclusion statements — things explicitly NOT on the exam
- Computational Thinking Practices (the skills framework)

**How to find the CED for any AP course:**
1. Go to `apcentral.collegeboard.org`
2. Navigate to the specific AP course page
3. Look for "Course and Exam Description" — it is always a free PDF download
4. Download the most recent version. Note the document ID and effective date.

### What to extract from the CED

Read the CED once all the way through, then build the following research files (see Phase 6):

| What to extract | Why it matters |
|---|---|
| Unit titles and topic numbers | These are the authoritative names — use them exactly |
| Topic descriptions (learning objectives) | Each topic maps to specific lesson content |
| Exam weight ranges per unit | Tells you how many questions to write per topic |
| Exclusion statements | Content you must actively avoid including |
| Java Quick Reference methods | These are the only methods tested — don't add others |
| Computational Thinking Practices | The skills framework for categorizing MCQ types |
| FRQ question types (fixed structure) | Same 4 question types every year |

### Handling conflicting secondary sources

Secondary sources (prep books, tutoring sites, YouTube channels) frequently contain errors. Common problems:
- Wrong exam weights
- Old topic numbers from the previous CED
- Removed topics still listed as current
- Incorrect point values for FRQ questions

**Rule:** If a secondary source conflicts with the CED, trust the CED. Document every conflict you find in a `research/00-overview.md` file so future content creation doesn't accidentally use the wrong data.

For APCSA, the documented conflicts included: wrong FRQ point values (9+9+9+9, not 7+7+5+6), wrong MCQ/FRQ weight split (50/50, not 55/45), wrong topic number for File I/O (4.14, not 4.6), and claims that "Big Ideas" still existed (they were removed).

---

## Phase 2 — Researching the Exam Format

### Why format research comes before content

Knowing the exact exam format determines:
- How many practice questions to write per topic
- What answer format the MCQs use (4 choices vs. 5)
- Whether there's a penalty for guessing
- How to structure FRQ practice prompts
- What tools/references are provided during the exam

### What to document about MCQ format

- Total number of questions
- Number of answer choices
- Time allowed
- Scoring weight (% of total)
- Whether questions are ordered by topic or mixed
- Whether there's a point penalty for wrong answers

### What to document about FRQ format

- Total number of questions
- Time allowed
- Scoring weight (% of total)
- Is the format fixed (same question types every year) or variable?
- What writing tools/references are allowed
- Whether the exam is digital (typed) or on paper

For APCSA: the exam moved to 100% digital in 2026 via College Board Bluebook. Students type Java code without syntax highlighting or autocomplete. This single fact changes what study advice to give — students need to practice typing code by hand, not just reading it.

### Format changes between years

AP exams occasionally change format. Always check whether the CED you downloaded reflects the current year's exam. For APCSA 2025-2026:
- MCQ changed from 40 questions (5 choices, 80 min) to 42 questions (4 choices, 90 min)
- FRQ changed from 36 total points (9+9+9+9) to 25 total points (7+7+5+6)
- Exam delivery changed from paper to Bluebook digital

---

## Phase 3 — Researching MCQ Format and Patterns

The MCQ section rewards students who recognize patterns. Studying those patterns in advance is one of the highest-leverage activities a student can do.

### The 10 question archetypes

After reading released AP exams and the CED, identify the recurring question types. For APCSA, these were:

1. **"What is printed?"** — code trace, predict stdout output (~25% of exam)
2. **"What is the value of the variable?"** — trace to a named variable's final state (~15%)
3. **"How many times does the loop execute?"** — count iterations (~10%)
4. **"Which code segment correctly implements X?"** — choose the correct code (~15%)
5. **"What is returned when the method is called?"** — trace a method call (~10%)
6. **"Which change would make the code work as intended?"** — debug the code (~8%)
7. **"Which segment is equivalent to this one?"** — logical equivalence (~7%)
8. **"What is a precondition / postcondition?"** — contracts (~6%)
9. **"I / II / III style"** — multiple true/false statements (~5%)
10. **"Ethics / Society / Bias"** — no code, conceptual (~3%)

**How to find these archetypes:** Download every released APCSA exam from College Board (free on their site). Categorize every question by type. The pattern becomes obvious after 2-3 exams.

### The distractor patterns

College Board designs wrong answers deliberately. They are not random — they correspond to predictable mistakes. For APCSA:

| Trap | Mechanism |
|---|---|
| Integer division truncation | Showing `3.5` when `7/2` = `3` |
| Off-by-one in loop | `n` iterations vs. `n-1` or `n+1` |
| String `==` vs `.equals()` | Assuming reference comparison works like value comparison |
| `null` dereference | Calling a method on an uninitialized variable |
| Array index out of bounds | `arr[arr.length]` instead of `arr[arr.length - 1]` |
| Modifying list during forward traversal | Skipping an element when removing from ArrayList |

**How to find these:** Look at the wrong answers on released exams. Each wrong answer points to a specific misconception. These become the basis for the distractors in your question bank.

### Topic weight distribution

The CED gives percentage ranges per unit. Convert these to approximate question counts:

> Example: Unit 4 is 30–40% of 42 questions = 13–17 questions

This determines how many questions to write per unit in your question bank. Write proportionally more questions for higher-weighted units.

---

## Phase 4 — Researching FRQ Format and Rubrics

### Why FRQ rubrics matter for a study site

FRQs have published scoring rubrics. Each rubric point corresponds to a specific thing the student must write. Knowing the rubric tells you:
- What skills to teach in the lesson content
- What common mistakes to highlight
- How to write FRQ practice prompts that mirror real rubric expectations

### How to find FRQ rubrics

College Board publishes scoring guidelines for every released AP exam. Find them at `apcentral.collegeboard.org` under each course's "Exam Questions and Scoring Information" section. These are free PDFs.

### What to extract from FRQ rubrics

For each FRQ type:
- What specific thing earns each point
- What penalties exist and what triggers them
- What common mistakes graders see repeatedly
- The scenario types that appear (e.g., scheduling systems, text processing, financial calculators)

For APCSA FRQ Q1 (7 points), each point corresponds to:
- Correct loop structure (type, bounds)
- Loop variable used correctly inside the body
- Correct helper method call with proper arguments
- Correct conditional logic
- Accumulator variable correctly initialized and updated
- Correct return value
- Part A method called correctly inside Part B

This level of specificity lets you build practice prompts that force students to earn each of those 7 points explicitly.

### Fixed vs. variable FRQ structure

Some AP exams have a fixed FRQ structure (same question types every year). Others vary. For APCSA, the structure is fixed:
- Q1: Methods and Control Structures (7 pts) — always
- Q2: Class Design (7 pts) — always
- Q3: Data Analysis with ArrayList (5 pts) — always
- Q4: 2D Array (6 pts) — always

When the structure is fixed, you can tailor practice specifically to each question type. If the structure is variable (as in AP US History, where prompt types vary), document the full range of possible types instead.

---

## Phase 5 — Researching How to Teach by Text

Good content knowledge is not enough. The way you write lesson content determines whether students actually learn from it or just read past it.

### The research base

The educational writing guide used for this site (`research/educational-writing-guide.md`) synthesizes evidence from:
- Cognitive load theory (Sweller, 1988) — working memory holds 4-7 chunks
- Bloom's Taxonomy — sequence from Remember → Understand → Apply → Analyze
- Worked examples research (Sweller & Cooper, 1985) — the most validated instructional technique
- Plain language movement — government and UX writing standards
- The "I Do / We Do / You Do" gradual release model
- Readability research — Flesch Reading Ease, sentence length targets

### The core principle

**The brain needs something concrete to grab before it can hold an abstraction.**

Every lesson should follow this loop for each concept:

1. **Explain** — one short paragraph stating what the concept is and why it matters
2. **Show** — a worked code example with every decision explained
3. **Apply** — a question the student answers themselves before seeing the answer

Repeating this loop for every concept in the lesson is more important than any other design decision.

### Plain language rules for lesson text

| Rule | Violation | Fix |
|---|---|---|
| Active voice | "The variable is assigned a value" | "The programmer assigns a value to the variable" |
| One idea per sentence | "A constructor is a special method that runs when an object is created and always has the same name as the class" | Split into three sentences |
| Define terms before using them | Using "instantiate" without explaining it | "Create an object (this is called instantiation) using `new`" |
| Short paragraphs | 8+ sentence blocks | 3–4 sentences max |
| Simplest accurate word | "utilize" | "use" |

### Cognitive load management

Three things increase cognitive load:
1. **Intrinsic** — the inherent difficulty of the topic (can't be eliminated)
2. **Extraneous** — complexity from poor presentation (eliminate aggressively)
3. **Germane** — the mental work of forming understanding (maximize this)

Practical rules:
- Never introduce two new concepts in the same sentence
- Define every new term the first time it appears
- Keep code examples minimal — only include lines relevant to the current concept
- Sequence simpler topics before complex ones within every unit and every lesson

### Formative checks

Students learn more from answering questions during a lesson than from reading alone. Place a comprehension check:
- After every major concept (not just at the end)
- After every worked example ("What would happen if we changed X?")
- As an exercise the student completes before seeing the answer

For this site, these became the inline "Concept Checks" on each sub-unit page.

### Readability targets

- Average sentence length: 15–20 words
- Flesch Reading Ease score: 60–70 (readable by a typical high school student)
- Paragraph length: 2–4 sentences

---

## Phase 6 — Structuring the Research Files

Before building anything, create a `research/` directory in your project root and populate it with discrete reference files. These files become your single source of truth and protect against content drift as the site grows.

### Recommended file structure for any AP course

```
research/
  00-overview.md         — Key facts, source document ID, documented conflicts
  01-units-and-topics.md — Complete topic list with official numbering
  02-unit1.md            — Unit 1 detailed content
  03-unit2.md            — Unit 2 detailed content
  04-unit3.md            — Unit 3 detailed content
  05-unit4.md            — Unit 4 detailed content (add more as needed)
  06-exam-format.md      — Section I and II details, scoring, timing
  07-what-changed.md     — Removed content, added content, format changes
  08-quick-reference.md  — The official exam reference sheet (exact methods/formulas)
  09-skills-framework.md — The cross-cutting practices/skills and their MCQ weights
  10-site-architecture.md — Page structure, component list, routing
  11-mcq-format.md       — Question archetypes, distractor patterns, topic counts
  12-frq-format.md       — Per-FRQ rubrics, scenarios, common mistakes
  educational-writing-guide.md — How to write content that teaches
```

Each file should be reference-quality — dense, specific, and accurate. These are not lesson content; they are the raw material that lesson content is built from. Always include the source URL or document ID for every fact.

### Why separate files matter

When you write a lesson about ArrayList removal, you open `research/11-mcq-format.md` to see exactly which distractor patterns to reflect in that lesson's concept checks. When you write the exam practice section, you open `research/06-exam-format.md` to verify point values. Keeping these separate prevents you from confusing what you've internalized with what the official source says.

---

## Phase 7 — Site Architecture Decisions

### Page hierarchy

Map the exam structure directly to the page hierarchy:

```
Homepage → Unit Page → Sub-Unit Page
```

The homepage shows all top-level units (4 for APCSA). The unit page lists sub-units (grouped topics). The sub-unit page contains the lesson, concept checks, and MCQs.

This hierarchy mirrors how students study: they know which unit a topic belongs to, and they can drill into exactly the sub-unit they need.

### Routing

Use slug-based routing that matches official topic numbers where possible:
- `/unit/using-objects` — Unit 1
- `/unit/using-objects/java-basics` — Sub-unit on Topics 1.1–1.3

Students can bookmark a specific sub-unit and return directly to it.

### Required pages beyond lesson content

| Page | Purpose |
|---|---|
| Homepage | Dashboard showing all units with progress indicators |
| Unit overview | All sub-units for a unit, with completion badges |
| Sub-unit lesson | The actual lesson content |
| MCQ Bank | Browse and practice all questions by topic |
| Practice Exam | Timed full exam simulation |
| Exam results | Score breakdown by unit, question review |

### Navigation pattern

Every sub-unit page needs a "Back" and "Next" button for linear progression. Students often study in order the first time through. After that, they drill weak areas by jumping directly to a sub-unit from the MCQ bank.

### Tech stack rationale

| Choice | Reason |
|---|---|
| React | Component model maps well to the repeating lesson structure (every lesson has the same shape) |
| TypeScript | Forces you to define the data schema for curriculum, MCQs, and exam data before building UI — catches structural errors early |
| Tailwind CSS | Fast iteration on a design-heavy site without managing CSS files |
| Framer Motion | The homepage unit cards and sub-unit transitions benefit from subtle animation for a polished feel |
| Lucide React | Consistent icon set with tree-shaking; no external icon font loading |

---

## Phase 8 — Building the Curriculum Data Layer

### Start with TypeScript types

Before writing any content, define the data structure. This forces clarity about what a "lesson" contains and prevents inconsistency as content grows.

```typescript
// types/curriculum.ts
type SubUnit = {
  id: string;
  slug: string;
  title: string;
  cedTopics: string[];      // e.g. ["1.1", "1.2", "1.3"]
  description: string;
  objectives: string[];
  codeExamples: CodeExample[];
  conceptChecks: ConceptCheck[];
  mcqs: MCQ[];
}

type Unit = {
  id: number;
  slug: string;
  title: string;
  examWeight: string;       // e.g. "15–25%"
  subUnits: SubUnit[];
}
```

Define every field you will need before writing content. Changing the type later breaks all existing content objects.

### Use official topic numbers as the anchor

Every sub-unit has a `cedTopics` field that lists the official CED topic numbers it covers. This is the connection between lesson content and exam coverage. It lets you:
- Track which official topics have been covered
- Map MCQs to their source topics for performance analytics
- Verify completeness by checking every CED topic appears in at least one sub-unit

### Grouping topics into sub-units

The CED lists 53 individual topics for APCSA. Building one lesson per topic would create 53 micro-lessons that are too small to be useful. Instead, group logically related topics that a student would study together:

- Topics 1.1, 1.2, 1.3 → sub-unit "Java Basics & Primitive Types"
- Topics 1.4, 1.5, 1.6 → sub-unit "Arithmetic and Operators"
- Topics 1.15 → sub-unit "String Methods" (large enough to stand alone)

The grouping rule: put topics together if a student would naturally study them in the same sitting. If a topic is large enough to need 3+ code examples, it earns its own sub-unit.

---

## Phase 9 — Writing Lesson Content

### The per-lesson writing process

For each sub-unit:

**Step 1:** Open the relevant research file. Read every learning objective for the topics this sub-unit covers.

**Step 2:** List every concept the student must understand before leaving this lesson. Order them from simplest to most complex. This becomes the lesson outline.

**Step 3:** For each concept, write using the Explain → Show → Apply loop:
- **Explain:** 2-4 sentences. What it is and why it matters.
- **Show:** A minimal code example with inline comments explaining the why, not just the what. Every line that does something non-obvious gets a comment.
- **Apply:** A concept check question. "What does this code print?" or "What would happen if you changed X to Y?"

**Step 4:** After the concept checks, write 3-5 MCQs using the archetypes from the research files (see Phase 3).

**Step 5:** Verify that every objective from the CED appears somewhere in the lesson.

### Code example standards

Every code example must be:
- **Minimal** — only the lines needed to illustrate the concept. No surrounding boilerplate unless you're explicitly teaching boilerplate.
- **Commented** — comments explain the *why* of non-obvious lines, not the *what* (what is already clear from reading the code).
- **Correct** — the code compiles and runs as stated. Test every snippet mentally by tracing it manually.
- **Contextualized** — the explanation text explains what the example demonstrates and why that matters for the exam.

### The exam-relevance test

Before including any piece of content, ask: "Does this appear on the exam?"

If the answer is no, cut it. For APCSA, this meant:
- No inheritance examples (removed from exam)
- No writing recursive methods (trace only)
- No interfaces or abstract classes
- No `Scanner(System.in)` — only `Scanner(new File(...))`

Students who study for a test with content that isn't on the test waste their time. Ruthless exclusion is an act of respect for the student's time.

---

## Phase 10 — Humanizing the Text

AI-generated educational text has recognizable patterns that make it harder to read and less trustworthy to students. These patterns include:

- **Inflated symbolism:** Every concept becomes "crucial" or "fundamental"
- **Em dash overuse:** Connecting every clause with an em dash instead of writing clear sentences
- **Rule of three:** Listing everything in groups of exactly three
- **AI vocabulary:** Words like "delve," "robust," "leverage," "facilitate," "utilize"
- **Vague attributions:** "Studies show..." without naming the study
- **Passive voice everywhere:** "The variable is assigned..." instead of "Java assigns..."
- **Promotional language:** "This powerful feature..." treating every topic as impressive
- **Filler phrases:** "It's worth noting that...", "In essence...", "At its core..."

### The humanizing process

After writing lesson content, read every paragraph and apply these filters:

**Replace AI vocabulary:**
- "utilize" → "use"
- "facilitate" → "help" or "let"
- "leverage" → "use"
- "robust" → delete or be specific
- "delve into" → "look at"
- "it's worth noting" → delete the phrase, just state the thing

**Break up em dashes:**
- "The constructor — which runs when you create an object — initializes the fields" → "The constructor initializes the fields. It runs when you create an object."

**Break up the rule of three:**
- "Java gives you three tools: loops, conditionals, and variables" → fine, only list three when there are exactly three, not as a rhetorical device

**Convert passive to active:**
- "An exception is thrown when..." → "Java throws an exception when..."
- "The variable is assigned..." → "The assignment gives the variable..."

**Remove filler openers:**
- "In this section, we will explore..." → just start with the content
- "It is important to understand that..." → delete and state the thing directly

**Trim promotional language:**
- "This powerful and versatile feature..." → "This feature..."
- "One of the most important concepts in Java..." → just teach the concept

### The goal

The goal is not "sounding human." It is writing that a student can read quickly, understand precisely, and not have to re-read. Shorter sentences, active verbs, specific language, and no filler make text more learnable.

---

## Phase 11 — Building the MCQ Question Bank

### Structure

The question bank is a TypeScript data file organized by unit and topic:

```typescript
// src/data/mcqBank.ts
type MCQBank = {
  units: {
    id: number;
    title: string;
    topics: {
      id: string;         // e.g. "1.1"
      label: string;
      questions: {
        id: string;       // e.g. "1_1_q01"
        topicId: string;
        question: string;
        code?: string;    // code snippet if needed
        options: { letter: string; text: string }[];
        answer: string;   // "A", "B", "C", or "D"
        explanation: string;
      }[];
    }[];
  }[];
}
```

For APCSA, this file grew to over 23,000 lines covering all 53 topics.

### Writing questions — the process

For each MCQ:

**Step 1:** Pick an archetype from the 10 types identified in Phase 3. Roughly 50% should be code-tracing questions ("What is printed?" or "What is the value of...?").

**Step 2:** Write the correct answer first. Make it unambiguously correct. Test it by tracing the code manually.

**Step 3:** Write two plausible distractors. Each distractor should correspond to a specific, realistic mistake:
- Off-by-one error
- Wrong operator (`<` vs `<=`)
- Integer division confusion
- Wrong method (e.g., `length()` vs `size()`)
- The result after one fewer iteration of the loop

**Step 4:** Write one obviously wrong distractor. This gives students who understand the concept a quick elimination option.

**Step 5:** Write the explanation. The explanation should:
- State which answer is correct and why
- Explain the trap in at least one of the wrong answers
- Be 2-4 sentences

### Question volume targets

Base the number of questions per topic on the CED exam weights. A topic worth 10% of the exam should have more questions than one worth 2%.

For APCSA with ~23,000 lines in the bank:
- Unit 1 (15–25%): ~400 questions
- Unit 2 (25–35%): ~500 questions
- Unit 3 (10–18%): ~300 questions
- Unit 4 (30–40%): ~550 questions

More questions = more practice for high-weighted topics = better exam preparation.

### Consistency rules

- Every question has exactly 4 choices (A–D) — matching the real exam
- Every question has an explanation
- Code snippets use consistent Java style (same indentation, same comment format)
- No two questions test the exact same concept in the exact same way

### Adaptive question selection

A flat random shuffle treats every question as equally useful. For a logged-in student that wastes time: they re-answer questions they already know and rarely revisit the ones they miss. The site's signature feature is a **weakpoint algorithm** that drives an adaptive swipe feed (`/scroll`) and a stats dashboard (`/stats`) from each student's answer history. It is large enough to be its own phase — see Phase 12.

---

## Phase 12 — Building the Adaptive Engine: Algorithm, Scroll Feed, Stats Dashboard

This is the highest-leverage feature on the site, and it is worth building deliberately. One shared answer log drives everything; the feed and the dashboard are just two views of the same model.

| Layer | Where it lives | Job |
|---|---|---|
| Attempt store | `supabase/migrations/0001_mcq_attempts.sql` | One row per answered question, per student |
| Scoring model | `src/lib/attempts.ts` | Pure functions: weakness per topic, weight per question, stats aggregations |
| Swipe feed | `src/pages/ScrollFeedPage.tsx` (`/scroll`) | TikTok-style practice sessions drawn from the model |
| Stats dashboard | `src/pages/StatsPage.tsx` (`/stats`) | Predicted score, per-unit accuracy, weak spots |

Every practice surface on the site (sub-unit lessons, MCQ bank, practice exams, the feed itself) records into the same log, so a student's exam mistakes influence what the feed shows them next.

#### 1. The attempt store

One row per answered question in a dedicated `mcq_attempts` table:

```sql
create table public.mcq_attempts (
  id          bigserial primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  mcq_id      text not null,
  topic_id    text not null,
  correct     boolean not null,
  source      text not null check (source in ('subunit', 'exam', 'bank', 'feed')),
  answered_at timestamptz not null default now()
);
-- Both indexes lead with user_id and end with answered_at desc,
-- because every query is "this student's history, newest first":
--   (user_id, answered_at desc)
--   (user_id, topic_id, answered_at desc)
```

Design decisions that mattered:

- **One row per attempt, not per question.** Full history plus an `answered_at` timestamp is what makes recency logic possible. (An earlier version reused the progress table with one merged row per topic; it worked but threw away timing, so recency was impossible. Use a dedicated table.)
- **`source`** records which surface the answer came from (`subunit` / `exam` / `bank` / `feed`), so every surface feeds one shared model and the dashboard can count practice-exam questions separately.
- **Row-level security on both verbs**: `select` and `insert` policies check `auth.uid() = user_id`. Students can never read each other's rows, even though the client uses the public anon key.
- **Write at answer time.** The feed inserts one row the moment the student taps a choice (`recordAttempt`); a `recordAttemptsBatch` exists for end-of-session writes.
- **Backfill old data once.** Students who used the site before the table existed had answers stored in a per-sub-unit progress blob. `backfillSubUnitAttempts()` converts those into attempt rows on first feed load, gated on "no `source='subunit'` rows exist yet" so it never runs twice.

#### 2. The weakpoint algorithm

The whole model is ~80 lines of pure functions in `src/lib/attempts.ts`. Load the student's last 500 attempts (newest first) once, then compute everything client-side:

**Cold start.** Fewer than 10 total attempts is not signal — return a uniform random shuffle and skip the model entirely.

**Per-topic weakness.** For each topic, take its last 20 attempts and compute `weakness = 1 − accuracy`, giving a value in [0, 1]. A topic the student has never touched defaults to `0.5` — a mild exploration prior that surfaces new material without flooding them with it. Using only the last 20 means an old bad streak stops counting once the student improves.

**Per-question weight.** Every question in the bank gets a weight built from its topic's weakness and the student's most recent attempt at that exact question:

| Signal | Effect | Why |
|---|---|---|
| Base | `0.3 + topicWeakness` | Even mastered topics keep a 0.3 floor — nothing disappears entirely |
| Missed within the last 7 days | × 2.0 | Recently missed questions resurface until won |
| Answered within the last 24 hours | × 0.15 | Suppress immediate repeats — a feed that re-asks what you just answered feels broken |
| Answered correctly within the last 7 days | × 0.6 | Rest questions the student just got right |
| Never attempted | × 1.2 | Mild exploration bonus for unseen questions |

**Weighted sampling without replacement.** Draw the 15-question session with the Efraimidis–Spirakis trick: give every question a key `−ln(U) / weight` (U uniform random) and keep the 15 smallest keys. One pass, no duplicates, and higher-weight questions are proportionally *more likely* without being guaranteed — sessions stay varied instead of becoming a fixed worst-topics drill.

Keep the weights **legible** — five explainable numbers beat an opaque scheduler. Resist a full spaced-repetition system (ease factors, due dates) unless the data justifies it. Every constant above lives in one file, and you can tell a student exactly why a question appeared.

#### 3. The Scroll Feed (`/scroll`)

A vertical, full-screen swipe feed — one MCQ per screen, answer with a tap, swipe right for the explanation, swipe up for the next question. The engineering decisions that made it feel native:

**Let the browser own the vertical axis.** Vertical paging is native CSS scroll-snap, not a JS gesture library: the container sets `scroll-snap-type: y mandatory` and `overscroll-behavior: contain`, and every card is a `100dvh` section with `scroll-snap-align: start`. This is the same approach TikTok and Reels use — the browser's own momentum/snap physics is what makes iOS scrolling feel right, and no JS reimplementation matches it. Use `100dvh`, not `100vh`, so mobile browser chrome doesn't cause overflow. (And because the page is edge-to-edge under `viewport-fit=cover`, the floating header needs `env(safe-area-inset-top)` padding or its buttons sit under the iPhone notch.)

**Track position with IntersectionObserver, not scroll events.** The header's "3 / 15" indicator follows the currently snapped card via an IntersectionObserver at a 0.6 threshold reading each section's `data-idx`. Zero scroll listeners, zero per-frame work, no jank.

**The horizontal axis belongs to Framer Motion.** Each card is draggable on x only (`drag="x"` + `dragDirectionLock`, with `touchAction: "pan-y"` so vertical pans fall through to the snap container). After answering, a rightward swipe past 80 px — or a flick faster than 500 px/s — flips the card to its explanation view; leftward flips back. The two axes never fight because each is owned by a different system.

**Each card is a tiny state machine.** `{ question, selected, view }` — selection locks on the first tap (instant right/wrong coloring), and the attempt is written to the store at that moment with `source: 'feed'`, so the *next* session already knows about it.

**Session lifecycle — random first, personalize as an upgrade.** The page builds a plain `randomSession()` synchronously as the safe default. If a user is logged in, it races the history load (backfill + `loadAttempts`) against a 4-second timeout; only if real history arrives and the student is past cold start does it swap in `pickPersonalizedSession()`. A "For you" badge shows when personalization actually happened; logged-out users see a "Personalize" sign-in nudge instead.

**The last snap section is the results card** — score, a reshuffle button (bumps a `sessionId` counter to rebuild the session), and home. No special UI mode; it's just one more card in the stack.

**Desktop parity is cheap.** ↑/↓ navigate the stack, ←/→ flip question/explanation, A–D answer — one `keydown` listener and a keyboard-hints pill at the bottom.

**Rendering details.** Java snippets on cards run through a small hand-rolled line-by-line tokenizer (keywords, strings, chars, numbers, `//` comments) instead of a heavyweight highlighting dependency, and explanations are parsed for triple-backtick fences so code-bearing explanations render as real code blocks.

#### 4. The stats dashboard (`/stats`)

The dashboard adds no new storage — it is pure functions over the same attempt log, computed client-side after one load:

- `overallAccuracy` — total, correct, accuracy.
- `accuracyByUnit` — the unit is just the topic id's prefix (`"1.15"` → unit 1), so unit rollups need no extra schema.
- `accuracyByTopic` — a topic needs **at least 3 attempts** to qualify; one lucky guess shouldn't label a topic a strength or weakness.
- `topWeakTopics` / `topStrongTopics` — sort qualifying topics by accuracy, take 3 from each end.
- `recentActivityByDay` — bucket the last 7 days for the activity sparkline.
- `predictedAPScore` — map overall MCQ accuracy to a 1–5 using public composite cutoffs (≥70% → 5, ≥60% → 4, ≥45% → 3, ≥30% → 2), plus a projected raw score out of 40. Label it clearly as an MCQ-side projection — the real score also includes FRQs.

Layout is ordered by what a student acts on: predicted-score hero → quick counters (questions answered, exam questions, sub-units completed, last 7 days) → animated per-unit accuracy bars in the unit colors → Weak Spots / Strengths side by side → activity sparkline. The Weak Spots card ends with **"Practice these in Scroll Feed →"** — the dashboard is a decision tool, and the decision is "go drill."

Build all three non-data states explicitly: logged out (pitch + sign-in button), loading (spinner), and signed-in-with-no-attempts (an explainer pointing at the practice surfaces). The empty state is most students' first impression of the page.

#### 5. Degrade gracefully — never hang (the most important rule)

The feed and dashboard depend on a backend that **will** be slow or down sometimes (free-tier databases pause after inactivity). If the feature *waits* on that backend with no escape, it hangs forever on a loading screen — the single worst failure mode, because the student sees a dead app.

Build every data-dependent surface to fall back, never block:

- Wrap the history load in a **timeout race** (e.g. 4s). Whatever comes back — data, empty, or nothing — proceed to build the session.
- **No account, no history, or load failed → plain random draw.** A logged-out student still gets a full, working feed; they just aren't personalized. Show a small "log in to personalize" hint.
- Keep the model in a ref/cache so selection always reads the latest without stale state.

> **Hard-won lesson:** an earlier version of this feed `await`ed the attempt history with no timeout and no fallback. When the database went offline, `/scroll` sat on "picking questions for you" forever. The fix is structural: treat the backend as optional. The feature must produce a usable session from an empty model, and a timeout must guarantee it always reaches that path.

#### 6. Keep it in source control

This feature is tempting to iterate on by deploying straight from a local build. Don't. If the swipe feed, the stats page, and the algorithm live only in a deployed bundle and never get committed, the next deploy from the repo silently deletes them, and the only copy is minified production JS. Commit the data layer, the pages, and the SQL migration like any other code.

---

## Phase 13 — Building Practice Exams

### Design goals

A practice exam should:
- Simulate the real exam's format (question count, time limit, 4 choices, no explanations during the exam)
- Pull questions proportionally from each unit to match real exam weights
- Show a score breakdown by unit after submission so students know where to focus
- Allow question review after the exam (with explanations visible)

### Practice exam data structure

For APCSA, three separate exam data files were built (`examData.ts`, `examData2.ts`, `examData3.ts`) with 42 questions each — matching the real exam's question count.

Each exam file contains questions selected to:
- Cover all 4 units in the correct proportion
- Include a mix of all 10 question archetypes
- Vary in difficulty (some questions are conceptual; most require code tracing)
- Not repeat questions from the MCQ bank in identical form

### The timer

The real APCSA MCQ section is 90 minutes for 42 questions (~2 minutes per question). The practice exam timer mirrors this exactly. Build in a visible timer and an auto-submit when time runs out, because exam time management is itself a skill students need to practice.

### Post-exam analytics

After submission, show:
- Overall score (X / 42, as a percentage)
- Score by unit (Unit 1: 8/10, Unit 2: 9/12, etc.)
- Which questions were wrong, with the student's answer and the correct answer
- The explanation for each wrong question

This breakdown tells students exactly which units to review — it transforms a practice exam from a score into a study plan.

### Exam exit behavior

Include a clearly labeled exit button that warns the student before leaving. An accidental navigation away from a timed exam is frustrating and avoidable. Pause the timer when the student switches browser tabs (the Tab Visibility API).

---

## Phase 14 — Building the UI Components

### Component design principles

Every reusable UI element should have exactly one job. Don't build components that do two things.

| Component | Job |
|---|---|
| `UnitCard` | Display a unit's title, description, color, and exam weight on the homepage |
| `CodeBlock` | Render a Java code snippet with monospace font and dark background |
| `ConceptCheck` | Show a question with a "Reveal Answer" toggle |
| `MCQQuestion` | Show a question with 4 answer choices, handle selection, show feedback |
| `NavButtons` | "Back" and "Next" buttons for sub-unit navigation |
| `ProgressBadge` | Show completion status (not started / in progress / complete) |
| `ExamTimer` | Countdown timer with auto-submit |

### Design aesthetic

The site uses a dark mode IDE theme because:
1. It matches the aesthetic of actual Java development tools (which students will use in class)
2. Code blocks with syntax highlighting are far more readable on dark backgrounds
3. It signals "serious study tool" rather than "generic quiz website"

Color associations per unit create visual identity that students internalize:
- Unit 1: Blue
- Unit 2: Purple
- Unit 3: Green
- Unit 4: Orange

### Animations

Keep animations subtle and functional. The only animations used:
- Fade-in on page load (Framer Motion `AnimatePresence`)
- Card hover lift on homepage unit cards (scale + shadow)
- Smooth appearance of MCQ feedback after selection

Do not animate things that fire repeatedly during normal use (e.g., don't animate each MCQ question as the student scrolls through them). Animation should signal state changes, not decorate content.

---

## Phase 15 — Visual Design: Avoiding AI Slop

"AI slop" in UI design is as real a problem as AI slop in writing. Just as LLMs produce text with predictable patterns (rule of three, em dashes, "delve"), they produce layouts with predictable patterns: everything centered, purple gradients, rounded corners on everything, Inter font. The result looks like every other AI-generated dashboard — technically competent, visually identical to a thousand other sites, with no personality a student would remember.

The `web-artifacts-builder` skill (available in Claude Code as `/web-artifacts-builder`) identifies this directly:

> **To avoid what is often referred to as "AI slop", avoid using excessive centered layouts, purple gradients, uniform rounded corners, and Inter font.**

This section explains what AI slop looks like in UI, how to use the web-artifacts-builder skill during prototyping, and how to make deliberate design choices that give the site a distinct visual identity.

---

### What AI slop looks like in UI

These are the design equivalents of "utilize" and "delve" — defaults an LLM reaches for because they are statistically common, not because they are right for the context.

| AI default | Why it looks generic |
|---|---|
| Everything centered on the page | Real editorial layouts use left-aligned content blocks with intentional white space. Centering everything reads as "I don't know where this should go." |
| Purple or blue-purple gradient backgrounds | The default palette for every AI-generated SaaS landing page since 2022. Immediately signals "this was generated." |
| Uniform `rounded-xl` or `rounded-2xl` on every card, button, and input | Real design uses corner radius intentionally — large radii on some things, sharp corners on others, to create visual hierarchy. Rounding everything equally flattens that hierarchy. |
| Inter font for everything | Inter is the default Tailwind font. Every AI-built site uses it without asking whether it's right. Mixing a serif for headings or using a monospace-influenced sans creates actual character. |
| Hero section → 3-column feature grid → CTA | The universal LLM page layout. It says nothing about the specific site. |
| Every card with icon + bold title + 1-2 lines of text | The LLM's understanding of "a card." Functional, but anonymous. |
| Gradient buttons (`from-blue-500 to-purple-600`) | The signature button style of AI-generated UIs. It exists on every dashboard, every study tool, every landing page from 2023-2025. |

---

### How to use the web-artifacts-builder skill

The `web-artifacts-builder` skill builds complex multi-component React artifacts using React 18 + TypeScript + Tailwind + shadcn/ui. Use it during the **prototyping phase** — before building the actual site — to rapidly test layout ideas and UI patterns without committing to production code.

**When to invoke it:**
```
/web-artifacts-builder
```

**What it gives you:**
- A fully configured React + Tailwind + shadcn/ui project, bundled into a single HTML file you can preview immediately
- Access to 40+ shadcn/ui components (tables, dialogs, tabs, badges, progress, tooltips, etc.)
- A fast path from "I want to see what the MCQ question layout looks like" to a working interactive prototype

**How to use it for anti-slop design:**

Tell the skill exactly what to avoid. Instead of "build me a homepage," say:

> Build me a homepage for an AP CS study site. Use a dark theme with a monospace aesthetic — not a purple gradient SaaS look. Left-align the content. Use sharp or subtly-rounded corners, not rounded-2xl on everything. The unit cards should feel like IDE panels, not pricing cards. Use a system mono font or JetBrains Mono for code and a geometric sans (not Inter) for body text. No gradient buttons.

The more specific you are about what NOT to do, the more useful the prototype will be for making production decisions.

---

### Deliberate design choices for an AP study site

Every visual decision should have a reason tied to the site's purpose. Here is how this APCSA site's design choices were made:

**Dark mode**
Reason: Java IDEs (IntelliJ, VS Code) are dark by default. A dark study site looks like the tools students use in class, not a flashcard app. It also makes code blocks with syntax highlighting dramatically more readable — light backgrounds wash out the color differentiation between keywords, strings, and identifiers.

Avoid: Don't use dark mode because "dark looks cool." Use it if your subject involves a dark-mode tool (programming, data science, terminal work). For AP Biology or AP History, a light mode with strong typography is more appropriate.

**Monospace code blocks**
Reason: Code is not prose. Rendering it in a proportional font destroys the spatial relationships that make code readable (indentation, alignment). Every code block uses a monospace font on a distinct dark background.

Rule: Never let code bleed into prose. If it's code, it goes in a code block. Every time.

**Unit color system (blue / purple / green / orange)**
Reason: Students spend weeks inside this site. Color becomes a mnemonic — "the ArrayList stuff is orange." Assigning one consistent color per unit lets the student build that mental map. Every card, badge, and accent on a Unit 4 page uses orange.

Avoid: Don't use color decoratively. If every button is a different color, color carries no information.

**Left-aligned content in a constrained-width column**
Reason: Centered layouts look like marketing pages. Left-aligned content with a max-width (around 768px for lesson text) reads like a textbook or documentation site — exactly what this is. Students scan down a lesson; they don't read across three columns.

**No gradient buttons**
Reason: Solid-color buttons read as interactive controls. Gradient buttons read as decorative elements. A button that says "Submit Exam" should look like a button, not a hero section accent.

**Sharp-to-slightly-rounded corners (not `rounded-2xl` everywhere)**
Reason: Heavily rounded corners make everything feel friendly and soft — appropriate for a children's app, wrong for a serious exam prep tool. Subtle corner radii (`rounded` or `rounded-md`) maintain a professional, tool-like feel.

---

### The anti-slop design checklist (run this after every UI prototype)

Ask these questions before finalizing any page layout:

**Layout**
- [ ] Is the content left-aligned, not centered?
- [ ] Is there a clear reading column with defined max-width, rather than edge-to-edge content?
- [ ] Do different elements have different amounts of corner rounding, or is everything equally round?

**Color**
- [ ] Is the primary background a neutral (dark gray, near-black, off-white) rather than a color gradient?
- [ ] Does color carry information (unit = color, error = red, success = green) rather than just decorate?
- [ ] Are there fewer than 3 distinct accent colors on any single page?

**Typography**
- [ ] Is the font something other than Inter used without thought? (Or, if Inter is used, was it chosen deliberately?)
- [ ] Is code in a monospace font, clearly separated from prose?
- [ ] Is heading hierarchy visually clear through size and weight, not just bold + slightly-larger?

**Interactivity**
- [ ] Do buttons look like buttons? (Solid color, clear border or background, not gradient-decorated)
- [ ] Does animation signal state changes rather than just decorating content?
- [ ] Is hover/focus state visible and consistent?

**Identity**
- [ ] If you saw a screenshot of this page with the title removed, would it look like every other AI-generated study site — or does it have a specific visual personality?
- [ ] Does the design reinforce the subject? (Dark IDE theme for CS, clean document layout for History, formula-forward layout for Math)

---

### The web-artifacts-builder skill workflow in practice

Use this workflow when starting a new AP study site or adding a major new page type:

1. **Invoke `/web-artifacts-builder`** and describe the page you want to prototype
2. **Specify the anti-slop constraints explicitly** — what palette, what font, what corner treatment, what layout axis
3. **Review the prototype** against the anti-slop checklist above
4. **Identify the 2-3 choices that make it look generic** and give specific corrective instructions
5. **Iterate once or twice** until the prototype has a distinct visual identity
6. **Extract the layout and component patterns** from the prototype and implement them in the actual React codebase

This is faster than designing in the actual codebase because the bundled artifact is immediately viewable. You catch "this looks like every other AI site" in the prototype stage, not after building 10 pages.

---

## Phase 16 — Quality Control Checklist

Before publishing any unit's content, verify:

### Visual design (anti-slop)
- [ ] No purple or blue-purple gradient backgrounds
- [ ] No `rounded-2xl` applied uniformly to all elements
- [ ] Content is left-aligned in a constrained column, not everything centered
- [ ] Font is a deliberate choice, not default Inter
- [ ] Buttons are solid-color, not gradient-decorated
- [ ] Color carries information (per-unit system) rather than just decorating
- [ ] Animation signals state changes only — not used for decoration
- [ ] Screenshot test: would this page look distinct from a generic AI-generated study site?

### Curriculum accuracy
- [ ] Every CED topic number for this unit is covered in at least one sub-unit
- [ ] No removed content is included (e.g., inheritance for APCSA)
- [ ] Exclusion statements from the CED are honored
- [ ] All code examples use only methods/classes from the official quick reference
- [ ] Topic weights are reflected in question counts

### Content quality
- [ ] Every code example has been traced manually for correctness
- [ ] Every MCQ's correct answer has been verified
- [ ] Every MCQ has an explanation
- [ ] No two questions test identical concepts in identical form
- [ ] All lesson text follows the Explain → Show → Apply loop

### Writing quality
- [ ] No AI vocabulary ("utilize", "delve", "robust", "leverage", "facilitate")
- [ ] No passive voice where active voice is possible
- [ ] No filler openers ("In this section...", "It's worth noting...")
- [ ] No promotional language ("powerful", "crucial", "fundamental")
- [ ] Sentences average under 20 words
- [ ] Paragraphs are 2–4 sentences

### Technical accuracy
- [ ] TypeScript types match the data structure
- [ ] All slugs are URL-safe (lowercase, hyphens, no spaces)
- [ ] All MCQ IDs are unique across the entire bank
- [ ] Code snippets display correctly in the `CodeBlock` component

---

## Replication Guide for Any AP Course

To build this site for a different AP exam, follow these steps in order:

### Step 1 — Download the CED (2 hours)
Go to `apcentral.collegeboard.org`, find your course, download the CED PDF. Note:
- Document ID and version
- Whether the current year has format changes from the previous year

### Step 2 — Build the research directory (4–8 hours)
Create `research/` and populate the 13 files described in Phase 6. For non-programming AP courses:
- Replace `08-java-quick-reference.md` with an `08-formula-sheet.md` or `08-key-documents.md`
- Replace `12-frq-format.md` with whatever the long-answer section is called in your subject
- The structure otherwise stays identical

### Step 3 — Design the curriculum data types (2 hours)
Define your TypeScript schema. The unit/sub-unit structure works for any AP course. Adjust `SubUnit` to replace `codeExamples` with the appropriate content type for your subject (e.g., `documentExcerpts` for APUSH, `graphExamples` for AP Statistics).

### Step 4 — Write lesson content (the bulk of the work)
For each sub-unit:
- Follow the Explain → Show → Apply loop
- Match vocabulary to the CED's terminology exactly
- Keep examples minimal and specifically illustrative of the exam concept
- Apply humanization filters before finalizing

### Step 5 — Build the MCQ bank
- Identify the question archetypes from released exams
- Identify the distractor patterns from wrong answers on released exams
- Write questions proportionally to unit exam weights
- Every question needs: correct answer verification, plausible distractors, explanation
- For logged-in students, add the adaptive engine from Phase 12 (attempt log, weakpoint weights, swipe feed, stats dashboard) so practice adapts to each student's missed questions

### Step 6 — Build practice exams
- Match the real exam's question count and time limit
- Distribute questions by unit weight
- Build post-exam analytics by unit
- Include a timer with tab-switch pause

### AP course–specific notes

| Course | Main adaptation |
|---|---|
| AP Biology | Replace code blocks with diagram descriptions; FRQ = "free response" requires drawing skills — include image references |
| AP Statistics | Formula-heavy; build a reference component that renders LaTeX or formatted math |
| AP Chemistry | Periodic table and formula sheet are exam resources — include them as accessible references |
| AP US History | Document-based questions (DBQ) require primary source excerpts — need a `DocumentExcerpt` component |
| AP Physics | Free body diagrams and graphs — need image rendering for examples |
| AP Calculus | LaTeX rendering for formulas is essential |
| AP English | MCQ = passage analysis; need a `Passage` component for long text; FRQ = essay prompts |

The lesson content format, question bank structure, practice exam system, and analytics layer are identical across all AP courses. Only the content type components and specific research files change.

---

## File Reference for This APCSA Site

| File | Purpose |
|---|---|
| `research/` | All 13 research files — primary sources |
| `src/types/curriculum.ts` | TypeScript types for units and sub-units |
| `src/types/mcq.ts` | TypeScript types for MCQ bank |
| `src/data/curriculum.ts` | All 4 units, 30 sub-units, lesson content (~4,559 lines) |
| `src/data/mcqBank.ts` | All MCQs organized by topic (~23,504 lines) |
| `src/lib/attempts.ts` | Attempt store + weakpoint scoring model + weighted sampling (drives the feed, stats, and bank) |
| `src/pages/ScrollFeedPage.tsx` | Swipe practice feed (`/scroll`) — adaptive sessions with graceful fallback |
| `src/pages/StatsPage.tsx` | Stats dashboard (`/stats`) — predicted score, accuracy by unit, weak spots |
| `supabase/migrations/0001_mcq_attempts.sql` | Migration for the `mcq_attempts` table (with RLS) backing the feed and stats |
| `src/data/examData.ts` | Practice Exam 1 (42 questions) |
| `src/data/examData2.ts` | Practice Exam 2 (42 questions) |
| `src/data/examData3.ts` | Practice Exam 3 (42 questions) |
| `src/pages/HomePage.tsx` | Dashboard with 4 unit cards |
| `src/pages/UnitPage.tsx` | Sub-unit list for a given unit |
| `src/pages/SubUnitPage.tsx` | Lesson content, concept checks, MCQs |
| `src/pages/MCQBankPage.tsx` | Browse and filter all questions by topic |
| `src/pages/ExamPage.tsx` | Timed full practice exam |
| `CLAUDE.md` | Project guide for AI-assisted development |
| `SKILL.md` | This file — the complete playbook |
