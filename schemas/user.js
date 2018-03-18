var mysql = require('mysql')
var conn = mysql.createConnection({
    host: 'localhost', // 连接服务器地址
    user: 'root',  // 连接帐号
    password: '', // 连接密码
    port: 3306, // 端口号
    database:'mysql' // 数据库名称
})
conn.connect();
var obj = {username:'jack',firstname:'lu'};
conn.query('INSERT INTO blog SET  ?',obj, function(err, rows, fields) {
    console.log(err);
});
