export default function validate(formProps) {
  const errors = {};

  if (!formProps.title) {
    errors.title = "Please enter a title.";
  }
  if (!formProps.datetime) {
    errors.datetime = "Please enter a date.";
  }
  if (!formProps.appointment_type) {
    errors.appointment_type = "Please select an appointment type.";
  } else {
    if (formProps.appointment_type == "event" && !formProps.event_location) {
      errors.event_location = "Please insert a location for the event.";
    }
    if (formProps.appointment_type == "meeting" && !formProps.meeting_title) {
      errors.meeting_title = "Please insert a title for the meeting.";
    }
  }

  return errors;
}
