import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js"
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);

const runServer = async () => {
  const isConnected = await dbConnect();
  if (isConnected) {
    app.listen(port, () => {
      console.log(`Server running on port ${port}...`);
    });
  }
};
runServer();
