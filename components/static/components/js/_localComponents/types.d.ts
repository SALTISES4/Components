type GroupProgressType = {
  dueDate: string;
  difficulty: string;
  numberStudent: number;
  progress: number;
  session: string;
  statut: string;
  subject: string;
  title: string;
};

export type AssignmentType = {
  author: string;
  difficulty: string;
  distributionState: string;
  groups: GroupProgressType[];
  questionCount: number;
  title: string;
};

export type CollectionType = {
  title: string;
};

export type QuestionType = {
  answerCount: number;
  author: string;
  description: string;
  difficulty: string;
  peerImpact: number;
  tags?: string[];
  title: string;
};
