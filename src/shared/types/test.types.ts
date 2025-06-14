export interface TestQuestion {
  lecture_id: string;
  question: string;
  type: "RADIO" | "CHECKBOX";
  options: TestOption[];
}

export interface TestOption {
  text: string;
  isCorrect: boolean;
}
