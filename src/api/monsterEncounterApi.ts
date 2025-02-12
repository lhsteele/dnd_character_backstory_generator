import axios from "axios";

export const generateMonsterEncounter = async (
  monsterType: string,
  tone: string
) => {
  console.log("here");
  try {
    const response = await axios.post(
      "http://localhost:5000/generate-monster-encounter",
      {
        monsterType,
        tone,
      }
    );
    console.log(response.data);
    return response.data.encounter;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error generating encounter:",
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
