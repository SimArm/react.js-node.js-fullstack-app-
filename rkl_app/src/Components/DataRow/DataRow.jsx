import React from 'react';
import "./DataRow.scss";

const DataRow = ({Time, ID, Department, Urgency, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy}) => {
    return (
        <div className="dataRow">
            <tr className="tableHeader">
                <td>{Time}</td>
                <td>{ID}</td>
                <td>{Department}</td>
                <td>{Urgency}</td>
                <td>{Room}</td>
                <td>{Patient}</td>
                <td>{Doctor}</td>
                <td>{Specialist}</td>
                <td>{Reason}</td>
                <td>{PassTime}</td>
                <td>{AcceptBy}</td>
            </tr>
        </div>
    );
}

export default DataRow;