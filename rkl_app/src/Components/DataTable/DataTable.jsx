import React, {useState} from 'react';
import "./DataTable.scss";
import DataRow from '../DataRow/DataRow';

const DataTable = ({disabled, data}) => {
    
    const [sorting, setSorting] = useState('Time');
    const sortData = (property) => {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return (a,b) => {
            let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    const Data = data || [];

    return (
        <div className="dataTable">
            <table>
                <thead>
                    <tr className="tableHeader">
                        <th onClick={() => setSorting('Time')}>Data</th>
                        <th onClick={() => setSorting('Department')}>Skyrius</th>
                        <th onClick={() => setSorting('Urgency')} className={disabled ? "is-disabled" : undefined}>Skubus ar Planinis</th>
                        <th onClick={() => setSorting('Room')}>Palatos nr.</th>
                        <th onClick={() => setSorting('Patient')}>Pacientas</th>
                        <th onClick={() => setSorting('Doctor')}>Kviečiantysis gyd.</th>
                        <th onClick={() => setSorting('Specialist')}>Specialistas</th>
                        <th onClick={() => setSorting('Reason')}>Priežastis</th>
                        <th onClick={() => setSorting('PassTime')}>Perdavimo laikas</th>
                        <th onClick={() => setSorting('AcceptBy')}>Priemė</th>
                        <th onClick={() => setSorting('ID')}>Nr.</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.sort(sortData(sorting)).map((record) => {
                            return (
                                < DataRow 
                                    isDisabled = {disabled}
                                    Time = {record.Time}
                                    Department = {record.Department}
                                    Urgency = {record.Urgency}
                                    Room = {record.Room}
                                    Patient = {record.Patient}
                                    Doctor = {record.Doctor}
                                    Specialist = {record.Specialist}
                                    Reason = {record.Reason}
                                    PassTime = {record.PassTime}
                                    AcceptBy = {record.AcceptBy}
                                    ID = {record.ID}
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
