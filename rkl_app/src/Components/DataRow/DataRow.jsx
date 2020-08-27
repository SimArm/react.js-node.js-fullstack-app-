import React from 'react';
import "./DataRow.scss";

const DataRow = ({isDisabled, Time, ID, Department, Urgency, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy}) => {

    const getMonthFromString = (mon) => new Date(Date.parse(mon +" 1, 2020")).getMonth()+1 ;

    return (
        <tr className="tablerow">
            <td>
                <tr>
                    <td>{`${getMonthFromString(Time.slice(0,4))}/${Time.slice(4,7)}`}</td>
                    <td>{Time.slice(11,17)}</td>
                </tr>
            </td>
            <td>{Department}</td>
            <td className={isDisabled ? 'is-disabled' : undefined}>{Urgency}</td>
            <td>{Room}</td>
            <td>{Patient}</td>
            <td>{Doctor}</td>
            <td>{Specialist}</td>
            <td>{Reason}</td>
            <td>{PassTime}</td>
            <td>{AcceptBy}</td>
            <td>{ID}</td>
        </tr>
    );
}

export default DataRow;