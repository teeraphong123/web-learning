const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

module.exports = (db) => {
    // REGISTER
    router.post("/register", async (req, res) => {
        try{
            const {username, password} = req.body;

            //1. Validate
            if (!username || !password){
                return res.status(400).json({
                    success: false,
                    message: "กรอกข้อมูลไม่ครบ"
                })
            }

            // 2. เช็ค User ซ้ำ
            const existingUser = await db.collection("users").findOne({username});
            if (existingUser){
                return res.status(400).json({
                    success: false,
                    message: "username นี้มีอยู่แล้ว"
                });
            }

            //3. hash password เข้ารหัส password
            const hashPassword = await bcrypt.hash(password,10);

            //4. Save ลง Database
            await db.collection("users").insertOne({
                username,
                password: hashPassword,
            });

            res.json({
                success: true,
                message: "สมัครสมาชิกเสร็จสิ้น"
            });

        }catch(error){
            return res.status(500).json({
            success: false,
            message: "เกิดข้อผิดพลาด",
            error: error.message
            });
            
        }
    });
    // LOGIN 
    router.post("/login", async (req, res) =>{
        try{
            const { username, password} = req.body;

            //1. หา User
            const user = await db.collection("users").findOne({ username});
            if (!user){
                return res.status(400).json({
                    success: false,
                    message: "ไม่พบ User"
                });
            }

            //2. เช็ค password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch){
                return res.status(400).json({
                    success: false,
                    message: "password ไม่ถูกต้อง"
                });
            }

            //3. สร้าง token
            const token = jwt.sign(
                { userId: user._id},
                "mysecretkey", // เปลี่ยนเป็น env ในอนาคต
                { expiresIn: "1d"}
            );

            res.json({
                success: true,
                message: "Login สำเร็จ",
                token,
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "เกิดข้อผิดพลาด",
                error: error.message
            });
        }
    });

    return router;
};