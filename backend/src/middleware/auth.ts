import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  const authHeader = req.headers["authorization"] || req.headers["Authorization"];

  if (authHeader && typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return next(new Error("Not authorized to access this route"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;    
    (req as any).user = await User.findById(decoded.id);
    
    if (!(req as any).user) {
      return next(new Error("User not found"));
    }

    next();
  } catch (err) {
    next(new Error("Not authorized to access this route"));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((req as any).user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${(req as any).user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};
