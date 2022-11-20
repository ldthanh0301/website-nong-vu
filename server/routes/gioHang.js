const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewave/auth')

const GioHang = require('../models/GioHang')
const { route } = require('./auth')

// them chi tiết giỏ hàng
router.post("/",verifyToken, (req, res)=> {
    let msnd = req.body.msnd;
    let msgh = req.body.msghg;
    GioHang.addChiTietGioHang(req.body, function(err, result) {
        if (err ){
            console.log("error", err)
            res.status(400).json({success:false, message:"Lỗi khi them giỏ hàng"})
        } else{
            GioHang.getAll(msnd,function(err,result){
                if(!err){
                    res.json({success:true, cart:{products:result, msnd,msgh}})
                }
            })
        }
    })
})
//tìm giỏ hàng bằng msnd
router.get("/:msnd", verifyToken, (req, res)=> {
    let msnd = req.params.msnd;
    GioHang.findByMsnd(msnd, function(err, result){
        if (err ){
            console.log(" Lỗi khi lấy giỏ hàng" )
        } else if (result.length ==0){
            GioHang.create(msnd, function(err, result){
                if (!err){
                    res.json({success:true, cart:[],msnd, msgh: result.insertId})
                }
            })
        }
        else {
            let msgh = result[0].msgh;
            GioHang.getAll(msnd,function(err,result){
                if(!err){
                    res.json({success:true, cart:{products:result, msnd,msgh}})
                }
            })
        }
    })
})
// xóa sản phẩm trong giỏ hàng
router.delete("/chitietgiohang/:msctgh", verifyToken, (req, res) => {
    const msctgh = req.params.msctgh;
    GioHang.deleteProductInCart(msctgh, (err,result) => {
        if (!err){
            res.json({success:true, message:"xóa thành công"})
        }
    })
})
// xóa tất cả sản phẩm trong giỏ hàng
router.delete("/:msgh", verifyToken, (req, res)=> {
    const msgh = req.params.msgh;
    GioHang.deleteAllCTGH(msgh, (err,result) => {
        if (!err){
            res.json({success:true, message:"xóa thành công", cart:{products:[],msgh}})
        }
    })
})

module.exports = router