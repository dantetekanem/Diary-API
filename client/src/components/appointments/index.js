import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import * as actions from "../../actions/appointments";
import { Cookies } from "react-cookie";
import AppointmentList from "./appointment-list";

const socket = actions.socket;
const cookie = new Cookies();
const user = cookie.get("user");

class Appointment extends Component {
  constructor(props) {
    super(props);

    const { params, fetchAppointments } = this.props;
    fetchAppointments();
    socket.emit("enter agenda", user._id);

    socket.on("refresh appointments", (data) => {
      fetchAppointments();
    })
  }

  componentWillUnmount() {
    socket.emit("leave agenda", user._id);
  }

  renderList() {
    if (this.props.appointments.length > 0) {
      return (
        <AppointmentList appointments={this.props.appointments} />
      );
    }
  }

  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <h4 className="left">List of Appointments - <Link className="right" to="/appointments/new">New Appointment</Link></h4>
            <div className="clearfix" />
            <hr />
            { this.renderList() }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appointments: state.communication.appointments
  };
}

export default connect(mapStateToProps, actions)(Appointment);
