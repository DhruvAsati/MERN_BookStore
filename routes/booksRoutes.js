const express = require("express");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../routes/userAuth");
const { addBookController, updateBook, DeleteBook, getAllBooks, getRecentBooks, getBookById } = require("../controllers/bookController.js");
const router = express.Router();

//add book --admin

router.post("/add-book", authenticateToken, addBookController);

//update-book

router.put("/update-book", authenticateToken, updateBook)

//delete book
router.delete("/delete-book", authenticateToken, DeleteBook)

//get all books
router.get('/get-all-books', getAllBooks)

//get recent books
router.get('/get-recent-books', getRecentBooks)

//get book by id

router.get('/get-book-by-id/:id', getBookById)

module.exports = router;
