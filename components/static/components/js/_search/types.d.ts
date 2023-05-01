import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/types";

export type SearchFilterProps = {
  gettext: (a: string) => string;
  callback: (a: string[]) => void;
  disabled?: boolean;
  filter: FilterType;
  labels?: Record<string, string>;
  minimum?: number;
  selected: string[];
};

export type SearchDropdownProps = {
  gettext: (a: string) => string;
  callback: (a: string[]) => void;
  choices: string[];
  choiceIcons?: JSX.Element[];
  labels?: Record<string, string>;
  minimum?: number;
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
  choiceIcons?: JSX.Element[];
};
