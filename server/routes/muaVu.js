const argon2 = require('argon2')
const express = require('express')
const router = express.Router()
const MuaVu = require('../models/MuaVu')

router.get("/", function(req,res) {
    MuaVu.getAll(function(err,result){
        if(err){
            res.json(err);
        } else {
            res.json({ success: true, muavu: result });
        }

    })
})

router.get("/:id", function(req,res) {
    var muaVuId = req.params.id;
    MuaVu.getById(muaVuId,function(err,result){
        if(err){
            res.json(err);
        } else {
            res.json(result[0]);
        }

    })
})

router.post("/", function (req, res) {
    var {tenMuaVu,nam} = req.body;
    MuaVu.add({tenMuaVu,nam}, function(err, result){
        console.log("result :", result)
        if (err) {
            res.json(err)
        } else {
            res.json({success: true, message:"Thêm mùa vụ thành công", insertId: result.insertId})
        }
    }) 
})

router.put("/:id", function (req, res) {
    var category= req.body;
    MuaVu.updateById(category, function(err, result){
        if (err) {
            res.json(err)
        } else {
            res.json({success: true, message:"Cập nhật thanh cong", category})
        }
    }) 
})

router.delete('/:id', function (req, res) {
    var mslvt = req.params.id;
    MuaVu.deleteById(mslvt, function(err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json({success: true, message:"Xóa thành công"})
        }
    })
})
module.exports = router
