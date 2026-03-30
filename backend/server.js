const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const productRoutes = require("./routes/products");
app.use("/products", productRoutes(db));

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
    try{
        console.log(req.body);
        let {name, price} = req.body;

        // Validation
        if (!name || !price){
        return res.status(400).json({
            sucess: false,
            message: "กรุณากรอก name"
        });
        }

        // Check ข้อมูลของราคาต้องเป็นตัวเลข
        if(typeof price !== "number"){
            return res.status(400).json({
                sucess: false,
                message: "price ต้องเป็นตัวเลข"
            });
        }
        const result = await db.collection("products").insertOne({
            name,
            price
        });

        res.json({
            sucess: true,
            message: "เพิ่มข้อมูลสำเร็จ",
            result
        });
    } catch (err){
        res.status(500).json({
            sucess: false,
            message: "เกิดข้อผิดพลาด",
            error: err.message
        });
    }
});

// UPDATE ( PUT )
const { ObjectId} = require("mongodb");
const { Suspense } = require("react");
app.put('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {name, price} = req.body;

        // check id
        if (!ObjectId.isValid(id)){
            return res.status(400).json({
                sucess: false,
                message: "ID ไม่ถูกต้อง"
            });
        }
        // Validate

        if(!name || !price){
            return res.status(400).json({
                sucess: false,
                message: "กรุณากรอก name และ price"
            });
        }
        // Check DataType Price
        if (typeof price !== "number"){
            return res.status(400).json({
                sucess: false,
                message: "price ต้องเป็นตัวเลข"
            });
        }
        const result = await db.collection("products").updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, price} }
        );
        // Check ว่ามีข้อมูลไหม
        if (result.matchedCount === 0) {
            return res.status(404).json({ 
                sucess: false,
                message: "Product not found" 
            });
        }
        res.json({
            sucess: true,
            message: "อัปเดตสำเร็จ",
            result: result
        });

    } catch (error) {
        res.status(500).json({ 
            sucess: false,
            error: error.message 
        });
    }
});
// DELETE

app.delete('/products/:id', async (req, res) => {
    try{
        const id = req.params.id;

        // Check id
        if(!ObjectId.isValid(id)){
            return res.status(400).json({
                sucess: false,
                message: "ID ไม่ถูกต้อง"
            });
        }

        const result = await db.collection("products").deleteOne({
            _id: new ObjectId(id)
        });
        // Check ว่าลบได้ไหม
        if(result.deleteCount === 0){
            return res.status(404).json({
                sucess: false, 
                message: "ไม่พบข้อมูล"
            });
        }

        res.json({
            sucess: true,
            message: "ลบสำเร็จ",
            result
        });
    }catch(err){
        res.status(500).json({ 
            sucess: false,
            message: "Error",
            error: error.message
        });
    }
});