
const express = require('./node_modules/express');
const mariadb = require('./node_modules/mariadb');
const cors = require('./node_modules/cors');

const app = express();
const port = 5001;

app.use(cors());

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'ligtre',
    password: 'kometa',
    database: 'ligtreDB',
    max: 20,
    idleTimeoutMillis: 1000
});

app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});

app.get('/consultation', (req, res) => {
  console.log('connectingC');
    pool.query(`select * from Consultation`)
      .then((rows) => {
        res.send(rows);
      })
      .catch(err => {
      console.log(err);
      })
});  

app.get('/consilium', (req, res) => {
  console.log('connecting');
    pool.query(`select * from Consilium`)
      .then((rows) => {
        res.send(rows);
      })
      .catch(err => {
      console.log(err);
      })
});  