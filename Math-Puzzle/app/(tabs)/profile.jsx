import { View, ScrollView, SafeAreaView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from "../../components/Button";
import icons from "../../constants/icons";
import images from "../../constants/images";
import BgProfile from "../../components/BgProfile";
import Menu from "../../components/menu";
import ProfileImage from "../../components/ProfileImage";
import Name from "../../components/Name";
import Rank from "../../components/Rank";
import BestScore from "../../components/BestScore";
import Level from "../../components/ProfileLevel";
import { router } from "expo-router";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [username, setUsername] = useState(null);
  const [highScore, setBestScore] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [userRank, setUserRank] = useState(null);


  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {

    const fetchProfileData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedHighScore = await AsyncStorage.getItem("highScore");
        const storedProfileImage = await AsyncStorage.getItem("profileImage");

        // Update state variables
        setUsername(storedUsername || ""); // Default to an empty string if null
        setBestScore(storedHighScore ? parseInt(storedHighScore, 10) : 0);
        setProfileImage(storedProfileImage || "profile.png"); // Default image if null
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData(); // Fetch profile data after login confirmation

  });

  useEffect(() => {
    // Only fetch rank if username is set
    if (username) {
      const fetchUserRank = async () => {
        try {
          const response = await axios.get('http://192.168.8.104:5000/api/auth/rankings');
          const users = response.data;

          // Sort users by high score (descending)
          users.sort((a, b) => b.highScore - a.highScore);

          // Find the user's rank based on their username
          const rank = users.findIndex(user => user.username === username) + 1;
          setUserRank(rank); // Update userRank state here

          // Save the rank to AsyncStorage
          await AsyncStorage.setItem("userRank", String(rank)); // Storing rank as string
        } catch (error) {
          console.error("Error fetching rankings:", error);
        }
      };

      fetchUserRank(); // Fetch rank once username is set
    }
  }, [username]); // This effect runs only when username changes


  return (
    <SafeAreaView className="bg-purple h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          <BgProfile />

          <ProfileImage profileImage={profileImage} setProfileImage={setProfileImage} />

          {/* Pass the userRank state to the Rank component */}
          <Rank rank={userRank} />
          <BestScore bestScore={highScore} />
          <Name name={username} />
          <Level bestScore={highScore} />


          <Button
            source={icons.menu}
            style={{
              position: "absolute",
              top: 60,
              left: 20,
              width: 60,
              height: 60,
            }}
            onPress={toggleMenu}
          />

          <Button
            source={images.BtnDelete}
            style={{
              position: "absolute",
              top: 690,
              left: 20,
              width: 160,
              height: 65,
            }}
            onPress={async () => {
              try {
                const token = await AsyncStorage.getItem("jwtToken"); // Retrieve JWT from AsyncStorage
                console.log("Token retrieved:", token);

                // Make DELETE request to the backend to delete the user
                const response = await axios.delete('http://192.168.8.104:5000/api/auth/delete', {
                  headers: {
                    Authorization: `Bearer ${token}`, // Send JWT in Authorization header
                  }
                });

                if (response.status === 200) {
                  console.log("User deleted successfully");
                  AsyncStorage.clear(); // Clear all stored data on delete
                  Alert.alert("Success", "User deleted successfully!", [
                    {
                      text: "OK",
                      onPress: () => router.push("/(auth)/sign-in"), // Redirect to sign-in page
                    },
                  ]);
                } else {
                  console.error("Error deleting account:", response.data);
                }
              } catch (error) {
                console.error("Error:", error);
              }
            }}

          />

          <Button
            source={images.BtnSignOut}
            style={{
              position: "absolute",
              top: 690,
              left: 210,
              width: 160,
              height: 65,
            }}
            onPress={() => {
              AsyncStorage.clear(); // Clear all stored data on sign-out
              router.push("/(auth)/sign-in");
            }}

          />

          {menuVisible && <Menu onClose={toggleMenu} />}


        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

export default Profile