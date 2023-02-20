const con = require('./db')

const KhuyenMai = {
    add: function (khuyenMai, callback) {
        let sql = `INSERT INTO khuyenmai (giaTriKM, tenKM, ngayBD, ngayKT) VALUES (${khuyenMai.giaTriKM},'${khuyenMai.tenKM}','${khuyenMai.ngayBD}','${khuyenMai.ngayKT}')`;
        con.query(sql, callback)
    },
    getAll: function(callback) {
        let sql= "Select * from khuyenmai";
        con.query(sql, callback)
    },
    // updateById: function(category, callback) {
    //     let sql = `UPDATE loaivattu SET tenLoaiVatTu='${category.tenLoaiVatTu}' WHERE mslvt =${category.mslvt}`
    //     let result = con.query(sql, callback)
    // },
    // deleteById: function (id, callback) {
    //     let sql = `DELETE FROM loaivattu WHERE mslvt = ${id}`
    //     con.query(sql, callback)
    // },
    // getById: function(id, callback) {
    //     let sql = `select * from loaivattu where mslvt = ${id}`
    //     con.query(sql, callback)
    // }
}

module.exports = KhuyenMai