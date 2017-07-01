import React, { Component } from "react";
import { Link } from "react-router";
import moment from "moment";

class AppointmentItem extends Component {
  renderAppointmentType() {
    if (this.props.appointment_type == "event") {
      return (
        <div className="event">
          <h4>Event at</h4>
          <b>{this.props.event_location}</b>
        </div>
      );
    } else {
      return (
        <div className="meeting">
          <h4>Meeting</h4>
          <b>{this.props.meeting_title}</b>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="appointment col-md-4">
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        <span>{new Date(this.props.datetime).toDateString()}</span>
        {this.renderAppointmentType()}
        <hr />
        <Link to={`/appointments/edit/${this.props.id}`}>Edit</Link> | <Link to={`/appointments/delete/${this.props.id}`}>Delete</Link>
      </div>
    );
  }
}

export default AppointmentItem;
