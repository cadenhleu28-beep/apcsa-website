# How to Write Text That Is Easy to Understand and Educational

A research-backed guide for writing instructional content that sticks.

---

## Core Premise

Good educational writing is not about "dumbing things down." It is about designing for the human brain's actual capacity — limited working memory, preference for concrete anchors, and the need to build knowledge progressively. Every principle below serves that goal.

---

## 1. Know Your Audience Precisely

Before writing a single word, answer these questions:
- What does this reader **already know**? (assumed prior knowledge)
- What **vocabulary** do they use naturally?
- What **goal** are they trying to accomplish?

Write to that specific person, not to a generic "beginner" or "student." A student who just learned variables needs different language than one who has written a for-loop before.

**Practical rule:** Imagine your least-experienced likely reader. Write so they can follow. Cut jargon unless you define it the first time it appears.

---

## 2. Sequence Content by Cognitive Complexity (Bloom's Taxonomy)

Never throw complex tasks at a reader before they have the foundation. Use this progression:

| Level | What the learner does | Example task |
|---|---|---|
| **Remember** | Recall a fact or definition | "What does `int` mean?" |
| **Understand** | Explain it in their own words | "Describe what a variable stores." |
| **Apply** | Use it in a new situation | "Write code that declares a variable." |
| **Analyze** | Break it apart, compare | "Why does this code produce an error?" |
| **Evaluate** | Make a judgment | "Which approach is better and why?" |
| **Create** | Build something original | "Write a method that does X." |

**Practical rule:** In a single lesson, start at Remember/Understand, then move to Apply. Only push into Analyze/Evaluate/Create once the lower levels are solid.

---

## 3. Manage Cognitive Load

Working memory holds roughly 4–7 chunks of new information at a time. Overload it and nothing sticks.

**Three types of cognitive load:**

- **Intrinsic load** — the inherent complexity of the topic. You cannot eliminate it, but you can sequence it so learners build one piece at a time.
- **Extraneous load** — complexity from poor presentation (confusing layout, unnecessary jargon, bad examples). Eliminate this aggressively.
- **Germane load** — the mental effort of forming a new understanding. Maximize this — it is the load that produces learning.

**How to reduce extraneous load in writing:**
- One idea per sentence
- One concept per paragraph
- Define terms before using them
- Don't introduce two new concepts simultaneously
- Keep examples tightly focused — don't let them introduce surprise new vocabulary

---

## 4. Start Concrete, Then Move to Abstract

The brain needs something to grab onto. Abstract rules without examples are nearly impossible to internalize.

**Formula:**
1. Give a concrete, familiar example first
2. Explain what it illustrates
3. State the general rule or abstract concept
4. Give a second concrete example to reinforce the abstraction

**Example — teaching variable declaration:**

> Imagine a labeled box. You write "score" on the outside, and put the number 10 inside.
> In Java, `int score = 10;` does exactly that — it creates a box named `score` that holds an integer.
> Variables are named storage locations in memory.
> Another example: `String name = "Alice";` creates a box named `name` that holds text.

**Analogies accelerate this.** A good analogy maps an unfamiliar concept to something the reader already understands deeply. The analogy doesn't need to be perfect — it needs to build an initial mental model the reader can refine later.

---

## 5. Use Worked Examples

Worked examples are one of the most research-validated instructional tools that exist. They show a problem solved step by step, with every decision explained.

**Why they work:** They let learners study the process without burning cognitive resources on generating a solution from scratch. Once the pattern is internalized, learners can tackle novel problems.

**Structure of a good worked example:**
1. State the problem clearly
2. Show every step (no skipping "obvious" parts)
3. After each step, explain the *why*, not just the *what*
4. Highlight the pattern or principle that applies

**Bad worked example:**
```
// Add numbers 1 to n
int sum = 0;
for (int i = 1; i <= n; i++) sum += i;
```

**Good worked example:**
```java
// Goal: add all integers from 1 to n (e.g., n=5 → 1+2+3+4+5 = 15)

int sum = 0;          // Start with a running total of zero

for (int i = 1; i <= n; i++) {
    // i starts at 1 (the first number we want to add)
    // The loop continues as long as i hasn't passed n
    // After each iteration, i increases by 1 (i++ means i = i + 1)

    sum += i;         // Add the current value of i to the running total
}
// When the loop ends, sum holds the total
```

The second example costs more space but teaches the reader to think, not just copy.

---

## 6. The "I Do, We Do, You Do" Structure

Use this three-phase model when introducing any new skill:

**Phase 1 — I Do (Modeling):**
You, the author, demonstrate the skill completely. Walk through a full example step by step. Use think-aloud language: "Notice that we…", "The reason this works is…", "Here I'm choosing X because…"

**Phase 2 — We Do (Guided Practice):**
Give a partially-solved problem or a worked example with deliberate gaps. Ask the reader to fill in the missing step before you reveal it. Or give a similar problem and walk through it with prompts: "What should happen next?"

**Phase 3 — You Do (Independent Practice):**
Give a problem with no scaffolding. The reader must solve it entirely. Only after this phase is the skill solidly owned.

In written text, you create the We Do / You Do phases through:
- Concept checks ("What does this code print?")
- Exercises at the end of a section
- Questions embedded in the lesson before revealing the answer

---

## 7. Plain Language Rules

These are the most practical, sentence-level rules for clear writing:

| Rule | Example of violation | Fixed version |
|---|---|---|
| Use active voice | "The variable is assigned a value by the programmer" | "The programmer assigns a value to the variable" |
| One idea per sentence | "A constructor is a special method that runs when an object is created and it always has the same name as the class and no return type" | Split into three sentences |
| Avoid jargon without definition | "Instantiate an object using the default constructor" | "Create an object using `new ClassName()` — this calls the constructor, a special setup method" |
| Use the simplest word that's accurate | "utilize" | "use" |
| Lead with the main point | "Although there are many ways to accomplish this, the most common approach is…" | "The most common approach is…" |
| Short paragraphs | 8+ sentence blocks | 3–4 sentences max per paragraph |

---

## 8. Chunking and Visual Organization

Readers scan before they read. Structure your content to reward that.

**Chunking rules:**
- Group related ideas under a single heading
- Never put more than one concept under one heading
- Use bullet lists when order doesn't matter; numbered lists when it does
- Use tables to compare things side by side

**Heading hierarchy:**
- H1: The topic of the whole page
- H2: Major sections
- H3: Sub-points within a section
- Never skip a level (H1 → H3 without H2 is confusing)

**Code block guidelines:**
- Always put code in a clearly separated block (monospace, distinct background)
- Never inline multi-line code into prose
- Comment the code — readers should be able to understand code blocks independently of the surrounding text
- Keep code examples minimal — only include lines relevant to the concept being taught

---

## 9. Readability Targets

**Sentence length:** Average 15–20 words. Nothing over 35 words without a deliberate reason.

**Flesch Reading Ease score:** Aim for 60–70 for most educational content aimed at high school / early college students. (Higher = easier; 60–70 is "standard" — readable by 13–15 year olds.)

**Paragraph length:** 2–4 sentences. Never more than 6.

**Word choice:** If two words mean the same thing, use the shorter one. Never use a Latin-derived word when an Anglo-Saxon one works: "use" not "utilize," "start" not "commence," "help" not "facilitate."

---

## 10. Formative Checks (Questions Embedded in the Lesson)

Learning is not passive. Readers need to actively retrieve information while reading, not just consume it.

**Place questions:**
- After introducing a key concept (before moving on)
- After a worked example ("Based on this, what would happen if we changed X?")
- At the end of each section

**Question types that build understanding (not just recall):**
- "What does this code print?" — tests mental execution
- "What is wrong with this code?" — tests analysis
- "How would you change this to do Y?" — tests application
- "Why does Java require this?" — tests understanding of rationale

Always provide the answer nearby (collapsed, or immediately below), so readers get immediate feedback.

---

## 11. Tone and Voice

**Write conversationally, not formally.** Educational text is not an academic paper. Use "you" and "we." Contractions are fine.

**Be direct.** Don't hedge unless the content genuinely has exceptions. "This always works when…" is stronger than "This generally tends to work in most cases when…"

**Anticipate confusion.** If you know something is commonly misunderstood, address it explicitly: "Students often think X. That's actually wrong because…" or "You might wonder why we don't just Y. The reason is…"

**Respect the reader.** Never condescend. "This is really simple" or "obviously" alienates readers who are confused. Drop those words entirely.

---

## 12. The Explain-Show-Apply Loop

For any individual concept, use this three-beat rhythm:

1. **Explain** — one paragraph stating what the concept is and why it matters
2. **Show** — a worked example (code, diagram, or concrete illustration)
3. **Apply** — a question or exercise the reader does themselves

Then move to the next concept. Repeat.

This loop manages cognitive load (one concept at a time), sequences from abstract to concrete (Explain → Show), and embeds active retrieval (Apply).

---

## Quick Checklist

Before finalizing a section of educational writing, verify:

- [ ] Every new term is defined the first time it appears
- [ ] No two new concepts are introduced in the same sentence
- [ ] Every abstract concept has at least one concrete example
- [ ] Every example is fully worked, with reasoning explained
- [ ] Sentences average under 20 words
- [ ] Paragraphs are 2–4 sentences
- [ ] A formative check question appears after each major concept
- [ ] Code blocks are clearly separated, commented, and minimal
- [ ] Active voice is used throughout
- [ ] The content sequences from simpler to more complex (Bloom's order)

---

## Summary of Principles

| Principle | Core rule |
|---|---|
| Know your audience | Write for a specific person with specific prior knowledge |
| Bloom's Taxonomy | Sequence from Remember → Understand → Apply before going higher |
| Cognitive Load | One new idea at a time; eliminate everything that doesn't teach |
| Concrete before abstract | Example first, rule second |
| Worked examples | Show every step with reasoning, not just the answer |
| I Do / We Do / You Do | Model fully, then scaffold, then let the reader try solo |
| Plain language | Active voice, short sentences, no jargon, simplest accurate word |
| Chunking | Short paragraphs, clear headings, lists over dense prose |
| Readability | Aim for Flesch 60–70; avg sentence length 15–20 words |
| Formative checks | Embed questions during the lesson, not only at the end |
| Tone | Conversational, direct, no condescension |
| Loop | Explain → Show → Apply for every concept |
