const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewave/auth')
const TinNhan= require("../models/TinNhan")
module.exports = router

//Lấy tin nhấn
// GET 
router.get("/",verifyToken, (req, res)=> {
    TinNhan.getAll((err, result)=> {
        if (err) {
            res.status(500).json({success:true, message:"Lỗi server"})
        } else [
            res.json({success:true, messages:result})
        ]
    })
})
//Lấy tin nhấn theo người gui
// GET 
router.get("/nguoigui/:nguoinhan",verifyToken, (req, res)=> {
    let nguoiGui = req.params.nguoinhan; // tài khoản user 
    TinNhan.getMessageUserAndAdmin(nguoiGui,(err, result)=> {
        if (err) {
            console.log("lỗi ")
            res.status(500).json({success:false, message:"Lỗi server"})
        } else [
            res.json({success:true, messages:result})
        ]
    })
})
//Lấy tin nhấn
// GET UserMessage
router.get("/danhsachuser",verifyToken, (req, res)=> {
    TinNhan.getUserMessage((err, result)=> {
        if (err) {
            res.status(500).json({success:true, message:"Lỗi server"})
        } else [
            res.json({success:true, users:result})
        ]
    })
})