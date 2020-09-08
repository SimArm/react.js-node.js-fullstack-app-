
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
    idleTimeoutMillis: 1000,
    multipleStatements: true
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

app.get('/report', (req, res) => {

  const workbook = new excel.Workbook();
  const consultationSheet = workbook.addWorksheet('Konsultacijos');
  const consiliumSheet = workbook.addWorksheet('Konsiliumas');
  const reportsSheet = workbook.addWorksheet('Ataskaita');
  
  consultationSheet.columns = [
    {header: 'Id', key: 'ID', width: 10},
    {header: 'Data', key: 'Time', width: 20},
    {header: 'Skyrius', key: 'Department', width: 20},
    {header: 'Skubus ar planinis', key: 'Urgency', width: 20},
    {header: 'Palatos nr.', key: 'Room', width: 20},
    {header: 'Pacientas', key: 'Patient', width: 20},
    {header: 'Kvieciantysis gyd.', key: 'Doctor', width: 20},
    {header: 'Specialistas', key: 'Specialist', width: 20},
    {header: 'Priezastis', key: 'Reason', width: 20},
    {header: 'Perdavimo laikas', key: 'PassTime', width: 20},
    {header: 'Prieme', key: 'AcceptBy', width: 20}
  ];

  consiliumSheet.columns = [
    {header: 'Id', key: 'ID', width: 10},
    {header: 'Data', key: 'Time', width: 20},
    {header: 'Skyrius', key: 'Department', width: 20},
    {header: 'Palatos nr.', key: 'Room', width: 20},
    {header: 'Pacientas', key: 'Patient', width: 20},
    {header: 'Kvieciantysis gyd.', key: 'Doctor', width: 20},
    {header: 'Specialistas', key: 'Specialist', width: 20},
    {header: 'Priezastis', key: 'Reason', width: 20},
    {header: 'Perdavimo laikas', key: 'PassTime', width: 20},
    {header: 'Prieme', key: 'AcceptBy', width: 20}
  ];

  reportsSheet.columns = [
      {header:'Palatos', key: 'Room',width: 20},
      {header:'Kartai', key: 'rTimes',width: 10},
      {header:'Pacientai', key: '',width: 20},
      {header:'Kartai', key: '',width: 10},
      {header:'Kvieciantysis gyd.', key: 'Doctor',width: 20},
      {header:'Kartai', key: 'dTimes',width: 10},
      {header:'Specialistai', key: '',width: 20},
      {header:'Kartai', key: '',width: 10},
      {header:'Priezastys', key: '',width: 20},
      {header:'Kartai', key: '',width: 10},
  ];
    
  const {sorting,startingDate,startingTime,endingDate,endingTime} = req.query;
  const SELECT_CONSULT_WHERE = `SELECT * FROM Consultation WHERE Time BETWEEN '${databaseDateFormat(startingDate,startingTime)}' AND '${databaseDateFormat(endingDate,endingTime)}' ORDER BY ${sorting}`;
  const SELECT_CONSILIUM_WHERE = `SELECT * FROM Consilium WHERE Time BETWEEN '${databaseDateFormat(startingDate,startingTime)}' AND '${databaseDateFormat(endingDate,endingTime)}' ORDER BY ${sorting}`;
  const COUNT_DB_VALUE = `SELECT Doctor, COUNT(*) dTimes FROM Consultation GROUP BY Doctor; SELECT Room, COUNT(*) rTimes FROM Consultation GROUP BY Room;`;

  pool.query(`${SELECT_CONSULT_WHERE}; ${SELECT_CONSILIUM_WHERE}; ${COUNT_DB_VALUE}`)
  .then((results) => {

    const consultExcelRows = JSON.parse(JSON.stringify(results[0]));
    consultationSheet.addRows(consultExcelRows);
    
    const consilExcelRows = JSON.parse(JSON.stringify(results[1]));
    consiliumSheet.addRows(consilExcelRows);

    const reportsExcelRows = JSON.parse(JSON.stringify(results[2]));
    const reportsExcelRows1 = JSON.parse(JSON.stringify(results[3]));
    const excelRows = [...reportsExcelRows, ...reportsExcelRows1];
    reportsSheet.addRows(excelRows);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'KonsultacijuAtaskaita.xlsx');

    workbook.xlsx.write(res)
    .then(() => {
        res.status(200).end();
    });

  })
  .catch(err => {
    console.log(err);
  });
}); 

const databaseDateFormat = (date,time) => { 
  const monthShortNames = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullDate = `${monthShortNames[parseInt(date.slice(5,7))]} ${date.slice(8,10)} ${date.slice(0,4)}${time}`;
  return fullDate;
}