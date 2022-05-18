const mongoose = require("mongoose");

const userScehema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Is Required"],
  },

  age: {
    type: Number,
    required: [true, "Age Is Required"],
  },

  address: {
    type: String,
    required: [true, "Address Is Required"],
  },
});

const User = mongoose.model("User", userScehema);

module.exports = User;
