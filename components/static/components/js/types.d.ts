export type UserType = {
  avatar: string;
  username: string;
};

export type GroupType = {
  icon: string;
  title: string;
  url: string;
};

type URLType = {
  icon: string;
  title: string;
  url: string;
};

export type NavigationAppProps = {
  groups: GroupType[][];
  logo: string;
  menuAddItems: URLType[];
  menuProfile: URLType[];
  nonce: string;
  user: UserType;
};
