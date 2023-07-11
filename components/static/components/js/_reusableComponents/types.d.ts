import { EditorIconsType } from "../types";
import {
  QuestionDifficulty,
  QuestionPeerImpact,
} from "../_localComponents/types";

export type AssignmentStateIconProps = {
  state: string;
};

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
  title: string;
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
