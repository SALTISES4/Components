/* eslint-disable camelcase */

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

import {
  DistributionState,
  PeerImpactLevels,
  QuestionDifficultyLabels,
  QuestionDifficultyLevels,
} from "./enum";

export type UserType = {
  avatar?: string;
  username: string;
};

export type AssignmentType = {
  answerCount: number;
  author: string;
  difficulty: string;
  distributionState: DistributionState;
  dueDate: Date;
  groups: GroupType[];
  issueCount: number;
  progress: number;
  questionCount: number;
  title: string;
};

export type CollectionType = {
  answerCount: number;
  author: string;
  description: string;
  featured?: boolean;
  tags?: string[];
  title: string;
  url: string;
};

type QuestionDifficulty = {
  score: number;
  value: QuestionDifficultyLevels;
  label: QuestionDifficultyLabels;
};

type QuestionPeerImpact = {
  score: number;
  label: PeerImpactLevels;
};

export type QuestionType = {
  answer_count: number;
  category?: { title: string }[];
  difficulty: QuestionDifficulty;
  discipline?: { pk: number; title: string };
  peer_impact: QuestionPeerImpact;
  text: string;
  title: string;
  user: UserType;
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
  tags?: string[];
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
  logo: string;
  collection: CollectionType;
};

export type GroupProps = {
  gettext: (a: string) => string;
  group: GroupType;
};

export type GroupStudentProps = {
  gettext: (a: string) => string;
  group: GroupType;
};

export type QuestionProps = {
  gettext: (a: string) => string;
  question: QuestionType;
};
