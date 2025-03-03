const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authenticateToken = (req, res, next) =>{

    const authHeader  = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null){
        return res.status(403).send({
            success : false,
            message: 'Authentication token required'
        })
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
        if(err){
            return res.status(403).send({
                success: false,
                message: 'error occured due to token expired please login again!',
                err
            })
        }
        req.user = user
        next()
    })
};

module.exports = {authenticateToken}