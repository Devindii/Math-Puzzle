import React from "react";
import { View, Text, Image } from "react-native";

// Level images
const levelImages = {
  level1: require("../assets/images/level1.png"),
  level2: require("../assets/images/level2.png"),
  level3: require("../assets/images/level3.png"),
  level4: require("../assets/images/level4.png"),
  level5: require("../assets/images/level5.png"),
  level6: require("../assets/images/level6.png"),
};


const ProfileLevel = ({ bestScore }) => {
  // Debugging log to ensure bestScore is passed correctly
  console.log("Best Score:", bestScore);

  // Function to determine level based on bestScore
  const getLevel = () => {
    
      const level = bestScore < 50
        ? "level1"
        : bestScore < 100
          ? "level2"
          : bestScore < 150
            ? "level3"
            : bestScore < 200
              ? "level4"
              : bestScore < 300
                ? "level5"
                : "level6";
      console.log("Level:", level); // Debugging log to check the level
      return level;
    

  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
    {/* Display the level image based on the bestScore */}
    {/* Profile Image */}
    <Image
        source={levelImages[getLevel()]} // Dynamically get the level image based on score
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          top: -400,
          left: 0,
        }}
      />
  </View>
  );
};

export default ProfileLevel;