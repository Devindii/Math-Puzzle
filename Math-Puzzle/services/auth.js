import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.8.104:5000/api/auth";


export const signUp = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/sign-up`, {
      username,
      email,
      password,
    });
    if (response.data.token) {
      console.log("Sign-up successful, token stored.");
    }
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

    if (response.data.token) {
      const { username, highScore, profileImage } = response.data.user;

      // Store the values in AsyncStorage
      await AsyncStorage.setItem("jwtToken", response.data.token);
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("highScore", highScore.toString()); // Convert number to string
      await AsyncStorage.setItem("profileImage", profileImage);

      console.log("Sign-in successful, token and profile data stored.");
      console.log("API Response:", response.data);
    }

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred during sign-in.";
    throw new Error(errorMessage);
  }
};
export const getProfile = async () => {
  const token = await AsyncStorage.getItem("jwtToken");
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return user profile data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};

export const checkUserLoggedIn = async () => {
  try {
    const token = await AsyncStorage.getItem("jwtToken"); // Retrieve the JWT token
    return token !== null; // Return true if token exists, false otherwise
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
};
