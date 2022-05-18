const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  price: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
