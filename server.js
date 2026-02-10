// Imports
import express from 'express';
import 'dotenv/config'
import connectDB from './db/conn.js';
import { logReq, globalErr } from './middleware/middlewares.js';
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

// Setups
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(logReq);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/task", taskRoutes);
app.get("/", (req, res) => {
  res.send("Task Tracker API is running...");
});

// Global Err
app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`${new Date().toLocaleTimeString()} -- Server listening on port: ${PORT}`);
});