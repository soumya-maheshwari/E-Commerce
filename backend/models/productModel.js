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
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
