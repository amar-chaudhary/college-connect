const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12616172',
    password: 'g2fiEwkQXE',
    database: 'sql12616172'
});
connection.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Database Connected!:)');
    }
});
module.exports = connection;
