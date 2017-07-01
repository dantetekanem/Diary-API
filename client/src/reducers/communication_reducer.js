import { Cookies } from "react-cookie";
import { browserHistory } from "react-router";
import * as actions from "../actions/appointments";
import moment from "moment";
const socket = actions.socket;
const cookie = new Cookies();
const user = cookie.get("user");
import { APPOINTMENT_ERROR, FETCH_APPOINTMENTS, NEW_APPOINTMENT, EDIT_APPOINTMENT, DELETE_APPOINTMENT, FETCH_SINGLE_APPOINTMENT, RESET_APPOINTMENT_STATE } from "../actions/types";

const INITIAL_STATE = {appointments: [], message: "", error: ""};

function cleanAppointment(appointment) {
  if(appointment.datetime) {
    appointment.datetime = moment(appointment.datetime).format("MM/DD/YYYY");
  }

  return appointment;
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_APPOINTMENTS:
      return {...state, appointments: action.payload.appointments};
    case FETCH_SINGLE_APPOINTMENT:
      return {...state, appointment: cleanAppointment(action.payload.appointment)};
    case NEW_APPOINTMENT:
      socket.emit("new appointment", user._id);
      return {...state, message: action.payload.message};
    case EDIT_APPOINTMENT:
      socket.emit("edit appointment", user._id);
      return {...state, message: action.payload.message};
    case DELETE_APPOINTMENT:
      socket.emit("delete appointment", user._id);
      browserHistory.push("/appointments");
      return {...state, message: ""};
    case RESET_APPOINTMENT_STATE:
      return {...state, appointment: null, message: "", error: ""};
    case APPOINTMENT_ERROR:
      return {...state, error: action.payload};
  }

  return state;
}
