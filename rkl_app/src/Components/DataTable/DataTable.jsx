import React from 'react';
import "./DataTable.scss";
import DataRow from '../DataRow/DataRow';

const DataTable = ({disabled}) => {
    const Data = [{Time: '16:11', ID: 1, Department: 'administracija', Urgency: "Skubus", Room: 112, Patient: 'Petras', Doctor: "Petraitis", Specialist: "Doct", Reason: "testingdata", PassTime: '16:12', AcceptBy: "me"},{Time: '16:11', ID: 1, Department: 'administracija', Urgency: "Skubus", Room: 112, Patient: 'Petras', Doctor: "Petraitis", Specialist: "Doct", Reason: "testingdata", PassTime: '16:12', AcceptBy: "me"},{Time: '16:11', ID: 1, Department: 'administracija', Urgency: "Skubus", Room: 112, Patient: 'Petras', Doctor: "Petraitis", Specialist: "Doct", Reason: "testingdata", PassTime: '16:12', AcceptBy: "me"}];

    return (
        <div className="dataTable">
            <table>
                <tr className="tableHeader">
                    <th>Data</th>
                    <th>Nr.</th>
                    <th>Skyrius</th>
                    <th className={disabled ? "is-disabled" : undefined}>Skubus ar Planinis</th>
                    <th>Palatos nr.</th>
                    <th>Pacientas</th>
                    <th>Kviečiantysis gyd.</th>
                    <th>Specialistas</th>
                    <th>Priežastis</th>
                    <th>Perdavimo laikas</th>
                    <th>Priemė</th>
                </tr>
                { Data.map((record) => {
                        return (
                            < DataRow 
                                isDisabled = {disabled}
                                Time = {record.Time}
                                ID = {record.ID}
                                Department = {record.Department}
                                Urgency = {record.Urgency}
                                Room = {record.Room}
                                Patient = {record.Patient}
                                Doctor = {record.Doctor}
                                Specialist = {record.Specialist}
                                Reason = {record.Reason}
                                PassTime = {record.PassTime}
                                AcceptBy = {record.AcceptBy}
                            />
                        );
                    })
                }
            </table>
        </div>
    );
}

export default DataTable;
