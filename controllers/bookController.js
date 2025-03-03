const user = require("../models/user");
const books = require("../models/books");

const addBookController = async (req, res) => {
  try {
    const { id } = req.headers;

    // Verify user
    const userId = await user.findById(id);
    if (!userId || userId.role !== "admin") {
      return res.status(403).send({
        success: false,
        message: "You do not have access to perform this task",
      });
    }

    // Create a new book

    const book = new books({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      language: req.body.language,
    });

    // Save the book to the database
    await book.save();

    res.status(200).send({
      success: true,
      message: "Book added successfully!",
    });
  } catch (error) {
    console.error("Error in addBookController:", error.message);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//update book

const updateBook = async (req, res) => {
  try {
    const { bookid } = req.headers;
    await books.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      language: req.body.language,
    });

    res.status(200).send({
      success: true,
      message: "Book updated successfully!",
    });
  } catch (error) {
    console.error("Error in addBookController:", error.message);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



//delete book

const DeleteBook = async (req, res) => {
  try {
    const { bookid } = req.headers;
    await books.findByIdAndDelete(bookid);

    res.status(200).send({
      success: true,
      message: "Book deleted successfully!",
    });
  } catch (error) {
    console.error("Error in addBookController:", error.message);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



// Public API

//get all books
const getAllBooks = async(req, res)=>{
  try{
    const book = await books.find().sort({createdAt : -1});
    return res.status(200).send({
      success: true,
      data: book
    })
  }catch(error){
    console.error("Error in addBookController:", error.message);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
  })
  }
}

//recent books with limit 4
const getRecentBooks = async(req, res)=>{
  try{
    const book = await books.find().sort({createdAt : -1}).limit(4);
    return res.status(200).send({
      success: true,
      data: book
    })
  }catch(error){
    console.error("Error in addBookController:", error.message);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
  })
  }
}

//get book by id

const getBookById = async(req, res)=>{
  try {
    const {id} = req.params;
    const book = await books.findById(id);
    return res.status(200).send({
      success: true,
      data: book
    })
  } catch (error) {
    console.error("Error in addBookController:", error.message);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
  })
  }
}



//Favourite book

const addFavouriteBook = async(req, res)=>{
  try {
    const {bookid , id} = req.headers
    const userData = await user.findById(id)
    const isAddedToFav = userData.favourites.includes(bookid)
        if(isAddedToFav){
            return res.status(200).send({
                success: false,
                message: "book is already in the favorites list"
            })
        }
    await user.findByIdAndUpdate(id,{$push: {favourites: bookid}});
    return res.status(200).send({
      success: true,
      message: 'Book is added in favourites'
    })
  } catch (error) {
    console.error("Error in addBookController:", error.message);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
  })
  }
}


const removeFavouriteBook = async(req, res)=>{
  try {
    const {bookid , id} = req.headers
    const userdata = await user.findById(id)
    const isBookFavourite = userdata.favourites.includes(bookid)
    if(isBookFavourite){
      await user.findByIdAndUpdate(id,{$pull: {favourites: bookid}});
    }
    
    return res.status(200).send({
      success: true,
      message: 'Book removed from favourites'
    })
  } catch (error) {
    console.error("Error in addBookController:", error.message);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
  })
  }
}

const getFavouriteBook = async(req, res)=>{
  try {
    const {id} = req.headers;
    const userData = await user.findById(id).populate('favourites');
    const favouriteBook = userData.favourites;
    return res.json({
      status: 'Success',
      data: favouriteBook
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error occurred at the time of fetching favourite book'
    })
  }
}

module.exports = { addBookController, updateBook, DeleteBook, getAllBooks, getRecentBooks,getBookById, addFavouriteBook, removeFavouriteBook, getFavouriteBook};
