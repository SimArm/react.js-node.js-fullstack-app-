import React, {useState} from 'react';
import "./ExportingSection.scss";
import exportData from '../../Commands/exporting';

const ExportingSection = ({sortBy, ConsiliumTab}) => {
    
    const [sorting, setSorting] = useState(sortBy);
    const [startingDate, setStartingDate] = useState(''); 
    const [endingDate, setEndingDate] = useState('');
    const [startingTime, setStartingTime] = useState('');
    const [endingTime, setEndingTime] = useState('');

    const updateStartingDate = (event) => {
        const { value } = event.target;
        setStartingDate(value);
    }

    const updateEndingDate = (event) => {
        const { value } = event.target;
        setEndingDate(value);
    }

    const updateStartingTime = (event) => {
        const { value } = event.target;
        setStartingTime(value);
    }

    const updateEndingTime = (event) => {
        const { value } = event.target;
        setEndingTime(value);
    }

    const updateSorting = (event) => {
        const { value } = event.target;
        setSorting(value);
    }

    const onGetReport = () => {
        exportData(sorting,startingDate,startingTime,endingDate,endingTime);
    }

    return (
        <div className="exportingSection">
            <form>
                <label htmlFor="Sorting">Rūšiuoti pagal:</label>
                <select type="dropdown" id="Sorting" name="Sorting" value={sorting} onChange={updateSorting}>
                    <option value="Time">Laiką</option>
                    <option value="Department">Skyrius</option>
                    <option value="Urgency">Skubą</option>
                    <option value="Room">Palatas</option>
                    <option value="Patient">Pacientus</option>
                    <option value="Doctor">Gydytojus</option>
                    <option value="Specialist">Specialistus</option>
                    <option value="Reason">Priežastis</option>
                    <option value="PassTime">Perdavimo Laiką</option>
                    <option value="AcceptBy">Priemė</option>
                </select>
                <label htmlFor="DateFrom">Nuo: </label>
                <input type="date" id="DateFrom" name="DateFrom" value={startingDate} onChange={updateStartingDate}/>
                <input type="time" id="TimeFrom" name="TimeFrom" value={startingTime} onChange={updateStartingTime}/>
                <label htmlFor="DateUntil">Iki:</label>
                <input type="date" id="DateUntil" name="DateUntil" value={endingDate} onChange={updateEndingDate}/>
                <input type="time" id="TimeUntil" name="TimeUntil" value={endingTime} onChange={updateEndingTime}/>
            </form>
            <button onClick={ConsiliumTab ? onGetReport : onGetReport}>Ataskaita</button> {/* Need to do seperate f-tions for seperate tab reports*/}
        </div>
    );
}

export default ExportingSection;