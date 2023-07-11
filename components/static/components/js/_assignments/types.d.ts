import { UserType } from "../_localComponents";

export type TextBoxProps = {
  title: string;
  text: string;
};

export type GeneralProps = {
  gettext: (a: string) => string;
  identifier: string;
  owner: UserType[];
  description: string;
  instructions: string;
  notes: string;
};

export type ToolbarProps = {
  gettext: (a: string) => string;
  enableEditMode?: boolean;
  groups?: { title: string; pk: number }[];
};

export type ShareModalProps = {
  gettext: (a: string) => string;
  open: any;
  onClose: any;
};

export type DistributeModalProps = {
  gettext: (a: string) => string;
  groups: { title: string; pk: number }[];
  open: any;
  onClose: any;
};
