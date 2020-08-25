// const mariadb = require('mariadb/callback');

// const conn = mariadb.createConnection({
//       host: 'http://localhost:3000/', 
//       user:'root',
//       password: ''
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