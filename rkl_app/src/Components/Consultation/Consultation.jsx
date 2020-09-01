import React from "react";
import "./Consultation.scss";

import MainContent from "../MainContent/MainContent";
import NewRecordForm from "../NewRecordForm/NewRecordForm";

import getConsultationData from "../../Commands/testingGet";

const Consultation = () => {
    //const data = getConsultationData();
    const data = getConsultationData() || [];

    const testingDB = () => {
        fetch(`/api/users`)
        .then((response) => response.json())
        .then(users => console.log(users));
    }

    return (
        <div>
            {testingDB()}
            <NewRecordForm />
            <MainContent disabled={false} data={data} ConsiliumTab={false}/>
        </div>
    );
}

export default Consultation;