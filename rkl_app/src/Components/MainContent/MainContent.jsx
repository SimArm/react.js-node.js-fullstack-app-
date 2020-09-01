import React, {useState} from 'react';
import "./MainContent.scss";
import DataRow from '../DataRow/DataRow';
import ExportingSection from '../ExportingSection/ExportingSection';

const MainContent = ({disabled, data, Consilium}) => {
    
    const ifConsilium = Consilium;
    
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

    const ContentTable = document.getElementsByClassName('contentBody');

    ContentTable.scrollTop = ContentTable.scrollHeight;

    return (
        <div className="mainContent">
            <div className="tableWrapper">
                <div>
                    <div className="row tableHeader">
                        <div className={disabled ? "col-consilium" : 'col-custom' } onClick={() => setSorting('Time')}>Data</div>
                        <div className={disabled ? "col-consilium" : 'col-custom' } onClick={() => setSorting('Department')}>Skyrius</div>
                        <div className={disabled ? "is-disabled" : 'col-custom' } onClick={() => setSorting('Urgency')}>Skubus ar Planinis</div>
                        <div className={disabled ? "col-consilium" : 'col-custom' } onClick={() => setSorting('Room')}>Palatos nr.</div>
                        <div className={disabled ? "col-consilium" : 'col-custom' } onClick={() => setSorting('Patient')}>Pacientas</div>
                        <div className={disabled ? "col-consilium" : 'col-custom' } onClick={() => setSorting('Doctor')}>Kviečiantysis gyd.</div>
                        <div className={disabled ? "col-consilium" : 'col-custom' } onClick={() => setSorting('Specialist')}>Specialistas</div>
                        <div className={disabled ? "col-consilium" : 'col-custom' } onClick={() => setSorting('Reason')}>Priežastis</div>
                        <div className={disabled ? "col-consilium" : 'col-custom' } onClick={() => setSorting('PassTime')}>Perdavimo laikas</div>
                        <div className={disabled ? "col-consilium" : 'col-custom' } onClick={() => setSorting('AcceptBy')}>Priemė</div>
                        <div className="col-id" onClick={() => setSorting('ID')}>Nr.</div>
                    </div>
                </div>
                <div className="contentBody">
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
                </div>
            </div>
            <ExportingSection sortBy={sorting} ConsiliumTab={ifConsilium} />
        </div>
    );
}

export default MainContent;
