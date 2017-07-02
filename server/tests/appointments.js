require("babel/register");
const should = require('should');
const request = require('supertest');
const app = require('../app');
const URI = require('./spec_helper').URI;
const mongoose = require('mongoose');
const User = require("../models/user");
const Appointment = require("../models/appointment");
const authed = require('./authed_agent_helper');
const validUser = {firstName: "John", lastName: "Doe", email: "johndoe@example.com", password: "secret"};
let validAppointment = {title: "Testing", description: "", datetime: "07/02/2017", appointment_type: "event", event_location: "My City"};
let appointmentId = null;

describe("*************** Appointments API ***************", () => {
  authed.authorize();

  after((done) => {
    mongoose.connection.collections["appointments"].drop();
    mongoose.connection.collections["users"].drop(() => done());
  });

  it("should fetch a collection of appointments but is empty", (done) => {
    authed
      .get("/api/appointments")
      .set("X-Real-IP", URI)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        res.body.appointments.should.have.length(0);
        done();
      })
  });

  it("should not create an invalid appointment", (done) => {
    authed
      .post("/api/appointments")
      .set("X-Real-IP", URI)
      .type("form")
      .send({title: "Testing", appointment_type: "event"})
      .expect(422)
      .end((err, res) => {
        if (err) done(err);

        res.body.error.should.be.eql("Insert a date.");
        done();
      })
  })

  it("should create a valid appointment", (done) => {
    authed
      .post("/api/appointments")
      .set("X-Real-IP", URI)
      .type("form")
      .send(validAppointment)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        res.body.message.should.be.eql("Appointment created.");
        done();
      })
  });

  it("should fetch a collection of appointments", (done) => {
    authed
      .get("/api/appointments")
      .set("X-Real-IP", URI)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        res.body.appointments.should.have.length(1);
        res.body.appointments[0].should.have.value("title", "Testing");
        appointmentId = res.body.appointments[0]._id;
        done();
      })
  });

  it("should update an appointment", (done) => {
    validAppointment.title = "Updated Testing";
    authed
      .put("/api/appointments/"+appointmentId)
      .set("X-Real-IP", URI)
      .type("form")
      .send(validAppointment)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        res.body.message.should.be.eql("Appointment updated.");
        done();
      })
  });

  it("should fetch a single appointment", (done) => {
    authed
      .get("/api/appointments/"+appointmentId)
      .set("X-Real-IP", URI)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        res.body.appointment.should.have.value("title", "Updated Testing");
        done();
      })
  });

  it("should delete an appointment", (done) => {
    authed
      .delete("/api/appointments/"+appointmentId)
      .set("X-Real-IP", URI)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        res.body.message.should.be.eql("Appointment deleted.");
        done();
      })
  })
});
