const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewave/auth')

const DatHang = require('../models/DatHang')

router.post("/",verifyToken, (req, res)=> {
    let donhang = req.body;
    
    DatHang.create(donhang, function (err, result){
        if (!err) {
            let msdh = result.insertId;
            donhang.products.map(vattu => {
                DatHang.insertToCTDH({msdh,...vattu}) 
            })
            res.status(200).json({success:true, message:"Đặt hàng thành công"})
        } else {
            console.log(err)
        }
    })
})

router.get("/", verifyToken, (req, res) => {
    DatHang.getAll(function (err, result) {
        if (!err) {
            res.status(200).json({success:true, message:"Thành công", orders: result})
        }
    })
})

module.exports = router