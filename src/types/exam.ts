export type OptionId = "A" | "B" | "C" | "D";

export interface ExamOption {
  id: OptionId;
  text: string;
  isCode?: boolean;
}

export interface ExamMCQ {
  id: number;
  unit: 1 | 2 | 3 | 4;
  cedTopic: string;
  skill: string;
  questionSetId?: string;
  questionSetLabel?: string;
  sharedCode?: string;
  question: string;
  code?: string;
  options: ExamOption[];
  correctId: OptionId;
  explanation: string;
  trap?: string;
}

export interface RubricPoint {
  text: string;
  points: number;
}

export interface FRQPart {
  letter: "A" | "B";
  points: number;
  prompt: string;
  sampleAnswer: string;
  rubricPoints: RubricPoint[];
  commonMistakes: string[];
}

export interface ExamFRQ {
  id: 1 | 2 | 3 | 4;
  type: string;
  totalPoints: number;
  title: string;
  scenario: string;
  givenCode: string;
  parts: FRQPart[];
}

export type ExamMode = "timed" | "untimed";
export type ExamPhase =
  | "landing"
  | "mode"
  | "mcq"
  | "frq-intro"
  | "frq"
  | "results";
