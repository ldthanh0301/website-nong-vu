const http = require('http');
const socketio = require('socket.io');
const db = require("../models/db")
const createChatServer = (app) => {
  const server = http.createServer(app);
  const io = socketio(server, {
    cors: {
      origin: '*',
    }
  });

  const users = {
    User: null,
    Admin: null,
  }; 

  let usersOnline = {};
  io.on('connection', (socket) => {
    socket.on('join', ({userType, username}) => {
      users[userType] = socket;
      console.log("username: ", username)
      usersOnline= {...usersOnline,[username]:socket};
    });

    socket.on('message', ({ userType, TinNhan }) => {
      const targetUserType = userType === 'User' ? 'Admin' : 'User';
      const query = `INSERT INTO tinnhan (nguoiGui, nguoiNhan, tinNhan) VALUES ('${TinNhan.nguoiGui}', '${TinNhan.nguoiNhan}', '${TinNhan.tinNhan}')`;
      db.query(query, (error, results, fields) => {
        if (error) throw error;
        // Phát tin nhắn đến tất cả các người dùng trong phòng riêng tư
        usersOnline[`${TinNhan.nguoiNhan}`].emit('message', { userType, message: TinNhan.tinNhan });
      });
      // users[targetUserType].emit('message', { userType, message: TinNhan.tinNhan });
    });


    socket.on('privateMessage', (message) => {
      // Lưu tin nhắn vào cơ sở dữ liệu MySQL
      const query = `INSERT INTO messages (nguoiGui, nguoiNhan, tinNhan) VALUES ('${message.nguoiGui}', '${message.nguoiNhan}', '${message.tinNhan}')`;
      connection.query(query, (error, results, fields) => {
        if (error) throw error;
        // Phát tin nhắn đến tất cả các người dùng trong phòng riêng tư
        io.to(usersOnline.message.nguoiNhan).emit('privateMessage', message);
      });
    });



    socket.on('disconnect', () => {
      Object.keys(users).forEach((userType) => {
        if (users[userType] && users[userType].id === socket.id) {
          users[userType] = null;
        }
      });
    });
  });

  return server;
};

module.exports = createChatServer;
