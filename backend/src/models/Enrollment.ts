import mongoose, { Document } from "mongoose";

export interface IEnrollment extends Document {
  user: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
  progress: number;
  completed: boolean;
  startDate: Date;
  completionDate?: Date;
  lastActivity: Date;
}

const EnrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  completionDate: {
    type: Date,
  },
  lastActivity: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);