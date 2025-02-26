import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const FRONTEND_URL = (process.env.NODE_ENV = "production"
  ? "https://dnd-character-backstory-generator.vercel.app"
  : "http://localhost:5173");

// Initialize dotenv
dotenv.config();

// Initialize express
const app = express();

// Use CORS
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: "GET, POST",
    allowedHeaders: "Content-Type",
  })
);

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
