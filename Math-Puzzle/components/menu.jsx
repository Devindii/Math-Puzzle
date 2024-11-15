import React from "react";
import { View, Image, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import images from "../constants/images"; // Ensure images are correctly imported from constants

const Menu = ({ onClose }) => {
  const router = useRouter();

  return (
    <ImageBackground
      source={images.MenuScreen}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      resizeMode="cover"
      className="absolute top-0 left-0 right-0 bottom-0"
    >
      {/* Home Button */}
      <TouchableOpacity
        onPress={() => {
          router.push("/home");
          onClose();
        }}
        style={{ position: "absolute", top: 200, left: 50 }}
      >
        <Image source={images.BtnHome} style={{ width: 300, height: 75 }} />
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity
        onPress={() => {
          router.push("/profile");
          onClose();
        }}
        style={{ position: "absolute", top: 300, left: 50 }}
      >
        <Image source={images.BtnProfile} style={{ width: 300, height: 75 }} />
      </TouchableOpacity>

      {/* Achievements Button */}
      <TouchableOpacity
        onPress={() => {
          router.push("/achievements");
          onClose();
        }}
        style={{ position: "absolute", top: 400, left: 50 }}
      >
        <Image source={images.BtnAchivements} style={{ width: 300, height: 75 }} />
      </TouchableOpacity>

      {/* Instructions Button */}
      <TouchableOpacity
        onPress={() => {
          router.push("/instructions");
          onClose();
        }}
        style={{ position: "absolute", top: 500, left: 50 }}
      >
        <Image source={images.BtnInstructions} style={{ width: 300, height: 75 }} />
      </TouchableOpacity>

      {/* LeaderBoard Button */}
      <TouchableOpacity
        onPress={() => {
          router.push("/leaderboard");
          onClose();
        }}
        style={{ position: "absolute", top: 600, left: 50 }}
      >
        <Image source={images.BtnLeader} style={{ width: 300, height: 75 }} />
      </TouchableOpacity>

      {/* Exit Button */}
      <TouchableOpacity
        onPress={onClose} // Hides the menu when pressed
        style={{ position: "absolute", top: 700, left: 50}}
      >
        <Image source={images.BtnExit} style={{ width: 300, height: 75 }} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Menu;
