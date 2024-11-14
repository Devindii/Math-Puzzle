import { Image } from "react-native";
import images from "../constants/images";



const Bubble = () => {
  return (
    <Image
    source={images.bubble}
    style={{
      height: 555,
      width: "100%",
      marginToptop: 10,
      maxWidth: 550,
    }}
    resizeMode="contain"
  />
  )
};

export default Bubble;