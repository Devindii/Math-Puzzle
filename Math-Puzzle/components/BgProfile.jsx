import { Image, Dimensions } from "react-native";
import images from "../constants/images";


const BgProfile = () => (
  <Image
    source={images.Profile}
    style={{
      width: 390,
      height: 900,
      marginTop: 0,
      maxWidth: 550,
    }}
    resizeMode="contain"
  />
);

export default BgProfile;