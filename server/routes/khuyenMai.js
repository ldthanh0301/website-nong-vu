const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewave/auth')

const KhuyenMai = require('../models/KhuyenMai')

// @route GET api/khuyenmai
// @desc GET khuyenmai
// @access private

router.get('/', verifyToken, async(req, res) => {
    KhuyenMai.getAll(function(err,result){
        if(err){
            res.json({success:false,message:err});
        } else {
            res.json({ success: true, discountList: result });
        }

    })
})

// @route POST api/khuyenmai
// @desc Create khuyenmai
// @access private

router.post('/', verifyToken, async(req, res) => {
    const {
        giaTriKM,
        tenKM,
        ngayBD,
        ngayKT
    } = req.body
        //simple validation
    if (!giaTriKM || !tenKM || !ngayBD || !ngayKT)
        return res.status(400).json({
            success: false,
            message: 'Thiếu một trong số các trường dữ liệu!!'
        })
    try {
            KhuyenMai.add({giaTriKM,tenKM,ngayBD,ngayKT}, function(err, result){
                if (err) {
                    res.json({success:false,message: err})
                } else {
                    res.json({success: true, message:"Thêm khuyến mãi thành công", insertId: result.insertId})
                }
            }) 
    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})
// @route GET api/khuyenmai/:id
// @desc GET detail khuyenmai
// @access private
router.get("/:id", function(req,res) {
    var mskm = req.params.id;
    KhuyenMai.getById(mskm,function(err,result){
        if(err){
            res.json({success:false,message:err});
        } else {
            res.json({success:true ,discount:result[0]});
        }

    })
})
// @route DELETE api/khuyenmai/:id
// @desc DELETE khuyenmai
// @access private
router.delete('/:id', function (req, res) {
    var mskm = req.params.id;
    KhuyenMai.deleteById(mskm, function(err, result) {
        if (err) {
            res.json({success:false,message:err});
        } else {
            res.json({success: true, message:"Xóa thành công"})
        }
    })
})

// @route PUT api/khuyenmai
// @desc Create khuyenmai
// @access private

router.put('/', verifyToken, async(req, res) => {
    const {
        giaTriKM,
        tenKM,
        ngayBD,
        ngayKT,
        mskm
    } = req.body

 
        //simple validation
    if (!giaTriKM || !tenKM || !ngayBD || !ngayKT ||!mskm)
        return res.status(400).json({
            success: false,
            message: 'Thiếu một trong số các trường dữ liệu!!'
        })
    try {
            KhuyenMai.updateById({giaTriKM,tenKM,ngayBD,ngayKT,mskm}, function(err, result){
                if (err) {
                    res.json({success:false,message: err})
                } else {
                    res.json({success: true, message:"Cập nhật khuyến mãi thành công", insertId: result.insertId})
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
