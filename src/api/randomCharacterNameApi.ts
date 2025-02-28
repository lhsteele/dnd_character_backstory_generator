import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const generateRandomCharacterName = async () => {
  try {
    const response = await axios.post(`${BACKEND_URL}/generate-character-name`);
    return response.data;
  } catch (error) {
    const e = error as Error;
    if (axios.isAxiosError(e)) {
      console.error("Error generating name:", e.message);

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
