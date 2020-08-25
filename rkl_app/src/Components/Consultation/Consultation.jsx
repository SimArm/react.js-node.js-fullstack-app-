import React from "react";
import "./Consultation.scss";

import DataRow from "../DataRow/DataRow";
import DataTable from "../DataTable/DataTable";
import NewDataForm from "./NewDataForm/NewDataForm";

const Consultation = () => {
    return (
        <div>
            <NewDataForm />
            <DataTable disabled={false}/>
            <DataRow />
        </div>
    );
}

export default Consultation;