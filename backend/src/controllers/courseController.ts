import { Request, Response } from "express";
import Course, { ICourse } from "../models/Course";
import { JwtPayload } from "jsonwebtoken";
import path from "path";
import fs from "fs";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload & { id: string };
}

export const getCourses = async (req: Request, res: Response) => {
  try {
    let query: any = {};

    const reqQuery = { ...req.query };

    const removeFields = ["select", "sort", "page", "limit"];

    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Course.find(JSON.parse(queryStr));

    if (req.query.select) {
      const fields = (req.query.select as string).split(",").join(" ");
      query = query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = (req.query.sort as string).split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Course.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    query = query.populate({
      path: "instructor",
      select: "name",
    });

    const courses = await query;

    const pagination: any = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: courses.length,
      pagination,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: "instructor",
      select: "name",
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};


export const createCourse = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { files, body } = req as any;
    body.instructor = req.user.id;

    if (files?.thumbnail) {
      const thumbnailPath = path.join(__dirname, "../uploads", files.thumbnail.name);
      await files.thumbnail.mv(thumbnailPath); // Move file to server
      body.thumbnail = `/uploads/${files.thumbnail.name}`; // Store file path
    }

    if (files?.lecture) {
      const lecturePath = path.join(__dirname, "../uploads", files.lecture.name);
      await files.lecture.mv(lecturePath);
      body.lecture = `/uploads/${files.lecture.name}`;
    }

    const course = await Course.create(body);

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course not found with id of ${req.params.id}`,
      });
    }

    if (
      course.instructor.toString() !== (req as any).user.id &&
      (req as any).user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${(req as any).user.id} is not authorized to update this course`,
      });
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course not found with id of ${req.params.id}`,
      });
    }

    if (
      course.instructor.toString() !== (req as any).user.id &&
      (req as any).user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${(req as any).user.id} is not authorized to delete this course`,
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};