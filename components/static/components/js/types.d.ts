/* eslint-disable camelcase */

import {
  CollectionType,
  GroupAssignmentType,
  QuestionType,
  UserType,
} from "./_localComponents/types";
import {
  CategoryFilterType,
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

export type SearchAppProps = {
  gettext: (a: string) => string;
  nonce: string;
  urls: {
    assignments: string;
    collections: string;
    questions: string;
  };
};

export type SearchAppState = {
  assignments: GroupAssignmentType[];
  collections: CollectionType[];
  questions: QuestionType[];
  searchTerm: string;
  typeFilters: TypeFilterType;
  disciplineFilters: DisciplineFilterType;
  categoryFilters: CategoryFilterType;
  peerImpactFilters: PeerImpactFilterType;
  difficultyFilters: DifficultyFilterType;
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
