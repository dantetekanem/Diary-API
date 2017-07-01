import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./components/app";
import NotFoundPage from "./components/pages/not-found-page";
import HomePage from "./components/pages/home-page";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import Dashboard from "./components/dashboard";
import Appointments from "./components/appointments";
import NewAppointment from "./components/appointments/new";
import EditAppointment from "./components/appointments/edit";
import DeleteAppointment from "./components/appointments/delete";
import RequireAuth from "./components/auth/require-auth";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="dashboard" component={RequireAuth(Dashboard)} />
    <Route path="appointments" component={RequireAuth(Appointments)} />
    <Route path="appointments/new" component={RequireAuth(NewAppointment)} />
    <Route path="appointments/edit/:appointmentId" component={RequireAuth(EditAppointment)} />
    <Route path="appointments/delete/:appointmentId" component={RequireAuth(DeleteAppointment)} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);
