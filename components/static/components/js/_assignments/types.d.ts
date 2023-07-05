export type TextBoxProps = {
  title: string;
  text: string;
};

export type GeneralProps = {
  gettext: (a: string) => string;
  author: string;
  title: string;
  description: string;
  instructions: string;
  notes: string;
};

export type ToolbarProps = {
  gettext: (a: string) => string;
};

export type ShareModalProps = {
  gettext: (a: string) => string;
  open: any;
  onClose: any;
};
