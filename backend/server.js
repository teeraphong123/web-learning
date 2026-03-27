const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json()); //รับ JSON

// test route
app.get("/",(req, res) => {
    res.send("Sever ทำงานแล้ว");
});

app.listen(3000,() => {
    console.log("Sever running on port 3000");
});

app.get("/posts", (req, res) => {
    res.json([
        { id: 1, title: "Post 1"},
        { id: 2, title: "Post 2"}
    ]);
});
app.get("/posts", (req, res) => {
    const data = req.body;
    console.log(data);

    res.json({
        message: "เพิ่มข้อมูลสำเร็จ",
        data: data
    });
});
