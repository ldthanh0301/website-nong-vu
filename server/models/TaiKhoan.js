const con = require('./db');

const TaiKhoan = {
    create: function(taiKhoan, callback) {
        
        let sql = `Insert into taikhoan(taiKhoan,matKhau) values('${taiKhoan.username}','${taiKhoan.password}')`;
        con.query(sql, callback)
    },
    findById: function (id, callback) {
        let sql = `Select * from taikhoan where taiKhoan = '${id}'`;
        con.query(sql, callback)
    },
    insertToNongDan: function(nongdan, callback) {
        let sql= `INSERT INTO nongdan( soDienThoai, hoTen,diaChi, taiKhoan) VALUES ('${nongdan.soDienThoai}','${nongdan.hoTen}','${nongdan.diaChi}','${nongdan.taiKhoan}')`
        con.query(sql, callback)
    }
}
module.exports = TaiKhoan