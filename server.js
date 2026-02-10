// Imports
import express from 'express';
import 'dotenv/config'
import connectDB from './db/conn.js';
import { logReq, globalErr } from './middleware/middlewares.js';
import userRoutes from './routes/userRoutes.js'

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
app.get("/", (req, res) => {
  res.send("Task Tracker API is running...");
});

// Global Err
app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`${new Date().toLocaleTimeString()} -- Server listening on port: ${PORT}`);
});