/* eslint-disable camelcase */

import {
  AnswerStyles,
  AssignmentDatabaseFields,
  AssignmentType,
  CollectionType,
  StudentGroupAssignmentType,
  StudentGroupsAssignmentType,
  QuestionType,
  QuestionTypes,
  QuestionRankType,
  UserType,
} from "./_localComponents/types";
import { AssignmentForm } from "./_assignments/types";
import { SnackbarType } from "./_reusableComponents/types";

type LTIType = {
  launchURL: string;
  consumerKey: string;
  sharedSecret: string;
  teacherHash: string;
};

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
  handleClick?: () => void;
  icon: string;
  selected?: boolean;
  target?: string;
  title: string;
  url?: string;
};

export type DashboardAppProps = {
  gettext: (a: string) => string;
  logo: string;
  nonce: string;
  urls: {
    add_to_assignment: string;
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

interface DashboardAppState extends SnackbarType {
  studentgroupassignmentsLoading: boolean;
  studentgroupsassignments: StudentGroupsAssignmentType[];
  collections: CollectionType[];
  collectionsLoading: boolean;
  questions: QuestionType[];
  questionsLoading: boolean;
  teacher: TeacherType | undefined;
}

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
    add_to_assignment: string;
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

interface SearchAppState extends SnackbarType {
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

  teacher: TeacherType | undefined;
  timeoutID: number;
}

export type LibraryAppProps = {
  gettext: (a: string) => string;
  logo: string;
  nonce: string;
  urls: {
    add_to_assignment: string;
    assignments: string;
    collections: string;
    studentgroupassignments: string;
    questions: string;
    teacher: string;
  };
  user: UserType;
};

interface LibraryAppState extends SnackbarType {
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
}

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
  EditorIcons: EditorIconsType;
};

export type CreateQuestions1AppState = {
  form: {
    answer_style: AnswerStyles;
    image: File | undefined;
    text: string;
    title: string;
    type: QuestionTypes;
  };
};

export type CreateQuestions2AppProps = {
  gettext: (a: string) => string;
  nonce: string;
};

export type CreateQuestions2AppState = {};

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
  EditorIcons: EditorIconsType;
  lti: LTIType;
  metaEditableByUser?: boolean;
  questionsEditableByUser?: boolean;
  urls: {
    add_to_assignment: string;
    assignment: string;
    distribute: string;
    search: string;
    studentgroupassignments: string;
    teacher: string;
  };
};

interface UpdateAssignmentAppState extends SnackbarType {
  assignment: AssignmentType;
  distributeErrors: string[][];
  distributeWaiting: boolean;
  editing: boolean;
  form: AssignmentForm;
  questionsEditableByUser: boolean;
  questionRanks: QuestionRankType[];
  questionRanksLoading: boolean;
  studentgroupassignments: StudentGroupAssignmentType[];
  studentgroupassignmentsLoading: boolean;
  teacher: TeacherType | undefined;
}
