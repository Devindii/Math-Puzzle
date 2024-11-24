const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const cors = require("cors");

dotenv.config()
const authRoutes = require("./routes/authRoutes");
// const workoutRoutes = require('./routes/workouts')

const app = express()
app.use(cors())
app.use(express.json())


//routes
app.use("/api/auth", authRoutes);
// app.use('/api/workouts', workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log("Database linked successfully & server is live on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error)
  })