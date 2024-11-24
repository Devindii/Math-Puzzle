import React, { useState } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, StyleSheet } from "react-native";
import Button from "../../components/Button";
import icons from "../../constants/icons";
import BgLeader from "../../components/BgLeader";
import Menu from "../../components/menu";
import images from "../../constants/images";

const Leaderboard = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Sample data for leaderboard
  const leaderboardData = [
    { rank: 1, name: "Davis Curtis", score: "10", image: images.profile1, medal: images.Medal1 },
    { rank: 2, name: "Emily Brown", score: "15", image: images.profile1, medal: images.Medal2 },
    { rank: 3, name: "Chris Taylor", score: "20", image: images.profile1, medal: images.Medal3 },
    { rank: 4, name: "Anna Smith", score: "25", image: images.profile1 },
    { rank: 5, name: "John Doe", score: "30", image: images.profile1 },
    { rank: 6, name: "Devii", score: "100", image: images.profile1 },
    // Add more players as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View style={styles.centeredContainer}>
          <BgLeader />

          {/* 1st Place */}
          <Image
            source={images.profile1}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: "white",
              position: "absolute",
              top: 190,
              left: 150,
            }}
          />

          {/* 2nd Place */}
          <Image
            source={images.profile1}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: "white",
              position: "absolute",
              top: 290,
              left: 20,
            }}
          />

          {/* 3rd Place */}
          <Image
            source={images.profile1}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: "white",
              position: "absolute",
              top: 290,
              right: 20,
            }}
          />

          {/* Menu Button */}
          <Button
            source={icons.menu}
            style={{
              position: "absolute",
              top: 50,
              left: 10,
              width: 60,
              height: 60,
            }}
            onPress={toggleMenu}
          />

          {/* Scrollable Leaderboard */}
          <View style={[styles.leaderboardContainer, { top: 460, left: 30 }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {leaderboardData.map((player, index) => (
                <View style={styles.playerCard} key={player.rank}>
                  {/* Rank */}
                  <View style={styles.rankCircle}>
                    <Text style={styles.rankText}>{player.rank}</Text>
                  </View>

                  {/* Profile Image */}
                  <Image
                    source={player.image}
                    style={styles.profileImage}
                    defaultSource={images.profile} // Default profile image
                  />

                  {/* Name and Score */}
                  <View style={styles.detailsContainer}>
                    <Text style={styles.playerName}>{player.name}</Text>
                    <Text style={styles.playerScore}>{player.score}</Text>
                  </View>

                  {/* Medal (if applicable for top 3) */}
                  {player.rank <= 3 && <Image source={player.medal} style={styles.medalIcon} />}
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Full-Screen Menu Overlay */}
          {menuVisible && (
            <View style={styles.menuOverlay}>
              <Menu onClose={toggleMenu} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#8b5cf6", // Purple background
  },
  leaderboardContainer: {
    position: "absolute",
    width: "85%",
    height: "35%",
    borderRadius: 15,
    shadowOpacity: 0.1,
    shadowRadius: 2,
   
  },
  scrollContent: {},
  playerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // White background for each card
    borderRadius: 15, // Corner curve
    padding: 10,
    marginBottom: 8,
    
  },
  rankCircle: {
    width: 40,
    height: 40,
    borderRadius: 20, // Circle
    backgroundColor: "#F1C40F", // Yellow for rank circle
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  rankText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF", // White text inside the circle
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circle profile picture
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  playerScore: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  medalIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    zIndex: 10, // Ensure it appears above everything
  },
});

export default Leaderboard;
