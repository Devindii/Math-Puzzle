import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, StyleSheet, Alert } from "react-native";
import Button from "../../components/Button";
import icons from "../../constants/icons";
import BgLeader from "../../components/BgLeader";
import Menu from "../../components/menu";
import images from "../../constants/images";

const baseUrl = "http://192.168.8.104:5000/profilePic";

const Leaderboard = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://192.168.8.104:5000/api/auth/leaderboard");
        const players = await response.json();

        const formattedData = players.map((player, index) => ({
          rank: index + 1,
          player: {
            image: {
              uri: player.profileImage
                ? `${baseUrl}/${player.profileImage}`
                : `${baseUrl}/profile.png`,
            },
            name: player.username,
          },
          score: player.highScore,
        }));

        setLeaderboardData(formattedData);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to fetch leaderboard data.");
      }
    };

    fetchLeaderboard();
  }, []);

  // Top 3 players
  const topPlayers = leaderboardData.slice(0, 3);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View style={styles.centeredContainer}>
          <BgLeader />

          {/* 1st Place */}
          <Image
            source={topPlayers[0]?.player.image || images.profile1}
            style={styles.topPlayerImage(150, 190)}
          />

          {/* 2nd Place */}
          <Image
            source={topPlayers[1]?.player.image || images.profile1}
            style={styles.topPlayerImage(270, 290)}
          />

          {/* 3rd Place */}
          <Image
            source={topPlayers[2]?.player.image || images.profile1}
            style={styles.topPlayerImage(20, 290, true)}
          />

          {/* Menu Button */}
          <Button
            source={icons.menu}
            style={styles.menuButton}
            onPress={toggleMenu}
          />

          {/* Scrollable Leaderboard Table */}
          <View style={styles.leaderboardContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {leaderboardData.map((player, index) => (
                <View style={styles.playerCard} key={player.rank}>
                  {/* Rank */}
                  <View style={styles.rankCircle}>
                    <Text style={styles.rankText}>{player.rank}</Text>
                  </View>

                  {/* Profile Image */}
                  <Image
                    source={player.player.image}
                    style={styles.profileImage}
                    defaultSource={images.profile} // Default profile image
                  />

                  {/* Name and Score */}
                  <View style={styles.detailsContainer}>
                    <Text style={styles.playerName}>{player.player.name}</Text>
                    <Text style={styles.playerScore}>{player.score}</Text>
                  </View>

                  {/* Medal (if applicable for top 3) */}
                  {player.rank === 1 && <Image source={images.Medal1} style={styles.medalIcon} />}
                  {player.rank === 2 && <Image source={images.Medal2} style={styles.medalIcon} />}
                  {player.rank === 3 && <Image source={images.Medal3} style={styles.medalIcon} />}
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
  topPlayerImage: (left, top, right = false) => ({
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white",
    position: "absolute",
    top,
    left,
    right: right ? 20 : undefined,
  }),
  menuButton: {
    position: "absolute",
    top: 50,
    left: 10,
    width: 60,
    height: 60,
  },
  leaderboardContainer: {
    position: "absolute",
    width: "85%",
    height: "40%",  // Adjust the height
    top: 480,  // Move it further down
    left: 30,  // Move it a little from the left
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
