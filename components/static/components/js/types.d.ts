/* eslint-disable camelcase */

import {
  CollectionType,
  GroupAssignmentType,
  QuestionType,
  UserType,
} from "./_localComponents/types";
import {
  DifficultyFilterType,
  DisciplineFilterType,
  PeerImpactFilterType,
  TypeFilterType,
} from "./_search/types";

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
};

type SearchData = {
  // To do: replace with native types
  meta: {
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
  difficultyFilters: DifficultyFilterType;
  disciplineFilters: DisciplineFilterType;
  height: number;
  hitCount: number;
  lastKeyStroke: number;
  peerImpactFilters: PeerImpactFilterType;
  questionLimit: number;
  questions: QuestionType[];
  searching: boolean;
  searchTerm: string;
  selectedCategories: string[];
  selectedDifficulty: number[];
  selectedDiscipline: string[];
  selectedImpact: number[];
  teacher: TeacherType;
  timeoutID: number;
  typeFilters: TypeFilterType;
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
