import { reset } from "redux-form";
import { browserHistory } from "react-router";
import { getData, postData, putData, deleteData } from "./index";
import { SOCKET_URL } from "../config/main";
import io from "socket.io-client";
import { APPOINTMENT_ERROR, FETCH_APPOINTMENTS, NEW_APPOINTMENT, EDIT_APPOINTMENT, DELETE_APPOINTMENT, FETCH_SINGLE_APPOINTMENT, RESET_APPOINTMENT_STATE } from "./types";
import { Cookies } from "react-cookie";
const cookie = new Cookies();
const user = cookie.get("user");

// Connect to socket.io server
export const socket = io.connect(SOCKET_URL);

//= ===============================
// Appointment actions
//= ===============================

export function fetchAppointments() {
  const url = "/appointments";
  return dispatch => getData(FETCH_APPOINTMENTS, APPOINTMENT_ERROR, true, url, dispatch);
}

export function fetchAppointment(appointment) {
  const url = `/appointments/${appointment}`;
  return dispatch => getData(FETCH_SINGLE_APPOINTMENT, APPOINTMENT_ERROR, true, url, dispatch);
}

export function createAppointment(params) {
  const url = "/appointments";
  return (dispatch) => {
    postData(NEW_APPOINTMENT, APPOINTMENT_ERROR, true, url, dispatch, params);

    // Clear form message
    dispatch(reset('newAppointment'));
  }
}

export function updateAppointment(appointment, params) {
  const url = `/appointments/${appointment}`;
  return (dispatch) => {
    putData(EDIT_APPOINTMENT, APPOINTMENT_ERROR, true, url, dispatch, params);
  }
}

export function deleteAppointment(appointment) {
  const url = `/appointments/${appointment}`;
  return (dispatch) => {
    deleteData(DELETE_APPOINTMENT, APPOINTMENT_ERROR, true, url, dispatch);
  }
}

export function resetAppointmentState() {
  return {type: RESET_APPOINTMENT_STATE};
}
