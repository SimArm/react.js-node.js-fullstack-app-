
const express = require('../node_modules/express');
const mariadb = require('../node_modules/mariadb');
const cors = require('../node_modules/cors');
const excel = require('../node_modules/exceljs');
const path = require('path');

const app = express();
const port = 5001;

app.use(cors());

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'database',
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

app.get('/consiliumExtras', (req, res) => {
  pool.query(`select * from ConsiliumExtras`)
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
  const INSERT_CONSULT_QUERY = `INSERT INTO Consultation (Time, Department, Urgency, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy) VALUES ('${Time}', '${toTitleCase(Department)}', '${Urgency}', '${Room}', '${toTitleCase(Patient)}', '${toTitleCase(Doctor)}', '${toTitleCase(Specialist)}', '${toTitleCase(Reason)}', '${PassTime}', '${toTitleCase(AcceptBy)}') `;
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
  const INSERT_CONSIL_QUERY = `INSERT INTO Consilium (Time, Department, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy) VALUES ('${Time}', '${toTitleCase(Department)}', '${Room}', '${toTitleCase(Patient)}', '${toTitleCase(Doctor)}', '${toTitleCase(Specialist)}', '${toTitleCase(Reason)}', '${PassTime}', '${toTitleCase(AcceptBy)}') `;
  pool.query(INSERT_CONSIL_QUERY, (err, results) =>{
    console.log(err);
    pool.end();
  })
    .catch(err => {
      console.log(err);
    });
});

app.get('/consilium/addextra', (req, res) => {
  const {ConsId,Time, Department, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy} = req.query;
  const INSERT_CONSIL_QUERY = `INSERT INTO ConsiliumExtras (ConsId, Time, Department, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy) VALUES ('${ConsId}', '${Time}', '${toTitleCase(Department)}', '${Room}', '${toTitleCase(Patient)}', '${toTitleCase(Doctor)}', '${toTitleCase(Specialist)}', '${toTitleCase(Reason)}', '${PassTime}', '${toTitleCase(AcceptBy)}') `;
  pool.query(INSERT_CONSIL_QUERY, (err, results) =>{
    console.log(err);
    pool.end();
  })
    .catch(err => {
      console.log(err);
    });
});

/* Editing existing data*/

app.get('/consultation/edit', (req, res) => {
  const {ID, Time, Department, Urgency, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy} = req.query;
  const EDIT_CONSULT_QUERY = `UPDATE Consultation SET Time='${Time}', Department='${toTitleCase(Department)}', Urgency='${Urgency}', Room='${Room}', Patient='${toTitleCase(Patient)}', Doctor='${toTitleCase(Doctor)}', Specialist='${toTitleCase(Specialist)}', Reason='${toTitleCase(Reason)}', PassTime='${PassTime}', AcceptBy='${toTitleCase(AcceptBy)}' WHERE ID='${ID}' `;
  pool.query(EDIT_CONSULT_QUERY, (err, results) =>{
    console.log(err);
    pool.end();
  })
    .catch(err => {
      console.log(err);
    });
});

app.get('/consilium/edit', (req, res) => {
  const {ID, Time, Department, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy} = req.query;
  const EDIT_CONSIL_QUERY = `UPDATE Consilium SET Time='${Time}', Department='${toTitleCase(Department)}', Room='${Room}', Patient='${toTitleCase(Patient)}', Doctor='${toTitleCase(Doctor)}', Specialist='${toTitleCase(Specialist)}', Reason='${toTitleCase(Reason)}', PassTime='${PassTime}', AcceptBy='${toTitleCase(AcceptBy)}' WHERE ID='${ID}' `;
  pool.query(EDIT_CONSIL_QUERY, (err, results) =>{
    console.log(err);
    pool.end();
  })
    .catch(err => {
      console.log(err);
    });
});
/* Delete existing data */

app.get('/consultation/delete', (req, res) => {
  const {ID} = req.query;
  const DELETE_CONSULT_QUERY = `DELETE from Consultation WHERE ID=${ID}`;
  pool.query(DELETE_CONSULT_QUERY, (err, results) =>{
    console.log(err);
    pool.end();
  })
    .catch(err => {
      console.log(err);
    });
});

app.get('/consilium/delete', (req, res) => {
  const {ID} = req.query;
  const DELETE_CONSIL_QUERY = `DELETE from Consilium WHERE ID=${ID}`;
  const DELETE_EXTRAS_QUERY = `DELETE from ConsiliumExtras WHERE ConsId=${ID}`;
  pool.query(DELETE_CONSIL_QUERY, (err, results) =>{
    console.log(err);
    pool.end();
  })
  .catch(err => {
    console.log(err);
  });
  pool.query(DELETE_EXTRAS_QUERY, (err, results) =>{
    console.log(err);
    pool.end();
  })
  .catch(err => {
    console.log(err);
  });
});

app.get('/consiliumExtras/delete', (req, res) => {
  const {ID} = req.query;
  const DELETE_EXTRA_QUERY = `DELETE from ConsiliumExtras WHERE ID=${ID}`;
  pool.query(DELETE_EXTRA_QUERY, (err, results) =>{
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
  const reportsSheet = workbook.addWorksheet('Konsultaciju ataskaita');
  
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
      {header:'Skyrius', key: 'Department',width: 20},
      {header:'Kartai', key: 'depTimes',width: 10},
      {header:'Palatos', key: 'Room',width: 20},
      {header:'Kartai', key: 'roomTimes',width: 10},
      {header:'Pacientai', key: 'Patient',width: 20},
      {header:'Kartai', key: 'pTimes',width: 10},
      {header:'Kvieciantysis gyd.', key: 'Doctor',width: 20},
      {header:'Kartai', key: 'docTimes',width: 10},
      {header:'Specialistai', key: 'Specialist',width: 20},
      {header:'Kartai', key: 'sTimes',width: 10},
      {header:'Priezastys', key: 'Reason',width: 20},
      {header:'Kartai', key: 'reasonTimes',width: 10},
      {header:'Prieme', key: 'AcceptBy',width: 20},
      {header:'Kartai', key: 'aTimes',width: 10}
  ];
    
  const {sorting,startingDate,startingTime,endingDate,endingTime} = req.query;
  const SELECT_CONSULT_WHERE = `SELECT * FROM Consultation WHERE Time BETWEEN '${databaseDateFormat(startingDate,startingTime)}' AND '${databaseDateFormat(endingDate,endingTime)}' ORDER BY ${sorting}`;
  const SELECT_CONSILIUM_WHERE = `SELECT * FROM Consilium WHERE Time BETWEEN '${databaseDateFormat(startingDate,startingTime)}' AND '${databaseDateFormat(endingDate,endingTime)}' ORDER BY ${ sorting !== 'Urgency' ? sorting : 'Id'}`;
  const COUNT_DB_VALUES = `
  SELECT Department, COUNT(*) depTimes FROM Consultation WHERE Time BETWEEN '${databaseDateFormat(startingDate,startingTime)}' AND '${databaseDateFormat(endingDate,endingTime)}' GROUP BY Department ORDER BY depTimes DESC; 
  SELECT Room, COUNT(*) roomTimes FROM Consultation WHERE Time BETWEEN '${databaseDateFormat(startingDate,startingTime)}' AND '${databaseDateFormat(endingDate,endingTime)}' GROUP BY Room ORDER BY roomTimes DESC; 
  SELECT Patient, COUNT(*) pTimes FROM Consultation WHERE Time BETWEEN '${databaseDateFormat(startingDate,startingTime)}' AND '${databaseDateFormat(endingDate,endingTime)}' GROUP BY Patient ORDER BY pTimes DESC; 
  SELECT Doctor, COUNT(*) docTimes FROM Consultation WHERE Time BETWEEN '${databaseDateFormat(startingDate,startingTime)}' AND '${databaseDateFormat(endingDate,endingTime)}' GROUP BY Doctor ORDER BY docTimes DESC; 
  SELECT Specialist, COUNT(*) sTimes FROM Consultation WHERE Time BETWEEN '${databaseDateFormat(startingDate,startingTime)}' AND '${databaseDateFormat(endingDate,endingTime)}' GROUP BY Specialist ORDER BY sTimes DESC; 
  SELECT Reason, COUNT(*) reasonTimes FROM Consultation WHERE Time BETWEEN '${databaseDateFormat(startingDate,startingTime)}' AND '${databaseDateFormat(endingDate,endingTime)}' GROUP BY Reason ORDER BY reasonTimes DESC; 
  SELECT AcceptBy, COUNT(*) aTimes FROM Consultation WHERE Time BETWEEN '${databaseDateFormat(startingDate,startingTime)}' AND '${databaseDateFormat(endingDate,endingTime)}' GROUP BY AcceptBy ORDER BY aTimes DESC; 
  `;



  pool.query(`${SELECT_CONSULT_WHERE}; ${SELECT_CONSILIUM_WHERE}; ${COUNT_DB_VALUES}`)
  .then(async (results) => {

    const consultExcelRows = JSON.parse(JSON.stringify(results[0]));
    consultationSheet.addRows(consultExcelRows);

    const consilExcelRows = JSON.parse(JSON.stringify(results[1]));

    const consilIdObj = [];
    consilExcelRows.map((el)=>{
      consilIdObj.push(el.ID);
    });
 
    const SELECT_EXTRAS_WHERE = `SELECT * FROM ConsiliumExtras WHERE ConsId in (${consilIdObj.toString()});`;
    await pool.query(SELECT_EXTRAS_WHERE).then((results)=>{
        const extrasData = [];  
        extrasData.push(...results);
                for (const {ConsId: ID, Time: Time, Department: Department, Room: Room, Patient: Patient, Doctor: Doctor, Specialist: Specialist, Reason: Reason, PassTime: PassTime, AcceptBy: AcceptBy} of extrasData) {
          let tempObj = {ID: ID,Time: Time, Department: Department, Room: Room, Patient: Patient, Doctor: Doctor, Specialist: Specialist, Reason: Reason, PassTime: PassTime, AcceptBy: AcceptBy};
          consilExcelRows.push(tempObj);
        }
    })
    .then(() =>{
      consilExcelRows.sort((a, b) => parseFloat(a.ID) - parseFloat(b.ID));
      consiliumSheet.addRows(consilExcelRows);
    })
    .catch(err => {
      console.log(err);
    });

    const reportsExcelRows = JSON.parse(JSON.stringify(results[2]));
    const reportsExcelRows1 = JSON.parse(JSON.stringify(results[3]));
    const reportsExcelRows2 = JSON.parse(JSON.stringify(results[4]));
    const reportsExcelRows3 = JSON.parse(JSON.stringify(results[5]));
    const reportsExcelRows4 = JSON.parse(JSON.stringify(results[6]));
    const reportsExcelRows5 = JSON.parse(JSON.stringify(results[7]));
    const reportsExcelRows6 = JSON.parse(JSON.stringify(results[8]));
      
    let longestCol = [
      Object.keys(reportsExcelRows).length,
      Object.keys(reportsExcelRows1).length,
      Object.keys(reportsExcelRows2).length,
      Object.keys(reportsExcelRows3).length,
      Object.keys(reportsExcelRows4).length,
      Object.keys(reportsExcelRows5).length,
      Object.keys(reportsExcelRows6).length
    ]

    const reportsObject = [];
    for(i=0; i < Math.max(...longestCol); i++){
      let tempObj = reportsExcelRows[i];
      let tempObj1 = reportsExcelRows1[i];
      let tempObj2 = reportsExcelRows2[i];
      let tempObj3 = reportsExcelRows3[i];
      let tempObj4 = reportsExcelRows4[i];
      let tempObj5 = reportsExcelRows5[i];
      let tempObj6 = reportsExcelRows6[i];
      let tempObjData = Object.assign(tempObj || '', tempObj1 || '', tempObj2 || '', tempObj3 || '', tempObj4 || '', tempObj5 || '', tempObj6 || '');
      reportsObject.push(tempObjData);
    }
    reportsSheet.addRows(reportsObject);
    })
  .then(()=>{
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'KonsultacijuAtaskaita.xlsx');
    workbook.xlsx.write(res)
    .then(() => {
        res.status(200).end();
    })
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

const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
