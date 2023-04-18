export type InvitedUserBarProps = {
  gettext: (a: string) => string;
};

export type NewUserBarProps = {
  gettext: (a: string) => string;
};

export type SuperUserBarProps = {
  activeAssignmentCount?: number;
  activeGroupCount?: number;
  createdQuestionCount?: number;
  gettext: (a: string) => string;
};
