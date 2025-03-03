const express = require("express");
const {authenticateToken} = require('./userAuth');
const { placedOrder, getOrderHistory, getAllOrder, updateOrderStatus } = require("../controllers/orderController");

const router = express.Router()

//place router

router.post('/place-order', authenticateToken, placedOrder)

//order history user
router.get('/user-order-history', authenticateToken, getOrderHistory)


//get-all-order --admin
router.get('/get-all-orders', authenticateToken, getAllOrder)

//update order --admin
 
router.put('/update-status/:id', authenticateToken, updateOrderStatus)



module.exports = router