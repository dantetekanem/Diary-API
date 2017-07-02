import Appointment from "../models/appointment";
import User from "../models/user";

exports.getAppointments = function(req, res, next) {
  Appointment.find({userId: req.user._id})
    .select()
    .sort('-createdAt')
    .exec((err, appointments) => {
      if (err) {
        res.send({error: err});
        return next(err);
      }

      return res.status(200).json({appointments: appointments});
    })
}

exports.getAppointment = function(req, res, next) {
  Appointment.findById(req.params.appointmentId, (err, appointment) => {
    if (err) {
      res.status(400).json({error: err});
      return next(err);
    }

    return res.status(200).json({appointment: appointment});
  })
}

let validAppointment = (params, res) => {
  if (!params.title) {
    res.status(422).send({error: "Insert a title."});
    return false;
  }
  if (!params.datetime) {
    res.status(422).send({error: "Insert a date."});
    return false;
  }
  if (!params.appointment_type) {
    res.status(422).send({error: "Insert an appointment type."});
    return false;
  }

  return true;
}

exports.createAppointment = function(req, res, next) {
  if (!validAppointment(req.body, res)) {
    return next();
  }

  const user = req.user;
  let appointment = new Appointment({
    userId: user._id,
    title: req.body.title,
    description: req.body.description || "",
    datetime: req.body.datetime,
    appointment_type: req.body.appointment_type,
    event_location: req.body.event_location || "",
    meeting_title: req.body.meeting_title || ""
  })

  appointment.save((err, newAppointment) => {
    if (err) {
      res.send({error: err});
      return next(err);
    }

    return res.status(200).json({message: "Appointment created.", appointment: newAppointment});
  });
}

exports.updateAppointment = function(req, res, next) {
  if (!validAppointment(req.body, res)) {
    return next();
  }

  let appointment = Appointment.findById(req.params.appointmentId, (err, appointment) => {
    if (err) {
      res.status(400).send({error: err});
      return next(err);
    }

    appointment.title = req.body.title || appointment.title;
    appointment.description = req.body.description || appointment.description;
    appointment.datetime = req.body.datetime || appointment.datetime;
    appointment.appointment_type = req.body.appointment_type || appointment.appointment_type;
    appointment.event_location = req.body.event_location || appointment.event_location;
    appointment.meeting_title = req.body.meeting_title || appointment.meeting_title;

    appointment.save((err, appointment) => {
      if (err) {
        res.status(500).send({error: err});
        return next(err);
      }

      return res.status(200).json({message: "Appointment updated.", appointment: appointment});
    });
  });
}

exports.deleteAppointment = function(req, res, next) {
  Appointment.findByIdAndRemove(req.params.appointmentId, (err, appointment) => {
    if (err) {
      res.status(422).send({error: err});
      return next(err);
    }

    return res.status(200).json({message: "Appointment deleted.", id: appointment._id});
  });
}
