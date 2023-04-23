const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewave/auth')

const DonHang = require('../models/DonHang')
const MuaVu = require('../models/MuaVu')

router.post("/",verifyToken, (req, res)=> {
    let donhang = req.body;
    MuaVu.getCurrentMuaVu(function(err, result){
        donhang = {...donhang, msmv:result[0].msmv};
        DonHang.create(donhang, function (err, result){
            if (!err) {
                let msdh = result.insertId;
                donhang.products.map(vattu => {
                    DonHang.insertToCTDH({msdh,...vattu}) 
                })
                res.status(200).json({success:true, message:"Đặt hàng thành công"})
            } else {
                console.log(err)
            }
        })
    })
   
})

router.get("/", verifyToken, (req, res) => {
    DonHang.getAll(function (err, result) {
        if (!err) {
            res.status(200).json({success:true, message:"Thành công", orders: result})
        }
    })
})
// đơn hàng user
router.get("/user/:msnd", verifyToken, (req, res) => {
    let msnd  = req.params.msnd
    if (req.query.status) 
    {   
        let status = req.query.status;
        DonHang.getByUserAndStatus({msnd,status},function (err, result) {
            if (!err) {
                res.status(200).json({success:true, message:"Thành công", orders: result})
            }
        })
        return
    } 
    if (req.query.mslvt) {
        let mslvt = req.query.mslvt;
        let msmv = req.query.msmv;
        if (msmv === 'all' && mslvt ==='all') {
            DonHang.getByUserAndMSLVTAll({msnd},function (err, result) {
                if (!err) {
                    res.status(200).json({success:true, message:"Thành công", orders: result})
                }
            })
            return;
        }
        if (mslvt ==='all' ) {
            DonHang.getByUserAndMsmvAndMSLVTAll({msmv,msnd},function (err, result) {
                if (!err) {
                    res.status(200).json({success:true, message:"Thành công", orders: result})
                }
            })
            return;
        }
        if (msmv ==='all') {
            DonHang.getByUserAndMSLVT({msnd,mslvt},function (err, result) {
                if (!err) {
                    res.status(200).json({success:true, message:"Thành công", orders: result})
                }
            })
            return
        }
        DonHang.getByUserAndMSLVTAndMsmv({mslvt,msmv,msnd},function (err, result) {
            if (!err) {
                res.status(200).json({success:true, message:"Thành công", orders: result})
            }
        })
        return
    } else
    {
        DonHang.getByUser(msnd,function (err, result) {
            if (!err) {
                res.status(200).json({success:true, message:"Thành công", orders: result})
            }
        })
    }
})
router.get("/chitietdonhang/:msdh", verifyToken, (req, res) => {
    let msdh  = req.params.msdh
    DonHang.chiTietDonHang(msdh,function (err, result) {
        if (!err) {
            res.status(200).json({success:true, message:"Thành công", chiTietDonHang: result})
        }
    })
})
router.get("/donhangnguoidungtheothang/", verifyToken, (req, res) => {
    DonHang.getOrderByUserWithMonth(function (err, result) {
        if (!err) {
            res.status(200).json({success:true, message:"Thành công", orders: result})
        }
    })
})
router.get("/:status", verifyToken, (req, res) => {
    let status  = req.params.status
    DonHang.getByStatus(status,function (err, result) {
        if (!err) {
            res.status(200).json({success:true, message:"Thành công", orders: result})
        }
    })
})
// Thay đổi trang tháy đơn hàng
router.patch('/',verifyToken, (req, res) => {
    console.log("body : ", req.body)
    DonHang.updateState(req.body, function(err, result) {
        if (!err) {
            res.json({success: true, message: "Thay đổi trạng thái thành công"})
        }else {
            console.log(err)
        }
    })
})
module.exports = router