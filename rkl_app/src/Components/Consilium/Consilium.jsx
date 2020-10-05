import React, {useState, useEffect} from "react";
import "./Consilium.scss";

import MainContent from "../MainContent/MainContent";
import NewRecordForm from "../NewRecordForm/NewRecordForm";

const Consilium = () => {
    const [data,setData] = useState([]);

    useEffect (() => {
        fetchData();
    },[]);

    const fetchData = () => {
        fetch(`http://172.18.218.15:5001/consilium`)
            .then((response) => response.json())
            .then((response) => setData(response));
    }

    return (
        <div>
            <NewRecordForm ConsiliumTab={true} dataDB={data}/>
            <MainContent disabled={true} data={data} Consilium={true}/>
        </div>
    );
}

export default Consilium;