import axios from "axios";

export const generateBackstory = async (
  name: string,
  race: string,
  characterClass: string,
  traits: string,
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
        traits,
        tone,
        hasNickname,
      }
    );

    return response.data.backstory; // Return the backstory from the response
  } catch (error) {
    // If error is AxiosError, we can access response details
    if (axios.isAxiosError(error)) {
      // You can check the error response status or data here
      console.error(
        "Error generating backstory:",
        error.response?.data || error.message
      );

      // Handle specific error codes
      if (error.response?.status === 429) {
        // Example: handle rate limiting
        console.error("Rate limit exceeded. Please try again later.");
      }

      throw error; // Rethrow or handle further
    } else {
      // Handle unexpected errors (non-Axios)
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};
