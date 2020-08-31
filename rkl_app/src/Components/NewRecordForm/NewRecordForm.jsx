import React, {useState} from 'react';
import "./NewRecordForm.scss";

import setData from "../../Commands/testingData";
import getData from "../../Commands/testingGet";
import setConsiliumData from "../../Commands/testingConsiliumData";
import getConsiliumData from "../../Commands/testingConsiliumGet";
import setConsultationData from '../../Commands/connect';

const NewRecordForm = ({ConsiliumTab}) => {

    const currentTime = () => {
        let time = Date().slice(16,21);
        return time;
    }

    let laikas = currentTime();
    const recordsData = getData() || [];
    // const lastRecord = recordsData.slice(-1)[0]; paskutinis record from DB

    const currentDate = Date().slice(4,15);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

    const [timeValue, setTime] = useState(laikas);
    const [departmentValue, setDepartment] = useState('');
    const [urgencyValue, setUrgency] = useState('Skubus');
    const [roomValue, setRoom] = useState('');
    const [patientValue, setPatient] = useState('');
    const [doctorValue, setDoctor] = useState('');
    const [specialistValue, setSpecialist] = useState('');
    const [reasonValue, setReason] = useState('');
    const [passTimeValue, setPassTime] = useState(laikas);
    const [acceptByValue, setAcceptBy] = useState('');

    const updateTime = (event) => {
        const { value } = event.target;
        setTime(value);
    }

    const updateDepartment = (event) => {
        const { value } = event.target;
        setDepartment(value);
    }

    const updateUrgency = (event) => {
        const { value } = event.target;
        setUrgency(value);
    }

    const updateRoom = (event) => {
        const { value } = event.target;
        setRoom(value);
    }

    const updatePatient = (event) => {
        const { value } = event.target;
        setPatient(value);
    }

    const updateDoctor = (event) => {
        const { value } = event.target;
        setDoctor(value);
    }

    const updateSpecialist= (event) => {
        const { value } = event.target;
        setSpecialist(value);
    }

    const updateReason = (event) => {
        const { value } = event.target;
        setReason(value);
    }

    const updatePassTime = (event) => {
        const { value } = event.target;
        setPassTime(value);
    }

    const updateAcceptBy = (event) => {
        const { value } = event.target;
        setAcceptBy(value);
    }

    const validation = () => { 
        for (let field in document.querySelector('input')) {
            if (field) {
                field.value = field.value.trim();
                if (isNaN(parseFloat(field.value))) {
                    return alert("Tuscias laukelis");
                }
            }               
        }
    }

    const onSaveConsultation = () => {
        validation();
        const record = {Time: currentDate + timeValue, Department: departmentValue, Urgency:urgencyValue, Room:roomValue, Patient:patientValue, Doctor:doctorValue, Specialist:specialistValue, Reason:reasonValue, PassTime:passTimeValue, AcceptBy:acceptByValue,};
        let recordArray = getData() || [];
        recordArray.push(record);
        setData(recordArray); // change for servers
    }

    const onSaveConsilium = () => {
        const record = {Time: currentDate + timeValue, Department: departmentValue, Room:roomValue, Patient:patientValue, Doctor:doctorValue, Specialist:specialistValue, Reason:reasonValue, PassTime:passTimeValue, AcceptBy:acceptByValue,};
        let consiliumRecordArray = getConsiliumData() || [];
        consiliumRecordArray.push(record);
        setConsiliumData(consiliumRecordArray);
    }

    return (
        <div className="newRecordWrapper">
            <form>
                <div>
                    <label htmlFor="Time">Laikas</label>
                    <input type="time" placeholder={currentTime()} name="Time" id="Time" value={timeValue || currentTime()} onChange={updateTime}/>
                </div>
                <div>
                    <label htmlFor="Department">Skyrius</label>
                    <input type="text" placeholder="Skyrius" name="Department" id="Department" value={departmentValue} onChange={updateDepartment} required/>
                </div>
                <div>
                    <label htmlFor="Urgency">Skuba</label>
                    <select id="Urgency" name="Urgency" value={urgencyValue} onChange={updateUrgency}>
                        <option value="Skubus">Skubus</option>
                        <option value="Planinis">Planinis</option>
                    </select>    
                </div>
                <div>
                    <label htmlFor="Room">Palata:</label>
                    <input type="text" placeholder="Palata" name="Room" id="Room" value={roomValue} onChange={updateRoom} required/>
                </div>
                <div>
                    <label htmlFor="Patient">Pacientas:</label>
                    <input type="text" placeholder="Pacientas" name="Patient" id="Patient" value={patientValue} onChange={updatePatient} required/>
                </div>
                <div>
                    <label htmlFor="Doctor">Kvieciantysis gydytojas:</label>
                    <input type="text" placeholder="Gydytojas" name="Doctor" id="Doctor" value={doctorValue} onChange={updateDoctor} required/>
                </div>
                <div>
                    <label htmlFor="Specialist">Specialistas:</label>
                    <input type="text" placeholder="Specialistas" name="Specialist" id="Specialist" value={specialistValue} onChange={updateSpecialist} required/>
                </div>
                <div>
                    <label htmlFor="Reason">Priežastis:</label>
                    <input type="text" placeholder="Priežastis" name="Reason" id="Reason" value={reasonValue} onChange={updateReason} required/>
                </div>
                <div>
                    <label htmlFor="PassTime">Perdavimo Laikas:</label>
                    <input type="time" placeholder={currentTime()} name="PassTime" id="PassTime" value={passTimeValue || currentTime()} onChange={updatePassTime}/>
                </div>
                <div>
                    <label htmlFor="AcceptBy">Prieme:</label>
                    <input type="text" placeholder="Prieme" name="AcceptBy" id="AcceptBy" value={acceptByValue} onChange={updateAcceptBy} required/>
                </div>
                <button onClick={ConsiliumTab ? onSaveConsilium : onSaveConsultation}>Saugoti</button>
            </form>
        </div>
    );
    
}

export default NewRecordForm;