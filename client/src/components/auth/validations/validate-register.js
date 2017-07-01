export default function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = "Please enter a first name.";
  }
  if (!formProps.lastName) {
    errors.lastName = "Please enter a last name.";
  }
  if (!formProps.email) {
    errors.email = "Please enter a email.";
  }
  if (!formProps.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
};
