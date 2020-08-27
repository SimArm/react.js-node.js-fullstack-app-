import React from "react";
import "./Consilium.scss";

import DataTable from "../DataTable/DataTable";
import NewDataForm from "../NewDataForm/NewDataForm";

const Consilium = () => {
    return (
        <div>
            <NewDataForm />
            <DataTable disabled={true}/>
        </div>
    );
}

export default Consilium;