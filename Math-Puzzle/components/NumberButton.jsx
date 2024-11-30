import React from "react";
import { TouchableOpacity, Image } from "react-native";
import images from "../constants/images"; // Import the image collection

const NumberButton = ({ value, onPress, position }) => (
  <TouchableOpacity
    onPress={() => onPress(value)} // Pass the value when button is clicked
    style={{
      position: "absolute",
      ...position, // Custom position for each button
    }}
  >
    <Image
      source={images[`No${value}`]} // Correctly access the button image using template literals
      style={{
        width: 55, // Adjust as needed
        height: 55, // Adjust as needed
      }}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

export default NumberButton;
