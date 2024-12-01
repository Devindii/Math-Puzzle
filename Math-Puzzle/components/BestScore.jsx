import React from "react";
import { Text } from "react-native";

const BestScore = ({ bestScore }) => {
  return (
    <Text
      className="text-white font-pbold text-4xl absolute"
      style={{
        top: 380,
        left: 265,
        width: 100,
        textAlign: "center",
        transform: [{ translateX: -25 }],
      }}
    >
      {bestScore}
    </Text>
  );
};

export default BestScore;