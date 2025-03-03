const express = require("express");
const user = require("../models/user");
const {authenticateToken} = require('./userAuth');
const { addToCart, removeCart, getUserCart } = require("../controllers/cartController");
const router = express.Router()



//add book to cart
router.put('/add-to-cart', authenticateToken, addToCart)

//remove from cart

router.put('/remove-from-cart/:bookid', authenticateToken, removeCart)

//get user cart
router.get('/get-user-cart', authenticateToken, getUserCart)

module.exports = router
