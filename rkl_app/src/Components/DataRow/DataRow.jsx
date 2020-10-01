import React  from 'react';
import EditDataRow from '../EditDataRow/EditDataRow';
import "./DataRow.scss";
import ConsiliumExtraData from '../ConsiliumExtraData/ConsiliumExtraData';
import ConsiliumExtraDataForm from '../ConsiliumExtraDataForm/ConsiliumExtraDataForm';

const DataRow = ({isDisabled, Time, ID, Department, Urgency, Room, Patient, Doctor, Specialist, Reason, PassTime, AcceptBy, ConsiliumTab}) => {

    const getMonthFromString = (mon) => new Date(Date.parse(mon +" 1, 2020")).getMonth()+1 ;

    const urgencyClasses = () => {
       return `${isDisabled ? 'is-disabled' : 'col-custom'} ${Urgency === 'Planinis' ? 'planinis' : 'skubus'}`
    }

    const showHide = () => {
        const wrapper = document.getElementById(`Wrapper${ID}`);
        const wrapperClasses = wrapper.classList.contains('showElements');
        if (wrapperClasses === true) {
            wrapper.classList.replace('showElements','hideElements');
        } else {
            const allWrappers = document.querySelectorAll('.recWrap');
            allWrappers.forEach((el)=>{
                el.classList.replace('showElements', 'hideElements');
            });
            wrapper.classList.replace('hideElements','showElements');
        }
    }

    return (
        <div id={`Wrapper${ID}`} className={'hideElements recWrap'}>
            <div className="row tablerow" onDoubleClick={showHide}>
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
            <EditDataRow Time1={Time} ID1={ID} Department1={Department} Urgency1={Urgency} Room1={Room} Patient1={Patient} Doctor1={Doctor} Specialist1={Specialist} Reason1={Reason} PassTime1={PassTime} AcceptBy1={AcceptBy} Consilium={ConsiliumTab}/>
            {ConsiliumTab === true && <ConsiliumExtraData RecID={ID}/> }
            {ConsiliumTab === true && <ConsiliumExtraDataForm RecID={ID}/> }        
        </div>  
    );
}

export default DataRow;