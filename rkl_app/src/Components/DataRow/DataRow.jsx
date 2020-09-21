import React, {useState} from 'react';
import "./DataRow.scss";

const DataRow = ({isDisabled, Time, ID, Department, Urgency, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy}) => {

    const getMonthFromString = (mon) => new Date(Date.parse(mon +" 1, 2020")).getMonth()+1 ;

    const urgencyClasses = () => {
       return `${isDisabled ? 'is-disabled' : 'col-custom'} ${Urgency === 'Planinis' ? 'planinis' : 'skubus'}`
    }

    const editRow = () => {
        const currentRow = document.getElementById(`EditingRow${ID}`);
        const editRowClass = currentRow.getAttribute('class');
        currentRow.removeAttribute('class');
        currentRow.setAttribute('class', editRowClass === 'visible' ? 'hidden' : 'visible');         
    }

    const timePlaceHolder = () => {
       const time = Time.slice(11,17);
       return time;
    }

    const [timeValue, setTime] = useState(timePlaceHolder());
    const [departmentValue, setDepartment] = useState(Department);
    const [urgencyValue, setUrgency] = useState(Urgency);
    const [roomValue, setRoom] = useState(Room);
    const [patientValue, setPatient] = useState(Patient);
    const [doctorValue, setDoctor] = useState(Doctor);
    const [specialistValue, setSpecialist] = useState(Specialist);
    const [reasonValue, setReason] = useState(Reason);
    const [passTimeValue, setPassTime] = useState(PassTime);
    const [acceptByValue, setAcceptBy] = useState(AcceptBy);


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

    const onSaveEdit = () => {                                                                                                                          
        const record = {id: ID , Time: Time.slice(0,11) + timeValue, Department: departmentValue, Urgency:urgencyValue, Room:roomValue, Patient:patientValue, Doctor:doctorValue, Specialist:specialistValue, Reason:reasonValue, PassTime:passTimeValue, AcceptBy:acceptByValue,};
        fetch(`http://172.18.218.15:5001/consultation/edit?ID=${record.id}&Time=${record.Time}&Department=${record.Department}&Urgency=${record.Urgency}&Room=${record.Room}&Patient=${record.Patient}&Doctor=${record.Doctor}&Specialist=${record.Specialist}&Reason=${record.Reason}&PassTime=${record.PassTime}&AcceptBy=${record.AcceptBy}`)
        .then(response => response.json()).catch(err => console.error(err));
        window.location.reload(false);
    }

    const deleteRecord = () => {
        const record = {id: ID}; 
        window.confirm('Ar tikrai ištrinti šį įrašą?') && fetch(`http://172.18.218.15:5001/consultation/delete?ID=${record.id}`)
        .then(response => response.json()).catch(err => console.error(err));
        window.location.reload(false);
    }

    return (
        <div>
            <div className="row tablerow" onDoubleClick={editRow}>
                <div className="col-id">{ID || 1}</div>
                <div className="col-1">
                    {`${getMonthFromString(Time.slice(0,4))}/${Time.slice(4,7)} `}{Time.slice(11,17)}
                </div>
                <div className={urgencyClasses()}>{Urgency}</div>
                <div className={isDisabled ? "col-consilium" : 'col-custom' }>{Department}</div>
                <div className={isDisabled ? "col-consilium" : 'col-custom' }>{Room}</div>
                <div className={isDisabled ? "col-consilium" : 'col-custom' }>{Patient}</div>
                <div className={isDisabled ? "col-consilium" : 'col-custom' }>{Doctor}</div>
                <div className={isDisabled ? "col-consilium" : 'col-custom' }>{Specialist}</div>
                <div className={isDisabled ? "col-consilium" : 'col-custom' }>{Reason}</div>
                <div className={isDisabled ? "col-consilium" : 'col-custom' }>{PassTime}</div>
                <div className={isDisabled ? "col-consilium" : 'col-custom' }>{AcceptBy}</div>
            </div>
            <div className={`hidden`} id={`EditingRow${ID}`}>             
                <div className='editingForm'>
                    <button onClick={deleteRecord} className='deleteButton'>Trinti</button>
                    <div>
                        <input type="time" placeholder={timePlaceHolder()} name="Time" id="Time" value={timeValue} onChange={updateTime}/>
                    </div>
                    <div className={Urgency == null && 'hidden'}>
                        <select id="Urgency" name="Urgency" value={urgencyValue} onChange={updateUrgency}>
                            <option value="Skubus">Skubus</option>
                            <option value="Planinis">Planinis</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" placeholder={Urgency} name="Department" id="Department" value={departmentValue} onChange={updateDepartment} required/>
                    </div>
                    <div>
                        <input type="text" placeholder={Room} name="Room" id="Room" value={roomValue} onChange={updateRoom} required/>
                    </div>
                    <div>
                        <input type="text" placeholder={Patient} name="Patient" id="Patient" value={patientValue} onChange={updatePatient} required/>
                    </div>
                    <div>
                        <input type="text" placeholder={Doctor} name="Doctor" id="Doctor" value={doctorValue} onChange={updateDoctor} required/>
                    </div>
                    <div>
                        <input type="text" placeholder={Specialist} name="Specialist" id="Specialist" value={specialistValue} onChange={updateSpecialist} required/>
                    </div>
                    <div>
                        <input type="text" placeholder={Reason} name="Reason" id="Reason" value={reasonValue} onChange={updateReason} required/>
                    </div>
                    <div>
                        <input type="time" placeholder={PassTime} name="PassTime" id="PassTime" value={passTimeValue} onChange={updatePassTime}/>
                    </div>
                    <div>
                        <input type="text" placeholder={AcceptBy} name="AcceptBy" id="AcceptBy" value={acceptByValue} onChange={updateAcceptBy} required/>
                    </div>
                    <button onClick={onSaveEdit}>Saugoti</button>
                </div>
            </div>
        </div>  
    );
}

export default DataRow;