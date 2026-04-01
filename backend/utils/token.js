const jwt = require("jsonwebtoken");


const ACCESS_SECRET = "access_secret";
const REFRESH_SECRET = "refresh_secret";

function generateAccessToken(user){
    return jwt.sign(
        { 
            userId: user._id,
            role: user.role},
            ACCESS_SECRET,
            {expiresIn: "15m"}
    );
}

function generateRefreshToken(user){
    return jwt.sign(
        { userId: user._id},
        REFRESH_SECRET,
        { expiresIn: "7d"}
    );
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    ACCESS_SECRET,
    REFRESH_SECRET
};