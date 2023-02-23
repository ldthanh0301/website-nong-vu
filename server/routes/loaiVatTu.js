const argon2 = require('argon2')
const express = require('express')
const router = express.Router()
const LoaiVatTu = require('../models/LoaiVatTu')

router.get("/", function(req,res) {
    LoaiVatTu.getAll(function(err,result){
        if(err){
            res.json(err);
        } else {
            res.json({ success: true, categories: result });
        }

    })
})

router.get("/:id", function(req,res) {
    var vatTuId = req.params.id;
    LoaiVatTu.getById(vatTuId,function(err,result){
        if(err){
            res.json(err);
        } else {
            res.json(result[0]);
        }

    })
})

router.post("/", function (req, res) {
    var {tenLoaiVatTu} = req.body;
    LoaiVatTu.add(tenLoaiVatTu, function(err, result){
        if (err) {
            res.json(err)
        } else {
            res.json({success: true, message:"Them loai vat tu thanh cong", insertId: result.insertId})
        }
    }) 
})

router.put("/:id", function (req, res) {
    var category= req.body;
    LoaiVatTu.updateById(category, function(err, result){
        if (err) {
            res.json(err)
        } else {
            res.json({success: true, message:"Cập nhật thanh cong", category})
        }
    }) 
})

router.delete('/:id', function (req, res) {
    var mslvt = req.params.id;
    LoaiVatTu.deleteById(mslvt, function(err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json({success: true, message:"Xóa thành công"})
        }
    })
})
module.exports = router
