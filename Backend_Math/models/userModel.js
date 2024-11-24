const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pre-save hook to hash password before saving to the database
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();  // Only hash if the password was modified
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);  // Pass the error to the next middleware
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
