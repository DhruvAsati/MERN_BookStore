const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://img.freepik.com/free-photo/artist-white_1368-3546.jpg?t=st=1734523824~exp=1734527424~hmac=7a4d337d5604bd728cb119c851e814da23695779101841f0bba482f3230313e3&w=740",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  favourites: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Book",
    },
  ],
  cart: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Book",
    },
  ],
  orders: [
    {
      type: mongoose.Types.ObjectId,
      ref: "order",
    },
  ],
}, {timestamps: true});

module.exports = mongoose.model("user",user)
