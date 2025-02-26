import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const generateMonsterEncounter = async (
  monsterType: string,
  tone: string
) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/generate-monster-encounter`,
      {
        monsterType,
        tone,
      }
    );

    return response.data.encounter;
  } catch (error) {
    const e = error as Error;
    if (axios.isAxiosError(e)) {
      console.error(
        "Error generating encounter:",
        e.response?.data || e.message
      );

      if (e.response?.status === 429) {
        console.error("Rate limit exceeded. Please try again later.");
      }

      throw e;
    } else {
      console.error("Unexpected error:", error);
      throw e;
    }
  }
};
