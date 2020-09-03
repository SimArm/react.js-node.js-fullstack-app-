
const express = require('express');
const mariadb = require('mariadb');

const app = express();
const port = 5001;
const table ='Consultation';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'user',
    password: 'pass',
    database: 'ligtreDB',
    connectionLimit: 5
});

app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});

app.get('/', (req, res) => {
    console.log('server works');
});

app.get('/con', (req, res) => {
  pool.getConnection()
  .then(conn => {
    conn.query(`select * from ${table}`)
    .then((rows) => {
    console.log(rows);
    })
    .then((res) => {
      console.log(res);
      conn.end;
    })
    .catch(err => {
     console.log(err);
     conn.end;
    });
  });
}); 
