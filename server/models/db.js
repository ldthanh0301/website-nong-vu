
var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'quan_ly_nong_vu'
});
// connect to database
connection.connect(function(err) {
    if (err) console.log("Lỗi khi connect", err);
    else console.log("Kết nối đến mysql thành công")
});

module.exports = connection;