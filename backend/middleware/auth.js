const jwt = require("jsonwebtoken");
const { ACCESS_SECRET } = require("../utils/token");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log("HEADER:",authHeader);

    if (!authHeader){
        return res.sendStatus(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN:", token); // 👈 ดูตรงนี้
    try{
        const decoded = jwt.verify(token, ACCESS_SECRET);
        console.log("DECODED:", decoded); // 👈 ดูตรงนี้
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };
        next();
    }catch (error){
        console.log("JWT ERROR:", error.message); // 👈 เพิ่มบรรทัดนี้
        return res.sendStatus(403).json({ message: "Invalid token" });
    }
}

module.exports = authMiddleware;