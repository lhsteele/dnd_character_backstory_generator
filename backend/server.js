import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { generateBackstory } from "./generateBackstory.js";
import { generateRandomCharacterName } from "./generateRandomCharacterName.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  })
);

app.use(express.json());

app.post("/generate-backstory", async (req, res) => {
  try {
    const { name, race, characterClass, traits, tone } = req.body;

    if (!name || !race || !characterClass || !traits || !tone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const backstory = await generateBackstory(
      name,
      race,
      characterClass,
      traits,
      tone
    );

    res.json({ backstory });
  } catch (error) {
    console.error("Error generating backstory:", error);
    res.status(500).json({ error: "Error generating backstory" });
  }
});

app.post("/generate-character-name", async (_, res) => {
  try {
    const name = await generateRandomCharacterName();

    res.json({ name });
  } catch (error) {
    console.error("Error generating name:", error);
    res.status(500).json({ error: "Error generating name" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
