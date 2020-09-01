import React from 'react';
import "./DataRow.scss";

const DataRow = ({isDisabled, Time, ID, Department, Urgency, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy}) => {

    const getMonthFromString = (mon) => new Date(Date.parse(mon +" 1, 2020")).getMonth()+1 ;

    return (
        <div className="row tablerow">
            <div className="col-1">
                {`${getMonthFromString(Time.slice(0,4))}/${Time.slice(4,7)} `}{Time.slice(11,17)}
            </div>
            <div className="col-custom">{Department}</div>
            <div className={isDisabled ? 'col-custom is-disabled' : 'col-custom'}>{Urgency}</div>
            <div className="col-custom">{Room}</div>
            <div className="col-custom">{Patient}</div>
            <div className={isDisabled ? 'col-custom' : 'col-custom'}>{Doctor}</div>
            <div className="col-custom">{Specialist}</div>
            <div className="col-custom">{Reason}</div>
            <div className="col-custom">{PassTime}</div>
            <div className="col-custom">{AcceptBy}</div>
            <div className="col-id">{ID || 1}</div>
        </div>
    );
}

export default DataRow;