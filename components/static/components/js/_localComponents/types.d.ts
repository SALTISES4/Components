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
  answerCount: number;
  title: string;
  dueDate: Date;
  issueCount: number;
  progress: number;
};

export type CollectionType = {
  title: string;
  author: string;
  description: string;
  tags?: string[];
  answerCount: number;
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
  author: string;
  session: string;
  studentCount: number;
  assignmentCount: number;
  active: boolean;
  subject?: string[];
  dueDate: Date;
  progress: number;
};

export type AssignmentBisProps = {
  assignment: AssignmentType;
  gettext: (a: string) => string;
};

export type AssignmentProps = {
  gettext: (a: string) => string;
  assignment: AssignmentType;
};

export type AssignmentStudentProps = {
  gettext: (a: string) => string;
  assignment: AssignmentType;
};

export type AssignmentStudentCompletedProps = {
  activeAssignmentCount: number;
  activeGroupCount: number;
  createdQuestionCount: number;
  gettext: (a: string) => string;
};

export type CollectionProps = {
  gettext: (a: string) => string;
  collection: CollectionType;
};

export type GroupProps = {
  gettext: (a: string) => string;
  group: GroupType;
  ng;
};

export type GroupStudentProps = {
  gettext: (a: string) => string;
  group: GroupType;
};

export type QuestionProps = {
  gettext: (a: string) => string;
  question: QuestionType;
};
