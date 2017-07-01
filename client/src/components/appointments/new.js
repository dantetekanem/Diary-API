import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import DatePicker from "react-datepicker";
import * as actions from "../../actions/appointments";
import validate from "./validations/form";
import { Link } from "react-router";

const form = reduxForm({
  form: "newAppointment",
  validate,
})

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input className="form-control" {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
  <div>
    <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? input.value : null} />
    {touched && error && <span>{error}</span>}
  </div>
);

class NewAppointment extends Component {
  constructor (props) {
    super(props);
  }

  handleFormSubmit(formProps) {
    this.props.createAppointment(formProps);
  }

  componentWillUnmount() {
    this.props.resetAppointmentState();
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    } else if (this.props.message) {
      return (
        <div className="alert alert-success">
          <strong>Success!</strong> {this.props.message}
        </div>
      );
    }
  }

  renderAppointmentType() {
    if (this.props.appointmentType == "event") {
      return(
        <div>
          <Field className="form-control" name="event_location" label="Event Location" type="text" component={renderField} />
        </div>
      );
    } else if (this.props.appointmentType == "meeting") {
      return(
        <div>
          <Field className="form-control" name="meeting_title" label="Meeting Title" type="text" component={renderField} />
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, appointmentType } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <h2>New Appointment</h2>
        {this.renderAlert()}
        <Field name="title" component={renderField} label="Title" type="text" />
        <br />

        <label>Description</label>
        <Field className="form-control" name="description" component="textarea" />
        <br />

        <label>Date</label>
        <br />
        <Field name="datetime" className="form-control" component={renderDatePicker} />
        <br />

        <label>Appointment Type</label>
        <Field className="form-control" name="appointment_type" component="select">
          <option />
          <option value="event">Event</option>
          <option value="meeting">Meeting</option>
        </Field>
        <br />
        {this.renderAppointmentType()}

        <hr />
        <button type="submit" className="btn btn-primary">Submit</button> | <Link to="/appointments">Back</Link>
      </form>
    );
  }
}

const selector = formValueSelector("newAppointment");

function mapStateToProps(state) {
  return {
    errorMessage: state.communication.error,
    message: state.communication.message,
    appointmentType: selector(state, "appointment_type")
  }
}

export default connect(mapStateToProps, actions)(form(NewAppointment));
