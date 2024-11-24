import React from "react";
import { Text } from "react-native";

const BestScore = ({ score }) => {
  return (
    <Text
      className="text-white font-pbold text-4xl absolute"
      style={{
        top: 330,
        left: 265,
        width: 100,
        textAlign: "center",
        transform: [{ translateX: -25 }],
      }}
    >
      {score}
    </Text>
  );
};

export default BestScore;