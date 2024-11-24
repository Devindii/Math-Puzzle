import axios from "axios";

const API_URL = "http://192.168.8.104:5000/api/auth";

export const signUp = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/sign-up`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "An error occurred. Please try again later.";
    throw new Error(errorMessage);
  }
};


export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/sign-in`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "An error occurred");
  }
};