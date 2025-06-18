import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const addTask = async (req, res) => {
  const { title, description, status, projectId } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ message: "Field shouldn't be empty" });
    }
    if (!projectId) {
      return res.status(400).json({ message: "No project id provided" });
    }

    const task = new Task({
      title,
      description,
      status,
      projectId: projectId,
    });
    await task.save();

    return res
      .status(201)
      .json({ message: "Task added successfully", data: task });
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ message: err.message });
  }
};

export const updateStatus = async (req, res) => {
  const taskId = req.params.taskId;
  const { status } = req.body;
  try {
    if (!taskId) {
      return res.status(400).json({ message: "No such tasks" });
    }

    if (!["pending", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({
        message:
          "Other than 'pending', 'in-progress' and 'completed' are not allowed",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    return res
      .status(201)
      .json({ message: "Task status updated successfully", data: updatedTask });
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ message: err.message });
  }
};

export const getAllDetails = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    if (!projectId) {
      return res.status(400).json({ message: "No such Projects" });
    }
    const tasks = await Task.find({ projectId });
    const project = await Project.findOne({ _id: projectId });

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks added" });
    }

    return res.status(201).json({
      message: "Added tasks",
      project: project.title,
      tasks: tasks.map((task) => ({
        title: task.title,
        status: task.status,
        createdAt: task.createdAt,
      })),
    });
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ message: err.message });
  }
};

export const filterTasks = async (req, res) => {
  const { status } = req.body;
  const { projectId } = req.params;
  try {
    if (!status) {
      return res.status(400).json({ message: "Field shouldn't be empty" });
    }

    const filteredTasks = await Task.find({ projectId, status });

    if (filteredTasks.length === 0) {
      return res.status(400).json({ message: `No ${status} tasks` });
    }

    return res
      .status(200)
      .json({ message: `Filtered by ${status}`, data: filteredTasks });
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ message: err.message });
  }
};
