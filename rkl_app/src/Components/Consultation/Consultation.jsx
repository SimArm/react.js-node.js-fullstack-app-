import React from "react";
import "./Consultation.scss";

import DataTable from "../DataTable/DataTable";
import NewDataForm from "../NewDataForm/NewDataForm";

import getConsultationData from "../../Commands/connect";
import getData from "../../Commands/testingGet";


const Consultation = () => {
    //const data = getConsultationData();
    const data = getData() || [];

    return (
        <div>
            <NewDataForm />
            <DataTable disabled={false} data={data}/>
        </div>
    );
}

export default Consultation;