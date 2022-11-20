const con = require('./db')

const DatHang = {
    create: function(donhang, callback) {
        let sql = `INSERT INTO donhang(tongTien,msnd) VALUES (${donhang.tongTien}, ${donhang.msnd})`
        con.query(sql, callback)
    },
    insertToCTDH: function(donhang, callback) {
        let sql = `INSERT INTO chitietdonhang(soLuong, tongGia, msvt, msdh) VALUES (${donhang.soLuong},${donhang.tongGia},${donhang.msvt},${donhang.msdh})`;
        con.query(sql, callback)
    },
    getAll: function(callback) {
        let sql = `select * from donhang dh join nongdan nd on nd.msnd = dh.msnd`;
        con.query(sql, callback)
    }
}

module.exports = DatHang