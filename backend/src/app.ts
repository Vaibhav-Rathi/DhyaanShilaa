import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes"; 
import courseRouter from "./routes/courseRoutes"; 
import progressRouter from "./routes/progressRoutes"; 
import fileUpload from 'express-fileupload';

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(fileUpload());
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/progress", progressRouter);

export default app;
