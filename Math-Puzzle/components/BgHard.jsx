import { Image } from "react-native";
import images from "../constants/images";


const BgHard = () => (
  <Image
    source={images.Hard}
    style={{
      width: 380,
      height: 900,
      marginTop: 0,
      maxWidth: 550,
    }}
    resizeMode="contain"
  />
);

export default BgHard;


