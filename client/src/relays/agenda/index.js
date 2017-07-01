import React, { Component } from "react";
import { connect } from "react-redux";
import Relay from "react-relay";
import { Cookies } from "react-cookie";
let cookie = new Cookies();

class AgendaApp extends Component {
  render() {
    return(
      <div className="agenda">
        <h2>Agenda Appointments</h2>
        {this.props.appointments.map(appointment =>
          <Conference appointment={appointment} />
        )}
      </div>
    );
  }
}

class Agenda extends Component {
  render() {
    return(
      <div className="col-sm-4">
        <div className="panel panel-default" key={appointment.id}>
          <div className="panel-heading">
            <h3>{appointment.title}</h3>
          </div>
          <div className="panel-body">
            {appointment.description}
          </div>
        </div>
      </div>
    );
  }
}

exports.Container = Relay.createContainer(AgendaApp, {
  initialVariables: {
    userToShow: cookie.get("user_id")
  },
  appointments: {
    user: () => Relay.QL`
      appointment on User {
        firstName,
        lastName,
        appointments {
          _id,
          title,
          description,
          datetime
        }
      }
    `
  }
})
