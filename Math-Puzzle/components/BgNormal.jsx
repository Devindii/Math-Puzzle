import { Image, Dimensions } from "react-native";
import images from "../constants/images";


const BgNormal = () => (
  <Image
    source={images.Normal}
    style={{
      width: 380,
      height: 900,
      marginTop: 0,
      maxWidth: 550,
    }}
    resizeMode="contain"
  />
);

export default BgNormal;