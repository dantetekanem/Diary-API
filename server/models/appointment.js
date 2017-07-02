// Appointment Model
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// =============================
// Schema for: Appointment.js
// =============================

var AppointmentSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  datetime: {
    type: Date,
    required: true
  },
  appointment_type: {
    type: String,
    required: true
  },
  event_location: {
    type: String
  },
  meeting_title: {
    type: String
  }
}, {timestamps: true});

export default mongoose.model('Appointment', AppointmentSchema);
