// Core types for the APCSA curriculum data structure

export interface MCQOption {
  id: "A" | "B" | "C" | "D";
  text: string;
}

export interface MCQ {
  id: string;
  question: string;
  code?: string;          // optional Java code block shown with the question
  options: MCQOption[];
  correctId: "A" | "B" | "C" | "D";
  explanation: string;    // shown after answering
  skill: string;          // e.g. "3.A" — Computational Thinking Practice skill
}

export interface ConceptCheck {
  id: string;
  prompt: string;
  code?: string;          // code the student reads/traces
  answer: string;         // revealed on demand
  hint?: string;
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  explanation: string;
}

export interface SubUnit {
  id: string;             // e.g. "1-1" (unit 1, sub-unit 1)
  slug: string;           // URL slug, e.g. "java-basics"
  title: string;
  cedTopics: string[];    // official CED topic numbers covered, e.g. ["1.1", "1.2", "1.3"]
  description: string;   // one-sentence summary
  objectives: string[];  // what students will be able to do after this sub-unit
  mcqs: MCQ[];
  conceptChecks: ConceptCheck[];
  codeExamples: CodeExample[];
}

export interface Unit {
  id: number;             // 1–4
  slug: string;           // URL slug, e.g. "using-objects"
  title: string;
  examWeight: string;     // e.g. "15–25%"
  suggestedPeriods: string; // e.g. "32–34"
  description: string;
  color: string;          // Tailwind color class for theming, e.g. "blue"
  icon: string;           // Lucide icon name
  subUnits: SubUnit[];
}

export interface Curriculum {
  version: string;        // "2025-2026"
  totalTopics: number;    // 53
  units: Unit[];
}
