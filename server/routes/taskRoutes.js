import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  addTask,
  updateStatus,
  getAllDetails,
  filterTasks,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/add", authenticate, addTask);
router.patch("/update/:taskId", authenticate, updateStatus);
router.get("/:projectId", authenticate, getAllDetails);
router.get("/filter/:projectId", authenticate, filterTasks);

export default router;
