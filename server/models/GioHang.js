const con = require('./db')

const GioHang = {
    create: function(msnd, callback){
        let sql = `INSERT INTO giohang(msnd) VALUES (${msnd})`
        con.query(sql, callback)
    },
    findByMsnd: function(msnd, callback){
        let sql = `Select * from giohang gh where gh.msnd = ${msnd}`;
        con.query(sql, callback)
    },
    addChiTietGioHang: function (item, callback) {
        let sql = `INSERT INTO chitietgiohang (msgh, msvt,soLuong, tongGia) VALUES (${item.msgh},${item.msvt},${item.soLuong}, ${item.tongGia})`;
        con.query(sql, callback)
    },
    getAll: function(msnd,callback) {
        let sql= `Select ctgh.soLuong, ctgh.tongGia, ctgh.msvt, vt.tenVatTu, vt.moTa, vt.gia, hvt.diaChiHinh, ctgh.msctgh from giohang gh join chitietgiohang ctgh on gh.msgh = ctgh.msgh join vattu vt on vt.msvt = ctgh.msvt join hinhvattu hvt on hvt.maHinh = vt.maHinh  where gh.msnd = ${msnd}`
        con.query(sql, callback)
    },
    updateById: function(category, callback) {
        let sql = `UPDATE loaivattu SET tenLoaiVatTu='${category.tenLoaiVatTu}' WHERE mslvt =${category.mslvt}`
        let result = con.query(sql, callback)
    },
    deleteProductInCart: function (msctgh, callback) {
        let sql = `DELETE FROM chitietgiohang WHERE msctgh = ${msctgh}`
        con.query(sql, callback)
    },
    deleteAllCTGH: function (msgh, callback) {
        let sql = `DELETE FROM chitietgiohang WHERE msgh = ${msgh}`
        con.query(sql, callback)
    },
    getById: function(id, callback) {
        let sql = `select * from loaivattu where mslvt = ${id}`
        con.query(sql, callback)
    }
}

module.exports = GioHang