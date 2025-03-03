const express = require("express");
const user = require("../models/user");
const {authenticateToken} = require('./userAuth');
const { addFavouriteBook, removeFavouriteBook, getFavouriteBook } = require("../controllers/bookController");

const router = express.Router()

router.put('/add-book-to-favourite', authenticateToken, addFavouriteBook)

router.put('/remove-book-from-favourite', authenticateToken, removeFavouriteBook)

router.get('/get-book-from-favourite', authenticateToken, getFavouriteBook)

module.exports = router