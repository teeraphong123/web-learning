const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json()); //รับ JSON

// Connection URL
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

// Database
let db;
// 🚀 START SERVER หลัง connect DB
async function startServer() {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("myApp"); // ใช้ DB เดียวกับที่คุณสร้าง

    app.listen(3000, () => {
        console.log("🚀 Server running on port 3000");
    });
}


startServer();
// ✅ GET: ดึงข้อมูล
app.get("/products",async (req, res) => {
    const data = await db.collection("products").find().toArray();
    res.send(data);
});
// ✅ POST: เพิ่มข้อมูล
app.post("/products", async (req, res) => {
    console.log(req.body);
    
    const data = req.body;
    const result = await db.collection("products").insertOne(data);

    res.send({
        message: "เพิ่มข้อมูลสำเร็จ",
        result: result
    });
});