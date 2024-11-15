import { Image, Dimensions } from "react-native";
import images from "../constants/images";


const BgInstructions = () => (
  <Image
    source={images.Instruction}
    style={{
      width: 380,
      height: 900,
      marginTop: 0,
      maxWidth: 550,
    }}
    resizeMode="contain"
  />
);

export default BgInstructions;