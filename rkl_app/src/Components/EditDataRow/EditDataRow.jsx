import React, {useState, useEffect} from 'react';
import './EditDataRow.scss';
import saveBlack from '../../CssLib/done-black.svg';
import deleteBlack from '../../CssLib/delete-black.svg';
import saveWhite from '../../CssLib/done-white.svg';
import deleteWhite from '../../CssLib/delete-white.svg';

const EditDataRow = ({Time1, ID1, Department1, Urgency1, Room1, Patient1, Doctor1, Specialist1, Reason1, PassTime1, AcceptBy1, Consilium, Comment1}) => {
    
    const timePlaceHolder = () => {
        const time = Time1.slice(10,15);
        return time;
     }

    const [timeValue, setTime] = useState(timePlaceHolder());
    const [departmentValue, setDepartment] = useState(Department1);
    const [urgencyValue, setUrgency] = useState(Urgency1);
    const [roomValue, setRoom] = useState(Room1);
    const [patientValue, setPatient] = useState(Patient1);
    const [doctorValue, setDoctor] = useState(Doctor1);
    const [specialistValue, setSpecialist] = useState(Specialist1);
    const [reasonValue, setReason] = useState(Reason1);
    const [passTimeValue, setPassTime] = useState(PassTime1);
    const [acceptByValue, setAcceptBy] = useState(AcceptBy1);
    const [commentValue, setComment] = useState(Comment1);

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

    const updateComment = (event) => {
        const { value } = event.target;
        setComment(value);
    }

    const consEditSave = () => {                                                                                                                          
        const record = {id: ID1 , Time: Time1.slice(0,10) + timeValue, Department: departmentValue, Urgency:urgencyValue, Room:roomValue, Patient:patientValue, Doctor:doctorValue, Specialist:specialistValue, Reason:reasonValue, PassTime:passTimeValue, AcceptBy:acceptByValue, Comment:commentValue};
        fetch(`http://172.18.218.23:5001/consultation/edit?ID=${record.id}&Time=${record.Time}&Department=${record.Department}&Urgency=${record.Urgency}&Room=${record.Room}&Patient=${record.Patient}&Doctor=${record.Doctor}&Specialist=${record.Specialist}&Reason=${record.Reason}&PassTime=${record.PassTime}&AcceptBy=${record.AcceptBy}&Comment=${record.Comment}`)
        .then(response => response.json()).catch(err => console.error(err));
        window.location.reload(false);
    }

    const consilEditSave = () => {                                                                                                                          
        const record = {id: ID1 , Time: Time1.slice(0,10) + timeValue, Department: departmentValue, Room:roomValue, Patient:patientValue, Doctor:doctorValue, Specialist:specialistValue, Reason:reasonValue, PassTime:passTimeValue, AcceptBy:acceptByValue, Comment:commentValue};
        fetch(`http://172.18.218.23:5001/consilium/edit?ID=${record.id}&Time=${record.Time}&Department=${record.Department}&Room=${record.Room}&Patient=${record.Patient}&Doctor=${record.Doctor}&Specialist=${record.Specialist}&Reason=${record.Reason}&PassTime=${record.PassTime}&AcceptBy=${record.AcceptBy}&Comment=${record.Comment}`)
        .then(response => response.json()).catch(err => console.error(err));
        window.location.reload(false);
    }

    const deleteConsRecord = () => {
        window.confirm('Ar tikrai ištrinti šį įrašą?') && fetch(`http://172.18.218.23:5001/consultation/delete?ID=${ID1}`)
        .then(response => response.json()).catch(err => console.error(err)) &&
        window.location.reload(false);
    }

    const deleteConsilRecord = () => {
        window.confirm('Ar tikrai ištrinti šį įrašą?') && fetch(`http://172.18.218.23:5001/consilium/delete?ID=${ID1}`)
        .then(response => response.json()).catch(err => console.error(err)) &&
        window.location.reload(false);
    }

    useEffect(() => {
        const timePlaceHolder = () => {
            const time = Time1.slice(10,15);
            return time;
         }
        setTime(timePlaceHolder);
        setDepartment(Department1);
        setUrgency(Urgency1);
        setRoom(Room1);
        setPatient(Patient1);
        setDoctor(Doctor1);
        setSpecialist(Specialist1);
        setReason(Reason1);
        setPassTime(PassTime1);
        setAcceptBy(AcceptBy1);
        setComment(Comment1);
    },[ID1]);

    return (
        <div className={`editRow`} id={`EditingRow${ID1}`}>             
            <div className='editingForm'>
                <button onClick={Consilium === true ? deleteConsilRecord : deleteConsRecord} className='deleteButton' onMouseOver={e => (e.currentTarget.firstChild.src = deleteWhite)} onMouseOut={e => (e.currentTarget.firstChild.src = deleteBlack)}><img src={deleteBlack} alt='X'/></button>
                <div className={Consilium !== true ? 'consultInput' : 'consilInput'}>
                    <input type="time" placeholder={timePlaceHolder()} name="Time" value={timeValue} onChange={updateTime}/>
                </div>
                {Consilium !== true && <div  className='consultInput'>
                    <select name="Urgency" value={urgencyValue} onChange={updateUrgency}>
                        <option value="Skubus">Skubus</option>
                        <option value="Planinis">Planinis</option>
                    </select>
                </div>}
                <div className={Consilium !== true ? 'consultInput' : 'consilInput'}>
                    <input type="text" placeholder={Department1 || 'Skyrius'} name="Department" value={departmentValue} onChange={updateDepartment} required/>
                </div>
                <div className='numberInput'>
                    <input type="text" placeholder={Room1 || 'Palata'} name="Room" value={roomValue} onChange={updateRoom} required/>
                </div>
                <div className={Consilium !== true ? 'consultInput' : 'consilInput'}>
                    <input type="text" placeholder={Patient1 || 'Pacientas'} name="Patient" value={patientValue} onChange={updatePatient} required/>
                </div>
                <div className={Consilium !== true ? 'consultInput' : 'consilInput'}>
                    <input type="text" placeholder={Doctor1 || 'Kviec. gyd.'} name="Doctor" value={doctorValue} onChange={updateDoctor} required/>
                </div>
                <div className={Consilium !== true ? 'consultInput' : 'consilInput'}>
                    <input type="text" placeholder={Specialist1 || 'Specialistas'} name="Specialist" value={specialistValue} onChange={updateSpecialist} required/>
                </div>
                <div className={Consilium !== true ? 'consultInput' : 'consilInput'}>
                    <input type="text" placeholder={Reason1 || 'Priezastis'} name="Reason" value={reasonValue} onChange={updateReason} required/>
                </div>
                <div className='numberInput'>
                    <input type="time" placeholder={PassTime1} name="PassTime" value={passTimeValue} onChange={updatePassTime}/>
                </div>
                <div className={Consilium !== true ? 'consultInput' : 'consilInput'}>
                    <input type="text" placeholder={AcceptBy1 || 'Prieme'} name="AcceptBy" value={acceptByValue} onChange={updateAcceptBy} required/>
                </div>
                <div className={Consilium !== true ? 'consultInput' : 'consilInput'}>
                    <input type="text" placeholder={Comment1 || 'Komentaras'} name="Comment" value={commentValue} onChange={updateComment} required/>
                </div>
                <button onClick={Consilium !== true ? consEditSave : consilEditSave} onMouseOver={e => (e.currentTarget.firstChild.src = saveWhite)} onMouseOut={e => (e.currentTarget.firstChild.src = saveBlack)}><img src={saveBlack} alt='V'/></button>
            </div>
        </div>
    );
}

export default EditDataRow;