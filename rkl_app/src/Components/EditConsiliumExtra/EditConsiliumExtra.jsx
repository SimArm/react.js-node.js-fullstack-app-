import React, {useState, useEffect} from 'react';
import './EditConsiliumExtra.scss';
import saveBlack from '../../CssLib/done-black.svg';
import saveWhite from '../../CssLib/done-white.svg';

const EditConsiliumExtra = ({Time1, ID1, Department1, Room1, Patient1, Doctor1, Specialist1, Reason1, PassTime1, AcceptBy1, }) => {
    
    const timePlaceHolder = () => {
        const time = Time1.slice(10,15);
        return time;
     }

    const [timeValue, setTime] = useState(timePlaceHolder());
    const [departmentValue, setDepartment] = useState(Department1);
    const [roomValue, setRoom] = useState(Room1);
    const [patientValue, setPatient] = useState(Patient1);
    const [doctorValue, setDoctor] = useState(Doctor1);
    const [specialistValue, setSpecialist] = useState(Specialist1);
    const [reasonValue, setReason] = useState(Reason1);
    const [passTimeValue, setPassTime] = useState(PassTime1);
    const [acceptByValue, setAcceptBy] = useState(AcceptBy1);

    const updateTime = (event) => {
        const { value } = event.target;
        setTime(value);
    }

    const updateDepartment = (event) => {
        const { value } = event.target;
        setDepartment(value);
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

    const extraSave = () => {                                                                                                                          
        const record = {id: ID1 , Time: Time1.slice(0,10) + timeValue, Department: departmentValue, Room:roomValue, Patient:patientValue, Doctor:doctorValue, Specialist:specialistValue, Reason:reasonValue, PassTime:passTimeValue, AcceptBy:acceptByValue,};
        fetch(`http://172.18.218.23:5001/consilium/editextra?ID=${record.id}&Time=${record.Time}&Department=${record.Department}&Room=${record.Room}&Patient=${record.Patient}&Doctor=${record.Doctor}&Specialist=${record.Specialist}&Reason=${record.Reason}&PassTime=${record.PassTime}&AcceptBy=${record.AcceptBy}`)
        .then(response => response.json()).catch(err => console.error(err));
        window.location.reload(false);
    }

    useEffect(() => {
        const timePlaceHolder = () => {
            const time = Time1.slice(10,15);
            return time;
         }
        setTime(timePlaceHolder);
        setDepartment(Department1);
        setRoom(Room1);
        setPatient(Patient1);
        setDoctor(Doctor1);
        setSpecialist(Specialist1);
        setReason(Reason1);
        setPassTime(PassTime1);
        setAcceptBy(AcceptBy1);
    },[ID1]);

    return (
        <div className='editExtra hidden' id={`ExtrasRow${ID1}`}>
            <div className='col-id'>
                <button onClick={()=>{extraSave()}} onMouseOver={e => (e.currentTarget.firstChild.src = saveWhite)} onMouseOut={e => (e.currentTarget.firstChild.src = saveBlack)}><img src={saveBlack} alt='V'/></button>
            </div>   
            <div className='col-1'>
                <input type="time" placeholder={timePlaceHolder()} name="Time" value={timeValue} onChange={updateTime}/>
            </div>
            <div className='col-consilium'>
                <input type="text" placeholder={Department1} name="Department" value={departmentValue} onChange={updateDepartment} required/>
            </div>
            <div className='col-consilium'>
                <input type="text" placeholder={Room1} name="Room"  value={roomValue} onChange={updateRoom} required/>
            </div>
            <div className='col-consilium'>
                <input type="text" placeholder={Patient1} name="Patient" value={patientValue} onChange={updatePatient} required/>
            </div>
            <div className='col-consilium'>
                <input type="text" placeholder={Doctor1} name="Doctor" value={doctorValue} onChange={updateDoctor} required/>
            </div>
            <div className='col-consilium'>
                <input type="text" placeholder={Specialist1} name="Specialist" value={specialistValue} onChange={updateSpecialist} required/>
            </div>
            <div className='col-consilium'>
                <input type="text" placeholder={Reason1} name="Reason" value={reasonValue} onChange={updateReason} required/>
            </div>
            <div className='col-consilium'>
                <input type="time" placeholder={PassTime1} name="PassTime" value={passTimeValue} onChange={updatePassTime}/>
            </div>
            <div className='col-consilium'>
                <input type="text" placeholder={AcceptBy1} name="AcceptBy" value={acceptByValue} onChange={updateAcceptBy} required/>
            </div>
        </div>
    );
}

export default EditConsiliumExtra;