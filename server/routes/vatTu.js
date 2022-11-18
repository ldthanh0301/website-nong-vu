const argon2 = require('argon2')
const express = require('express')
const verifyToken = require('../middlewave/auth')
const router = express.Router()
const con = require('../models/db')
var multer = require("multer");
const VatTu = require('../models/VatTu')
var upload = multer({ dest: "uploads/" });

router.get("/", function(req,res) {
    if (req.query.mslvt){
        VatTu.getByMslvt(req.query.mslvt, function(err, result){
            if(err){
                res.json(err);
            } else {
                res.json({ success: true, products: result });
            }
        })
    } else {
        VatTu.getAll(function(err,result){
            if(err){
                res.json(err);
            } else {
                res.json({ success: true, products: result });
            }
        })
    }
})
router.get("/:id", function(req,res) {
    var vatTuId = req.params.id;
    VatTu.getById(vatTuId,function(err,result){
        if(err){
            res.json(err);
        } else {
            res.json({success: true, product:result[0]});
        }

    })
})
router.post("/", verifyToken, upload.single("maHinh"),function(req, res){
    var vatTu = req.body;
    VatTu.insert(vatTu, function (error, result){
        if (error) {
            console.log("Lỗi vật tư route: ", error)
            res.status(400).json({success:false, message:'Lỗi khi thêm vật tư'});
        } else {
            VatTu.getAll(function(err,result){
                if (err) {
                    console.log(err)
                }else {
                    res.status(200).json({success:true, message:'Thêm vật tư thành công', products: result});
                }
            })
        }
    })
})

router.delete("/:id", verifyToken, function(req, res){
    let msvt = req.params.id;
    VatTu.deleteById(msvt, function (err,result){
        if (err) {
            console.log(err)
            res.status(400).json({success: false, message: "Lỗi khi xóa"})
        }else {
            res.json({success: true, message: "Xóa thành công"})
        }
    })
})
module.exports = router
