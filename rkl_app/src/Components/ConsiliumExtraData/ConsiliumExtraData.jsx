import React, {useState, useEffect} from 'react'; 
import './ConsiliumExtraData.scss';

const ConsiliumExtraData = ({RecID}) => {
    const [data,setData] = useState([]);

    useEffect (() => {
        fetchData();
    },[]);

    const fetchData = () => {
        fetch(`http://172.18.218.15:5001/consiliumExtras`)
            .then((response) => response.json())
            .then((response) => setData(response));
    }
    const records = data.filter((el) => {
        return el.ConsId === RecID;
    });
    return (
        records.map((record) => {
            return (
                <div className="row extrasWrapper">  
                    <div className='col-id'></div>             
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