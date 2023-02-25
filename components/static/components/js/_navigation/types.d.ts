import { LinkType, UserType } from "../types";

export type headerProps = {
  menuAddItems: LinkType[][];
  menuHelpItems: LinkType[][];
  menuProfile: LinkType[][];
  user: UserType;
};

export type CustomMenuProps = {
  anchorEl: null | HTMLElement;
  menuItems: LinkType[][];
  onClose: (a: MouseEvent | TouchEvent) => void;
  open: boolean;
};

export type DrawerProps = {
  logo: string;
  groups: LinkType[][];
};
