import React, {useState} from 'react';
import "./NewDataForm.scss";

import setData from "../../Commands/testingData";
import getData from "../../Commands/testingGet";

const NewDataForm = () => {

    const currentTime = () => {
        let time = Date().slice(16,21);
        return time;
    }

    let laikas = currentTime();

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

    const onSave = () => {
        const record = {Time: timeValue, Department: departmentValue, Urgency:urgencyValue, Room:roomValue, Patient:patientValue, Doctor:doctorValue, Specialist:specialistValue, Reason:reasonValue, PassTime:passTimeValue, AcceptBy:acceptByValue,};
        let recordArray = getData() || [];
        recordArray.push(record);
        setData(recordArray);
        console.log('issaugota');
    }

    return (
        <div className="newDataWrapper">
            <form>
                <div>
                    <label htmlFor="Time">Laikas</label>
                    <input type="time" placeholder={currentTime()} name="Time" id="Time" value={timeValue || currentTime()} onChange={updateTime}/>
                </div>
                <div>
                    <label htmlFor="Department">Skyrius</label>
                    <input type="text" placeholder="Department" name="Department" id="Department" value={departmentValue} onChange={updateDepartment}/>
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
                    <input type="text" placeholder="Palata" name="Room" id="Room" value={roomValue} onChange={updateRoom}/>
                </div>
                <div>
                    <label htmlFor="Patient">Pacientas:</label>
                    <input type="text" placeholder="Pacientas" name="Patient" id="Patient" value={patientValue} onChange={updatePatient}/>
                </div>
                <div>
                    <label htmlFor="Doctor">Kvieciantysis gydytojas:</label>
                    <input type="text" placeholder="Gydytojas" name="Doctor" id="Doctor" value={doctorValue} onChange={updateDoctor}/>
                </div>
                <div>
                    <label htmlFor="Specialist">Specialistas:</label>
                    <input type="text" placeholder="terapiautas" name="Specialist" id="Specialist" value={specialistValue} onChange={updateSpecialist}/>
                </div>
                <div>
                    <label htmlFor="Reason">Priežastis:</label>
                    <input type="text" placeholder="Priežastis" name="Reason" id="Reason" value={reasonValue} onChange={updateReason}/>
                </div>
                <div>
                    <label htmlFor="PassTime">Perdavimo Laikas:</label>
                    <input type="time" placeholder={currentTime()} name="PassTime" id="PassTime" value={passTimeValue || currentTime()} onChange={updatePassTime}/>
                </div>
                <div>
                    <label htmlFor="AcceptBy">Prieme:</label>
                    <input type="text" placeholder="Prieme" name="AcceptBy" id="AcceptBy" value={acceptByValue} onChange={updateAcceptBy}/>
                </div>
                <button onClick={onSave}>Saugoti</button>
            </form>
        </div>
    );
    
}

export default NewDataForm;