const user = require("../models/user");
const books = require("../models/books");

const addToCart = async(req, res)=>{
    try {
        const {bookid, id} = req.headers
        const userData = await user.findById(id)
        const isAddedToCart = userData.cart.includes(bookid)
        if(isAddedToCart){
            return res.status(200).send({
                success: false,
                message: "book is already in the cart"
            })
        }
        await user.findByIdAndUpdate(id, {$push: {cart: bookid}})

        return res.status(200).send({
            success: true,
            message: 'Book added to the cart'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal error',
            error: error.message
        })
    }
}


const removeCart = async(req, res)=>{
    try {
        const {bookid} = req.params
        const {id} = req.headers
        const userData = await user.findById(id)
        const isAddedToCart = userData.cart.includes(bookid)
        if(isAddedToCart){
             await user.findByIdAndUpdate(id, {$pull: {cart: bookid}})
        }
      

        return res.status(200).send({
            success: true,
            message: 'Book removed from cart'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal error',
            error: error.message
        })
    }
}

const getUserCart = async(req, res)=>{
    try {
        const {id} = req.headers
        const userData = await user.findById(id).populate('cart')
        const cart = userData.cart.reverse()
        
        return res.status(200).send({
            success: true,
            message: cart
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal error',
            error: error.message
        })
    }
}
module.exports = {addToCart, removeCart, getUserCart}