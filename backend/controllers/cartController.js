const Cart = require("../models/cartModel");
const { ErrorHandler } = require("../middlewares/ErrorHandler");

const addToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = user._id;

    if (!user) {
      return next(new ErrorHandler(400, "Login or signup to continue"));
    }

    const productId = req.params.product;

    if (!productId) {
      return next(new ErrorHandler(400, "No product found"));
    }
    console.log(productId, "p");

    let cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    // Check if the product is already in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product && item.product.toString() === productId
    );

    if (existingItemIndex !== -1) {
      // Increment the quantity if the product is already in the cart
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // Add the product to the cart with a quantity of 1
      cart.items.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    return res.status(200).json({
      success: true,
      cart,
      msg: "Product added to cart",
    });
  } catch (error) {
    console.error(error);
    return next(error); // Pass the error to the error handling middleware
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = user._id;

    if (!user) {
      return next(new ErrorHandler(400, "Login or signup to continue"));
    }

    const productId = req.params.product;

    if (!productId) {
      return next(new ErrorHandler(400, "No product ID found"));
    }

    let cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return next(new ErrorHandler(404, "Cart not found"));
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product && item.product.toString() === productId
    );

    if (itemIndex !== -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();

      return res.status(200).json({
        success: true,
        cart,
        msg: "Product removed from cart",
      });
    } else {
      return next(new ErrorHandler(404, "Product not found in cart"));
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = user._id;

    if (!user) {
      return next(new ErrorHandler(400, "Login or signup to continue"));
    }

    const cart = await Cart.findOne({
      user: userId,
    }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: [],
        msg: "Cart is empty",
      });
    }

    return res.status(200).json({
      success: true,
      cart: cart.items,
      msg: "Products in the cart",
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getAllProducts,
};
