require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
var mysql = require('mysql');

const authRouter = require('./routes/auth')
const taiKhoanRouter = require('./routes/taiKhoan')
const uploadRouter = require('./routes/upload')
const vatTuRouter = require('./routes/vatTu')
const loaiVatTuRouter = require('./routes/loaiVatTu')
const muaVuRouter = require('./routes/muaVu')
const gioHangRouter = require('./routes/gioHang')

const app = express()
app.use(express.json())
app.use('/api/',express.static('uploads'))
app.use(cors())
app.use('/api/giohang',gioHangRouter)
app.use('/api/taikhoan', taiKhoanRouter)
app.use('/api/categories', loaiVatTuRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/vattu', vatTuRouter)
app.use('/api/muavu', muaVuRouter)
app.use('/api/loaivattu', loaiVatTuRouter)

const PORT = 5000

app.listen(PORT, () => console.log(`Sever starting on port ${PORT}`))