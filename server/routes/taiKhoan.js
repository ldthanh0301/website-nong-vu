const argon2 = require("argon2");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewave/auth");

const TaiKhoan = require("../models/TaiKhoan");
const GioHang = require("../models/GioHang");

//@route Get api/taikhoan
//@desc Check if user is logged in
//@access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    TaiKhoan.findByTaiKhoan(req.userId, function (err, result) {
      if (err || result.length == 0)
        return res
          .status(400)
          .json({ success: false, message: "Không tìm thấy tài khoản" });

      if (result[0].quyen === 1)
        TaiKhoan.findByManager(req.userId, function (err, user) {
          if (!err) {
            res.json({ success: true, taiKhoan: user[0] });
            return;
          }
        });

      if (result[0].quyen === 2)
        TaiKhoan.findByAdmin(req.userId, function (err, user) {
          if (!err) {
            res.json({ success: true, taiKhoan: user[0] });
            return;
          }
        });
      if (result[0].quyen === 0)
        TaiKhoan.findById(req.userId, function (err, user) {
          if (!err) {
            res.json({ success: true, taiKhoan: user[0] });
          }
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// @route GET api/taikhoan/nhanvien
// @desc get all account nhanvien
// @access Public
router.get("/nhanvien",  verifyToken, (req, res) => {
  TaiKhoan.getAllNhanVien((err,result)=>{
    if (err) {
      res.status(500).json({success:false,message:"lỗi khi truy vấn"});
    }else {
      res.json({success:true,message:"lấy dữ liệu thành công",accounts:result})
    }
  })
})
// @route POST api/taikhoan/register
// @desc Register user
// @access Public
router.post("/dangky", async (req, res) => {
  const { username, password } = req.body;
  // simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Thiếu tên tài khoản hoặc mật khẩu" });
  try {
    TaiKhoan.findById(username, async (error, result) => {
      if (error) {
        return res.status(400).json("Lỗi khi tìm tài khoản");
      }
      if (result.length > 0)
        return res
          .status(400)
          .json({ success: false, message: "Tên tài khoản không khả dụng" });

      // all good
      const hanshedPassword = await argon2.hash(password);
      TaiKhoan.create(
        { username, password: hanshedPassword },
        function (error, result) {
          if (error) {
            console.log(error);
            res
              .status(400)
              .json({ success: false, message: "Lỗi khi tạo tài khoản" });
            return;
          } else {
            TaiKhoan.insertToNongDan(
              { ...req.body, taiKhoan: username },
              function (error, result) {
                if (error) {
                  console.log(error);
                  res.status(400).json({
                    success: false,
                    message: "Lỗi khi thêm vào nông dân",
                  });
                  return;
                }

                // return token
                const accessToken = jwt.sign(
                  { userId: username },
                  process.env.ACCESS_TOKEN_SECRET
                );
                res.json({
                  success: true,
                  message: "Tạo tài khoản thành công",
                  accessToken,
                });
              }
            );
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// @route POST api/taikhoan/captaikhoan
// @desc Register nhanvien
// @access Public
router.post("/captaikhoan", async (req, res) => {
  const { username, password } = req.body;
  // simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Thiếu tên tài khoản hoặc mật khẩu" });
  try {
    TaiKhoan.findById(username, async (error, result) => {
      if (error) {
        return res.status(400).json("Lỗi khi tìm tài khoản");
      }
      if (result.length > 0)
        return res
          .status(400)
          .json({ success: false, message: "Tên tài khoản không khả dụng" });

      // all good
      const hanshedPassword = await argon2.hash(password);
      TaiKhoan.createTaiKhoanNhanVien(
        { username, password: hanshedPassword },
        function (error, result) {
          if (error) {
            console.log(error);
            res
              .status(400)
              .json({ success: false, message: "Lỗi khi tạo tài khoản" });
            return;
          } else {
            TaiKhoan.insertToNhanVien(
              { ...req.body, taiKhoan: username },
              function (error, result) {
                if (error) {
                  console.log(error);
                  res.status(400).json({
                    success: false,
                    message: "Lỗi khi thêm vào nhân viên",
                  });
                  return;
                }

                // return token
                const accessToken = jwt.sign(
                  { userId: username },
                  process.env.ACCESS_TOKEN_SECRET
                );
                res.json({
                  success: true,
                  message: "Tạo tài khoản thành công",
                  accessToken,
                });
              }
            );
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/taikhoan/login
// @desc login user
// @access Public
router.post("/dangnhap", async (req, res) => {
  const { username, password } = req.body;
  // simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Thiếu tài khoản hoặc mật khẩu" });
  try {
    //check for existing user
    TaiKhoan.findByTaiKhoan(username, async (err, result) => {
      if (err || result.length == 0) {
        res.json({
          success: false,
          message: "Không tìm thấy tài khoản hoặc mật khẩu 1",
        });
      } else {
        let account = result[0];
        const passwordValid = await argon2.verify(account.matKhau, password);
        if (!passwordValid)
          return res.status(400).json({
            success: false,
            message: "Tài khoản hoặc mật khẩu không đúng",
          });
        //return token
        const accessToken = jwt.sign(
          { userId: account.taiKhoan },
          process.env.ACCESS_TOKEN_SECRET
        );
        res.json({
          success: true,
          message: "Đăng nhập thành công",
          accessToken,
          account,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Update api/taikhoan/

router.put("/capnhat", async (req, res) => {
  const { hoTen, diaChi, soDienThoai, taiKhoan } = req.body;
  console.log("body: ", req.body);
  // simple validation
  if (!taiKhoan || !hoTen || !diaChi || !soDienThoai)
    return res
      .status(400)
      .json({
        success: false,
        message: "Thiếu một trong số các trường dữ liệu",
      });
  try {
    TaiKhoan.updateProfileNongDan(
      { hoTen, diaChi, soDienThoai, taiKhoan },
      (error, result) => {
        if (error) {
          console.log(error);
          res
            .status(400)
            .json({ success: false, message: "Lỗi khi tạo tài khoản" });
          return;
        } else {
          res
            .status(200)
            .json({ success: true, message: "Cập nhật thành công" });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// DELETE nhanvien taikhoan/nhanvien/:taiKhoan
//  Private
router.delete("/nhanvien/:taiKhoan", verifyToken, (req, res)=>{
  let taiKhoan =req.params.taiKhoan;
  TaiKhoan.deleteNhanVien(taiKhoan,function(err,result){
    if (err) {
      res.status(500).json({success:false,message:"Lỗi khi xóa"})
    } else {
      TaiKhoan.deleteTaiKhoan(taiKhoan,function(err,result){
        if (err) {
          res.status(500).json({success:false,message:"Lỗi khi xóa"})
        } else {
          res.json({success:true,message:"Xóa thành công"})
        }
      })
    }
  })
})
// GET INFO nhanvien taikhoan/nhanvien/:taiKhoan
//  Private
router.get("/nhanvien/:taiKhoan", verifyToken, (req, res)=>{
  let taiKhoan =req.params.taiKhoan;
  TaiKhoan.getInfoNhanVien(taiKhoan,function(err,result){
    if (err) {
      res.status(500).json({success:false,message:"Lỗi khi lấy thông tin"})
    } else {
      res.json({success:true,message:"Thành công", account:result[0]})
    }
  })
})





module.exports = router;
