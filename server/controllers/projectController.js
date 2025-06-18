import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const addProject = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    if (!title) {
      return res.status(400).json({ message: "All field should be filled" });
    }

    const project = new Project({
      title,
      description,
      userId: userId,
    });
    await project.save();

    if (!project) {
      return res.status(400).json({ message: "something went wrong" });
    }

    res.status(201).json({ message: "Project added successfully", data: project });
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ message: err.message });
  }
};

export const getProjects = async (req, res) => {
  const userId = req.user.id;

  try {
    const projects = await Project.find({ userId: userId });

    if (projects.length === 0) {
      return res.status(400).json({ message: "No projects added" });
    }

    return res
      .status(200)
      .json({ message: "Successfully retrived projects", data: projects });
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({ message: "Project successfully deleted" });
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ message: err.message });
  }
};

