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

/* Type declarations */

export type UserType = {
  avatar?: string;
  username: string;
};

export interface AssignmentDatabaseFields {
  conclusion_page?: string;
  description?: string;
  intro_page?: string;
  owner?: UserType[];
  pk: string;
  title?: string;
}

export interface AssignmentType extends AssignmentDatabaseFields {
  answer_count?: number;
  editable?: boolean;
  is_owner?: boolean;
  question_count?: number;
  questions?: {
    assignment: string;
    pk: number;
    question: QuestionType;
    rank: number;
  }[];
  urls?: {
    copy: string;
    distribute: string;
    fix: string;
    preview: string;
    update: string;
    view: string;
  };
}

export type StudentGroupType = {
  assignmentCount?: number;
  active?: boolean;
  author?: string;
  pk?: number;
  session?: string;
  studentCount?: number;
  subject?: string[];
  tags?: string[];
  teacher?: number[];
  title: string;
  url: string;
};

export type StudentGroupAssignmentType = {
  active?: boolean;
  answerCount?: number;
  assignment: AssignmentType;
  author?: string;
  difficulty?: string;
  distributionState: DistributionState;
  due_date: Date;
  group: StudentGroupType;
  issueCount?: number;
  pk?: number;
  progress: number;
  questionCount?: number;
  title: string;
  url: string;
};

export type StudentGroupsAssignmentType = {
  // This type represents a bunch of StudentGroupAssignment objects regrouped
  // by assignment pk
  assignment: AssignmentType;
  author?: string;
  distributionState: DistributionState;
  groups: StudentGroupAssignmentType[];
  questionCount?: number;
  title: string;
};

type DisciplineType = { pk: number; title: string };

export type CollectionType = {
  description: string;
  discipline?: DisciplineType;
  featured?: boolean;
  follower_count?: number;
  pk: number;
  title: string;
  url: string;
  user: UserType;
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

/* Props and state type declarations */

export type AssignmentBisProps = {
  assignment: AssignmentType;
  bookmarked?: boolean;
  gettext: (a: string) => string;
  showBookmark: boolean;
  toggleBookmarked: () => void;
};

export type AssignmentStudentProps = {
  gettext: (a: string) => string;
  assignment: StudentGroupAssignmentType;
};

export type AssignmentStudentCompletedProps = {
  activeAssignmentCount: number;
  activeGroupCount: number;
  createdQuestionCount: number;
  gettext: (a: string) => string;
};

export type CollectionProps = {
  bookmarked?: boolean;
  collection: CollectionType;
  gettext: (a: string) => string;
  getHeight: (height: number) => void;
  logo: string;
  minHeight: number;
  showBookmark: boolean;
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

export type GroupStudentProps = {
  gettext: (a: string) => string;
  group: StudentGroupType;
};

export type QuestionProps = {
  bookmarked?: boolean;
  difficultyLabels?: Record<string, string>;
  expanded?: boolean;
  gettext: (a: string) => string;
  question: QuestionType;
  showBookmark: boolean;
  toggleBookmarked: () => void;
};

export type StudentGroupAssignmentProps = {
  gettext: (a: string) => string;
  studentgroupassignment: StudentGroupAssignmentType;
  showGroup?: boolean;
};

export type StudentGroupsAssignmentProps = {
  gettext: (a: string) => string;
  studentgroupsassignment: StudentGroupsAssignmentType;
};
