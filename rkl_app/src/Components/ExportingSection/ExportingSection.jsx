import React, {useState} from 'react';
import "./ExportingSection.scss";

const ExportingSection = ({sortBy, ConsiliumTab}) => {
    
    const currentDate = new Date();

    const defaultDate = (thisday = currentDate.getDate()) => {
       let year = currentDate.getFullYear();
       let month = currentDate.getMonth()+1 > 9 ? currentDate.getMonth()+1 : `0${currentDate.getMonth()+1}` ;
       let day = thisday > 9 ? thisday : `0${thisday}`;
       let fulldate = `${year}-${month}-${day}`;

       return fulldate;
    }
    const defaultTime = Date().slice(16,21);

    const [sorting, setSorting] = useState(sortBy);
    const [startingDate, setStartingDate] = useState(defaultDate(1)); 
    const [endingDate, setEndingDate] = useState(defaultDate());
    const [startingTime, setStartingTime] = useState('08:00');
    const [endingTime, setEndingTime] = useState(defaultTime);

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

    const onGetConsultReport = () => {
        let url = `http://172.18.218.15:5001/report?sorting=${sorting}&startingDate=${startingDate}&startingTime=${startingTime}&endingDate=${endingDate}&endingTime=${endingTime}`;
        fetch(url)
        .then((response) => response.json())
        .catch(err => console.error(err));
        window.open(url,'_blank');
    }

    const onGetConsiliumReport = () => {
        let url = `http://172.18.218.15:5001/consilium/report?sorting=${sorting}&startingDate=${startingDate}&startingTime=${startingTime}&endingDate=${endingDate}&endingTime=${endingTime}`;
        fetch(url)
        .then((response) => response.json())
        .catch(err => console.error(err));
        window.open(url,'_blank');
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
                <input type="date" id="DateFrom" name="DateFrom" placeholder={defaultDate(1)} value={startingDate} onChange={updateStartingDate}/>
                <input type="time" id="TimeFrom" name="TimeFrom" placeholder={'08:00'} value={startingTime} onChange={updateStartingTime}/>
                <label htmlFor="DateUntil">Iki:</label>
                <input type="date" id="DateUntil" name="DateUntil" placeholder={defaultDate()} value={endingDate} onChange={updateEndingDate}/>
                <input type="time" id="TimeUntil" name="TimeUntil" placeholder={defaultTime} value={endingTime} onChange={updateEndingTime}/>
            </form>
            <button onClick={ConsiliumTab ? onGetConsiliumReport : onGetConsultReport}>Ataskaita</button>
        </div>
    );
}

export default ExportingSection;