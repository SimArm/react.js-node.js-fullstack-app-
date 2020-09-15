import React from 'react';
import "./DataRow.scss";

const DataRow = ({isDisabled, Time, ID, Department, Urgency, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy}) => {

    const getMonthFromString = (mon) => new Date(Date.parse(mon +" 1, 2020")).getMonth()+1 ;

    const urgencyClasses = () => {
       return `${isDisabled ? 'is-disabled' : 'col-custom'} ${Urgency === 'Planinis' ? 'planinis' : 'skubus'}`
    }

    return (
        <div className="row tablerow">
            <div className="col-id">{ID || 1}</div>
            <div className="col-1">
                {`${getMonthFromString(Time.slice(0,4))}/${Time.slice(4,7)} `}{Time.slice(11,17)}
            </div>
            <div className={urgencyClasses()}>{Urgency}</div>
            <div className={isDisabled ? "col-consilium" : 'col-custom' }>{Department}</div>
            <div className={isDisabled ? "col-consilium" : 'col-custom' }>{Room}</div>
            <div className={isDisabled ? "col-consilium" : 'col-custom' }>{Patient}</div>
            <div className={isDisabled ? "col-consilium" : 'col-custom' }>{Doctor}</div>
            <div className={isDisabled ? "col-consilium" : 'col-custom' }>{Specialist}</div>
            <div className={isDisabled ? "col-consilium" : 'col-custom' }>{Reason}</div>
            <div className={isDisabled ? "col-consilium" : 'col-custom' }>{PassTime}</div>
            <div className={isDisabled ? "col-consilium" : 'col-custom' }>{AcceptBy}</div>
        </div>
    );
}

export default DataRow;