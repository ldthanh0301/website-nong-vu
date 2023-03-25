const con = require('./db')

const VatTu = {
    getAll: function (callback) {
        let sql = "Select vt.msvt,vt.tenVatTu,vt.moTa,vt.gia,vt.soLuong,vt.mslvt,vt.msncc, vt.maHinh, hvt.diaChiHinh from vattu vt join hinhvattu hvt on vt.maHinh = hvt.maHinh"
        return con.query(sql, callback)
    },
    getByMslvt: function (mslvt,callback) {
        let sql = `Select vt.msvt,vt.tenVatTu,vt.moTa,vt.gia,vt.soLuong,vt.mslvt,vt.msncc, vt.maHinh, hvt.diaChiHinh from vattu vt join hinhvattu hvt on vt.maHinh = hvt.maHinh where mslvt = ${mslvt}`;
        return con.query(sql, callback)
    },
    getById: function (vatTuId,callback) {
        let sql = `Select vt.msvt,vt.tenVatTu,vt.moTa,vt.gia,vt.soLuong,vt.mslvt,vt.msncc, vt.maHinh, hvt.diaChiHinh from vattu vt  join hinhvattu hvt on vt.maHinh = hvt.maHinh where msvt="${vatTuId}"`;
        return con.query(sql, callback) 
    },
    insert: function (vatTu, callback) {
        let sql = `INSERT INTO vattu(tenVatTu, moTa, gia, soLuong, mslvt, msncc, maHinh) 
        VALUES ('${vatTu.tenVatTu}','${vatTu.moTa}',${vatTu.gia},${vatTu.soLuong},${vatTu.mslvt},${vatTu.msncc},'${vatTu.maHinh}')`;
        con.query(sql,callback)
    },
    updateByMSVT: function (vatTu, callback) {
        let sql = `UPDATE vattu SET tenVatTu='${vatTu.tenVatTu}',moTa='${vatTu.moTa}',gia=${vatTu.gia},soLuong=${vatTu.soLuong},mslvt=${vatTu.mslvt},msncc=${vatTu.msncc},maHinh='${vatTu.maHinh}' WHERE msvt = ${vatTu.msvt}`;
        con.query(sql,callback)
    },
    deleteById: function (msvt, callback) {
        let sql = `Delete from vattu where  msvt = ${msvt}`;
        con.query(sql, callback)
    }
}

module.exports = VatTu