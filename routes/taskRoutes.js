import express from "express";
import Task from "../models/taskSchema.js";

const router = express.Router();

router // /api/tasks
  .route("/")
  // Get all tasks (Supports query params like ?completed=true or ?userId=...)
  .get(async (req, res, next) => {
    try {
      // Allow filtering directly from the URL
      const tasks = await Task.find(req.query)
        .populate("userId", "username") // Joins user data (only shows username)
        .populate("categoryId", "name"); // Joins category data (only shows name)
      
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  })
  // Add a new task
  .post(async (req, res, next) => {
    try {
      const newTask = await Task.create(req.body);
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  });


router // /api/tasks/:id
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const task = await Task.findById(req.params.id)
        .populate("userId")
        .populate("categoryId");
      if (!task) return res.status(404).json({ error: "Task Not Found" });
      res.json(task);
    } catch (error) {
      next(error);
    }
  })
  // Update status, priority, etc.
  .patch(async (req, res, next) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedTask) return res.status(404).json({ error: "Task Not Found" });
      res.json(updatedTask);
    } catch (error) {
      next(error);
    }
  })
  // Remove a task
  .delete(async (req, res, next) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      if (!deletedTask) return res.status(404).json({ error: "Task Not Found" });
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      next(error);
    }
  });

export default router;