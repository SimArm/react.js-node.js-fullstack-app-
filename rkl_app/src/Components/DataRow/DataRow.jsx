import React from 'react';
import "./DataRow.scss";

const DataRow = ({isDisabled, Time, ID, Department, Urgency, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy}) => {

    const getMonthFromString = (mon) => new Date(Date.parse(mon +" 1, 2020")).getMonth()+1 ;

    return (
        <div className="row tablerow">
            <div className="col-1">
                {`${getMonthFromString(Time.slice(0,4))}/${Time.slice(4,7)} `}{Time.slice(11,17)}
            </div>
            <div className="col-1">{Department}</div>
            <div className={isDisabled ? 'col-1 is-disabled' : 'col-1'}>{Urgency}</div>
            <div className="col-1">{Room}</div>
            <div className="col-1">{Patient}</div>
            <div className={isDisabled ? 'col-2' : 'col-1'}>{Doctor}</div>
            <div className="col-1">{Specialist}</div>
            <div className="col-2">{Reason}</div>
            <div className="col-1">{PassTime}</div>
            <div className="col-1">{AcceptBy}</div>
            <div className="col-1">{ID || 1}</div>
        </div>
    );
}

export default DataRow;