import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Initialize dotenv
dotenv.config();

// Initialize express
const app = express();

// Use CORS
app.use(cors());

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
