export interface IAnswer {
  id: number;
  answerText: string;
  isCorrect: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IQuestion {
  id: number;
  question: string;
  createdAt: string;
  updatedAt: string;
  answers: IAnswer[];
}
