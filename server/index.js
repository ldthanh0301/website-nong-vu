require('dotenv').config()
const express = require('express')
const cors = require('cors')
var mysql = require('mysql');
const http = require('http');
const createChatServer = require('./server/chatServer');

const taiKhoanRouter = require('./routes/taiKhoan')
const uploadRouter = require('./routes/upload')
const vatTuRouter = require('./routes/vatTu')
const loaiVatTuRouter = require('./routes/loaiVatTu')
const muaVuRouter = require('./routes/muaVu')
const gioHangRouter = require('./routes/gioHang')
const donHangRouter = require('./routes/donhang')
const khuyenMaiRouter = require('./routes/khuyenMai')
const nhaCungCapRouter = require('./routes/nhaCungCap');
const tinNhanRouter = require('./routes/tinNhan');

const app = express()
const server = createChatServer(app);

app.use(express.json())
app.use('/api/',express.static('uploads'))
app.use(cors())
app.use('/api/giohang',gioHangRouter)
app.use('/api/taikhoan', taiKhoanRouter)
app.use('/api/loaivattu', loaiVatTuRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/vattu', vatTuRouter)
app.use('/api/muavu', muaVuRouter)
app.use('/api/loaivattu', loaiVatTuRouter)
app.use('/api/donhang', donHangRouter)
app.use('/api/khuyenmai', khuyenMaiRouter)
app.use('/api/nhacungcap', nhaCungCapRouter)
app.use('/api/tinnhan', tinNhanRouter)

const PORT = 5000

server.listen(PORT, () => console.log(`Sever starting on port ${PORT}`))