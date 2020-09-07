import React, {useState, useEffect} from "react";
import "./Consultation.scss";

import MainContent from "../MainContent/MainContent";
import NewRecordForm from "../NewRecordForm/NewRecordForm";

const Consultation = () => {
    const [data,setData] = useState('');

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = () => {
        fetch(`http://172.18.218.15:5001/consultation`)
        .then((response) => response.json())
        .then((data) => setData(data));
    }

    return (
        <div>
            <NewRecordForm />
            <MainContent disabled={false} data={data} ConsiliumTab={false}/>
        </div>
    );
}

export default Consultation;