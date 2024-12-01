const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Email already in use" });
  }

  try {
    // Hash password
    const hashedPassword = password;
    
    console.log("Registration Logs:");
    console.log("Password Entered:", password);
    // Save user to database
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({
      message: "User Logged in succesfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        highScore: user.highScore,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch rankings (all users sorted by highScore)
const getRankings = async (req, res) => {
  try {
    const users = await User.find().sort({ highScore: -1 }); // Sort users by highScore descending
    res.json(users); // Send users as response
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rankings', error: err });
  }
};

// Delete user account
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.user; // User ID from the JWT token

    // Find the user by their ID and delete them
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getLeaderboard = async (req, res) => {
  try {
    // Fetch players sorted by highScore in descending order
    const players = await User.find().sort({ highScore: -1 });

    res.status(200).json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch leaderboard data." });
  }
};

// Function to update high score
const updateHighScore = async (req, res) => {
  const { score } = req.body; // Score from the game
  const token = req.header("Authorization").replace("Bearer ", ""); // Get JWT token from Authorization header

  if (!score) {
    return res.status(400).json({ message: "Score is required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    const userId = decoded.userId;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the new score is greater than the current high score
    if (score > user.highScore) {
      // Update high score
      user.highScore = score;
      await user.save();

      return res.status(200).json({ message: "High score updated", highScore: score });
    } else {
      return res.status(200).json({ message: "Score is not higher than the current high score", highScore: user.highScore });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { 
  registerUser, loginUser, getUserProfile, 
  getRankings, deleteUser , 
  getLeaderboard, updateHighScore
};
