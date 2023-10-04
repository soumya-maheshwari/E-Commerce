const Cart = require("../models/cartModel");
const { ErrorHandler } = require("../middlewares/ErrorHandler");
const mongoose = require("mongoose");
const Product = require("../models/productModel");

const addToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = user._id;

    console.log(user);
    if (!user) {
      return next(new ErrorHandler(400, "Login or signup to continue"));
    }

    const { productId } = req.body;

    const product = await Product.findOne({
      id: productId,
    });

    console.log(product._id);
    if (!product) {
      return next(new ErrorHandler(400, "Product not found"));
    }
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    // console.log(cart.items);
    // const cartItem = cart.items.find((item) => item.product === product._id);
    const cartItem = cart.items.find((item) =>
      item.product.equals(product._id)
    );

    console.log(cartItem);

    if (cartItem) {
      // Product already in cart, increase quantity
      cartItem.quantity++;
    } else {
      // Product not in cart, add it to the cart items array
      cart.items.push({ product: product._id, quantity: 1 });
    }
    await cart.save();
    return res.status(200).json({
      success: true,
      cart,
      msg: "Product added to cart",
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = user._id;

    console.log(user);
    if (!user) {
      return next(new ErrorHandler(400, "Login or signup to continue"));
    }

    const { productId } = req.body;

    const product = await Product.findOne({
      id: productId,
    });

    console.log(product._id);
    if (!product) {
      return next(new ErrorHandler(400, "Product not found"));
    }
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return next(new ErrorHandler(400, "Cart not found"));
    }

    // console.log(cart.items);
    // const cartItem = cart.items.find((item) => item.product === product._id);
    const cartItem = cart.items.find((item) =>
      item.product.equals(product._id)
    );

    console.log(cartItem);
    if (cartItem.quantity >= 1) {
      cartItem.quantity--;

      if (cartItem.quantity == 0) {
        cart.items = cart.items.filter((item) => item.product !== productId);
      }
    }
    await cart.save();
    return res.status(200).json({
      success: true,
      cart,
      msg: "Product removed from  cart",
    });
  } catch (error) {
    console.error(error);
    return next(error);
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
        total: 0,
        msg: "Cart is empty",
      });
    }

    const detailedCartItems = [];

    let total = 0;

    cart.items.forEach((item) => {
      const product = item.product;
      const itemTotal = product.price * item.quantity;

      // Add the detailed item information to the array
      detailedCartItems.push({
        product: {
          _id: product._id,
          name: product.productName,
          price: product.price,
        },
        quantity: item.quantity,
        itemTotal: itemTotal,
      });

      total += itemTotal;
    });

    return res.status(200).json({
      success: true,
      cart: cart.items,
      total: total,
      msg: "Products in the cart",
      detailedCartItems: detailedCartItems,
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
