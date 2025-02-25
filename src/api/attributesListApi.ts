import axios from "axios";

export const fetchClassList = async () => {
  try {
    const response = await axios.get("https://www.dnd5eapi.co/api/classes");
    return response.data;
  } catch (error) {
    const e = error as Error;
    if (axios.isAxiosError(e)) {
      console.error(`Error fetching class list ${e}`);
      throw e;
    } else {
      console.error(`Unexpected error: ${e}`);
      throw e;
    }
  }
};

export const fetchRaceList = async () => {
  try {
    const response = await axios.get("https://www.dnd5eapi.co/api/races");
    return response.data;
  } catch (error) {
    const e = error as Error;
    if (axios.isAxiosError(e)) {
      console.error(`Error fetching race list ${e}`);
      throw e;
    } else {
      console.error(`Unexpected error: ${e}`);
      throw e;
    }
  }
};

export const fetchMonsterList = async () => {
  try {
    const response = await axios.get("https://www.dnd5eapi.co/api/monsters");
    return response.data;
  } catch (error) {
    const e = error as Error;
    if (axios.isAxiosError(e)) {
      console.error(`Error fetching monster list ${e}`);
      throw e;
    } else {
      console.error(`Unexpected error: ${e}`);
      throw e;
    }
  }
};

export const fetchTraitsList = async () => {
  try {
    const response = await axios.get("https://www.dnd5eapi.co/api/traits");
    return response.data;
  } catch (error) {
    const e = error as Error;
    if (axios.isAxiosError(e)) {
      console.error(`Error fetching traits list ${e}`);
      throw e;
    } else {
      console.error(`Unexpected error: ${e}`);
      throw e;
    }
  }
};
