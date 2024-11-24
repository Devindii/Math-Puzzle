import { View, ScrollView, SafeAreaView, Image, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import icons from "../../constants/icons";
import BgEasy from "../../components/BgEasy";
import Menu from "../../components/menu";

const EasyGame = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [questionImage, setQuestionImage] = useState(null); // Holds the question image from API
  const [isGameOver, setIsGameOver] = useState(false);
  const [triggerMessage, setTriggerMessage] = useState(""); // Holds the trigger message for modal
  const [answer, setAnswer] = useState(""); // Holds the answer from API
  const [timer, setTimer] = useState(30); // Timer starts at 30 seconds
  const [score, setScore] = useState(0); // Initial score
  const [lives, setLives] = useState(3); // Player starts with 3 lives
  const [feedbackStatus, setFeedbackStatus] = useState(null); // Feedback status for correct/wrong answer
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    const [imagePosition, setImagePosition] = useState({
      top: 230,
      left: 50,
      width: 300,
      height: 250,
    });
  
  };

  // Fetch question and answer from API
  const fetchNewQuestion = async () => {
    try {
      const response = await fetch("http://marcconrad.com/uob/banana/api.php?out=json");
      const data = await response.json();
      setQuestionImage(data.question); // Set question image
      setAnswer(data.solution); // Store the answer (can be used for logic later)
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  useEffect(() => {
    fetchNewQuestion(); // Fetch question when component mounts
  }, []);

  return (
    <SafeAreaView className="bg-purple h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          <BgEasy />

          {/* Display the question image */}
          {questionImage ? (
            <Image
              source={{ uri: questionImage }}
              style={{
                width: 200, // Adjust the size as needed
                height: 200,
                marginBottom: 20,
              }}
              resizeMode="contain"
            />
          ) : (
            <Text style={{ color: "white", marginBottom: 20 }}>Loading Question...</Text>
          )}

          {/* Menu Button */}
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

          {/* Fetch New Question Button */}
          <Button
            source={icons.refresh} // Assuming you have a refresh icon
            style={{
              width: 80,
              height: 80,
              marginTop: 20,
            }}
            onPress={fetchNewQuestion}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EasyGame;
