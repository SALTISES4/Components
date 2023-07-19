import { EditorIconsType } from "../types";
import {
  QuestionType,
  QuestionDifficulty,
  QuestionPeerImpact,
} from "../_localComponents/types";

interface Snackbar {
  snackbarMessage: string;
  snackbarOpen: boolean;
}

interface SnackbarProps {
  message: string;
  onClose: () => void;
  open: boolean;
}

export type AssignmentStateIconProps = {
  state: string;
};

export type AddToAssignmentModalProps = {
  gettext: (a: string) => string;
  handleSubmit: (a: string) => void;
  open: boolean;
  onClose: any;
  question: QuestionType;
  urls: {
    assignmentList: string;
  };
};

interface AddToAssignmentModalState extends Snackbar {
  assignment: string;
  assignments: { pk: string; title: string }[];
  loading: boolean;
  waiting: boolean;
}

export type CircleProgressionIconProps = {
  progress: number;
};

export type CustomEditorProps = {
  EditorIcons: EditorIconsType;
  setValue: (a: string) => void;
  value: string;
};

export type CustomEditorState = {
  editorState: any;
};

export type DifficultyCircleAssignmentProps = {
  difficulty: string;
};

export type DifficultyCircleIconProps = {
  difficulty: QuestionDifficulty;
};

export type DueInTagProps = {
  dueDate: Date;
  gettext: (a: string) => string;
};

export type PeerImpactIconProps = {
  peerImpact: QuestionPeerImpact;
};

export type CustomTextFieldProps = {
  gettext: (a: string) => string;
  autoFocus?: boolean;
  id: string;
  title?: string;
  defaultValue: string;
  helperText?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  minLength?: number;
  maxLength: number;
  required?: boolean;
  setValue: (a: string) => void;
  sx?: Record<string, string>;
  tooltip?: string;
  validator?: (a: string) => boolean;
  value: string;
};

export type CustomEditorFieldProps = {
  title: string;
  EditorIcons: EditorIconsType;
  defaultValue?: string;
  helperText?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  setValue: (a: string) => void;
  tooltip?: string;
  value: string;
};

export type PagerProps = {
  back: () => void;
  forward: () => void;
  toPage: (a: number) => void;
  currentPage: number;
  pageSize: number;
  hits: number;
};
