import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateMonsterEncounter(monsterType, tone) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Create a DnD monster encounter for ${monsterType} type of monster.
        There should be some type of obstacle or conflict that must be resolved in order
        to pass this monster.
        The obstacle or conflict should be either a pysical attack 
        or a mental challenge, like a puzzle.
        If it is a mental challenge, like a puzzle, provide the puzzle in the text, and the
        answer at the bottom of the text in ** **.

        A ${tone} tone means: if the tone is "kid-friendly", keep it light-hearted and adventurous, maybe even funny, 
        and avoid dark or mature themes. If the tone is "young adult", you can incorporate darker themes, but keep it appropriate for teens.
        
        Keep the encounter between 100 to 150 words, and use they/them for pronouns.
        `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const encounter = response.text();

    return encounter;
  } catch (error) {
    console.error("Error generating encounter:", error);
    return "Sorry, something went wrong while generating the encounter. Please try again.";
  }
}
