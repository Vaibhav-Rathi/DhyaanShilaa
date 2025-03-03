import { Request, Response } from "express";
import Progress from "../models/Progress";

export const getOverallProgress = async (req: Request, res: Response) => {
  try {
    const progress = await Progress.find({
      user: (req as any).user.id,
    }).populate({
      path: "course",
      select: "title thumbnail",
    });

    res.status(200).json({
      success: true,
      count: progress.length,
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getCourseProgress = async (req: Request, res: Response) => {
  try {
    const progress = await Progress.findOne({
      user: (req as any).user.id,
      course: req.params.courseId,
    }).populate({
      path: "course",
      select: "title thumbnail videoCount",
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress not found",
      });
    }

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateCourseProgress = async (req: Request, res: Response) => {
  try {
    const { videoId, watched, watchTime } = req.body;

    let progress = await Progress.findOne({
      user: (req as any).user.id,
      course: req.params.courseId,
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress not found",
      });
    }

    const videoIndex = progress.videoProgress.findIndex(
      (video) => video.videoId === videoId
    );

    if (videoIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "Video not found in course progress",
      });
    }

    progress.videoProgress[videoIndex].watched = watched;
    progress.videoProgress[videoIndex].watchTime = watchTime;

    const watchedVideos = progress.videoProgress.filter(video => video.watched).length;
    progress.progress = Math.round((watchedVideos / progress.totalLessons) * 100);

    if (progress.progress === 100) {
      progress.completed = true;
      progress.completionDate = new Date();
    }

    await progress.save();

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
