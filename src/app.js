import express from "express";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(express.json());
app.use(taskRoutes);

export default app;