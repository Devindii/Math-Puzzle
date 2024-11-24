import { Image, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import icons from "../constants/icons";

const ProfileImage = ({ profileImage, setProfileImage }) => {
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setProfileImage({ uri: pickerResult.assets[0].uri });
    }
  };

  return (
    <>
      {/* Profile Image */}
      <Image
        source={profileImage}
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
      <TouchableOpacity onPress={pickImage} style={{
        width: 30,
        height: 30, 
        top: -650,
        left: 35,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Image
          source={icons.plus}
          style={{
            width: 30,
            height: 30,
            borderRadius:100,
          }}
        />
      </TouchableOpacity>
    </>
  );
};

export default ProfileImage;