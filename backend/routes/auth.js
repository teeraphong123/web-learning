const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken} = require("../utils/token");
const { REFRESH_SECRET} = require("../utils/token");
const { ObjectId } = require("mongodb");

const router = express.Router();

module.exports = (db) => {
    // REGISTER
    router.post("/register", async (req, res) => {
        try{
            const {email, password} = req.body;

            //1. Validate
            if (!email || !password){
                return res.status(400).json({
                    success: false,
                    message: "กรอกข้อมูลไม่ครบ"
                })
            }

            // 2. เช็ค User ซ้ำ
            const existingUser = await db.collection("users").findOne({email});
            if (existingUser){
                return res.status(400).json({
                    success: false,
                    message: "email นี้มีอยู่แล้ว"
                });
            }

            //3. hash password เข้ารหัส password
            const hashPassword = await bcrypt.hash(password,10);

            //4. Save ลง Database
            await db.collection("users").insertOne({
                email,
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
            const { email, password} = req.body;

            //1. หา User
            const user = await db.collection("users").findOne({ email});
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

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            // 👉 เก็บ refresh token ใน DB
            await db.collection("users").updateOne(
                {_id: user._id},
                { $set: { refreshToken}}
            );

            //3. สร้าง token
            /* const token = jwt.sign(
                { userId: user._id},
                "mysecretkey", // เปลี่ยนเป็น env ในอนาคต
                { expiresIn: "1d"}
            ); */

            res.json({
                success: true,
                message: "Login สำเร็จ",
                accessToken,
                refreshToken
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "เกิดข้อผิดพลาด",
                error: error.message
            });
        }
    });
    // REFRESH
    router.post("/refresh", async (req, res) => {
        const { refreshToken} = req.body;

        // Validate Token
        if (!refreshToken){
            return res.status(401).json({
                success: false,
                message: "No Refresh Token"
            });
        
        }
        try{
            const decode = jwt.verify(refreshToken, REFRESH_SECRET);

            const user = await db.collection("users").findOne({
                _id: new ObjectId(decode.userId)
            });

            //เช็คว่า token ตรงกับ DB
            if (!user || user.refreshToken !== refreshToken){
                return res.status(403).json({
                    success: false,
                    message: "Token ไม่ถูกต้อง"
                });
            }

            const newAccessToken = generateAccessToken(user);

            res.json({
                success: true,
                accessToken: newAccessToken
            });

        }catch(error){
            console.log(error);
            return res.status(403).json({
                success: false,
                message: "Token หมดอายุ",
                error: error.message
            })
        }
    });
    //  LOGOUT
    router.post("/logout", async (req, res) => {
        const { userId} = req.body;

        await db.collection("users").updateOne(
            { _id: new ObjectId(userId)},
            { $unset: { refreshToken: ""}}
        );

        res.json({
            success: true,
            message: "Logged out"
        });
    });
    return router;
};