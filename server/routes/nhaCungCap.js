const express = require('express')
const router = express.Router()

const NhaCungCap = require('../models/NhaCungCap')

// @route GET api/nhacungcap
// @desc GET nhacungcap
// @access private

router.get('/', async(req, res) => {
    NhaCungCap.getAll(function(err,result){
        if(err){
            res.json({success:false,message:err});
        } else {
            res.json({ success: true, distributorList: result });
        }

    })
})

// @route POST api/nhacungcap
// @desc Create nhacungcap
// @access private

router.post('/', async(req, res) => {
    const {
        tenNCC,
        diaChi,
        soDienThoai,
    } = req.body
        //simple validation
    if (!tenNCC || !diaChi || !soDienThoai)
        return res.status(400).json({
            success: false,
            message: 'Thiếu một trong số các trường dữ liệu!!'
        })
    try {
            NhaCungCap.add({tenNCC, diaChi, soDienThoai,}, function(err, result){
                if (err) {
                    res.json({success:false,message: err})
                } else {
                    res.json({success: true, message:"Thêm nhà cung cấp thành công", insertId: result.insertId})
                }
            }) 
    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})
// @route GET api/nhacungcap/:id
// @desc GET detail nhacungcap
// @access private
router.get("/:id", function(req,res) {
    var msncc = req.params.id;
    NhaCungCap.getById(msncc,function(err,result){
        if(err){
            res.json({success:false,message:err});
        } else {
            res.json({success:true ,distributor:result[0]});
        }

    })
})
// @route DELETE api/nhacungcap/:id
// @desc DELETE nhacungcap
// @access private
router.delete('/:id', function (req, res) {
    var msncc = req.params.id;
    NhaCungCap.deleteById(msncc, function(err, result) {
        if (err) {
            res.json({success:false,message:err});
        } else {
            res.json({success: true, message:"Xóa thành công"})
        }
    })
})

// @route PUT api/nhacungcap
// @desc Create nhacungcap
// @access private

router.put('/:id', async(req, res) => {
    var msncc = req.params.id;

    const {
        tenNCC,
        diaChi,
        soDienThoai
    } = req.body

 
        //simple validation
    if (!msncc || !tenNCC || !diaChi || !soDienThoai)
        return res.status(400).json({
            success: false,
            message: 'Thiếu một trong số các trường dữ liệu!!'
        })
    try {
            NhaCungCap.updateById({tenNCC, diaChi, soDienThoai,msncc}, function(err, result){
                if (err) {
                    res.json({success:false,message: err})
                } else {
                    res.json({success: true, message:"Cập nhật nhà cung cấp thành công", insertId: result.insertId})
                }
            }) 
    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

module.exports = router
