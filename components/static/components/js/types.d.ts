import {
  AssignmentType,
  CollectionType,
  QuestionType,
} from "./_localComponents/types";

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

export type NavigationAppProps = {
  logo: string;
  menuAddItems: LinkType[][];
  menuProfile: LinkType[][];
  nonce: string;
  sidebarGroups: LinkType[][];
  user: UserType;
};
