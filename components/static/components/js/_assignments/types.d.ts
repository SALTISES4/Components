import { ComponentChildren } from "preact";
import {
  AssignmentType,
  QuestionRankType,
  UserType,
} from "../_localComponents";
import { EditorIconsType, LTIType } from "../types";

export interface AssignmentMetaFieldsForm {
  conclusion_page: string | undefined;
  description: string | undefined;
  intro_page: string | undefined;
  title: string | undefined;
}

export interface AssignmentForm extends AssignmentMetaFieldsForm {
  questions?: Omit<QuestionRankType, "question_pk">[];
}

export type StudentGroupAssignmentCreateForm = {
  due_date: string;
  group_pk: number;
  order: string;
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
  title: string;
  // Form
  form: AssignmentMetaFieldsForm;
  setters: {
    description: (a: string) => void;
    intro_page: (a: string) => void;
    conclusion_page: (a: string) => void;
    title: (a: string) => void;
  };
};

export type ToolbarProps = {
  gettext: (a: string) => string;
  nonce: string;
  assignment: AssignmentType;
  distributeErrors: string[][];
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
  lti: LTIType;
};

export type ShareModalProps = {
  gettext: (a: string) => string;
  open: any;
  onClose: any;
};

export type DistributeModalProps = {
  gettext: (a: string) => string;
  nonce: string;
  assignment: AssignmentType;
  errors: string[][];
  groups: { title: string; pk: number }[];
  handleSubmit: (
    form: StudentGroupAssignmentCreateForm,
    callback: () => void,
  ) => void;
  lti: LTIType;
  method: "myDalite" | "LMS" | undefined;
  onClose: any;
  waiting: boolean;
};
