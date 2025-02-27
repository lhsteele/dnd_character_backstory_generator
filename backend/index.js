import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://dnd-character-backstory-generator.vercel.app",
];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET, POST",
  allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
