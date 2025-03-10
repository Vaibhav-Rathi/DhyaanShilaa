import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICourse extends Document {
  title: string;
  subtitle: string;
  category: string;
  subCategory: string;
  topic: string;
  language: string;
  subtitleLanguage?: string;
  level: string;
  thumbnail: Buffer;
  lecture: Buffer;
  description: string;
  welcomeMessage: string;
  congratulationsMessage: string;
  instructor: Types.ObjectId;
  createdAt: Date;
}

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  topic: { type: String, required: true },
  language: { type: String, required: true },
  subtitleLanguage: { type: String, default: "" },
  level: { type: String, required: true },
  thumbnail: { type: Buffer, required: true },
  lecture: { type: Buffer, required: true },
  description: { type: String, required: true },
  welcomeMessage: { type: String, required: true },
  congratulationsMessage: { type: String, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },  // Fix applied
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICourse>("Course", CourseSchema);
