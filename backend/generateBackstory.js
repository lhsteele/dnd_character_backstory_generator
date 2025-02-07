import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateBackstory(
  name,
  race,
  characterClass,
  traits,
  tone
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Create a DnD character backstory for a ${race} ${characterClass} named ${name}. 
        The character has the following traits: ${traits.join(", ")}. 
        Make the backstory detailed and engaging, and use a ${tone} tone. 
        A ${tone} tone means: if the tone is "kid-friendly", keep it light-hearted and adventurous, maybe even funny, 
        and avoid dark or mature themes. If the tone is "young adult", you can incorporate darker themes, but keep it appropriate for teens.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const backstory = response.text();

    return backstory;
  } catch (error) {
    console.error("Error generating backstory:", error);
    return "Sorry, something went wrong while generating the backstory.";
  }
}

const testName = "Aldor";
const testRace = "Elf";
const testClass = "Ranger";
const testTraits = ["brave", "loyal", "curious"];
const testTone = "kid-friendly";

const backstory = await generateBackstory(
  testName,
  testRace,
  testClass,
  testTraits,
  testTone
);
console.log("Generated Backstory:\n", backstory);
