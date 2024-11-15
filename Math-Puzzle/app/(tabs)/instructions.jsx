import { View, ScrollView, SafeAreaView } from "react-native";
import React from 'react'
import Button from "../../components/Button";
import { useState } from "react";
import icons from "../../constants/icons";
import BgInstructions from "../../components/BgInstructions";
import Menu from "../../components/menu";


const Instructions = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <SafeAreaView className="bg-purple h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          <BgInstructions />

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

          {menuVisible && <Menu onClose={toggleMenu} />}


        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

export default Instructions