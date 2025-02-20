import axios from "axios";

export const generateBackstory = async (
  name: string,
  race: string,
  characterClass: string,
  trait: string,
  tone: string,
  hasNickname?: boolean
) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/generate-backstory",
      {
        name,
        race,
        characterClass,
        trait,
        tone,
        hasNickname,
      }
    );

    return response.data.backstory;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error generating backstory:",
        error.response?.data || error.message
      );

      if (error.response?.status === 429) {
        console.error("Rate limit exceeded. Please try again later.");
      }

      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};
