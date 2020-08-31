import React from "react";
import "./Consultation.scss";

import MainContent from "../MainContent/MainContent";
import NewRecordForm from "../NewRecordForm/NewRecordForm";

import getConsultationData from "../../Commands/testingGet";

const Consultation = () => {
    //const data = getConsultationData();
    const data = getConsultationData() || [];

    return (
        <div>
            <NewRecordForm />
            <MainContent disabled={false} data={data} ConsiliumTab={false}/>
        </div>
    );
}

export default Consultation;