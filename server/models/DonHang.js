const con = require('./db')

const DonHang = {
    create: function(donhang, callback) {
        let sql = `INSERT INTO donhang(tongTien,msnd,mskm,msmv,diaChiGiaoHang,soDienThoai) VALUES (${donhang.tongTien}, ${donhang.msnd},${donhang.mskm},${donhang.msmv},"${donhang.diaChi}","${donhang.soDienThoai}")`
        con.query(sql, callback)
    },
    insertToCTDH: function(donhang, callback) {
        let sql = `INSERT INTO chitietdonhang(soLuong,gia, tongGia, msvt, msdh) VALUES (${donhang.soLuong},${donhang.gia},${donhang.tongGia},${donhang.msvt},${donhang.msdh})`;
        con.query(sql, callback)
    },
    getAll: function(callback) {
        let sql = `select *,DATE_FORMAT(ngayDH,'%d/%m/%Y') as ngayDH from donhang dh join nongdan nd on nd.msnd = dh.msnd where Date(dh.ngayDH) order by dh.ngayDH desc`;
        con.query(sql, callback)
    },
    getByStatus: function(status,callback) {
        let sql = `select *,DATE_FORMAT(ngayDH,'%d/%m/%Y') as ngayDH from donhang dh join nongdan nd on nd.msnd = dh.msnd where dh.trangThai = ${status}`;
        con.query(sql, callback)
    },
    getOrderByUserWithMonth: function (callback) {
        let sql = `select dh.msnd,YEAR(ngayDH) as nam,MONTH(ngayDH) as thang,SUM(dh.tongTien)as thanhTien,nd.taiKhoan,nd.diaChi ,nd.hoTen from donhang dh join nongdan nd on nd.msnd = dh.msnd where dh.trangThai = 2 group by dh.msnd,nam, thang ORDER by thanhTien DESC`;
        con.query(sql, callback)
    },
    getByUser: function(msnd, callback) {
        let sql = `select *,DATE_FORMAT(ngayDH,'%d/%m/%Y') as ngayDH from donhang dh join nongdan nd on nd.msnd = dh.msnd where dh.msnd = ${msnd} order by dh.ngayDH desc`;
        con.query(sql, callback)
    },
    getByUserAndStatus: function({msnd,status}, callback) {
        let sql = `select *,DATE_FORMAT(ngayDH,'%d/%m/%Y') as ngayDH from donhang dh join nongdan nd on nd.msnd = dh.msnd where dh.msnd = ${msnd} and dh.trangThai =${status} order by dh.ngayDH desc`;
        con.query(sql, callback)
    },
    getByUserAndMSLVT: function({msnd,mslvt}, callback) {
        let sql = `select *,ctdh.soLuong,ctdh.gia,DATE_FORMAT(ngayDH,'%d/%m/%Y') as ngayDH from donhang dh join nongdan nd on nd.msnd = dh.msnd join chitietdonhang ctdh on ctdh.msdh = dh.msdh join vattu vt on vt.msvt = ctdh.msvt where dh.msnd = ${msnd} and mslvt = ${mslvt} order by dh.ngayDH desc`;
        con.query(sql, callback)
    },
    getByUserAndMSLVTAll: function({msnd}, callback) {
        let sql = `select *,ctdh.soLuong,ctdh.gia,DATE_FORMAT(ngayDH,'%d/%m/%Y') as ngayDH from donhang dh join nongdan nd on nd.msnd = dh.msnd join chitietdonhang ctdh on ctdh.msdh = dh.msdh join vattu vt on vt.msvt = ctdh.msvt where dh.msnd = ${msnd} order by dh.ngayDH desc`;
        con.query(sql, callback)
    },
    getByUserAndMsmvAndMSLVTAll: function({msmv,msnd}, callback) {
        let sql = `select *,ctdh.soLuong,ctdh.gia,DATE_FORMAT(ngayDH,'%d/%m/%Y') as ngayDH from donhang dh join nongdan nd on nd.msnd = dh.msnd join chitietdonhang ctdh on ctdh.msdh = dh.msdh join vattu vt on vt.msvt = ctdh.msvt where dh.msnd = ${msnd} and dh.msmv =${msmv} order by dh.ngayDH desc`;
        con.query(sql, callback)
    },
    getByUserAndMSLVTAndMsmv: function({mslvt,msmv,msnd}, callback) {
        let sql = `select *,ctdh.soLuong,ctdh.gia,DATE_FORMAT(ngayDH,'%d/%m/%Y') as ngayDH from donhang dh join nongdan nd on nd.msnd = dh.msnd join chitietdonhang ctdh on ctdh.msdh = dh.msdh join vattu vt on vt.msvt = ctdh.msvt where dh.msnd = ${msnd} and dh.msmv =${msmv} and mslvt = ${mslvt}  order by dh.ngayDH desc`;
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