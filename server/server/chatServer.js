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
    User: [],
    Admin: [],
  }; 
  // user['User']
  let usersOnline = {};
  io.on('connection', (socket) => {
    socket.on('join', ({userType, username}) => {
      users[userType].push({[username]:socket});
      console.log("username: ", username)
      usersOnline= {...usersOnline,[username]:socket};
    });

    socket.on('message', ({ userType, TinNhan }) => {
      let sql="";
      if (userType ==="Admin") {
        sql = `INSERT INTO tinnhan (nguoiGui, nguoiNhan, tinNhan) VALUES ('admin', '${TinNhan.nguoiNhan}', '${TinNhan.tinNhan}')`;
      } else {
        sql = `INSERT INTO tinnhan (nguoiGui, nguoiNhan, tinNhan) VALUES ('${TinNhan.nguoiGui}', 'admin', '${TinNhan.tinNhan}')`;
      }
      db.query(sql, (error, results, fields) => {
        if (error) {
          throw error;
          return
        }
        //
        if (userType ==="Admin"){
          // let socketUser = users['User'].find(user=>user[`${TinNhan.nguoiNhan}`])[`${TinNhan.nguoiNhan}`];
          let socketUser = users['User'].find(user=>{if (user[`${TinNhan.nguoiNhan}`]) return user})[`${TinNhan.nguoiNhan}`];
          if (socketUser) {
            socketUser.emit('message', { userType, tinNhan: TinNhan.tinNhan });
          }
        } else {
          let listSocketAdmin = users['Admin'].map(admin=> admin[Object.keys(admin)]);
          listSocketAdmin.map(socketAdmin => socketAdmin.emit("message", { userType, tinNhan: TinNhan.tinNhan }))
        }
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
