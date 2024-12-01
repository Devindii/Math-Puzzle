import React from "react";
import { Text } from "react-native";

const Name = ({ name }) => {
  return (
    <Text
      className="text-white font-pbold text-3xl absolute"
      style={{
        top: 280,
        left: 70,
        width: 300,
        textAlign: "center",
        transform: [{ translateX: -25 }],
      }}
    >
      {name}
    </Text>
  );
};

export default Name;