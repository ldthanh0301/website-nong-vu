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

module.exports = router
