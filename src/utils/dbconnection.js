const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12619819',
    password: 'AdwsRrvt9R',
    database: 'sql12619819'
});
connection.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Database Connected!:)');
    }
});
module.exports = connection;