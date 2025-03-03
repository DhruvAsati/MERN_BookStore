const express = require('express');
const color = require('colors');
const cors = require('cors');
const dotenv = require('dotenv');
const user = require('./routes/userRoutes.js');
const Books = require('./routes/booksRoutes.js');
const Favourite = require('./routes/favourite.js');
const Cart = require('./routes/cart.js');
const OrderRoutes = require('./routes/orderRoutes.js'); // Assuming you have an orderRoutes.js file
require('./connection/connection.js');

dotenv.config();

const app = express();
const Port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// Home route
app.get('/', (req, res) => {
    res.status(200).send({
        success: true,
        message: "Server running at port " + Port
    });
});

// User routes
app.use('/api/v1', user);

// Books routes
app.use('/api/v1', Books);

// Favourite routes
app.use('/api/v1', Favourite);

// Cart routes
app.use('/api/v1', Cart);

// Order routes
app.use('/api/v1', OrderRoutes); // Use the order routes here

// Listening to port
app.listen(Port, () => {
    console.log(`Server running at port ${Port}`.white.bgYellow.bold);
});