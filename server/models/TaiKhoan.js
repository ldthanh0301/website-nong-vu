const con = require('./db');

const TaiKhoan = {
    create: function(taiKhoan, callback) {
        
        let sql = `Insert into taikhoan(taiKhoan,matKhau) values('${taiKhoan.username}','${taiKhoan.password}')`;
        con.query(sql, callback)
    },
    findByTaiKhoan: function(taiKhoan, callback){
        let sql = `Select * from taikhoan where taiKhoan = '${taiKhoan}'`
        con.query(sql, callback)
    },
    findByAdmin: function (taiKhoan,callback) {
        let sql = `select * from taikhoan tk join quanly ql on ql.taiKhoan = tk.taiKhoan where tk.taiKhoan = '${taiKhoan}'`;
        con.query(sql, callback)
    },
    findById: function (id, callback) {
        let sql = `Select tk.taiKhoan, tk.quanLy,tk.matKhau, nd.hoTen, nd.soDienThoai, nd.diaChi, nd.msnd from taikhoan tk join nongdan nd on nd.taiKhoan = tk.taiKhoan where tk.taiKhoan = '${id}'`;
        con.query(sql, callback)
    },
    insertToNongDan: function(nongdan, callback) {
        let sql= `INSERT INTO nongdan( soDienThoai, hoTen,diaChi, taiKhoan) VALUES ('${nongdan.soDienThoai}','${nongdan.hoTen}','${nongdan.diaChi}','${nongdan.taiKhoan}')`
        con.query(sql, callback)
    }
}
module.exports = TaiKhoan