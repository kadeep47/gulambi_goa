// Import required modules
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import pageRoutes from './routes/PageRoutes.js';
import authRoutes from './routes/AuthRoutes.js';
import chatgroupRoutes from './routes/chatgroupRoutes.js';

dotenv.config(); // Load environment variables from .env


const app = express(); // Initialize the Express app
const PORT = process.env.PORT || 5050;

// Middleware to parse JSON and allow cross-origin requests
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Import and use routes
app.use("/api/page", pageRoutes); // Base route for page-related APIs
app.use("/auth",authRoutes);
app.use("/chat",chatgroupRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

