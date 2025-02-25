import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateRandomCharacterName() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Create one kid-friendly, non-gender specific fantasy/DnD character first and last name.
      Just the name; no need for meaning of name.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const name = response.text();

    return name;
  } catch (error) {
    console.error("Error generating name:", error);
    return "Sorry, something went wrong while generating the name. Please try again";
  }
}
