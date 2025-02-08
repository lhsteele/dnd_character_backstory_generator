import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { generateBackstory } from "./generateBackstory.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // Update this if frontend runs on a different port
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// POST endpoint to generate backstory
app.post("/generate-backstory", async (req, res) => {
  try {
    const { name, race, characterClass, traits, tone } = req.body;

    // Check if all fields are provided
    if (!name || !race || !characterClass || !traits || !tone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Call the function to generate the backstory
    const backstory = await generateBackstory(
      name,
      race,
      characterClass,
      traits,
      tone
    );

    // Send back the generated backstory
    res.json({ backstory });
  } catch (error) {
    console.error("Error generating backstory:", error);
    res.status(500).json({ error: "Error generating backstory" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
