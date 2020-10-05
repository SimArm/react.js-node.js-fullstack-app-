import React, {useState, useEffect} from 'react';
import "./NewRecordForm.scss";

const NewRecordForm = ({ConsiliumTab}) => {

    const currentTime = () => {
        let time = Date().slice(16,21);
        return time;
    }

    const getMonthFromString = (mon, year) => new Date(Date.parse(mon +` 1, ${year}`)).getMonth()+1 ;

    const currentDate = () => {
        let currentMonth = getMonthFromString(Date().slice(4,7),Date().slice(11,15));
        console.log(currentMonth);
        return `${currentMonth}${Date().slice(7,15)}`;
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

    const [laikas, setLaikas] = useState(currentTime());
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

    useEffect(() => {
        const timer = window.setInterval(() => {
            setLaikas(currentTime());
        },1000);
        window.clearInterval(timer);
    },[laikas]);

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

    const onSaveConsultation = () => {                                                                                                                          
        const record = {Time: currentDate() + timeValue, Department: departmentValue, Urgency:urgencyValue, Room:roomValue, Patient:patientValue, Doctor:doctorValue, Specialist:specialistValue, Reason:reasonValue, PassTime:passTimeValue, AcceptBy:acceptByValue,};
        Object.values(record).every(x => (x !== null && x !== '')) && 
        fetch(`http://172.18.218.15:5001/consultation/add?Time=${record.Time}&Department=${record.Department}&Urgency=${record.Urgency}&Room=${record.Room}&Patient=${record.Patient}&Doctor=${record.Doctor}&Specialist=${record.Specialist}&Reason=${record.Reason}&PassTime=${record.PassTime}&AcceptBy=${record.AcceptBy}`)
        .then(response => response.json()).catch(err => console.error(err));
    }

    const onSaveConsilium = () => {
        const record = {Time: currentDate() + timeValue, Department: departmentValue, Room:roomValue, Patient:patientValue, Doctor:doctorValue, Specialist:specialistValue, Reason:reasonValue, PassTime:passTimeValue, AcceptBy:acceptByValue,};
        Object.values(record).every(x => (x !== null && x !== '')) && 
        fetch(`http://172.18.218.15:5001/consilium/add?Time=${record.Time}&Department=${record.Department}&Room=${record.Room}&Patient=${record.Patient}&Doctor=${record.Doctor}&Specialist=${record.Specialist}&Reason=${record.Reason}&PassTime=${record.PassTime}&AcceptBy=${record.AcceptBy}`)
        .then(response => response.json()).catch(err => console.error(err));
    }

    return (
        <div className="newRecordWrapper">
            <form>
                <div>
                    <label htmlFor="Time">Laikas</label>
                    <input type="time" placeholder={laikas} name="Time" id="Time" value={timeValue || laikas} onChange={updateTime}/>
                </div>
                <div>
                    <label htmlFor="Department">Skyrius</label>
                    <input type="text" placeholder="Skyrius" name="Department" id="Department" value={departmentValue} onChange={updateDepartment} required/>
                </div>
                <div className={ConsiliumTab && 'disabled'}>
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
                    <input type="time" placeholder={laikas} name="PassTime" id="PassTime" value={passTimeValue || laikas} onChange={updatePassTime}/>
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