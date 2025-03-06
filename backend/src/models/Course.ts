import mongoose, { Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  subtitle: string;
  category: string;
  subCategory: string;
  topic: string;
  language: string;
  subtitleLanguage?: string;
  level: string;
  duration: {
    value: number;
    unit: "Day" | "Week" | "Month";
  };
  thumbnail: Buffer;
  thumbnailContentType: string;
  trailer: Buffer;
  trailerContentType: string;
  description: string;
  curriculum: {
    lecture: Buffer;
    lectureContentType: string;
    subLectures: string[];
  }[];
  welcomeMessage: string;
  congratulationsMessage: string;
  instructor: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  topic: { type: String, required: true },
  language: { type: String, required: true },
  subtitleLanguage: { type: String, default: "" },
  level: { type: String, required: true },
  duration: {
    value: { type: Number, required: true },
    unit: { type: String, enum: ["Day", "Week", "Month"], required: true },
  },
  thumbnail: { type: Buffer, required: true },
  thumbnailContentType: { type: String, required: true },
  trailer: { type: Buffer, required: true },
  trailerContentType: { type: String, required: true },
  description: { type: String, required: true },
  curriculum: [
    {
      lecture: { type: Buffer, required: true },
      lectureContentType: { type: String, required: true },
      subLectures: { type: [String], default: [] },
    },
  ],
  welcomeMessage: { type: String, required: true },
  congratulationsMessage: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICourse>("Course", CourseSchema);
