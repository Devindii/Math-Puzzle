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
        style={{ position: "absolute", top: 150, left: 100 }}
      >
        <Image source={images.BtnHome} style={{ width: 150, height: 50 }} />
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity
        onPress={() => {
          router.push("/profile");
          onClose();
        }}
        style={{ position: "absolute", top: 220, left: 100 }}
      >
        <Image source={images.BtnProfile} style={{ width: 150, height: 50 }} />
      </TouchableOpacity>

      {/* Achievements Button */}
      <TouchableOpacity
        onPress={() => {
          router.push("/achievements");
          onClose();
        }}
        style={{ position: "absolute", top: 290, left: 100 }}
      >
        <Image source={images.BtnAchievements} style={{ width: 150, height: 50 }} />
      </TouchableOpacity>

      {/* Instructions Button */}
      <TouchableOpacity
        onPress={() => {
          router.push("/instructions");
          onClose();
        }}
        style={{ position: "absolute", top: 360, left: 100 }}
      >
        <Image source={images.BtnInstructions} style={{ width: 150, height: 50 }} />
      </TouchableOpacity>

      {/* Exit Button */}
      <TouchableOpacity
        //onPress={onClose}
        style={{ position: "absolute", top: 430, left: 100 }}
      >
        <Image source={images.BtnExit} style={{ width: 150, height: 50 }} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Menu;
