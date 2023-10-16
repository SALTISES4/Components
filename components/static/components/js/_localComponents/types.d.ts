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

import { CardProps } from "@mui/material/Card";

import {
  AnswerStyles,
  DistributionState,
  PeerImpactLabels,
  PeerImpactLevels,
  QuestionDifficultyLabels,
  QuestionDifficultyLevels,
  QuestionTypes,
  RationaleSelectionAlgorithms,
} from "./enum";

import { TeacherType } from "../types";

/* Type declarations */

export interface UsernameType {
  username: string;
}

export interface UserType extends UsernameType {
  avatar?: string;
}

export interface AssignmentDatabaseFields {
  conclusion_page?: string;
  description?: string;
  intro_page?: string;
  owner?: UserType[];
  pk: string;
  title: string;
}

export interface AssignmentType extends AssignmentDatabaseFields {
  answer_count?: number;
  editable?: boolean;
  is_owner?: boolean;
  is_valid?: boolean;
  question_count?: number;
  questions?: QuestionRankType[];
  urls?: {
    copy?: string;
    distribute?: string;
    fix?: string;
    preview?: string;
    update?: string;
    view?: string;
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

export type CategoryType = {
  title: string;
};

export type DisciplineType = { pk: number; title: string };

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

export type AnswerChoiceType = {
  correct: boolean;
  expert_answers?: { expert: true; pk: number; rationale: string }[];
  label: string;
  question: number;
  sample_answers: { expert: false; pk: number; rationale: string }[];
  text: string;
};

export type AnswerType = {
  expert: boolean;
  first_answer_choice: number;
  question: number;
  rationale: string;
};

export type QuestionType = {
  answer_count: number;
  answerchoice_set: AnswerChoiceType[];
  answer_style?: AnswerStyles;
  category?: CategoryType[];
  collaborators?: UserType[];
  difficulty: QuestionDifficulty;
  discipline?: DisciplineType;
  image: string;
  image_alt_text: string;
  is_owner?: boolean;
  is_valid?: boolean;
  matrix?: AnswerMatrixType;
  most_convincing_rationales?: AnswerChoiceWithRationalesType[];
  peer_impact: QuestionPeerImpact;
  pk: number;
  rationale_selection_algorithm?: RationaleSelectionAlgorithms;
  text: string;
  title: string;
  type: QuestionTypes;
  urls?: {
    addable_assignments?: string;
    matrix?: string;
    rationales?: string;
  };
  user: UserType;
  video_url: string;
};

export type QuestionRankType = {
  assignment: string;
  pk: number;
  question: QuestionType;
  question_pk: number;
  rank: number;
};

/* Props and state type declarations */

export type AssignmentProps = {
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
  handleAddToAssignment?: (a: string) => void;
  handleRemove?: () => void;
  question: QuestionType;
  questionsEditableByUser?: boolean;
  showBookmark: boolean;
  toggleBookmarked: () => void;
};

export interface DraggableQuestionProps extends CardProps {
  dense?: boolean;
  question?: QuestionType;
  rank?: number;
}

export type StudentGroupAssignmentProps = {
  gettext: (a: string) => string;
  studentgroupassignment: StudentGroupAssignmentType;
  showGroup?: boolean;
};

export type StudentGroupsAssignmentProps = {
  gettext: (a: string) => string;
  studentgroupsassignment: StudentGroupsAssignmentType;
};

type RationalesType = {
  id: number;
  rationale: string;
  times_chosen: number;
  times_shown: number;
};

export type AnswerChoiceWithRationalesType = {
  correct: boolean;
  label: string | number;
  most_convincing: RationalesType[];
  text: string;
};

export type AnswerMatrixType = {
  easy: number;
  hard: number;
  tricky: number;
  peer: number;
};

export type RationalesAppProps = {
  gettext: (a: string) => string;
  open: boolean;
  onClose: any;
  matrix?: AnswerMatrixType;
  rationales?: AnswerChoiceWithRationalesType[];
  urls: {
    matrix?: string;
    rationales?: string;
  };
};

export type RationalesAppState = {
  loaded: boolean;
  matrix?: AnswerMatrixType;
  rationales?: AnswerChoiceWithRationalesType[];
};
