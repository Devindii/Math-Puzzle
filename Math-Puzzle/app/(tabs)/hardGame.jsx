import { View, ScrollView, SafeAreaView, Image, Text, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import icons from "../../constants/icons";
import Menu from "../../components/menu";
import NumberButton from "../../components/NumberButton";
import { useRouter } from "expo-router"; // Correct import
import BgHard from "../../components/BgHard";

const HardGame = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [questionImage, setQuestionImage] = useState(null);
    const [answer, setAnswer] = useState("");
    const [timeLeft, setTimeLeft] = useState(120);
    const [score, setScore] = useState(0);
    const [chances, setChances] = useState(1); // Initialize chances
    const [imagePosition, setImagePosition] = useState({
        top: 230,
        left: 18,
        width: 360,
        height: 400,
    });
    const [scoreChange, setScoreChange] = useState(null); // Track score changes

    const router = useRouter(); // Ensure router is initialized correctly

    const toggleMenu = () => setMenuVisible(!menuVisible);

    // Fetch question and answer from API
    const fetchNewQuestion = async () => {
        try {
            const response = await fetch("http://marcconrad.com/uob/banana/api.php?out=json");
            const data = await response.json();
            setQuestionImage(data.question);
            setAnswer(data.solution.toString()); // Ensure answer is a string
        } catch (error) {
            console.error("Error fetching question:", error);
        }
    };

    useEffect(() => {
        fetchNewQuestion();
    }, []);

    // Countdown timer logic
    useEffect(() => {
        if (timeLeft === 0 || chances === 0) {
            Alert.alert(
                "Game Over",
                `Your final score is: ${score}`,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            router.replace("/home"); // Corrected navigation call
                        },
                    },
                ]
            );
            return;
        }
        const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, chances]);

    const handleNumberPress = (num) => {
        if (num.toString() === answer) {
            setScore((prev) => prev + 15); // Increase score by 15 for correct answer
            setScoreChange({ value: "+15", color: "yellow" }); // Set positive change
            fetchNewQuestion(); // Load a new question
        } else {
            setScore((prev) => Math.max(0, prev - 15)); // Decrease score by 15 but ensure it doesn’t go below 0
            setChances((prev) => prev - 1); // Reduce one chance for wrong answer
            setScoreChange({ value: "-15", color: "red" }); // Negative change
        }

        // Reset scoreChange after 5 seconds
        setTimeout(() => setScoreChange(null), 1000);
    };

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")} min`;
    };

    return (
        <SafeAreaView className="bg-purple h-full">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="w-full flex justify-center items-center h-full px-4" style={{ position: "relative" }}>
                    <BgHard />

                    {/* Display countdown timer */}
                    <Text
                        style={{
                            color: timeLeft <= 20 ? "red" : "white", // Change color to red when timeLeft <= 20
                            fontSize: 24,
                            position: "absolute",
                            top: 177,
                            left: 115,
                        }}
                    >
                        {formatTime(timeLeft)}
                    </Text>

                    {/* Display current score */}
                    <Text style={{ color: "white", fontSize: 27, position: "absolute", top: 177, right: 70 }}>
                        {score}
                    </Text>

                    {/* Display score change */}
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

                    {/* Display remaining chances */}
                    <Text style={{ color: "white", fontSize: 28, position: "absolute", top: 85, right: 60 }}>
                        {chances}
                    </Text>

                    {/* Display the question image */}
                    {questionImage ? (
                        <Image
                            source={{ uri: questionImage }}
                            style={{
                                position: "absolute",
                                top: imagePosition.top,
                                left: imagePosition.left,
                                width: imagePosition.width,
                                height: imagePosition.height,
                            }}
                            resizeMode="contain"
                        />
                    ) : (
                        <Text style={{ color: "white", marginBottom: 20 }}>Loading Question...</Text>
                    )}

                    {/* Numeric Buttons (0-9) */}
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
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HardGame;
