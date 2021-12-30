import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty } from './Utils';

export default function Dashboard() {

    const docsData = useSelector(state => state.docsReducer);

    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        if (!isEmpty(docsData)) {
            setisLoading(false);
        }
    }, [docsData])


    return (
        <div className='dashboard-container'>
            {isLoading ? (
                <h1>Loading</h1>
            ) : (
                <div className="content">

                    <h1 className="title">Docs List</h1>
                   
                    <ul>
                        {docsData.map((doc) => {

                            return <li key={doc._id}><a href={`/dashboard/${doc._id}/`}>{doc.name}</a></li>

                        })}
                        <a href="/dashboard/add" className='page-btn'>Add Docs</a>
                    </ul>

                </div>
            )}
            
            <a href="/" className="nav-btn">Home</a>
        </div>
    )
}
