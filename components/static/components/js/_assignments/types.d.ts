import { UserType } from "../_localComponents";

export type StudentGroupAssignmentCreateForm = {
  due_date: string;
  group_pk: number;
  show_correct_answers: boolean;
};

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
  distributeErrors: string[];
  enableDistribute?: boolean;
  enableEditMode?: boolean;
  groups?: { title: string; pk: number }[];
  handleDistribute: (form: StudentGroupAssignmentCreateForm) => void;
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
  handleSubmit: (form: StudentGroupAssignmentCreateForm) => void;
  open: any;
  onClose: any;
};
