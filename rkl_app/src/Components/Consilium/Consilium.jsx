import React from "react";
import "./Consilium.scss";

import MainContent from "../MainContent/MainContent";
import NewRecordForm from "../NewRecordForm/NewRecordForm";

import getConsiliumData from "../../Commands/testingConsiliumGet";

const Consilium = () => {
    const data = getConsiliumData() || [];

    return (
        <div>
            <NewRecordForm ConsiliumTab={true}/>
            <MainContent disabled={true} data={data} Consilium={true}/>
        </div>
    );
}

export default Consilium;