import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateBackstory(
  name,
  race,
  characterClass,
  trait,
  tone,
  hasNickname
) {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });

    const prompt = `Create a DnD character backstory for a ${race} ${characterClass} named ${name}. 
        The character has the following trait: ${trait}. 
        If ${hasNickname}, create a nickname for the character and include this in the backstory.
        Make the backstory detailed and engaging, and use a ${tone} tone. 

        A ${tone} tone means: if the tone is "kid-friendly", keep it light-hearted and adventurous, maybe even funny, 
        and avoid dark or mature themes. If the tone is "young adult", you can incorporate darker themes, but keep it appropriate for teens.
        
        Keep the backstory between 200 to 250 words, and use they/them for pronouns.
        `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const backstory = response.text();

    return backstory;
  } catch (error) {
    console.error("Error generating backstory:", error);
    return "Sorry, something went wrong while generating the backstory. Please try again.";
  }
}
