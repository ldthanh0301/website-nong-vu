const { models } = require('mongoose')
const con = require('./db.js')

const MuaVu = {
    add: function (muaVu,callback) {
        let sql = `Insert INTO muavu(tenMuaVu,nam) VALUES ('${muaVu.tenMuaVu}','${muaVu.nam}')`;
        con.query(sql, callback)
    },
    getAll: function (callback) {
        let sql = `Select * from tinnhan`;
        con.query(sql, callback)
    },
    getUserMessage: function (callback) {
        let sql = `SELECT * FROM tinnhan tn join nongdan nd on nd.taiKhoan = tn.nguoiGui WHERE tn.nguoiGui != 'admin' GROUP by tn.nguoiGui`;
        con.query(sql, callback)
    },
    getMessageUserAndAdmin: function(user, callback) { //user là taikhoan
        let sql = `SELECT * FROM tinNhan WHERE (nguoiGui = '${user}' AND nguoiNhan = 'admin') OR (nguoiGui = 'admin' AND nguoiNhan = '${user}');`
        con.query(sql, callback)
    },
    getById: function (id,callback) {
        let sql = `select * from muavu where msmv= ${id}`
        con.query(sql, callback)
    },
    deleteById: function (id, callback) {
        let sql = `Delete from muavu where msmv=${id}`
        con.query(sql, callback)
    }
}

module.exports = MuaVu