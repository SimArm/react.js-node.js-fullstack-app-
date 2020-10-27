import React  from 'react';
import EditDataRow from '../EditDataRow/EditDataRow';
import "./DataRow.scss";
import ConsiliumExtraData from '../ConsiliumExtraData/ConsiliumExtraData';
import ConsiliumExtraDataForm from '../ConsiliumExtraDataForm/ConsiliumExtraDataForm';

const DataRow = ({Index, isDisabled, Time, ID, Department, Urgency, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy, ConsiliumTab}) => {

    const urgencyClasses = () => {
       return `${isDisabled ? 'is-disabled' : 'col-custom'} ${Urgency === 'Planinis' ? 'planned' : 'urgent'}`
    }

    const showHide = () => {
        const wrapper = document.getElementById(`Wrapper${ID}`);
        const wrapperClasses = wrapper.classList.contains('showElements');
        const allExtrasEdits = document.querySelectorAll('.editExtra');
        const allExtrasDivs = document.querySelectorAll('.extrasWrapper');
        let anyExtraVisible = false;
        allExtrasEdits.forEach((el)=>{
            if(el.classList.contains('visible')) {
               return anyExtraVisible = true;
            }   
        });
        if (wrapperClasses === true) {
            wrapper.classList.replace('showElements','hideElements');
            allExtrasDivs.forEach((el)=>{
                el.classList.replace('editable','non-editable');
            });
            allExtrasEdits.forEach((el)=>{
                el.classList.replace('visible', 'hidden');
            });
        } else if (anyExtraVisible === true) {

            allExtrasDivs.forEach((el)=>{
                el.classList.replace('editable','non-editable');
            });
            allExtrasEdits.forEach((el)=>{
                el.classList.replace('visible', 'hidden');
            });
            anyExtraVisible = false;

        } else {
            const allWrappers = document.querySelectorAll('.recWrap');
            allWrappers.forEach((el)=>{
                el.classList.replace('showElements', 'hideElements');
            });
            wrapper.classList.replace('hideElements','showElements');
        }
        wrapper.scrollIntoView();
    }

    const rowDivClasses = (innerValue) => {
        let consultColor = innerValue !== '' ? 'green' : 'red';
        let colorClass = isDisabled ? 'white' : consultColor;
        let tabClass = isDisabled ? "col-consilium" : 'col-custom';
        return `${tabClass} ${colorClass}`;
    }

    const rowDivTimeClasses = (innerValue) => {
        let colorClass = innerValue !== '' ? 'green' : 'red';
        let tabClass = isDisabled ? "col-consilium" : 'col-custom';
        return `${tabClass} ${colorClass}`;
    }

    return (
        <div id={`Wrapper${ID}`} className={'hideElements recWrap'}>
            <div className="row tablerow" onDoubleClick={showHide}>
                <div className="col-id">{Index || 1}</div>
                <div className="col-1">
                    {`${(Time.slice(0,2))}/${Time.slice(3,5)} `}{Time.slice(10,16)}
                </div>
                <div className={urgencyClasses(Urgency)}>{Urgency}</div>
                <div className={rowDivClasses(Department)}>{Department}</div>
                <div className={rowDivClasses(Room)}>{Room}</div>
                <div className={rowDivClasses(Patient)}>{Patient}</div>
                <div className={rowDivClasses(Doctor)}>{Doctor}</div>
                <div className={rowDivClasses(Specialist)}>{Specialist}</div>
                <div className={rowDivClasses(Reason)}>{Reason}</div>
                <div className={rowDivTimeClasses(PassTime)}>{PassTime}</div>
                <div className={rowDivClasses(AcceptBy)}>{AcceptBy}</div>
            </div>
            <EditDataRow Time1={Time} ID1={ID} Department1={Department} Urgency1={Urgency} Room1={Room} Patient1={Patient} Doctor1={Doctor} Specialist1={Specialist} Reason1={Reason} PassTime1={PassTime} AcceptBy1={AcceptBy} Consilium={ConsiliumTab}/>
            {ConsiliumTab === true && <ConsiliumExtraData RecID={ID}/> }
            {ConsiliumTab === true && <ConsiliumExtraDataForm RecID={ID}/> }        
        </div>  
    );
}

export default DataRow;