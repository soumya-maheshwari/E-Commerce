const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
  },

  price: {
    type: String,
  },
  image: {
    type: String,
  },
  id: {
    tyoe: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
