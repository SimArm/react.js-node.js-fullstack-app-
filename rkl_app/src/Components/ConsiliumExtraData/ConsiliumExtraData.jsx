import React, {useState, useEffect} from 'react'; 
import './ConsiliumExtraData.scss';
import deleteBlack from '../../CssLib/delete-black.svg';
import deleteWhite from '../../CssLib/delete-white.svg';

const ConsiliumExtraData = ({RecID, Clicked}) => {
    const [data,setData] = useState([]);
    const [visibility, setVisibility] = useState(true);
    const [clickProp, setClickProp] = useState(Clicked);

    useEffect (() => {
        fetchData();
        hideButton();
        if(Clicked !== clickProp) {
            setClickProp(Clicked);
        }
    },clickProp); //work, if rerended constantly (button hidden toggle)'

    const fetchData = () => {
        fetch(`http://172.18.218.15:5001/consiliumExtras`)
            .then((response) => response.json())
            .then((response) => setData(response));
    }
    const records = data.filter((el) => {
        return el.ConsId === RecID;
    });

    const hideButton = () => {
        const editRow = document.getElementById(`EditingRow${RecID}`);
        const editRowVisibility = editRow.classList.contains('hidden');
        setVisibility(editRowVisibility);
        console.log( visibility);
    }

    return (
        records.map((record) => {
            return (
                <div className="row extrasWrapper">  
                    <div className='col-id'>
                        <button onClick={console.log('delete this, delete that')} className={`deleteButton ${visibility === true ? `hidden` : `visible`}`} onMouseOver={e => (e.currentTarget.firstChild.src = deleteWhite)} onMouseOut={e => (e.currentTarget.firstChild.src = deleteBlack)}><img src={deleteBlack} alt='X'/></button>    
                    </div>             
                    <div className='col-1'>{record.Time}</div>
                    <div className='col-consilium'>{record.Department}</div>
                    <div className='col-consilium'>{record.Room}</div>
                    <div className='col-consilium'>{record.Patient}</div>
                    <div className='col-consilium'>{record.Doctor}</div>
                    <div className='col-consilium'>{record.Specialist}</div>
                    <div className='col-consilium'>{record.Reason}</div>
                    <div className='col-consilium'>{record.PassTime}</div>
                    <div className='col-consilium'>{record.AcceptBy}</div>
                </div>
            );
        })
    );
}

export default ConsiliumExtraData;