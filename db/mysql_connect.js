const mysql=require('mysql')
require('dotenv/config')

var dbConn=mysql.createConnection({
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
    host:process.env.MYSQL_HOST
})

module.exports=dbConn