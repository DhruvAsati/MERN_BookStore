const express = require("express");
const {userSignUPController, userLoginController, getUserInformation, updateAdress} = require("../controllers/userController");
const {authenticateToken} = require('../routes/userAuth')
const router = express.Router();


//signup
router.post("/signUp", userSignUPController);


//login
router.post("/login", userLoginController);


//userInformation get
router.get('/get-user-information', authenticateToken, getUserInformation )

//update
router.put('/update-address', authenticateToken, updateAdress)

module.exports = router
