const mongoose = require("mongoose");

const userSchema = new Moongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    darkMode: { type: Boolean, default: false },
  },
  { timeStamps: true }
);

module.exports = moongose.model("User", userSchema);
