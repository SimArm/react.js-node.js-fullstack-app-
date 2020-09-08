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
  
    // reportsSheet.columns = [
    //     {header:, key:,width: 20},
    //     {header:, key:,width: 20}
    // ];


    const {sorting,startingDate,startingTime,endingDate,endingTime} = req.query;
    const SELECT_CONSULT_WHERE = `SELECT * FROM Consultation WHERE Time BETWEEN '${databaseDateFormat(startingDate,startingTime)}' AND '${databaseDateFormat(endingDate,endingTime)}' ORDER BY ${sorting}`;
    pool.query(SELECT_CONSULT_WHERE)
    .then((rows) => {
  
      const excelRows = JSON.parse(JSON.stringify(rows));
      console.log(excelRows);
      consultationSheet.addRows(excelRows);

    })
    .catch(err => {
      console.log(err);
    });

    const SELECT_CONSULT_WHERE = `SELECT * FROM Consilium WHERE Time BETWEEN '${databaseDateFormat(startingDate,startingTime)}' AND '${databaseDateFormat(endingDate,endingTime)}' ORDER BY ${sorting}`;
    pool.query(SELECT_CONSULT_WHERE)
    .then((rows) => {
  
      const excelRows = JSON.parse(JSON.stringify(rows));
      consiliumSheet.addRows(excelRows);

    })
    .catch(err => {
        console.log(err);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'KonsultacijuAtaskaita.xlsx');

    workbook.xlsx.write(res)
    .then(() => {
        res.status(200).end();
    });
}); 
  
const databaseDateFormat = (date,time) => { 
    const monthShortNames = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const fullDate = `${monthShortNames[parseInt(date.slice(5,7))]} ${date.slice(8,10)} ${date.slice(0,4)}${time}`;
    return fullDate;
}


// app.get('/report', (req, res) => {

//   const workbook = new excel.Workbook();
//   const worksheet = workbook.addWorksheet('Konsultacijos');
  
//   worksheet.columns = [
//     {header: 'Id', key: 'ID', width: 10},
//     {header: 'Data', key: 'Time', width: 20},
//     {header: 'Skyrius', key: 'Department', width: 20},
//     {header: 'Skubus ar planinis', key: 'Urgency', width: 20},
//     {header: 'Palatos nr.', key: 'Room', width: 20},
//     {header: 'Pacientas', key: 'Patient', width: 20},
//     {header: 'Kvieciantysis gyd.', key: 'Doctor', width: 20},
//     {header: 'Specialistas', key: 'Specialist', width: 20},
//     {header: 'Priezastis', key: 'Reason', width: 20},
//     {header: 'Perdavimo laikas', key: 'PassTime', width: 20},
//     {header: 'Prieme', key: 'AcceptBy', width: 20}
//   ];

//   const {sorting,startingDate,startingTime,endingDate,endingTime} = req.query;
//   const SELECT_CONSULT_WHERE = `SELECT * FROM Consultation WHERE Time BETWEEN '${databaseDateFormat(startingDate,startingTime)}' AND '${databaseDateFormat(endingDate,endingTime)}' ORDER BY ${sorting}`;
//    pool.query(SELECT_CONSULT_WHERE)
//   .then((rows) => {

//     const excelRows = JSON.parse(JSON.stringify(rows));
//     worksheet.addRows(excelRows);
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', 'attachment; filename=' + 'KonsultacijuAtaskaita.xlsx');
 
//     workbook.xlsx.write(res)
//       .then(() => {
//           res.status(200).end();
//       });
//   })
//   .catch(err => {
//     console.log(err);
//   })
// }); 

// app.get('/consilium/report', (req, res) => {

//   const workbook = new excel.Workbook();
//   const worksheet = workbook.addWorksheet('Konsiliumai');
  
//   worksheet.columns = [
//     {header: 'Id', key: 'ID', width: 10},
//     {header: 'Data', key: 'Time', width: 20},
//     {header: 'Skyrius', key: 'Department', width: 20},
//     {header: 'Palatos nr.', key: 'Room', width: 20},
//     {header: 'Pacientas', key: 'Patient', width: 20},
//     {header: 'Kvieciantysis gyd.', key: 'Doctor', width: 20},
//     {header: 'Specialistas', key: 'Specialist', width: 20},
//     {header: 'Priezastis', key: 'Reason', width: 20},
//     {header: 'Perdavimo laikas', key: 'PassTime', width: 20},
//     {header: 'Prieme', key: 'AcceptBy', width: 20}
//   ];

//   const {sorting,startingDate,startingTime,endingDate,endingTime} = req.query;
//   const SELECT_CONSULT_WHERE = `SELECT * FROM Consilium WHERE Time BETWEEN '${databaseDateFormat(startingDate,startingTime)}' AND '${databaseDateFormat(endingDate,endingTime)}' ORDER BY ${sorting}`;
//    pool.query(SELECT_CONSULT_WHERE)
//   .then((rows) => {

//     const excelRows = JSON.parse(JSON.stringify(rows));
//     worksheet.addRows(excelRows);
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', 'attachment; filename=' + 'KonsiliumuAtaskaita.xlsx');
 
//     workbook.xlsx.write(res)
//       .then(() => {
//           res.status(200).end();
//       });
//   })
//   .catch(err => {
//     console.log(err);
//   })
// });  

// const databaseDateFormat = (date,time) => { 
//   const monthShortNames = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun",
//   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const fullDate = `${monthShortNames[parseInt(date.slice(5,7))]} ${date.slice(8,10)} ${date.slice(0,4)}${time}`;
//   return fullDate;
// }