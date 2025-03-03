import mongoose, { Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: string;
  instructor: mongoose.Schema.Types.ObjectId;
  overview: string;
  duration: number;
  videoCount: number;
  syllabus: {
    title: string;
    description: string;
  }[];
  prerequisites: string[];
  targetAudience: string[];
  totalEnrolled: number;
  rating: number;
  createdAt: Date;
}

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a course title"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  category: {
    type: String,
    required: [true, "Please specify a category"],
    enum: ["Programming", "UI Design", "Marketing", "Soft Skill", "Network", "Data Analyst"],
  },
  thumbnail: {
    type: String,
    default: "no-photo.jpg",
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  overview: {
    type: String,
    required: [true, "Please add course overview"],
  },
  duration: {
    type: Number, // in hours
    required: [true, "Please add course duration"],
  },
  videoCount: {
    type: Number,
    required: [true, "Please add number of videos"],
  },
  syllabus: [
    {
      title: {
        type: String,
        required: [true, "Please add a section title"],
      },
      description: {
        type: String,
        required: [true, "Please add a section description"],
      },
    },
  ],
  prerequisites: [String],
  targetAudience: [String],
  totalEnrolled: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating must can not be more than 5"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CourseSchema.pre<ICourse>("save", function (next) {
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/g, "-");
  next();
});

export default mongoose.model<ICourse>("Course", CourseSchema);