const con = require('./db')

const NhaCungCap = {
    add: function (nhaCungCap, callback) {
        let sql = `INSERT INTO nhacungcap (tenNCC, diaChi, soDienThoai) VALUES ('${nhaCungCap.tenNCC}','${nhaCungCap.diaChi}','${nhaCungCap.soDienThoai}')`;
        con.query(sql, callback)
    },
    getAll: function(callback) {
        let sql= "Select * from nhacungcap";
        con.query(sql, callback)
    },
    updateById: function(nhaCungCap, callback) {
        let sql = `UPDATE nhacungcap SET tenNCC='${nhaCungCap.tenNCC}', diaChi='${nhaCungCap.diaChi}', soDienThoai='${nhaCungCap.soDienThoai}' WHERE msncc =${nhaCungCap.msncc}`
        let result = con.query(sql, callback)
    },
    deleteById: function (id, callback) {
        let sql = `DELETE FROM nhacungcap WHERE msncc = ${id}`
        con.query(sql, callback)
    },
    getById: function(id, callback) {
        let sql = `select * from nhacungcap where msncc = ${id}`
        con.query(sql, callback)
    }
}

module.exports = NhaCungCap