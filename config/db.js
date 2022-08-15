const mysql = require('mysql');
require('dotenv/config')
const util = require('util');

var conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

const query = util.promisify(conn.query).bind(conn)

module.exports = query