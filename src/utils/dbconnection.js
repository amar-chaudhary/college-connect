const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12623102',
    password: '8H44m4QrEz',
    database: 'sql12623102'
});
connection.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Database Connected!:)');
    }
});
module.exports = connection;
