import React, {useState, useEffect} from 'react';
import "./MainContent.scss";
import DataRow from '../DataRow/DataRow';
import ExportingSection from '../ExportingSection/ExportingSection';

const MainContent = ({disabled, data, Consilium}) => {
    
    const ifConsilium = Consilium;

    const [sorting, setSorting] = useState('Time');
    const sortData = (property) => {
        let sortOrder = 1;
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

    useEffect(() => {
        let scrollId = document.getElementById('contend-id');
        scrollId.scrollTop = scrollId.scrollHeight;
    }); 

    return (
        <div className="mainContent">
            <div className="tableWrapper">
                <div>
                    <div className="row tableHeader">
                        <div className="col-id head-sect-1" onClick={() => setSorting('ID')}>Nr.</div>
                        <div className="col-1 head-sect-1" onClick={() => setSorting('Time')}>Data</div>
                        <div className={`${disabled ? 'is-disabled' : 'col-custom'} head-sect-1`} onClick={() => setSorting('Urgency')}>Skubus ar Planinis</div>
                        <div className={`${disabled ? 'col-consilium' : 'col-custom'} head-sect-2`} onClick={() => setSorting('Department')}>Skyrius</div>
                        <div className={`${disabled ? 'col-consilium' : 'col-custom'} head-sect-2`} onClick={() => setSorting('Room')}>Palatos nr.</div>
                        <div className={`${disabled ? "col-consilium" : 'col-custom'} head-sect-2`} onClick={() => setSorting('Patient')}>Pacientas</div>
                        <div className={`${disabled ? 'col-consilium' : 'col-custom'} head-sect-2`} onClick={() => setSorting('Doctor')}>Kviečiantysis gyd.</div>
                        <div className={`${disabled ? 'col-consilium' : 'col-custom'} head-sect-3`} onClick={() => setSorting('Specialist')}>Specialistas</div>
                        <div className={`${disabled ? 'col-consilium' : 'col-custom'} head-sect-3`} onClick={() => setSorting('Reason')}>Priežastis</div>
                        <div className={`${disabled ? 'col-consilium' : 'col-custom'} head-sect-4`} onClick={() => setSorting('PassTime')}>Perdavimo laikas</div>
                        <div className={`${disabled ? 'col-consilium' : 'col-custom'} head-sect-5`} onClick={() => setSorting('AcceptBy')}>Priemė</div>
                    </div>
                </div>
                <div className="contentBody" id="contend-id">
                    {Data.sort(sortData(sorting)).map((record,index) => {
                            return (
                                < DataRow 
                                    Index = {index + 1}
                                    ID = {record.ID}
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
                                    ConsiliumTab = {ifConsilium}
                                />
                            );
                        })
                    }
                </div>
            </div>
            <ExportingSection sortBy={sorting} ConsiliumTab={ifConsilium} />
        </div>
    );
}

export default MainContent;
