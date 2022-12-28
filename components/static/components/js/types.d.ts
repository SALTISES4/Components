export type UserType = {
  avatar: string;
  username: string;
};

export type LinkType = {
  icon: string;
  title: string;
  url: string;
};

export type NavigationAppProps = {
  logo: string;
  menuAddItems: LinkType[][];
  menuProfile: LinkType[][];
  nonce: string;
  sidebarGroups: LinkType[][];
  user: UserType;
};
