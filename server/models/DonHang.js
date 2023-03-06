const con = require('./db')

const DonHang = {
    create: function(donhang, callback) {
        let sql = `INSERT INTO donhang(tongTien,msnd,mskm) VALUES (${donhang.tongTien}, ${donhang.msnd},${donhang.mskm})`
        con.query(sql, callback)
    },
    insertToCTDH: function(donhang, callback) {
        let sql = `INSERT INTO chitietdonhang(soLuong, tongGia, msvt, msdh) VALUES (${donhang.soLuong},${donhang.tongGia},${donhang.msvt},${donhang.msdh})`;
        con.query(sql, callback)
    },
    getAll: function(callback) {
        let sql = `select *,DATE_FORMAT(ngayDH,'%d/%m/%Y') as ngayDH from donhang dh join nongdan nd on nd.msnd = dh.msnd`;
        con.query(sql, callback)
    },
    getByStatus: function(status,callback) {
        let sql = `select *,DATE_FORMAT(ngayDH,'%d/%m/%Y') as ngayDH from donhang dh join nongdan nd on nd.msnd = dh.msnd where dh.trangThai = ${status}`;
        con.query(sql, callback)
    },
    getByUser: function(msnd, callback) {
        let sql = `select *,DATE_FORMAT(ngayDH,'%d/%m/%Y') as ngayDH from donhang dh join nongdan nd on nd.msnd = dh.msnd where dh.msnd = ${msnd}`;
        con.query(sql, callback)
    },
    updateState: function ({msdh,state}, callback) {
        let sql = `UPDATE donhang SET trangThai= ${state} WHERE msdh = ${msdh}`
        con.query(sql,callback)
    },
    chiTietDonHang: function (msdh, callback){
        let sql = `SELECT vt.tenVatTu, vt.gia,vt.mahinh,vt.moTa,ct.msctdh,ct.soLuong,ct.tongGia,ct.msdh FROM chitietdonhang ct join vattu vt on vt.msvt = ct.msvt WHERE ct.msdh = ${msdh}`;
        con.query(sql, callback)
    }

}

module.exports = DonHang