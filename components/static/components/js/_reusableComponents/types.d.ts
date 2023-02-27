import { QuestionDifficulty } from "../_localComponents/types";

export type AssignmentStateIconProps = {
  state: string;
};

export type CircleProgressionIconProps = {
  progress: number;
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
  peerImpact: number;
};

export type TextInputBoxProps = {
  id: string;
  title: string;
  rows: number;
  defaultValue: string;
};
