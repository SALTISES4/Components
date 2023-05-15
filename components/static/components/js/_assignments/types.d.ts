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
