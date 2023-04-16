/* eslint-disable camelcase */

import {
  AssignmentType,
  CollectionType,
  GroupedAssignmentType,
  QuestionType,
  UserType,
} from "./_localComponents/types";

type TeacherType = {
  activeAssignmentCount: number;
  activeGroupCount: number;
  assignment_pks?: string[];
  bookmarked_collections: number[];
  createdQuestionCount: number;
  favourite_questions: number[];
  user?: UserType;
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
  assignments: GroupedAssignmentType[];
  assignmentsLoading: boolean;
  collections: CollectionType[];
  collectionsLoading: boolean;
  questions: QuestionType[];
  questionsLoading: boolean;
  teacher: TeacherType | undefined;
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
  results: QuestionType[] | AssignmentType[] | CollectionType[];
};

export type SearchAppProps = {
  gettext: (a: string) => string;
  logo: string;
  nonce: string;
  urls: {
    assignments: string;
    backgroundImage: string;
    collections: string;
    questions: string;
    recommendations: {
      assignments: string;
      collections: string;
      questions: string;
    };
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
  collectionsLoaded: boolean;
  difficultyFilters: string[];
  difficultyFilterLabels: Record<string, string>;
  disciplineFilters: string[];
  lastKeyStroke: number;
  peerImpactFilters: string[];
  peerImpactFilterLabels: Record<string, string>;
  questionHitCount: number | undefined;
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
    assignments: string;
    collections: string;
    group_assignments: string;
    questions: string;
    teacher: string;
  };
  user: UserType;
};

export type LibraryAppState = {
  assignments: AssignmentType[];
  assignmentsLoading: boolean;
  collections: CollectionType[];
  collectionsLoading: boolean;
  groupAssignments: GroupedAssignmentType[];
  groupAssignmentsLoading: boolean;
  questions: QuestionType[];
  questionsExpanded: boolean;
  questionsLoading: boolean;
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
