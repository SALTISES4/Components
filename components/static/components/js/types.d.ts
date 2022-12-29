import {
  AssignmentType,
  CollectionType,
  QuestionType,
} from "./_localComponents/types";

export type UserType = {
  avatar: string;
  username: string;
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
  };
  user: UserType;
};

export type DashboardAppState = {
  assignments: AssignmentType[];
  collections: CollectionType[];
  questions: QuestionType[];
};

export type NavigationAppProps = {
  logo: string;
  menuAddItems: LinkType[][];
  menuProfile: LinkType[][];
  nonce: string;
  sidebarGroups: LinkType[][];
  user: UserType;
};
