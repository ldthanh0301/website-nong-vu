const con = require('./db')

const KhuyenMai = {
    add: function (khuyenMai, callback) {
        let sql = `INSERT INTO khuyenmai (giaTriKM, tenKM, ngayBD, ngayKT) VALUES (${khuyenMai.giaTriKM},'${khuyenMai.tenKM}','${khuyenMai.ngayBD}','${khuyenMai.ngayKT}')`;
        con.query(sql, callback)
    },
    getAll: function(callback) {
        let sql= "Select * ,DATE_FORMAT(ngayBD,'%d/%m/%Y') as ngayBD ,DATE_FORMAT(ngayKT,'%d/%m/%Y') as ngayKT from khuyenmai";
        con.query(sql, callback)
    },
    updateById: function(khuyenMai, callback) {
        let sql = `UPDATE khuyenmai SET tenKM='${khuyenMai.tenKM}', giaTriKM='${khuyenMai.giaTriKM}', ngayBD='${khuyenMai.ngayBD}',ngayKT='${khuyenMai.ngayKT}'  WHERE mskm =${khuyenMai.mskm}`
        let result = con.query(sql, callback)
    },
    deleteById: function (id, callback) {
        let sql = `DELETE FROM khuyenmai WHERE mskm = ${id}`
        con.query(sql, callback)
    },
    getById: function(id, callback) {
        let sql = `select * ,DATE_FORMAT(ngayBD,'%Y-%m-%d') as ngayBD, DATE_FORMAT(ngayKT,'%Y-%m-%d') as ngayKT  from khuyenmai where mskm = ${id}`
        con.query(sql, callback)
    }
}

module.exports = KhuyenMai