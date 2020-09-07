import React, {useState, useEffect} from "react";
import "./Consultation.scss";

import MainContent from "../MainContent/MainContent";
import NewRecordForm from "../NewRecordForm/NewRecordForm";

const Consultation = () => {
    const [data,setData] = useState([]);

    useEffect(() => {
        (()=> {
            fetch(`http://172.18.218.15:5001/consultation`)
            .then((response) => response.json())
            .then((response) => setData(response));
        })();
    }, [data]);

    return (
        <div>
            <NewRecordForm />
            <MainContent disabled={false} data={data} ConsiliumTab={false}/>
        </div>
    );
}

export default Consultation;