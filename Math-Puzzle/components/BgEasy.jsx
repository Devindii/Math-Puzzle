import { Image, Dimensions } from "react-native";
import images from "../constants/images";


const BgEasy = () => (
  <Image
    source={images.Easy}
    style={{
      width: 380,
      height: 900,
      marginTop: 0,
      maxWidth: 550,
    }}
    resizeMode="contain"
  />
);

export default BgEasy;


