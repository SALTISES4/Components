/* eslint-disable camelcase */

import {
  CollectionType,
  GroupAssignmentType,
  GroupType,
  QuestionType,
  UserType,
} from "./_localComponents/types";

type TeacherType = {
  activeAssignmentCount: number;
  activeGroupCount: number;
  createdQuestionCount: number;
  favourite_questions: number[];
};

export type LinkType = {
  disabled?: boolean;
  icon: string;
  selected?: boolean;
  target?: string;
  title: string;
  url: string;
};

export type DashboardAppProps = {
  gettext: (a: string) => string;
  logo: string;
  nonce: string;
  urls: {
    assignments: string;
    assignmentsLink: string;
    collections: string;
    collectionsLink: string;
    questions: string;
    questionsLink: string;
    teacher: string;
  };
  user: UserType;
};

export type DashboardAppState = {
  assignments: GroupAssignmentType[];
  collections: CollectionType[];
  height: number;
  questions: QuestionType[];
  teacher: TeacherType;
  groups: GroupType[];
};

type SearchData = {
  // To do: replace with native types
  meta: {
    hit_count: number | undefined;
    categories: string[];
    difficulties: [number, string][];
    disciplines: string[];
    impacts: [number, string][];
  };
  results: QuestionType[];
};

export type SearchAppProps = {
  gettext: (a: string) => string;
  logo: string;
  nonce: string;
  urls: {
    assignments: string;
    collections: string;
    questions: string;
    teacher: string;
  };
};

export type SearchAppState = {
  assignments: GroupAssignmentType[];
  categoryFilters: string[];
  collections: CollectionType[];
  difficultyFilters: string[];
  difficultyFilterLabels: Record<string, string>;
  disciplineFilters: string[];
  height: number;
  hitCount: number;
  lastKeyStroke: number;
  peerImpactFilters: string[];
  peerImpactFilterLabels: Record<string, string>;
  questionLimit: number;
  questions: QuestionType[];
  searching: boolean;
  searchTerm: string;
  selectedCategories: string[];
  selectedDifficulty: string[];
  selectedDisciplines: string[];
  selectedImpact: string[];
  selectedTypes: string[];
  snackbarIsOpen: boolean;
  snackbarMessage: string;
  teacher: TeacherType;
  timeoutID: number;
};

export type NavigationAppProps = {
  logo: string;
  menuAddItems: LinkType[][];
  menuHelpItems: LinkType[][];
  menuProfile: LinkType[][];
  nonce: string;
  sidebarGroups: LinkType[][];
  user: UserType;
};

export type NavigationAppState = {};

export type CreateQuestions1AppProps = {
  gettext: (a: string) => string;
  nonce: string;
};

export type CreateQuestions1AppState = {};

export type CreateQuestions2AppProps = {
  gettext: (a: string) => string;
  nonce: string;
};

export type CreateQuestions2AppState = {};

export type RationalesAppProps = {
  gettext: (a: string) => string;
  nonce: string;
};

export type RationalesAppState = {
  answersWithRationales: AnswerWithRationalesType[];
};

type RationalesType = {
  viewCount: number;
  selectedCount: number;
  description: string;
};

export type AnswerWithRationalesType = {
  correct: boolean;
  description: string;
  rationales: RationalesType[];
};
