import React from 'react';
import "./DataRow.scss";

const DataRow = ({isDisabled, Time, ID, Department, Urgency, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy}) => {
    return (
        <tr className="tablerow">
            <td>{Time}</td>
            <td>{ID}</td>
            <td>{Department}</td>
            <td className={isDisabled ? 'is-disabled' : undefined}>{Urgency}</td>
            <td>{Room}</td>
            <td>{Patient}</td>
            <td>{Doctor}</td>
            <td>{Specialist}</td>
            <td>{Reason}</td>
            <td>{PassTime}</td>
            <td>{AcceptBy}</td>
        </tr>
    );
}

export default DataRow;