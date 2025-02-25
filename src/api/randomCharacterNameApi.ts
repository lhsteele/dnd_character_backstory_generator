import axios from "axios";

export const generateRandomCharacterName = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/generate-character-name"
    );
    return response.data;
  } catch (error) {
    const e = error as Error;
    if (axios.isAxiosError(e)) {
      console.error(
        "Error generating backstory:",
        e.response?.data || e.message
      );

      if (e.response?.status === 429) {
        console.error("Rate limit exceeded. Please try again later.");
      }

      throw e;
    } else {
      console.error("Unexpected error:", e);
      throw e;
    }
  }
};
