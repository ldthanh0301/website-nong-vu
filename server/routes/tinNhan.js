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