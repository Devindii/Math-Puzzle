import React from "react";
import { Text } from "react-native";

const Rank = ({ rank }) => {
  return (
    <Text
      className="text-white font-pbold text-4xl absolute"
      style={{
        top: 330,
        left: 70,
        width: 100,
        textAlign: "center",
        transform: [{ translateX: -25 }],
      }}
    >
      {rank}
    </Text>
  );
};

export default Rank;