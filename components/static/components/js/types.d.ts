/* eslint-disable camelcase */

import {
  AssignmentType,
  CollectionType,
  GroupAssignmentType,
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
  results: QuestionType[] | AssignmentType[];
};

export type SearchAppProps = {
  gettext: (a: string) => string;
  logo: string;
  nonce: string;
  urls: {
    assignments: string;
    backgroundImage: string;
    collections: string;
    recommendations: {
      assignments: string;
      collections: string;
      questions: string;
    };
    questions: string;
    teacher: string;
  };
  user: { username: string };
};

export type SearchAppState = {
  assignmentHitCount: number;
  assignments: AssignmentType[];
  assignmentsLoaded: boolean;
  categoryFilters: string[];
  collectionHitCount: number;
  collections: CollectionType[];
  difficultyFilters: string[];
  difficultyFilterLabels: Record<string, string>;
  disciplineFilters: string[];
  height: number;
  lastKeyStroke: number;
  peerImpactFilters: string[];
  peerImpactFilterLabels: Record<string, string>;
  questionHitCount: number;
  questionLimit: number;
  questions: QuestionType[];
  questionsLoaded: boolean;
  searchTerm: string;
  selectedCategories: string[];
  selectedDifficulty: string[];
  selectedDisciplines: string[];
  selectedImpact: string[];
  selectedTypes: string[];
  snackbarIsOpen: boolean;
  snackbarMessage: string;
  teacher: TeacherType | undefined;
  timeoutID: number;
};

export type LibraryAppProps = {
  gettext: (a: string) => string;
  logo: string;
  nonce: string;
  urls: {
    collections: string;
    questions: string;
    teacher: string;
  };
  user: UserType;
};

export type LibraryAppState = {
  collections: CollectionType[];
  height: number;
  questionLoading: boolean;
  questions: QuestionType[];
  teacher: TeacherType | undefined;
  type: number;
};

export type NavigationAppProps = {
  logo: string;
  menuAddItems: LinkType[][];
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
