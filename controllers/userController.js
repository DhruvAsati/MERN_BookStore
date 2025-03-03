const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config();

const userSignUPController = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    //check user Name length
    if (username.length < 4) {
      return res.status(404).send({
        success: false,
        message: "User Name should be greater than 3",
      });
    }

    //check if user already exist
    const existingUserName = await user.findOne({
      username: username,
    });
    if (existingUserName) {
      return res.status(400).send({
        success: false,
        message: "userName already exist..",
      });
    }

    //check if email already exist
    const existingUserEmail = await user.findOne({
      email: email,
    });
    if (existingUserEmail) {
      return res.status(400).send({
        success: false,
        message: "Email already exist..",
      });
    }

    //check password

    if (password.length <= 5) {
      return res.status(400).send({
        success: false,
        message: "Password lenght should be greater than 5",
      });
    }
    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new user({
      username: username,
      email: email,
      password: hashPass,
      address: address,
    });
    await newUser.save();
    res.status(200).send({
      success: true,
      message: "Registration successfully!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
    console.log(error);
  }
};

const userLoginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const existingUser = await user.findOne({ username });
    if (!existingUser) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const authClaims = {
      name: existingUser.username,
      role: existingUser.role,
    };

    const token = jwt.sign(authClaims, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    // Send response
    return res.status(200).json({
      success: true,
      id: existingUser._id,
      role: existingUser.role,
      token,
    });
  } catch (error) {
    // Handle server errors
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getUserInformation = async(req, res)=>{
  try {
    const {id} = req.headers
    const data = await user.findById(id).select('-password')
    return res.status(200).send({
      success: true,
      data
    })
  } catch (error) {
     // Handle server errors
     return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
   } )
  }
}

const updateAdress = async(req, res)=>{
  try {
    const {id} = req.headers
    const {address} = req.body
    await user.findByIdAndUpdate(id, {address})
    return res.status(200).send({
      success: true,
      message: 'Address updated Successfully!'
    })
  } catch (error) {
     // Handle server errors
     return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
   } )
  }
}


module.exports = { userSignUPController, userLoginController, getUserInformation, updateAdress };
