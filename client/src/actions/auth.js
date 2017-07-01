import axios from "axios";
import { browserHistory } from "react-router";
import { Cookies } from "react-cookie";
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, PROTECTED_TEST, STARTING_REQUEST, FINISHED_REQUEST, REQUEST_ERROR } from "./types";
import config from "../config/main";
let cookie = new Cookies();

export function loginUser({email, password}) {
  return function(dispatch) {
    axios.post(`${config.API_URL}/auth/login`, {email, password})
    .then(response => {
      cookie.set("token", response.data.token, {path: "/"});
      cookie.set("user", response.data.user, {path: "/"});
      dispatch({type: AUTH_USER});
      window.location.href = config.CLIENT_ROOT_URL + "/dashboard";
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    })
  }
}

export function registerUser({email, firstName, lastName, password}) {
  return function(dispatch) {
    axios.post(`${config.API_URL}/auth/register`, {email, firstName, lastName, password})
    .then(response => {
      cookie.set("token", response.data.token, {path: "/"});
      cookie.set("user", response.data.user, {path: "/"});
      dispatch({type: AUTH_USER});
      window.location.href = config.CLIENT_ROOT_URL + "/dashboard";
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    })
  }
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({type: UNAUTH_USER});
    cookie.remove("token", {path: "/"});
    cookie.remove("user", {path: "/"});
    window.location.href = config.CLIENT_ROOT_URL + "/login";
  }
}

export function protectedTest() {
  return function(dispatch) {
    axios.get(`${config.API_URL}/protected`, {
      headers: {"Authorization": cookie.get("token")}
    })
    .then(response => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content
      })
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    })
  }
}
