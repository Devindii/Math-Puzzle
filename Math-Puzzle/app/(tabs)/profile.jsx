import { View, ScrollView, SafeAreaView } from "react-native";
import React from 'react'
import Button from "../../components/Button";
import { useState } from "react";
import icons from "../../constants/icons";
import images from "../../constants/images";
import BgProfile from "../../components/BgProfile";
import Menu from "../../components/menu";
import ProfileImage from "../../components/ProfileImage";
import Name from "../../components/Name";
import Rank from "../../components/Rank";
import BestScore from "../../components/BestScore";
import ProfileLevel from "../../components/ProfileLevel";


const Profile = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(images.profile1);
  const defaultName = "Devii";
  const defaultRank = 1;
  const defaultScore = 100;
  const defaultImage = images.level1;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <SafeAreaView className="bg-purple h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          <BgProfile />

          {/* Profile Image */}
          <ProfileImage profileImage={profileImage} setProfileImage={setProfileImage} />

          {/* Name Display */}
          <Name name={defaultName} />

          {/* Rank Display */}
          <Rank rank={defaultRank} />

          {/* Best Score Display */}
          <BestScore score={defaultScore} />

           {/* Levels Display */}
           <ProfileLevel profileLevel={defaultImage} />


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
            source={images.BtnDelete}
            style={{
              position: "absolute",
              top: 690,
              left: 20,
              width: 160,
              height: 65,
            }}
            onPress={() => router.push("/easyGame")}
          />

          <Button
            source={images.BtnSignOut}
            style={{
              position: "absolute",
              top: 690,
              left: 210,
              width: 160,
              height: 65,
            }}
            onPress={() => router.push("/easyGame")}
          />

          {menuVisible && <Menu onClose={toggleMenu} />}


        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

export default Profile