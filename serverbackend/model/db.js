'user strict';

var mariadb = require('mariadb');

//local mysql db connection
var connection = mariadb.createConnection({
    host     : 'localhost',
    user     : 'ligtre',
    password : 'kometa',
    database : 'ligtreDB'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;