import express from "express";
import { Request, Response } from "express";
import { protect } from "../middleware/auth";
import * as enrollmentController from "../controllers/enrollmentController";

const progressRouter = express.Router();

progressRouter.get("/", protect, async (req: Request, res: Response) => {
  await enrollmentController.getOverallProgress(req, res);
});

progressRouter.get("/:courseId", protect, async (req: Request, res: Response) => {
  await enrollmentController.getCourseProgress(req, res);
});

progressRouter.put("/:courseId", protect, async (req: Request, res: Response) => {
  await enrollmentController.updateCourseProgress(req, res);
});

export default progressRouter; 
