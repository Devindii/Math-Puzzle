import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, Alert } from "react-native";
import Button from "../../components/Button";
import icons from "../../constants/icons";
import BgNormal from "../../components/BgNormal";
import Menu from "../../components/menu";
import NumberButton from "../../components/NumberButton";
import { useRouter } from "expo-router";
import images from "../../constants/images";
import AsyncStorage from '@react-native-async-storage/async-storage';

const NormalGame = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [questionImage, setQuestionImage] = useState(null);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [score, setScore] = useState(0);
  const [chances, setChances] = useState(3);
  const [hints, setHints] = useState(1); // State to track available hints
  const [timerPaused, setTimerPaused] = useState(false);
  const [scoreChange, setScoreChange] = useState(null); // Track score changes

  const router = useRouter();

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const fetchNewQuestion = async () => {
    try {
      const response = await fetch("http://marcconrad.com/uob/banana/api.php?out=json");
      const data = await response.json();
      setQuestionImage(data.question);
      setAnswer(data.solution.toString());
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  useEffect(() => {
    fetchNewQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft === 0 || chances === 0) {
        let message = "";
        if (timeLeft === 0 && chances === 0) {
            message = "Both time is up and your chances are over!";
        } else if (timeLeft === 0) {
            message = "Time is up!";
        } else if (chances === 0) {
            message = "Your chances are over!";
        }

        Alert.alert(
            "Game Over",
            `${message}\nYour final score is: ${score}`,
            [
                {
                    text: "OK",
                    onPress: () => router.replace("/home"),
                },
            ]
        );
        handleSaveHighScore();
        return;
    }

    if (!timerPaused) {
        const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
    }
}, [timeLeft, chances, timerPaused]);


  const handleNumberPress = (num) => {
    if (num.toString() === answer) {
      setScore((prev) => prev + 10);
      setScoreChange({ value: "+10", color: "yellow" }); // Set positive change
      fetchNewQuestion();
    } else {
      setScore((prev) => Math.max(0, prev - 10));
      setChances((prev) => prev - 1);
      setScoreChange({ value: "-10", color: "red" }); // Set negative change
    }

    // Reset scoreChange after 5 seconds
    setTimeout(() => setScoreChange(null), 1000);
  };

  const showHint = () => {
    if (hints > 0) {
      setTimerPaused(true);
      Alert.alert(
        "Hint",
        `The answer starts with: ${answer.charAt(0)}`,
        [
          {
            text: "OK",
            onPress: () => {
              setHints((prev) => prev - 1); // Decrease hints
              setTimerPaused(false);
            },
          },
        ]
      );
    } else {
      Alert.alert("No Hints Left", "You have used all your hints.");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")} min`;
  };

  // Function to save the high score and update the backend
  const handleSaveHighScore = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken'); // Retrieve JWT from AsyncStorage
      if (!token) {
        console.log("No token found, can't update high score.");
        return;
      }

      console.log("Sending high score update request...");
      const response = await fetch("http://192.168.8.104:5000/api/auth/update-high-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score: score }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("High score updated successfully:", data);
        // Update the local AsyncStorage high score
        await AsyncStorage.setItem('highScore', score.toString());
      } else {
        console.log("Failed to update high score:", data.message);
      }
    } catch (error) {
      console.error("Error updating high score:", error);
    }
  };
  
  return (
    <SafeAreaView className="bg-purple h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center h-full px-4" style={{ position: "relative" }}>
          <BgNormal />

          <Text
            style={{
              color: timeLeft <= 20 ? "red" : "white",
              fontSize: 24,
              position: "absolute",
              top: 177,
              left: 115,
            }}
          >
            {formatTime(timeLeft)}
          </Text>

          <Text style={{ color: "white", fontSize: 27, position: "absolute", top: 177, right: 70 }}>
            {score}
          </Text>

          {scoreChange && (
            <Text
              style={{
                color: scoreChange.color,
                fontSize: 40,
                position: "absolute",
                top: 130, // Position slightly below the score
                right: 85,
              }}
            >
              {scoreChange.value}
            </Text>
          )}

          <Text style={{ color: "white", fontSize: 28, position: "absolute", top: 85, right: 60 }}>
            {chances}
          </Text>

          {questionImage ? (
            <Image
              source={{ uri: questionImage }}
              style={{
                position: "absolute",
                top: 230,
                left: 18,
                width: 360,
                height: 400,
              }}
              resizeMode="contain"
            />
          ) : (
            <Text style={{ color: "white", marginBottom: 20 }}>Loading Question...</Text>
          )}

          {[...Array(10).keys()].map((num) => (
            <NumberButton
              key={num}
              value={num}
              onPress={handleNumberPress}
              position={{
                top: 575 + Math.floor(num / 5) * 85,
                left: 28 + (num % 5) * 70,
              }}
            />
          ))}

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

          <Text style={{ color: "white", fontSize: 24, position: "absolute", top: 760, right: 90 }}>
            Hints: {hints}
          </Text>

          <Button
            source={images.Hint}
            style={{
              position: "absolute",
              top: 730,
              right: 30,
              width: 60,
              height: 60,
            }}
            onPress={showHint}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NormalGame;
