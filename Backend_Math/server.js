const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path');
const cors = require("cors");

dotenv.config()
const authRoutes = require("./routes/authRoutes");
// const workoutRoutes = require('./routes/workouts')

const app = express()
app.use(cors({
  methods: "GET, POST",
}))
app.use(express.json())


// Serve static files from the profilePic directory
app.use('/profilePic', express.static(path.join(__dirname, 'profilePic')));
//routes
app.use("/api/auth", authRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error)
  })