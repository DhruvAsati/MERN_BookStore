const user = require("../models/user");
const Book = require('../models/books')
const Order = require('../models/order');


const placedOrder = async(req, res)=>{
    try {
        const {id} = req.headers
        const {order} = req.body

        for(const orderdata of order){
            const newOrder = new Order({user: id, book: orderdata._id })
            const orderDataFromDb = await newOrder.save()
            //saving user data in order model

            await user.findByIdAndUpdate(id,{$push: {orders : orderDataFromDb._id}})

            //clearing user cart

            await user.findByIdAndUpdate(id,{$pull: {cart : orderdata._id}})
        }

        return res.status(200).send({
            success : true,
            message: 'Order placed successfully!'
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'internal error',
            error : error.message
        })
    }
}

const getOrderHistory = async(req, res)=>{
    try {
        const {id} = req.headers
        const userData = await user.findById(id).populate({
            path: "orders",
            populate: {path: "book"}

        })

        const orderData = userData.orders.reverse();
        return res.status(200).send({
            success: true,
            data: orderData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'internal error',
            error : error.message
        })
    }
}
//admin history

const getAllOrder = async(req, res)=>{
    try {
        const userData = await Order.find().populate({
            path: 'book'
        })
        .populate({
            path: 'user'
        })
        .sort({createdAt: -1})
        return res.status(200).send({
            success: true,
            data: userData
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'internal occurred',
            error: error.message
        })
    }
}
const updateOrderStatus = async(req, res)=>{
    try {
        const {id} = req.params
        await Order.findByIdAndUpdate(id, {status: req.body.status});
        return res.status(200).send({
            success: true,
            message: 'Status updated successfully!'
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'internal occurred',
            error: error.message
        })
    }
}

module.exports = {placedOrder, getOrderHistory, getAllOrder, updateOrderStatus}