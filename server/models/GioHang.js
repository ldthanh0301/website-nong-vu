const con = require('./db')

const GioHang = {
    create: function(msnd, callback){
        let sql = `INSERT INTO giahang(msnd) VALUES (${msnd})`
        con.query(sql, callback)
    },
    addChiTietGioHang: function (item, callback) {
        let sql = `INSERT INTO loaivattu (tenLoaiVatTu) VALUES ('${item}')`;
        con.query(sql, callback)
    },
    getAll: function(callback) {
        let sql= "Select * from loaivattu";
        con.query(sql, callback)
    },
    updateById: function(category, callback) {
        let sql = `UPDATE loaivattu SET tenLoaiVatTu='${category.tenLoaiVatTu}' WHERE mslvt =${category.mslvt}`
        let result = con.query(sql, callback)
    },
    deleteById: function (id, callback) {
        let sql = `DELETE FROM loaivattu WHERE mslvt = ${id}`
        con.query(sql, callback)
    },
    getById: function(id, callback) {
        let sql = `select * from loaivattu where mslvt = ${id}`
        con.query(sql, callback)
    }
}

module.exports = GioHang