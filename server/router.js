import AuthenticationController from "./controllers/authentication";
import AppointmentController from "./controllers/appointment";
import express from "express";
import passportService from "./config/passport";
import passport from "passport";

const requireAuth = passport.authenticate("jwt", {session: false})
const requireLogin = passport.authenticate("local", {session: false})

module.exports = function(app) {
  const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        appointmentRoutes = express.Router();


  //= ========================
  // Auth Routes
  //= ========================

  // Auth routes as subgroup/middleware
  apiRoutes.use("/auth", authRoutes);

  // Registration route
  authRoutes.post("/register", AuthenticationController.register);

  // Login route
  authRoutes.post("/login", requireLogin, AuthenticationController.login);

  // Protected route
  apiRoutes.get("/protected", requireAuth, (req, res) => {
    res.send({content: "The protected test route is functional!"});
  });

  //= ========================
  // Appointment Routes
  //= ========================
  apiRoutes.use("/appointments", appointmentRoutes);

  // fetch all
  appointmentRoutes.get("/", requireAuth, AppointmentController.getAppointments);
  // fetch single
  appointmentRoutes.get("/:appointmentId", requireAuth, AppointmentController.getAppointment);
  // create
  appointmentRoutes.post("/", requireAuth, AppointmentController.createAppointment);
  // update
  appointmentRoutes.put("/:appointmentId", requireAuth, AppointmentController.updateAppointment);
  // delete
  appointmentRoutes.delete("/:appointmentId", requireAuth, AppointmentController.deleteAppointment);

  // URL for API group routes
  app.use("/api", apiRoutes)
}
