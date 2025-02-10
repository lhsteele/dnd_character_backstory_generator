import axios from "axios";

export const generateRandomCharacterName = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/generate-character-name"
    );
    return response.data;
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
