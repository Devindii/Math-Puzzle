import { Image, Dimensions } from "react-native";
import images from "../constants/images";


const BgLeader = () => (
  <Image
    source={images.LeaderBoard}
    style={{
      width: 430,
      height: 900,
      marginTop: 0,
      maxWidth: 550,
    }}
    resizeMode="contain"
  />
);

export default BgLeader;