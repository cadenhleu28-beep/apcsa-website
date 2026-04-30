# APCSA Study Website — Project Guide

## Project Overview

A high-fidelity, interactive study website for students preparing for the AP Computer Science A (APCSA) exam under the **2025–2026 reformed curriculum**.

### Key Curriculum Changes (2025–2026)
- Consolidated from 10 units → **4 units**
- **Removed** from required exam content: Inheritance, Polymorphism
- **Added** to required exam content: Text File I/O (Scanner class for files), Dataset Manipulation

---

## Curriculum Structure (4 Units)

### Unit 1: Using Objects and Methods
Java fundamentals, primitive vs. reference data types, using pre-built objects and methods.

### Unit 2: Selection and Iteration
Control flow, conditionals (if/else, switch), loops (for, while, for-each).

### Unit 3: Class Creation
Writing classes from scratch, constructors, instance variables, methods, encapsulation.

### Unit 4: Data Collections
Arrays, ArrayLists, 2D Arrays, File I/O (Scanner for files), Dataset Manipulation.

---

## Site Architecture

### Pages
- **Homepage** — Dashboard with 4 large clickable unit cards
- **Unit Overview** — Lists all sub-units for the selected unit
- **Sub-Unit Page** — Full lesson content with MCQs and navigation

### Sub-Unit Page Requirements
Each sub-unit must include:
1. **Detailed explanation** of Java syntax and logic for the topic
2. **Code snippets** with syntax highlighting (monospace, IDE aesthetic)
3. **Concept Checks** — inline questions like "What does this code print?"
4. **MCQ Section** — 3–5 multiple choice questions (4 choices each), with instant feedback and explanations
5. **Bottom navigation** — "Back" and "Next" buttons for linear progression

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Animations | Framer Motion |
| State | React state (track current sub-unit) |

### Design Aesthetic
- **Dark Mode / Professional IDE** theme
- Monospace fonts for all code blocks
- High contrast for readability
- Syntax highlighting on code snippets

---

## Development Workflow

1. Approve curriculum structure (JSON unit/sub-unit list)
2. Build homepage with 4 unit cards
3. Build unit overview page template
4. Build sub-unit content page template (first sub-unit as proof of concept)
5. Fill in remaining sub-unit content

## File Structure (Target)
```
/src
  /components
    Navbar.tsx
    UnitCard.tsx
    CodeBlock.tsx
    ConceptCheck.tsx
    MCQSection.tsx
    NavButtons.tsx
  /pages (or /app if Next.js)
    index.tsx          — homepage
    /unit/[id].tsx     — unit overview
    /unit/[id]/[sub].tsx — sub-unit lesson
  /data
    curriculum.ts      — all units, sub-units, content, MCQs
  /lib
    types.ts           — TypeScript types for curriculum data
```

---

## Content Standards

### MCQ Format
- 4 answer choices per question
- Instant feedback on selection
- Explanation shown after answering
- Matches 2025–2026 AP exam format

### Code Snippet Format
- Syntax highlighted (Java)
- Monospace font
- Dark background (IDE style)
- Copy button optional but nice

---

## Research Reference

Detailed curriculum content is in `/research/`. Always consult these before writing lesson content or MCQs:

| File | Use for |
|------|---------|
| `research/00-overview.md` | Quick facts, critical corrections to secondary sources |
| `research/01-units-and-topics.md` | Complete topic numbering (authoritative) |
| `research/02-unit1-using-objects.md` | Unit 1 Java specifics |
| `research/03-unit2-selection-iteration.md` | Unit 2 Java specifics |
| `research/04-unit3-class-creation.md` | Unit 3 Java specifics |
| `research/05-unit4-data-collections.md` | Unit 4 Java specifics (File I/O, ArrayList, etc.) |
| `research/06-exam-format.md` | MCQ/FRQ structure, scoring, penalties |
| `research/07-what-changed.md` | Removed and added content (do not include Inheritance) |
| `research/08-java-quick-reference.md` | Exact methods/classes on the official exam card |
| `research/09-computational-thinking-practices.md` | MCQ weighting, FRQ skills |
| `research/11-mcq-format-detailed.md` | MCQ question archetypes, distractor patterns, topic counts per unit, code templates |
| `research/12-frq-format-detailed.md` | Per-FRQ rubrics, common mistakes, scenario templates, time budget |

---

## Important Notes

- No Inheritance or Polymorphism content — these are no longer on the required exam
- File I/O content uses `Scanner` class with file arguments (not `System.in`)
- Dataset Manipulation is a new topic: reading/processing structured data from files
- All MCQs should reflect the new 4-unit structure, not the old 10-unit CED
