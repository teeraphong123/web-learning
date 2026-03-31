const express = require("express");

module.exports = (db) => {
    const router = express.Router();
    router.get("/", async (req, res) =>{
    try{
        const data = await db.collection("products").find().toArray();
        res.json(data); 
    }catch(error){
        res.status(500).json({
            success: false,
            message: "เกิดข้อผิดพลาด",
            error: error.message
        });
    }
    });
    return router;
};