import { ComponentChildren } from "preact";
import { UserType } from "../_localComponents";
import { EditorIconsType } from "../types";

export type AssignmentMetaFieldsForm = {
  description: string | undefined;
  intro_page: string | undefined;
  conclusion_page: string | undefined;
};
export type StudentGroupAssignmentCreateForm = {
  due_date: string;
  group_pk: number;
  show_correct_answers: boolean;
};

export type TextBoxProps = {
  children?: ComponentChildren;
  title?: string;
};

export type GeneralProps = {
  gettext: (a: string) => string;
  editing?: boolean;
  EditorIcons: EditorIconsType;
  identifier: string;
  owner: UserType[];
  // Initial values
  description: string;
  intro_page: string;
  conclusion_page: string;
  // Form
  form: AssignmentMetaFieldsForm;
  setters: {
    description: (a: string) => void;
    intro_page: (a: string) => void;
    conclusion_page: (a: string) => void;
  };
};

export type ToolbarProps = {
  gettext: (a: string) => string;
  distributeErrors: string[];
  distributeWaiting: boolean;
  editing: boolean;
  enableDistribute?: boolean;
  enableEdit?: boolean;
  enableSave: boolean;
  groups?: { title: string; pk: number }[];
  handleDistribute: (
    form: StudentGroupAssignmentCreateForm,
    callback: () => void,
  ) => void;
  handleEdit: (a: boolean) => void;
  handleSave: () => void;
};

export type ShareModalProps = {
  gettext: (a: string) => string;
  open: any;
  onClose: any;
};

export type DistributeModalProps = {
  gettext: (a: string) => string;
  errors: string[];
  groups: { title: string; pk: number }[];
  handleSubmit: (
    form: StudentGroupAssignmentCreateForm,
    callback: () => void,
  ) => void;
  open: any;
  onClose: any;
  waiting: boolean;
};
