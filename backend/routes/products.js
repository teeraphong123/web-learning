const express = require("express");
const router = express.Router();

module.exports = (db) => {
    router.get("/", async (req, res) =>{
        const data = await db.collection("products").find().toArray();
        res.json(data);
    })
    return router;
}