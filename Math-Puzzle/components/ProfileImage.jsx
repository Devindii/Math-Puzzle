import { Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import icons from "../constants/icons";

const ProfileImage = ({ profileImage, setProfileImage }) => {
  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access the camera roll is required!");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!pickerResult.canceled && pickerResult.assets?.[0]?.uri) {
        setProfileImage({ uri: pickerResult.assets[0].uri }); // Set new image
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  return (
    <>
      {/* Profile Image */}
      <Image
        source={{
          uri: profileImage?.uri || "http://192.168.8.104:5000/profilePic/profile.png", // Default fallback
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: "white",
          top: -625,
          left: 0,
        }}
      />

      {/* Plus Icon to pick image */}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          width: 30,
          height: 30,
          top: -650,
          left: 35,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={icons.plus}
          style={{
            width: 30,
            height: 30,
            borderRadius: 100,
          }}
        />
      </TouchableOpacity>
    </>
  );
};

export default ProfileImage;
