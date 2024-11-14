import { Image, Dimensions } from "react-native";
import images from "../constants/images";


const BgHome = () => (
  <Image
    source={images.BgHome}
    style={{
      width: 430,
      height: 900,
      marginTop: 0,
      maxWidth: 550,
    }}
    resizeMode="contain"
  />
);

export default BgHome;