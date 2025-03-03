import mongoose, { Document } from "mongoose";

export interface IProgress extends Document {
  user: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
  videoProgress: {
    videoId: string;
    watched: boolean;
    watchTime: number;
  }[];
  completedLessons: number;
  totalLessons: number;
  progress: number; 
  completed: boolean; 
  completionDate?: Date; 
  lastUpdated: Date;
}

const ProgressSchema = new mongoose.Schema({
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
  videoProgress: [
    {
      videoId: {
        type: String,
        required: true,
      },
      watched: {
        type: Boolean,
        default: false,
      },
      watchTime: {
        type: Number,
        default: 0,
      },
    },
  ],
  completedLessons: {
    type: Number,
    default: 0,
  },
  totalLessons: {
    type: Number,
    required: true,
  },
  progress: {
    type: Number,
    default: 0, 
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completionDate: {
    type: Date, 
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IProgress>("Progress", ProgressSchema);
