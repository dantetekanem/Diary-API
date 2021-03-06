import { AUTH_USER, UNAUTH_USER, FAILED_AUTH, AUTH_ERROR, PROTECTED_TEST } from "../actions/types";
const INITIAL_STATE = {error: "", message: "", content: "", authenticated: false};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER:
      return {...state, error: "", message: "", authenticated: true};
    case UNAUTH_USER:
      return {...state, authenticated: false};
    case FAILED_AUTH:
      return {...state, error: true, authenticated: false};
    case AUTH_ERROR:
      window.location.href = "/login";
      return {...state, error: action.payload, authenticated: false};
    case PROTECTED_TEST:
      return {...state, content: action.payload};
  }

  return state;
}
