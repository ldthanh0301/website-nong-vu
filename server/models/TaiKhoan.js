const con = require('./db');

const TaiKhoan = {
    create: function(taiKhoan, callback) {
        
        let sql = `Insert into taikhoan(taiKhoan,matKhau) values('${taiKhoan.username}','${taiKhoan.password}')`;
        con.query(sql, callback)
    },
    createTaiKhoanNhanVien: function(taiKhoan, callback) {
        
        let sql = `Insert into taikhoan(taiKhoan,matKhau,quyen) values('${taiKhoan.username}','${taiKhoan.password}',1)`;
        con.query(sql, callback)
    },
    findByTaiKhoan: function(taiKhoan, callback){
        let sql = `Select * from taikhoan where taiKhoan = '${taiKhoan}'`
        con.query(sql, callback)
    },
    findByAdmin: function (taiKhoan,callback) {
        let sql = `select * from taikhoan tk  where tk.taiKhoan = '${taiKhoan}'`;
        con.query(sql, callback)
    },
    findByManager: function (taiKhoan,callback) {
        let sql = `select * from taikhoan tk join nhanvien nv on nv.taiKhoan = tk.taiKhoan where tk.taiKhoan = '${taiKhoan}'`;
        con.query(sql, callback)
    },
    findById: function (id, callback) {
        let sql = `Select tk.taiKhoan, tk.quyen, nd.hoTen, nd.soDienThoai, nd.diaChi, nd.msnd from taikhoan tk join nongdan nd on nd.taiKhoan = tk.taiKhoan where tk.taiKhoan = '${id}'`;
        con.query(sql, callback)
    },
    insertToNongDan: function(nongdan, callback) {
        let sql= `INSERT INTO nongdan( soDienThoai, hoTen,diaChi, taiKhoan) VALUES ('${nongdan.soDienThoai}','${nongdan.hoTen}','${nongdan.diaChi}','${nongdan.taiKhoan}')`
        con.query(sql, callback)
    },
    insertToNhanVien: function(nhanvien, callback) {
        let sql= `INSERT INTO nhanvien( soDienThoai, hoTen,diaChi, taiKhoan) VALUES ('${nhanvien.soDienThoai}','${nhanvien.hoTen}','${nhanvien.diaChi}','${nhanvien.taiKhoan}')`
        con.query(sql, callback)
    },
    updateProfileNongDan: function(info, callback) {
        let sql= `UPDATE nongdan SET soDienThoai='${info.soDienThoai}',hoTen='${info.hoTen}',diaChi='${info.diaChi}' where taiKhoan='${info.taiKhoan}'`
        con.query(sql, callback)
    },
    getAllNhanVien: function(callback) {
        let sql= "Select * from nhanvien";
        con.query(sql,callback)
    },
    getInfoNhanVien: function(taiKhoan,callback) {
        let sql= `Select * from nhanvien where taiKhoan= '${taiKhoan}'`;
        con.query(sql,callback)
    },
    deleteNhanVien: function(taiKhoan, callback) {
        let sql= `DELETE FROM nhanvien WHERE taiKhoan= '${taiKhoan}'`;
        con.query(sql,callback)
    },
    deleteTaiKhoan: function(taiKhoan, callback) {
        let sql= `DELETE FROM taikhoan WHERE taiKhoan= '${taiKhoan}'`;
        con.query(sql,callback)
    }
}
module.exports = TaiKhoan