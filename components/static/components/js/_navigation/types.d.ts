import { MenuProps } from "@mui/material/Menu";
import { LinkType, UserType } from "../types";

export type headerProps = {
  menuAddItems: LinkType[][];
  menuProfile: LinkType[][];
  user: UserType;
};

export interface CustomMenuProps extends MenuProps {
  menuItems: LinkType[][];
}

export type DrawerProps = {
  logo: string;
  groups: LinkType[][];
};
