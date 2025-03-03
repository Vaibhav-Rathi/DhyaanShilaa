import express from "express";
import { Request, Response } from "express";
import { protect } from "../middleware/auth";
import * as authController from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  await authController.register(req, res);
});

authRouter.post("/login", async (req: Request, res: Response) => {
  await authController.login(req, res);
});

authRouter.post("/forgotpassword", async (req: Request, res: Response) => {
  await authController.forgotPassword(req, res);
});

authRouter.get("/profile", protect, async (req: Request, res: Response) => {
  await authController.getProfile(req, res);
});

authRouter.put("/profile", protect, async (req: Request, res: Response) => {
  await authController.updateProfile(req, res);
});

export default authRouter;
