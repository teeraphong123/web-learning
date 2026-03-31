const jwt = require("jsonwebtoken");
const { ACCESS_SECRET } = require("../utils/token");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.sendStatus(401);
    }

    const token = authHeader.split(" ")[1];

    try{
        const decode = jwt.verify(token, ACCESS_SECRET);
        req.user = decode;
        next();
    }catch (error){
        console.log("JWT ERROR:", error.message); // 👈 เพิ่มบรรทัดนี้
        return res.sendStatus(403);
    }
}

module.exports = authMiddleware;