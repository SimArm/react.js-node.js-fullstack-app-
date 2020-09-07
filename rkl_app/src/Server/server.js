
const express = require('../node_modules/express');
const mariadb = require('../node_modules/mariadb');
const cors = require('../node_modules/cors');
const excel = require('../node_modules/exceljs');

const app = express();
const port = 5001;

app.use(cors());

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'ligtre',
    password: 'kometa',
    database: 'ligtreDB',
    connectionLimit: 10,
    idleTimeoutMillis: 1000
});

app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});

/* Getting data from DB */

app.get('/consultation', (req, res) => {
    pool.query(`select * from Consultation`)
      .then((rows) => {
        res.send(rows);
      })
      .catch(err => {
      console.log(err);
      })
});  

app.get('/consilium', (req, res) => {
    pool.query(`select * from Consilium`)
      .then((rows) => {
        res.send(rows);
      })
      .catch(err => {
      console.log(err);
      })
});  

/* Inserting into DB */

app.get('/consultation/add', (req, res) => {
  const {Time, Department, Urgency, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy} = req.query;
  const INSERT_CONSULT_QUERY = `INSERT INTO Consultation (Time, Department, Urgency, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy) VALUES ('${Time}', '${Department}', '${Urgency}', '${Room}', '${Patient}', '${Doctor}', '${Specialist}', '${Reason}', '${PassTime}', '${AcceptBy}') `;
  pool.query(INSERT_CONSULT_QUERY, (err, results) =>{
    console.log(err);
    pool.end();
  })
    .catch(err => {
      console.log(err);
    });
});

app.get('/consilium/add', (req, res) => {
  const {Time, Department, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy} = req.query;
  const INSERT_CONSIL_QUERY = `INSERT INTO Consilium (Time, Department, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy) VALUES ('${Time}', '${Department}', '${Room}', '${Patient}', '${Doctor}', '${Specialist}', '${Reason}', '${PassTime}', '${AcceptBy}') `;
  pool.query(INSERT_CONSIL_QUERY, (err, results) =>{
    console.log(err);
    pool.end();
  })
    .catch(err => {
      console.log(err);
    });
});

/* Exporting excel */

const workbook = new excel.Workbook();
const worksheet = workbook.addWorksheet('Consultation');

worksheet.columns = [
  {header: 'Id', key: '_ID', width: 10},
  {header: 'Data', key: 'Time', width: 20},
  {header: 'Skyrius', key: 'Department', width: 20},
  {header: 'Skubus ar planinis', key: 'Urgency', width: 20},
  {header: 'Palatos nr.', key: 'Room', width: 20},
  {header: 'Kvieciantysis gyd.', key: 'Doctor', width: 20},
  {header: 'Specialistas', key: 'Specialist', width: 20},
  {header: 'Priezastis', key: 'Reason', width: 20},
  {header: 'Perdavimo laikas', key: 'PassTime', width: 20},
  {header: 'Prieme', key: 'AcceptBy', width: 20}
];

app.get('/consultation/report', (req, res) => {
  const {sorting,startingDate,startingTime,endingDate,endingTime} =req.query;
  console.log(startingDate,startingTime);

  const SELECT_CONSULT_WHERE = `SELECT * FROM Consultation WHERE Time >= '${databaseDateFormat(startingDate,startingTime)}' AND Time <= '${databaseDateFormat(endingDate,endingTime)}' ORDER BY ${sorting} DESC`;
  pool.query(SELECT_CONSULT_WHERE)
    .then((rows) => {
      // async function sendWorkbook(workbook, response) { 
      //   const fileName = 'KonsultacijuAtaskaita.xlsx';
      
      //   response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      //   response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
      
      //    await workbook.xlsx.write(response);
      
      //   response.end();
      // }
      // sendWorkbook(workbook,rows);
      const excelRows = JSON.parse(JSON.stringify(rows));
      worksheet.addRows(excelRows);
      workbook.xlsx.writeFile("KonsultacijuAtaskaita.xlsx");
    })
    .catch(err => {
    console.log(err);
    })
});  



const databaseDateFormat = (date,time) => { 
  const monthShortNames = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullDate = `${monthShortNames[parseInT(date.slice(5,7))]} ${date.slice(8,10)} ${date.slice(0,4)}${time}`;
  return fullDate;
}