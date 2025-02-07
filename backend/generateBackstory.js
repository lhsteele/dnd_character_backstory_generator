// Step 1: Import dotenv to load environment variables from the .env file
require("dotenv").config();

// Step 2: Import OpenAI package (assuming you have installed the OpenAI client)
const { OpenAI } = require("openai");

// Step 3: Get the OpenAI API key from the environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use the key stored in the .env file
});

// Step 4: Function to generate DnD character backstory
async function generateBackstory(name, race, characterClass, traits, tone) {
  const prompt = `Create a DnD character backstory for a ${race} ${characterClass} named ${name}. The character has the following traits: ${traits.join(
    ", "
  )}. Make the backstory detailed and engaging, and use a ${tone} tone. A ${tone} tone means: if the tone is "kid-friendly", keep it light-hearted and adventurous, maybe even funny, and avoid dark or mature themes. If the tone is "young adult", you can incorporate darker themes, but keep it appropriate for teens.`;

  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo", // Or gpt-4 if you have access
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating backstory:", error);
    return "Sorry, something went wrong while generating the backstory.";
  }
}

// Example usage
const characterName = "Thalindra";
const characterRace = "Elf";
const characterClass = "Wizard";
const characterTraits =
  "brave, intelligent, loyal, has a deep connection to nature";

generateBackstory(characterName, characterRace, characterClass, characterTraits)
  .then((backstory) => {
    console.log("Generated Backstory:", backstory);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
