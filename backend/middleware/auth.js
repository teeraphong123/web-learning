const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader){
            return res.status(401).json({
                success: false,
                message: "ไม่มี token"
            });
        }

        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, "mysecretkey");

        req.user = decode; //{ userId: ...}

        next();
        
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "token ไม่ถูกต้อง",
            error: error.message
        });
    }
}