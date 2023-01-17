import {
  AssignmentType,
  CollectionType,
  QuestionType,
} from "./_localComponents/types";
import {
  CategoryFilterType,
  DifficultyFilterType,
  DisciplineFilterType,
  PeerImpactFilterType,
  TypeFilterType,
} from "./_search/types";

export type UserType = {
  avatar: string;
  username: string;
};

type TeacherType = {
  activeAssignmentCount: number;
  activeGroupCount: number;
  createdQuestionCount: number;
};

export type LinkType = {
  icon: string;
  title: string;
  url: string;
};

export type DashboardAppProps = {
  gettext: (a: string) => string;
  nonce: string;
  urls: {
    assignments: string;
    collections: string;
    questions: string;
    teacher: string;
  };
  user: UserType;
};

export type DashboardAppState = {
  assignments: AssignmentType[];
  collections: CollectionType[];
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
  user: UserType;
};

export type SearchAppState = {
  assignments: AssignmentType[];
  collections: CollectionType[];
  questions: QuestionType[];
  typeFilters: TypeFilterType;
  disciplineFilters: DisciplineFilterType;
  categoryFilters: CategoryFilterType;
  peerImpactFilters: PeerImpactFilterType;
  difficultyFilters: DifficultyFilterType;
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
