import axios from "axios";

export const fetchClassList = async () => {
  try {
    const response = await axios.get("https://www.dnd5eapi.co/api/classes");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching class list ${error}`);
      throw error;
    } else {
      console.error(`Unexpected error: ${error}`);
      throw error;
    }
  }
};

export const fetchRaceList = async () => {
  try {
    const response = await axios.get("https://www.dnd5eapi.co/api/races");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching race list ${error}`);
      throw error;
    } else {
      console.error(`Unexpected error: ${error}`);
      throw error;
    }
  }
};

export const fetchMonsterList = async () => {
  try {
    const response = await axios.get("https://www.dnd5eapi.co/api/monsters");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching monster list ${error}`);
      throw error;
    } else {
      console.error(`Unexpected error: ${error}`);
      throw error;
    }
  }
};

export const fetchTraitsList = async () => {
  try {
    const response = await axios.get("https://www.dnd5eapi.co/api/traits");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching traits list ${error}`);
      throw error;
    } else {
      console.error(`Unexpected error: ${error}`);
      throw error;
    }
  }
};
