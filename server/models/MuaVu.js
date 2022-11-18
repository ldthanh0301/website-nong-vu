const { models } = require('mongoose')
const con = require('./db.js')

const MuaVu = {
    add: function (muaVu,callback) {
        let sql = `Insert INTO muavu(tenMuaVu,nam) VALUES ('${muaVu.tenMuaVu}','${muaVu.nam}')`;
        con.query(sql, callback)
    },
    getAll: function (callback) {
        let sql = `Select * from muavu`;
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