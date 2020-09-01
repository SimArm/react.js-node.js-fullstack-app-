const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 300S0;


const mariadb = require('mariadb');
// connection configurations
const mc = mariadb.createConnection({
    host: 'localhost',
    user: 'ligtre',
    password: 'kometa',
    database: 'ligtreDB'
});
 
// connect to database
mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/approutes'); //importing route
routes(app); //register the route