import React from "react";
import { TouchableOpacity, Image } from "react-native";

const Button = ({ source, style, onPress }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Image source={source} style={{ width: style.width, height: style.height }} />
  </TouchableOpacity>
);

export default Button;