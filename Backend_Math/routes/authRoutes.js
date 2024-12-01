const express = require("express");
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

const { 
    registerUser, loginUser, getUserProfile, getRankings, 
    deleteUser, getLeaderboard, updateHighScore
} = require("../controllers/authController");


// Register and Login routes
router.post("/sign-up", registerUser);
router.post("/sign-in", loginUser);
router.get("/profile", verifyToken, getUserProfile);

// Route to fetch all users and their high scores, sorted by high score
router.get('/rankings', getRankings);

// Protect the route with JWT authentication
router.delete('/delete', verifyToken, deleteUser);

router.get("/leaderboard", getLeaderboard);

// Route to update the high score
router.post("/update-high-score", updateHighScore);


module.exports = router;
