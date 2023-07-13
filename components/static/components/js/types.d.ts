/* eslint-disable camelcase */

import {
  AssignmentDatabaseFields,
  AssignmentType,
  CollectionType,
  StudentGroupAssignmentType,
  StudentGroupsAssignmentType,
  QuestionType,
  UserType,
} from "./_localComponents/types";

type TeacherType = {
  activeAssignmentCount: number;
  activeGroupCount: number;
  assignable_groups?: {
    // Replace with StudentGroup type
    name: string;
    pk: number;
    semester: string;
    title: string;
    year: number;
  }[];
  assignment_pks?: string[];
  bookmarked_collections: number[];
  createdQuestionCount: number;
  current_groups?: {
    // Replace with StudentGroup type
    name: string;
    pk: number;
    semester: string;
    title: string;
    year: number;
  }[];
  favourite_questions: number[];
  user?: UserType;
};

export type LinkType = {
  aside?: boolean;
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
    studentgroupassignments: string;
    studentgroupassignmentsLink: string;
    collection: string;
    collections: string;
    collectionsLink: string;
    questions: string;
    questionsLink: string;
    teacher: string;
  };
  user: UserType;
};

export type DashboardAppState = {
  studentgroupassignmentsLoading: boolean;
  studentgroupsassignments: StudentGroupsAssignmentType[];
  collections: CollectionType[];
  collectionsLoading: boolean;
  questions: QuestionType[];
  questionsLoading: boolean;
  teacher: TeacherType | undefined;
};

interface PaginatedData {
  count: number;
  next: null | number;
  previous: null | number;
}

interface CollectionsPaginatedData extends PaginatedData {
  results: CollectionType[];
}

type SearchData = {
  // To do: replace with native types
  meta: {
    hit_count: number | undefined;
    categories: string[];
    difficulties: [number, string][];
    disciplines: string[];
    impacts: [number, string][];
    page: number | undefined;
    page_size: number | undefined;
  };
  results: QuestionType[] | AssignmentType[] | CollectionType[];
};

export type SearchAppProps = {
  difficulties: [number, string][];
  disciplines: string[];
  gettext: (a: string) => string;
  impacts: [number, string][];
  logo: string;
  nonce: string;
  type?: "question" | "assignment" | "collection";
  urls: {
    assignments: string;
    backgroundImage: string;
    collection: string;
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

  collectionHitCount: number;
  collections: CollectionType[];
  collectionsLoaded: boolean;

  lastKeyStroke: number;

  questionHitCount: number | undefined;
  questionPage: number;
  questionPageSize: number;
  questions: QuestionType[];
  questionsLoaded: boolean;

  searchTerm: string;

  categoryFilters: string[];
  difficultyFilterLabels: Record<string, string>;
  difficultyFilters: string[];
  disciplineFilters: string[];
  peerImpactFilterLabels: Record<string, string>;
  peerImpactFilters: string[];

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
    studentgroupassignments: string;
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
  studentgroupsassignments: StudentGroupsAssignmentType[];
  studentgroupassignmentsLoading: boolean;
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

export type EditorIconsType = {
  boldIcon: string;
  italicIcon: string;
  underIcon: string;
  undoIcon: string;
  redoIcon: string;
  subIcon: string;
  superIcon: string;
  linkIcon: string;
};

export type CreateAssignmentAppState = {
  description: string;
  errors: string[];
  errorsOpen: boolean[];
  identifier: string;
  specialInstructions: string;
  postAssignmentNotes: string;
  submitting: boolean;
  title: string;
};

export type CreateAssignmentAppProps = {
  gettext: (a: string) => string;
  nonce: string;
  EditorIcons: EditorIconsType;
  urls: {
    create: string;
  };
};

export type UpdateAssignmentAppProps = {
  gettext: (a: string) => string;
  nonce: string;
  assignment: AssignmentDatabaseFields;
  editableByUser?: boolean;
  urls: {
    assignment: string;
    distribute: string;
    studentgroupassignments: string;
    teacher: string;
  };
};

export type UpdateAssignmentAppState = {
  assignment: AssignmentType | undefined;
  questions: QuestionType[];
  questionsLoading: boolean;
  snackbarIsOpen: boolean;
  snackbarMessage: string;
  studentgroupassignments: StudentGroupAssignmentType[];
  studentgroupassignmentsLoading: boolean;
  teacher: TeacherType | undefined;
};
