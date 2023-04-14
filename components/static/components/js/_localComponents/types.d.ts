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
  PeerImpactLabels,
  PeerImpactLevels,
  QuestionDifficultyLabels,
  QuestionDifficultyLevels,
} from "./enum";

import { TeacherType } from "../types";

export type UserType = {
  avatar?: string;
  username: string;
};

export type AssignmentType = {
  answer_count: number;
  is_owner?: boolean;
  owner: UserType[];
  pk: string;
  question_count: number;
  title: string;
};

export type GroupAssignmentType = {
  active: boolean;
  answerCount: number;
  assignment_pk: string;
  author: string;
  difficulty: string;
  distributionState: DistributionState;
  due_date: Date;
  group: string;
  issueCount: number;
  progress: number;
  questionCount: number;
  title: string;
  url: string;
};

export type GroupedAssignmentType = {
  active: boolean;
  answerCount: number;
  author: string;
  difficulty: string;
  distributionState: DistributionState;
  dueDate: Date | undefined;
  groups: GroupType[];
  issueCount: number;
  pk: number;
  progress: number;
  questionCount: number;
  title: string;
};

type DisciplineType = { pk: number; title: string };

export type CollectionType = {
  author: string;
  description: string;
  discipline?: DisciplineType;
  featured?: boolean;
  follower_count?: number;
  pk: number;
  title: string;
  url: string;
};

type QuestionDifficulty = {
  label: QuestionDifficultyLevels;
  score: number;
  value?: QuestionDifficultyLabels;
};

type QuestionPeerImpact = {
  label: PeerImpactLevels;
  score: number;
  value?: PeerImpactLabels;
};

type AnswerChoiceType = {
  correct: boolean;
  label: string;
  text: string;
};

export type QuestionType = {
  answer_count: number;
  answerchoice_set: AnswerChoiceType[];
  category?: { title: string }[];
  collaborators?: UserType[];
  difficulty: QuestionDifficulty;
  discipline?: DisciplineType;
  image: string;
  image_alt_text: string;
  is_owner?: boolean;
  peer_impact: QuestionPeerImpact;
  pk: number;
  text: string;
  title: string;
  user: UserType;
  video_url: string;
};

export type GroupType = {
  title: string;
  author?: string;
  session?: string;
  studentCount?: number;
  assignmentCount?: number;
  active?: boolean;
  subject?: string[];
  due_date: Date;
  progress: number;
  tags?: string[];
  url: string;
};

export type AssignmentBisProps = {
  assignment: AssignmentType;
  bookmarked?: boolean;
  gettext: (a: string) => string;
  showBookmark: boolean;
  toggleBookmarked: () => void;
};

export type GroupAssignmentProps = {
  gettext: (a: string) => string;
  assignment: GroupedAssignmentType;
};

export type AssignmentStudentProps = {
  gettext: (a: string) => string;
  assignment: GroupAssignmentType;
};

export type AssignmentStudentCompletedProps = {
  activeAssignmentCount: number;
  activeGroupCount: number;
  createdQuestionCount: number;
  gettext: (a: string) => string;
};

export type CollectionProps = {
  bookmarked?: boolean;
  gettext: (a: string) => string;
  getHeight: (height: number) => void;
  logo: string;
  minHeight: number;
  collection: CollectionType;
  toggleBookmarked: () => void;
};

export type CollectionBlockProps = {
  collections: CollectionType[];
  gettext: (a: string) => string;
  handleBookmarkClick: (a: number) => void;
  loading: boolean;
  logo: string;
  teacher: TeacherType | undefined;
};

export type CollectionBlockState = {
  height: number;
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
  bookmarked?: boolean;
  difficultyLabels?: Record<string, string>;
  expanded?: boolean;
  question: QuestionType;
  showBookmark: boolean;
  toggleBookmarked: () => void;
};
