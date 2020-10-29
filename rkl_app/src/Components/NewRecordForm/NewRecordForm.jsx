
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
    const [commentValue, setComment] = useState('');

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

    const updateComment = (event) => {
        const { value } = event.target;
        setComment(value);
    }

    const onSaveConsultation = () => {                                                                                                                          
        const record = {Time: currentDate() + timeValue, Department: departmentValue, Urgency:urgencyValue, Room:roomValue, Patient:patientValue, Doctor:doctorValue, Specialist:specialistValue, Reason:reasonValue, AcceptBy:acceptByValue, Comment:commentValue};
        fetch(`http://172.18.218.23:5001/consultation/add?Time=${record.Time}&Department=${record.Department}&Urgency=${record.Urgency}&Room=${record.Room}&Patient=${record.Patient}&Doctor=${record.Doctor}&Specialist=${record.Specialist}&Reason=${record.Reason}&PassTime=${passTimeValue}&AcceptBy=${record.AcceptBy}&Comment=${record.Comment}`)
        .then(response => response.json()).catch(err => console.error(err));
    }

    const onSaveConsilium = () => {
        const record = {Time: currentDate() + timeValue, Department: departmentValue, Room:roomValue, Patient:patientValue, Doctor:doctorValue, Specialist:specialistValue, Reason:reasonValue, AcceptBy:acceptByValue, Comment:commentValue};
        fetch(`http://172.18.218.23:5001/consilium/add?Time=${record.Time}&Department=${record.Department}&Room=${record.Room}&Patient=${record.Patient}&Doctor=${record.Doctor}&Specialist=${record.Specialist}&Reason=${record.Reason}&PassTime=${passTimeValue}&AcceptBy=${record.AcceptBy}&Comment=${record.Comment}`)
        .then(response => response.json()).catch(err => console.error(err));
    }

    const database = dataDB || [];

    const commonValues = (arr, property) => {
        let valuesArray = arr.map(el => el[property]) || [];
        let commonValuesArr = [];

        valuesArray.forEach(()=>{
            let commonValue = valuesArray.sort((a,b) =>
            valuesArray.filter(v => v===a).length
            - valuesArray.filter(v => v===b).length
            ).pop();
            commonValuesArr.push(commonValue);

            valuesArray = valuesArray.filter((obj) => {
                return obj !== commonValue;
            });
        })

        return commonValuesArr;
    }

    const fillValues = (arr, property, propValue, resultProperty ) => {
        let tempObj = arr.filter(obj => {
            return obj[property] === propValue;
        });
        let tempArray = tempObj.map(el => el[resultProperty]);
        let fillArray = [];
        tempArray.forEach(()=>{
            let fillArrayValue = tempArray.sort((a,b) => 
                tempArray.filter(v => v===a).length -
                 tempArray.filter(v => v===b).lenght).pop();

            fillArray.push(fillArrayValue);
            tempArray = tempArray.filter((obj) => {
                return obj !== fillArrayValue;
            });
        });

        return fillArray; 
        
    }

    const handleEnter = (event) => {
        if (event.keyCode === 13) {
          const form = event.target.form;
          const index = Array.prototype.indexOf.call(form, event.target);
          form.elements[index + 1].focus();
          event.preventDefault();
        }
      }


    return (
        <div className="newRecordWrapper">
            <form>
            <button type='submit' onclick="return false;" className='disabled'></button>
                <div>
                    <label htmlFor="Time">Laikas</label>
                    <input type="time" placeholder={laikas} name="Time" id="Time" value={timeValue || laikas} onChange={updateTime} onKeyDown={handleEnter}/>
                </div>
                <div>
                    <label htmlFor="Department">Skyrius</label>
                    <input type="text" placeholder="Skyrius" name="Department" id="Department" list='depSuggest' value={departmentValue} onChange={updateDepartment} autoComplete="off" onKeyDown={handleEnter}/>
                    <datalist id='depSuggest'>
                        { (specialistValue!=='') ?
                             fillValues(database,'Specialist', specialistValue, 'Department').map((val,index) => {
                            return <option value={val}></option>
                             }) : commonValues(database, 'Department').map((val,index) =>{
                                return <option value={val}></option>
                            })
                         } 
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
                    <input type="text" placeholder="Palata" name="Room" id="Room" list="rSuggest" value={roomValue} onChange={updateRoom} autoComplete="off" onKeyDown={handleEnter}/>
                    <datalist id='rSuggest'>
                        {(departmentValue!=='') ?
                             fillValues(database,'Department', departmentValue, 'Room').map((val,index) => {
                            return <option value={val}></option>
                             }) : commonValues(database, 'Room').map((val,index) =>{
                            return (<option value={val}></option>);
                        })}
                    </datalist>
                </div>
                <div>
                    <label htmlFor="Patient">Pacientas:</label>
                    <input type="text" placeholder="Pacientas" name="Patient" id="Patient" value={patientValue} onChange={updatePatient} autoComplete="off" onKeyDown={handleEnter}/>
                </div>
                <div>
                    <label htmlFor="Doctor">Kvieciantysis gydytojas:</label>
                    <input type="text" placeholder="Gydytojas" name="Doctor" id="Doctor" list="docSuggest" value={doctorValue} onChange={updateDoctor} autoComplete="off" onKeyDown={handleEnter}/>
                    <datalist id='docSuggest'>
                        {(roomValue!=='') ?
                             fillValues(database,'Room', roomValue, 'Doctor').map((val,index) => {
                            return <option value={val}></option>
                             }) : commonValues(database, 'Doctor').map((val,index) =>{
                            return <option value={val}></option>
                        })}
                    </datalist>
                </div>
                <div>
                    <label htmlFor="Specialist">Specialistas:</label>
                    <input type="text" placeholder="Specialistas" name="Specialist" id="Specialist" list="specSuggest" value={specialistValue} onChange={updateSpecialist} autoComplete="off" onKeyDown={handleEnter}/>
                    <datalist id='specSuggest'>
                        {(doctorValue!=='') ?
                             fillValues(database,'Doctor', doctorValue, 'Specialist').map((val,index) => {
                            return <option value={val}></option>
                             }) : commonValues(database, 'Specialist').map((val,index) =>{
                            return <option value={val}></option>
                        })}
                    </datalist>
                </div>
                <div>
                    <label htmlFor="Reason">Priežastis:</label>
                    <input type="text" placeholder="Priežastis" name="Reason" id="Reason" list="reasSuggest" value={reasonValue} onChange={updateReason} autoComplete="off" onKeyDown={handleEnter}/>
                    <datalist id='reasSuggest'>
                        {(roomValue!=='') ?
                             fillValues(database,'Room', roomValue, 'Reason').map((val,index) => {
                            return <option value={val}></option>
                             }) : commonValues(database, 'Reason').map((val,index) =>{
                            return <option value={val}></option>
                        })}
                    </datalist>
                </div>
                <div>
                    <label htmlFor="PassTime">Perdavimo Laikas:</label>
                    <input type="time" name="PassTime" id="PassTime" onChange={updatePassTime} onKeyDown={handleEnter}/>
                </div>
                <div>
                    <label htmlFor="AcceptBy">Prieme:</label>
                    <input type="text" placeholder="Prieme" name="AcceptBy" id="AcceptBy" list="accepSuggest" value={acceptByValue} onChange={updateAcceptBy} autoComplete="off" onKeyDown={handleEnter}/>
                    <datalist id='accepSuggest'>
                        {(doctorValue!=='') ?
                             fillValues(database,'Doctor', doctorValue, 'AcceptBy').map((val,index) => {
                            return <option value={val}></option>
                             }) : commonValues(database, 'AcceptBy').map((val,index) =>{
                            return <option value={val}></option>
                        })}
                    </datalist>
                </div>
                <button onClick={ConsiliumTab ? onSaveConsilium : onSaveConsultation}>Saugoti</button>
            </form>
        </div>
    );  
}

export default NewRecordForm;