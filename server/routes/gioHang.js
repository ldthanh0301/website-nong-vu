const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewave/auth')

const GioHang = require('../models/GioHang')

router.post("/",verifyToken, (req, res)=> {
    let msnd = req.body.msnd;
    GioHang.create(msnd,function(err, result){
        if (err) {
            console.log(err)
        }else {
            console.log("create gio hang: ", result)
        }
    })
})

module.exports = router