require('dotenv').config()
const express = require('express')
const cors = require('cors')
var mysql = require('mysql');
const http = require('http');


const taiKhoanRouter = require('./routes/taiKhoan')
const uploadRouter = require('./routes/upload')
const vatTuRouter = require('./routes/vatTu')
const loaiVatTuRouter = require('./routes/loaiVatTu')
const muaVuRouter = require('./routes/muaVu')
const gioHangRouter = require('./routes/gioHang')
const donHangRouter = require('./routes/donhang')
const khuyenMaiRouter = require('./routes/khuyenMai')
const nhaCungCapRouter = require('./routes/nhaCungCap');

const app = express()

// Chat server
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server,{
    cors: {
      origin: '*',
    }
  });
const users = {
    User: null,
    Admin: null,
  };
  io.on('connection', (socket) => {
    // console.log(`New connection: ${socket.id}`);
    socket.on('join', (userType) => {
      // console.log(`${userType} joined: ${socket.id}`);
      users[userType] = socket;
    });
  
    socket.on('message', ({ userType, message }) => {
      // console.log(`New message: ${message} from ${userType}`);
      const targetUserType = userType === 'User' ? 'Admin' : 'User';
      users[targetUserType].emit('message', { userType, message });
    });
  
    socket.on('disconnect', () => {
      // console.log(`Connection closed: ${socket.id}`);
      Object.keys(users).forEach((userType) => {
        if (users[userType] && users[userType].id === socket.id) {
          // console.log(`${userType} left: ${socket.id}`);
          users[userType] = null;
        }
      });
    });
  });

// Chat Server

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

const PORT = 5000

server.listen(PORT, () => console.log(`Sever starting on port ${PORT}`))