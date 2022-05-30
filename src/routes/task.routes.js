import { Router } from "express";
import { createTask, deleteTask, getTasks, getTaskById, getTaskCount, updateTask } from "../controllers/task.controller.js";

const router = Router();

router.get("/tasks", getTasks);
router.get("/task/:id", getTaskById);
router.get("/tasks/count", getTaskCount);
router.post("/task", createTask);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;
