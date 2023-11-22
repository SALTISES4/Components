//material ui component types
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

//types
import { EditorIconsType } from "../types";
import {
  QuestionType,
  QuestionDifficulty,
  QuestionPeerImpact,
} from "../_localComponents/types";

interface SnackbarType {
  snackbarIsOpen: boolean;
  snackbarMessage: string;
}

interface SnackbarProps {
  message: string;
  onClose: () => void;
  open: boolean;
  severity?: "error" | "warning" | "info" | "success";
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

interface AddToAssignmentModalState extends SnackbarType {
  assignment: string;
  assignments: { pk: string; title: string }[];
  errors: string[][];
  loaded: boolean;
  waiting: boolean;
}

export type CircleProgressionIconProps = {
  progress: number;
};

export type CustomEditorProps = {
  EditorIcons: EditorIconsType;
  id?: string | number;
  setValue: (a: string) => void;
  validator: (a: string) => boolean;
  value: string;
};

export type CustomEditorState = {
  editorState: any;
  error: boolean;
  hasFocus: boolean;
};

export type DeleteDialogProps = {
  errors: string[][];
  gettext: (a: string) => string;
  handleDelete: () => void;
  message: string;
  onClose: () => void;
  open: boolean;
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

export type ErrorsProps = {
  errors: string[][];
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
  setValue: (a: any) => void;
  sx?: Record<string, string>;
  tooltip?: string;
  validator?: (a: any) => Promise<boolean> | boolean;
  value: string;
};

export type TooltipProps = {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  title: string;
};

export type CustomEditorFieldProps = {
  title: string;
  EditorIcons: EditorIconsType;
  defaultValue?: string;
  helperText?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  id?: string | number;
  setValue: (a: string) => void;
  tooltip?: string;
  validator?: (a: string) => boolean;
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
