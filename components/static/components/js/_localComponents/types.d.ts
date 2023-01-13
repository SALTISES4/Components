/*type GroupProgressType = {
  dueDate: string;
  difficulty: string;
  numberStudent: number;
  progress: number;
  session: string;
  statut: string;
  subject: string;
  title: string;
};*/

export type AssignmentType = {
  author: string;
  difficulty: string;
  distributionState: string;
  groups: GroupType[];
  questionCount: number;
  title: string;
};

export type CollectionType = {
  title: string;
  autor: string;
  description: string;
  tags?: string[];
};

enum QuestionDifficultyLevels {
  1,
  2,
  3,
  4,
}

type QuestionDifficulty = {
  score: number;
  value: QuestionDifficultyLevels;
  label: string;
};

enum PeerImpactLevels {
  0,
  1,
  2,
  3,
}

export type QuestionType = {
  answerCount: number;
  author: string;
  description: string;
  difficulty: QuestionDifficulty;
  peerImpact: PeerImpactLevels;
  tags?: string[];
  title: string;
};

export type GroupType = {
  title: string;
  session: string;
  studentCount: number;
  assigmentCount: number;
  active: boolean;
  subject?: string[];
  dueDate: Date;
  progress: number;
};
