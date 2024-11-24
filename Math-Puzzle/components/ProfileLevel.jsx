import { Image } from "react-native";

const ProfileLevel = ({ profileLevel }) => {
  return (
    <>
      {/* Profile Image */}
      <Image
        source={profileLevel}
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          top: -400,
          left: 0,
        }}
      />
      
    </>
  );
};

export default ProfileLevel;