import React from "react";
import "./Consilium.scss";

import DataRow from "../DataRow/DataRow";
import DataTable from "../DataTable/DataTable";

const Consilium = () => {
    return (
        <div>
            <DataTable disabled={true}/>
            <DataRow />
        </div>
    );
}

export default Consilium;