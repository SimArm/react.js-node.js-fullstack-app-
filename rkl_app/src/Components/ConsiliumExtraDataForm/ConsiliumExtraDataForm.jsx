import React, {useState} from 'react';
import "./ConsiliumExtraDataForm.scss";
import saveWhite from '../../CssLib/done-white.svg';
import saveBlack from '../../CssLib/done-black.svg';

const ConsiliumExtraDataForm = (RecID) => {

    const [timeValue, setTime] = useState('');
    const [departmentValue, setDepartment] = useState('');
    const [roomValue, setRoom] = useState('');
    const [patientValue, setPatient] = useState('');
    const [doctorValue, setDoctor] = useState('');
    const [specialistValue, setSpecialist] = useState('');
    const [reasonValue, setReason] = useState('');
    const [passTimeValue, setPassTime] = useState('');
    const [acceptByValue, setAcceptBy] = useState('');
    const [commentValue, setComment] = useState('');

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

    const updateComment = (event) => {
        const { value } = event.target;
        setComment(value);
    }

    const onSaveConsilium = () => {
        const record = {ConsId: RecID.RecID ,Time: timeValue, Department: departmentValue, Room:roomValue, Patient:patientValue, Doctor:doctorValue, Specialist:specialistValue, Reason:reasonValue, PassTime:passTimeValue, AcceptBy:acceptByValue, Comment:commentValue};
        fetch(`http://172.18.218.23:5001/consilium/addextra?ConsId=${record.ConsId}&Time=${record.Time}&Department=${record.Department}&Room=${record.Room}&Patient=${record.Patient}&Doctor=${record.Doctor}&Specialist=${record.Specialist}&Reason=${record.Reason}&PassTime=${record.PassTime}&AcceptBy=${record.AcceptBy}&Comment=${record.Comment}`)
        .then(response => response.json()).catch(err => console.error(err));
        window.location.reload(false);
    }

    return (
        <div className='additionalData' id={`ExtrasRow${RecID.RecID}`}>
            <div>Papildoma informacija:</div>
            <div>
                <input type="time" placeholder='Laikas' name="Time" value={timeValue} onChange={updateTime}/>
            </div>
            <div>
                <input type="text" placeholder='Skyrius' name="Department" value={departmentValue} onChange={updateDepartment} required/>
            </div>
            <div>
                <input type="text" placeholder='Palata' name="Room"  value={roomValue} onChange={updateRoom} required/>
            </div>
            <div>
                <input type="text" placeholder='Pacientas' name="Patient" value={patientValue} onChange={updatePatient} required/>
            </div>
            <div>
                <input type="text" placeholder='Gydytojas' name="Doctor" value={doctorValue} onChange={updateDoctor} required/>
            </div>
            <div>
                <input type="text" placeholder='Specialistas' name="Specialist" value={specialistValue} onChange={updateSpecialist} required/>
            </div>
            <div>
                <input type="text" placeholder='Priezastis' name="Reason" value={reasonValue} onChange={updateReason} required/>
            </div>
            <div>
                <input type="time" placeholder='Perdavimo Laikas' name="PassTime" value={passTimeValue} onChange={updatePassTime}/>
            </div>
            <div>
                <input type="text" placeholder='Prieme' name="AcceptBy" value={acceptByValue} onChange={updateAcceptBy} required/>
            </div>
            <div>
                <input type="text" placeholder='Komentaras' name="Comment" value={commentValue} onChange={updateComment}/>
            </div>
            <button onClick={onSaveConsilium} onMouseOver={e => (e.currentTarget.firstChild.src = saveWhite)} onMouseOut={e => (e.currentTarget.firstChild.src = saveBlack)}><img src={saveBlack} alt='V'/></button>
        </div>
    );

}

export default ConsiliumExtraDataForm;