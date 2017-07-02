import React, { Component } from "react";
import AppointmentItem from "./appointment-item";
import { Cookies } from "react-cookie";
const cookie = new Cookies();

class AppointmentList extends Component {
  render() {
    return (
      <div className="appointments">
        <div className="row">
          <div className="col-md-12">
            <p>You have {this.props.appointments.length} appointments.</p>
          </div>
          {this.props.appointments.map(appointment => (
            <AppointmentItem
              key={appointment._id}
              id={appointment._id}
              title={appointment.title}
              description={appointment.descript}
              datetime={appointment.datetime}
              appointment_type={appointment.appointment_type}
              event_location={appointment.event_location}
              meeting_title={appointment.meeting_title}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AppointmentList;
