const express = require("express");
const router = express.Router();
const { cartController } = require("../controllers");
const { authVerifyToken } = require("../middlewares/authVerifyToken");

router.post("/add", authVerifyToken, cartController.addToCart);
router.post("/remove", authVerifyToken, cartController.removeFromCart);
router.get("/all", authVerifyToken, cartController.getAllProducts);

module.exports = router;
