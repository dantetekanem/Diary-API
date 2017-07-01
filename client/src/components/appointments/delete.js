import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import * as actions from "../../actions/appointments";

class DeleteAppointment extends Component {
  constructor (props) {
    super(props);

    const { params, fetchAppointment } = this.props;
    fetchAppointment(params.appointmentId);
    this.deleteAppointment = this.deleteAppointment.bind(this);
  }

  deleteAppointment(event) {
    const { params, deleteAppointment } = this.props;
    deleteAppointment(params.appointmentId);
  }

  render() {
    if (this.props.appointment) {
      return (
        <div>
          <h2>Delete Appointment</h2>
          <p>
            Are you sure you want to delete the appointment <b>{this.props.appointment.title}</b>?
          </p>
          <button onClick={this.deleteAppointment} className="btn btn-primary">Yes</button> | <Link to="/appointments">No</Link>
        </div>
      );
    } else {
      return (<div>Loading data...</div>);
    }
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.communication.error,
    message: state.communication.message,
    appointment: state.communication.appointment
  }
}

export default connect(mapStateToProps, actions)(DeleteAppointment);
