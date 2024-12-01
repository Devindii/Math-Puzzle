import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import  images  from "../constants/images";
import  CustomButton  from "../components/CustomButton";
// import { useGlobalContext } from "../context/GlobalProvider";
const Index = () => {
  // const { loading, isLogged } = useGlobalContext();

  // if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-purple h-full">
      {/* <Loader isLoading={loading} /> */}

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.LogoNew}
            className="w-[1000px] h-[220px]"
            resizeMode="contain"
          />

        
          <View className="relative mt-5">
            <Text className="text-2xl mt-10 mb-5 text-white font-pregular text-center">
            Welcome to the Math Mind Lab {"\n"}
            Ready to solve some puzzles?{" "}
        
            </Text>
          </View>

          <CustomButton
            title="Get Start!"
            handlePress={() => router.push("/(auth)/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="purple" style="light" />
    </SafeAreaView>
  )
}

export default Index;