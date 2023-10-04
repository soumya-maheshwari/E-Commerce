const Product = require("../models/productModel");
const { ErrorHandler } = require("../middlewares/ErrorHandler");

const searchProduct = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return next(new ErrorHandler(404, "Enter something to search"));
    }
    const products = await Product.find({
      productName: { $regex: query, $options: "i" },
    });
    console.log(products);

    if (!products) {
      return next(new ErrorHandler(404, "No product found"));
    }

    return res.status(200).json({
      success: true,
      products,
      msg: "search success",
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  searchProduct,
};
