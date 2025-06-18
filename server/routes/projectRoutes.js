import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { addProject, getProjects, deleteProject } from "../controllers/projectController.js";

const router = express.Router();

router.post("/add", authenticate, addProject);
router.get("/get", authenticate, getProjects);
router.delete("/delete/:projectId", authenticate, deleteProject)

export default router;
