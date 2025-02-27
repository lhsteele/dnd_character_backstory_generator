// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import { generateBackstory } from "./generateBackstory.js";
// import { generateRandomCharacterName } from "./generateRandomCharacterName.js";
// import { generateMonsterEncounter } from "./generateMonsterEncounter.js";

// console.log("🚀 Server.js is running!");
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://dnd-character-backstory-generator.vercel.app",
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: "GET,POST",
//     allowedHeaders: "Content-Type",
//   })
// );

// app.use(express.json());

// app.post("/generate-backstory", async (req, res) => {
//   try {
//     const { name, race, characterClass, trait, tone } = req.body;

//     if (!name || !race || !characterClass || !trait || !tone) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const backstory = await generateBackstory(
//       name,
//       race,
//       characterClass,
//       trait,
//       tone
//     );

//     res.json({ backstory });
//   } catch (error) {
//     console.error("Error generating backstory:", error);
//     res.status(500).json({ error: "Error generating backstory" });
//   }
// });

// app.post("/generate-character-name", async (_, res) => {
//   try {
//     const name = await generateRandomCharacterName();

//     res.json({ name });
//   } catch (error) {
//     console.error("Error generating name:", error);
//     res.status(500).json({ error: "Error generating name" });
//   }
// });

// app.post("/generate-monster-encounter", async (req, res) => {
//   try {
//     const { monsterType, tone } = req.body;

//     if (!monsterType || !tone) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const encounter = await generateMonsterEncounter(monsterType, tone);

//     res.json({ encounter });
//   } catch (error) {
//     console.error("Error generating encounter:", error);
//     res.status(500).json({ error: "Error generating encounter" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
