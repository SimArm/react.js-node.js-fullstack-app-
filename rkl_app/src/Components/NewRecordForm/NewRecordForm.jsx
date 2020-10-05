import React, {useState, useEffect} from 'react';
import "./NewRecordForm.scss";

const NewRecordForm = ({ConsiliumTab, dataDB}) => {

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
    const [passTimeValue, setPassTime] = useState('');
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
        const record = {Time: currentDate() + timeValue, Department: departmentValue, Urgency:urgencyValue, Room:roomValue, Patient:patientValue, Doctor:doctorValue, Specialist:specialistValue, Reason:reasonValue, AcceptBy:acceptByValue,};
        Object.values(record).every(x => (x !== null && x !== '')) && 
        fetch(`http://172.18.218.15:5001/consultation/add?Time=${record.Time}&Department=${record.Department}&Urgency=${record.Urgency}&Room=${record.Room}&Patient=${record.Patient}&Doctor=${record.Doctor}&Specialist=${record.Specialist}&Reason=${record.Reason}&PassTime=${passTimeValue}&AcceptBy=${record.AcceptBy}`)
        .then(response => response.json()).catch(err => console.error(err));
    }

    const onSaveConsilium = () => {
        const record = {Time: currentDate() + timeValue, Department: departmentValue, Room:roomValue, Patient:patientValue, Doctor:doctorValue, Specialist:specialistValue, Reason:reasonValue, AcceptBy:acceptByValue,};
        Object.values(record).every(x => (x !== null && x !== '')) && 
        fetch(`http://172.18.218.15:5001/consilium/add?Time=${record.Time}&Department=${record.Department}&Room=${record.Room}&Patient=${record.Patient}&Doctor=${record.Doctor}&Specialist=${record.Specialist}&Reason=${record.Reason}&PassTime=${passTimeValue}&AcceptBy=${record.AcceptBy}`)
        .then(response => response.json()).catch(err => console.error(err));
    }

    const database = dataDB || [];

    const commonValues = (arr, property) => {
        let valuesArray = arr.map(el => el[property]) || [];
        let commonValuesArr = [];

        for (let i=0; i<5; i++) {

            let commonValue = valuesArray.sort((a,b) =>
                    valuesArray.filter(v => v===a).length
                    - valuesArray.filter(v => v===b).length
                ).pop();
            commonValuesArr.push(commonValue);

            valuesArray = valuesArray.filter((obj) => {
                return obj !== commonValue;
            });
        }
        return commonValuesArr;
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
                    <input type="text" placeholder="Skyrius" name="Department" id="Department" list='depSuggest' value={departmentValue} onChange={updateDepartment} autoComplete="off" required/>
                    <datalist id='depSuggest'>
                        <option value={commonValues(database, 'Department')[0]}></option>
                        <option value={commonValues(database, 'Department')[1]}></option>
                        <option value={commonValues(database, 'Department')[2]}></option>
                        <option value={commonValues(database, 'Department')[3]}></option>
                        <option value={commonValues(database, 'Department')[4]}></option>
                    </datalist>
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
                    <input type="text" placeholder="Palata" name="Room" id="Room" list="rSuggest" value={roomValue} onChange={updateRoom} autoComplete="off" required/>
                    <datalist id='rSuggest'>
                        <option value={commonValues(database, 'Room')[0]}></option>
                        <option value={commonValues(database, 'Room')[1]}></option>
                        <option value={commonValues(database, 'Room')[2]}></option>
                        <option value={commonValues(database, 'Room')[3]}></option>
                        <option value={commonValues(database, 'Room')[4]}></option>
                    </datalist>
                </div>
                <div>
                    <label htmlFor="Patient">Pacientas:</label>
                    <input type="text" placeholder="Pacientas" name="Patient" id="Patient" list="pSuggest" value={patientValue} onChange={updatePatient} autoComplete="off" required/>
                    <datalist id='pSuggest'>
                        <option value={commonValues(database, 'Patient')[0]}></option>
                        <option value={commonValues(database, 'Patient')[1]}></option>
                        <option value={commonValues(database, 'Patient')[2]}></option>
                        <option value={commonValues(database, 'Patient')[3]}></option>
                        <option value={commonValues(database, 'Patient')[4]}></option>
                    </datalist>
                </div>
                <div>
                    <label htmlFor="Doctor">Kvieciantysis gydytojas:</label>
                    <input type="text" placeholder="Gydytojas" name="Doctor" id="Doctor" list="docSuggest" value={doctorValue} onChange={updateDoctor} autoComplete="off" required/>
                    <datalist id='docSuggest'>
                        <option value={commonValues(database, 'Doctor')[0]}></option>
                        <option value={commonValues(database, 'Doctor')[1]}></option>
                        <option value={commonValues(database, 'Doctor')[2]}></option>
                        <option value={commonValues(database, 'Doctor')[3]}></option>
                        <option value={commonValues(database, 'Doctor')[4]}></option>
                    </datalist>
                </div>
                <div>
                    <label htmlFor="Specialist">Specialistas:</label>
                    <input type="text" placeholder="Specialistas" name="Specialist" id="Specialist" list="specSuggest" value={specialistValue} onChange={updateSpecialist} autoComplete="off" required/>
                    <datalist id='specSuggest'>
                        <option value={commonValues(database, 'Specialist')[0]}></option>
                        <option value={commonValues(database, 'Specialist')[1]}></option>
                        <option value={commonValues(database, 'Specialist')[2]}></option>
                        <option value={commonValues(database, 'Specialist')[3]}></option>
                        <option value={commonValues(database, 'Specialist')[4]}></option>
                    </datalist>
                </div>
                <div>
                    <label htmlFor="Reason">Priežastis:</label>
                    <input type="text" placeholder="Priežastis" name="Reason" id="Reason" list="reasSuggest" value={reasonValue} onChange={updateReason} autoComplete="off" required/>
                    <datalist id='reasSuggest'>
                        <option value={commonValues(database, 'Reason')[0]}></option>
                        <option value={commonValues(database, 'Reason')[1]}></option>
                        <option value={commonValues(database, 'Reason')[2]}></option>
                        <option value={commonValues(database, 'Reason')[3]}></option>
                        <option value={commonValues(database, 'Reason')[4]}></option>
                    </datalist>
                </div>
                <div>
                    <label htmlFor="PassTime">Perdavimo Laikas:</label>
                    <input type="time" name="PassTime" id="PassTime" onChange={updatePassTime}/>
                </div>
                <div>
                    <label htmlFor="AcceptBy">Prieme:</label>
                    <input type="text" placeholder="Prieme" name="AcceptBy" id="AcceptBy" list="accepSuggest" value={acceptByValue} onChange={updateAcceptBy} autoComplete="off" required/>
                    <datalist id='accepSuggest'>
                        <option value={commonValues(database, 'AcceptBy')[0]}></option>
                        <option value={commonValues(database, 'AcceptBy')[1]}></option>
                        <option value={commonValues(database, 'AcceptBy')[2]}></option>
                        <option value={commonValues(database, 'AcceptBy')[3]}></option>
                        <option value={commonValues(database, 'AcceptBy')[4]}></option>
                    </datalist>
                </div>
                <button onClick={ConsiliumTab ? onSaveConsilium : onSaveConsultation}>Saugoti</button>
            </form>
        </div>
    );  
}

export default NewRecordForm;