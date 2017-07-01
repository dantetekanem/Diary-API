export default function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = "Please enter your email.";
  }
  if (!formProps.password) {
    errors.password = "Please enter your password.";
  }

  return errors;
};
