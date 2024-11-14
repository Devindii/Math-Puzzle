import { StatusBar } from "expo-status-bar";
import { View, Image, ScrollView, Text, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import images from "../../constants/images";

//import { router } from "expo-router";


import BgHome from "../../components/BgHome";



const Home = () => {
  return (
    <SafeAreaView className="bg-purple h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }} >
        <View className="w-full flex justify-center items-center h-full px-4">



          <BgHome />

          <Button
            source={images.btnEasy}
            style={{
              position: "absolute",
              top: 300,
              left: 10,
              width: 350,
              height: 100,
            }}
          //onPress={() => router.push("/(game)/leader-board")}
          />

          <Button
            source={images.btnNormal}
            style={{
              position: "absolute",
              top: 420,
              left: 10,
              width: 365,
              height: 100,
            }}
          //onPress={() => router.push("/(game)/leader-board")}
          />

          <Button
            source={images.btnHard}
            style={{
              position: "absolute",
              top: 550,
              left: 10,
              width: 365,
              height: 100,
            }}
          //onPress={() => router.push("/(game)/leader-board")}
          />

        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Home;