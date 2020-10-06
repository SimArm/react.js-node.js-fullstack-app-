import React, {useState, useEffect} from 'react'; 
import './ConsiliumExtraData.scss';
import deleteBlack from '../../CssLib/delete-black.svg';
import deleteWhite from '../../CssLib/delete-white.svg';
import EditConsiliumExtra from '../EditConsiliumExtra/EditConsiliumExtra';

const ConsiliumExtraData = ({RecID}) => {
    const [data,setData] = useState([]);

    useEffect (() => {
        fetchData();
    },[]);

    const fetchData = () => {
        fetch(`http://172.18.218.23:5001/consiliumExtras`)
            .then((response) => response.json())
            .then((response) => setData(response));
    }
    const records = data.filter((el) => {
        return el.ConsId === RecID;
    });


    const deleteExtraData = (recId) => {
        window.confirm('Ar tikrai ištrinti šį įrašą?') && fetch(`http://172.18.218.23:5001/consiliumExtras/delete?ID=${recId}`)
        .then(response => response.json()).catch(err => console.error(err)) &&
        window.location.reload(false);
    }

    const editExtra = (ID) => {
        const div = document.getElementById(`ExtrasWrap${ID}`);
        const divClasses = div.classList.contains('editable');
        const editDiv = document.getElementById(`ExtrasRow${ID}`);
        if(divClasses === true){
            div.classList.replace('editable','non-editable');
            editDiv.classList.replace('visible', 'hidden');
        }else{
            const allExtrasDivs = document.querySelectorAll('.extrasWrapper');
            allExtrasDivs.forEach((el)=>{
                el.classList.replace('editable','non-editable');
            })
            const allExtrasEdits = document.querySelectorAll('.editExtra');
            allExtrasEdits.forEach((el)=>{
                el.classList.replace('visible', 'hidden');
            })
            div.classList.replace('non-editable','editable');
            editDiv.classList.replace( 'hidden','visible');
        }
        div.scrollIntoView();
    }

    return (
        records.map((record) => {
            return (
                <div>
                    <div id={`ExtrasWrap${record.Id}`} className="row extrasWrapper non-editable" onDoubleClick={() => {editExtra(record.Id)}}>  
                        <div className='col-id'>
                            <button onClick={() => {deleteExtraData(record.Id)}} className='deleteButton' onMouseOver={e => (e.currentTarget.firstChild.src = deleteWhite)} onMouseOut={e => (e.currentTarget.firstChild.src = deleteBlack)}><img src={deleteBlack} alt='X'/></button>    
                        </div>             
                        <div className='col-1'>{record.Time}</div>
                        <div className='col-consilium'>{record.Department}</div>
                        <div className='col-consilium'>{record.Room}</div>
                        <div className='col-consilium'>{record.Patient}</div>
                        <div className='col-consilium'>{record.Doctor}</div>
                        <div className='col-consilium'>{record.Specialist}</div>
                        <div className='col-consilium'>{record.Reason}</div>
                        <div className={record.PassTime !== '' ? 'col-consilium green' : 'col-consilium red'}>{record.PassTime}</div>
                        <div className='col-consilium'>{record.AcceptBy}</div>
                    </div>
                    <EditConsiliumExtra Time1={record.Time} ID1={record.Id} Department1={record.Department} Room1={record.Room} Patient1={record.Patient} Doctor1={record.Doctor} Specialist1={record.Specialist} Reason1={record.Reason} PassTime1={record.PassTime} AcceptBy1={record.AcceptBy}/>
                </div>
            );
        })
    );
}

export default ConsiliumExtraData;