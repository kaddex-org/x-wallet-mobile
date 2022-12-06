export type TChangeAccountPasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type TFields = {
  name: keyof TChangeAccountPasswordForm;
  label: string;
};
