import React from "react";
import "./Consilium.scss";

import DataRow from "../DataRow/DataRow";
import DataTable from "../DataTable/DataTable";
import NewDataForm from "../NewDataForm/NewDataForm";

const Consilium = () => {
    return (
        <div>
            <NewDataForm />
            <DataTable disabled={true}/>
            <DataRow />
        </div>
    );
}

export default Consilium;