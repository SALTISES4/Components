import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/types";
import { QuestionDifficultyLabels } from "../_localComponents/types";
import { ExerciceLabels } from "./enum";
import { PeerImpactLabels } from "../_localComponents/enum";

export type SearchFilterProps = {
  gettext: (a: string) => string;
  callback: (a: string[]) => void;
  filter: FilterType;
  labels?: Record<string, string>;
  selected: string[];
};

export type SearchDropdownProps = {
  gettext: (a: string) => string;
  callback: (a: string[]) => void;
  choices: string[];
  labels?: Record<string, string>;
  selected: string[];
  subtitle: string;
  title: string;
};

export type FilterType = {
  title: string;
  subtitle: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  notification: number;
  choices: string[];
};

export type TypeFilterType = {
  title: string;
  subtitle: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  notification: number;
  choices: ExerciceLabels[];
};

export type DifficultyFilterType = {
  title: string;
  subtitle: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  notification: number;
  choices: QuestionDifficultyLabels[];
};

export type PeerImpactFilterType = {
  title: string;
  subtitle: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  notification: number;
  choices: PeerImpactLabels[];
};

export type CategoryFilterType = {
  title: string;
  subtitle: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  notification: number;
  choices: string[];
};

export type DisciplineFilterType = {
  title: string;
  subtitle: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  notification: number;
  choices: string[];
};
