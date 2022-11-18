const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewave/auth')
var multer = require('multer');
const con = require('../models/db')
const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}.jpg`);
    },
  });
const upload = multer({ storage });
router.post('/', verifyToken, upload.single('image'), async(req, res) => {
    let sql = `Insert into hinhvattu(diaChiHinh) values("${req.file.filename}")`;
    con.query(sql, function(error , result){
      if (error) {
        console.log(error)
      }else {
        res.json({maHinh: result.insertId,diaChiHinh:`${req.file.filename}`});
      }
    })
})

module.exports = router