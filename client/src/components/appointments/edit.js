import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import * as actions from "../../actions/appointments";
import validate from "./validations/form";
import { renderField, renderDatePicker } from "../../helpers/form-helper";
import { Link } from "react-router";

const form = reduxForm({
  form: "editAppointment",
  validate,
})

class EditAppointment extends Component {
  constructor (props) {
    super(props);

    this.setState({firstLoad: false});
    const { params, fetchAppointment } = this.props;
    fetchAppointment(props.params.appointmentId);
  }

  componentWillUnmount() {
    this.props.resetAppointmentState();
  }

  handleFormSubmit(formProps) {
    this.props.updateAppointment(this.props.params.appointmentId, formProps);
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

  renderForm() {
    const { handleSubmit, appointmentType } = this.props;
    this.props.datetime = new Date();

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <h2>Edit Appointment</h2>
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

  render() {
    if (this.props.appointment) {
      return(<div>{this.renderForm()}</div>);
    } else {
      return(<div>Loading data...</div>);
    }
  }
}

const selector = formValueSelector("editAppointment");

function mapStateToProps(state) {
  return {
    errorMessage: state.communication.error,
    message: state.communication.message,
    appointmentType: selector(state, "appointment_type"),
    appointment: state.communication.appointment,
    initialValues: state.communication.appointment
  }
}

export default connect(mapStateToProps, actions)(form(EditAppointment));
