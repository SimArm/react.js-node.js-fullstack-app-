// const mariadb = require('mariadb');

// const conn = mariadb.createConnection({
//       host: 'localhost', 
//       user:'ligtre',
//       password: 'kometa',
//       database: 'ligtreDB',
//       connectionLimit: 5
//     });


// const getConsultationData = () => {
//     conn.connect(err => {
//         if (err) {
//           console.log("not connected due to error: " + err);
//         } else {
//             conn.query("SELECT * from Consultation", (err,res,meta) => {
//                 return res; 
//             })
//         }
//         conn.end();
//       });      
// }    

// const getConsiliumData = () => {
//     conn.connect(err => {
//         if (err) {
//           console.log("not connected due to error: " + err);
//         } else {
//             conn.query("SELECT * from Consilium", (err,res,meta) => {
//                 return res; 
//             })
//         }
//         conn.end();
//       });      
// }    

// const setConsultationData = (record) => {
//     conn.connect(err => {
//     if (err) {    
//         console.log('not connecting due to error: ' + err); 
//     } else {
//         conn.query(`INSERT INTO Consultation (Time, Department, Urgency, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy) VALUES (
//             ${record.Time}, ${record.Department}, ${record.Urgency}, ${record.Room}, ${record.Patient}, ${record.Doctor}, ${record.Specialist}, ${record.Reason}, ${record.PassTime}, ${record.AcceptBy},
//         )`);
//     }
//     })
// }

// const setConsiliumData = (record) => {
//     conn.connect(err => {
//     if (err) {        
//         console.log('not connecting due to error: ' + err); 
//     } else {
//         conn.query(`INSERT INTO Consilium (Time, Department, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy) VALUES (
//             ${record.Time}, ${record.Department}, ${record.Room}, ${record.Patient}, ${record.Doctor}, ${record.Specialist}, ${record.Reason}, ${record.PassTime}, ${record.AcceptBy},
//         )`)
//     }
//     })
// }

// export default setConsultationData;