import { StatusBar } from "expo-status-bar";
import { View, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import Button from "../../components/Button";
import images from "../../constants/images";
import icons from "../../constants/icons";
import BgHome from "../../components/BgHome";
import Menu from "../../components/menu";
import {router} from "expo-router";

const Home = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView className="bg-purple h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          <BgHome />

          <Button
            source={images.btnEasy}
            style={{
              position: "absolute",
              top: 300,
              left: 50,
              width: 285,
              height: 90,
            }}
            onPress={()=> router.push("/easyGame")}
          />

          <Button
            source={images.btnNormal}
            style={{
              position: "absolute",
              top: 420,
              left: 50,
              width: 285,
              height: 90,
            }}
          />

          <Button
            source={images.btnHard}
            style={{
              position: "absolute",
              top: 540,
              left: 50,
              width: 285,
              height: 90,
            }}
          />

          <Button
            source={icons.menu}
            style={{
              position: "absolute",
              top: 60,
              left: 20,
              width: 60,
              height: 60,
            }}
            onPress={toggleMenu}
          />

<Button
            source={icons.BackButton}
            style={{
              position: "absolute",
              top: 60,
              left: 20,
              width: 60,
              height: 60,
            }}
            onPress={toggleMenu}
          />

          {menuVisible && <Menu onClose={toggleMenu} />}
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Home;
