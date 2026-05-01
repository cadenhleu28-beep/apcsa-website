export type AnswerLetter = "A" | "B" | "C" | "D";

export interface MCQOption {
  letter: AnswerLetter;
  text: string;
}

export interface MCQQuestion {
  id: string;
  topicId: string;
  topicLabel: string;
  question: string;
  code?: string;
  options: [MCQOption, MCQOption, MCQOption, MCQOption];
  answer: AnswerLetter;
  explanation: string;
}

export interface MCQTopic {
  id: string;
  label: string;
  questions: MCQQuestion[];
}

export interface MCQUnit {
  id: number;
  title: string;
  color: "blue" | "green" | "purple" | "orange";
  topics: MCQTopic[];
}
