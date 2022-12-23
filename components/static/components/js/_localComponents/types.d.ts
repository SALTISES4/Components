export type QuestionType = {
  answerCount: number;
  author: string;
  description: string;
  difficulty: string;
  peerImpact: string;
  tags?: string[];
  title: string;
};

export type AssignmentType = {
  author: string;
  difficulty: string;
  distributionState: string;
  questions: QuestionType[];
  title: string;
};
