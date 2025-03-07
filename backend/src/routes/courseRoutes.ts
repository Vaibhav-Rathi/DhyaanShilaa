import express from "express";
import { Request, Response, NextFunction } from "express";
import { protect, authorize } from "../middleware/auth";
import * as courseController from "../controllers/courseController";

const courseRouter = express.Router(); 

courseRouter.get("/", async (req: Request, res: Response) => {
  await courseController.getCourses(req, res);
});

courseRouter.get("/:id", async (req: Request, res: Response) => {
  await courseController.getCourse(req, res);
});

courseRouter.post(
  "/",
  protect,
  (req: Request, res: Response, next: NextFunction) => {
    authorize("instructor", "admin")(req, res, next);
  },
  async (req: Request, res: Response) => {
    await courseController.createCourse(req, res);
  }
);

courseRouter.put(
  "/:id",
  protect,
  (req: Request, res: Response, next: NextFunction) => {
    authorize("instructor", "admin")(req, res, next);
  },
  async (req: Request, res: Response) => {
    await courseController.updateCourse(req, res);
  }
);

courseRouter.delete(
  "/:id",
  protect,
  (req: Request, res: Response, next: NextFunction) => {
    authorize("instructor", "admin")(req, res, next);
  },
  async (req: Request, res: Response) => {
    await courseController.deleteCourse(req, res);
  }
);

export default courseRouter; 
