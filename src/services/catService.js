import axios from "axios";

const API_URL = "https://data.latelier.co/cats.json";

export const fetchCats = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.images;
  } catch (error) {
    console.error("Erreur lors de la récupération des chats:", error);
    throw error;
  }
};
