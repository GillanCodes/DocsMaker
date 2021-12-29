import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isEmpty } from '../Utils';

export default function DocEdit() {

    const docsData = useSelector(state => state.docsReducer);
    const [isLoading, setisLoading] = useState(true)

    const {id} = useParams();

    useEffect(() => {
        if (!isEmpty(docsData)) {
            setisLoading(false);
        }
    }, [docsData]);


    const deleteHandle = async () => {

        var deleteConfirm = prompt('Type DELETE to delete this !');

        if (deleteConfirm === "DELETE") {

            await axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}/docs/${id}/delete`
            }).then((res) => {
                window.location = '/dashboard'
            }).catch((err) => {
                console.log(err);
            })

        }

    }

    return (
        <div className='dashboard-container'>
            {isLoading ? (
                <h1>Loading</h1>
            ) : (
                <div className="content">
                   
                    <ul>
                        {docsData.map((doc) => {

                            if (id === doc._id) {
                                
                                return doc.section.map((sections) => {
                                    return <li key={sections.id}>{sections.title}</li>
                                })

                            }

                            return null
                        })}
                    </ul>

                    <a href={"/dashboard/" + id + "/add"} className='page-btn' >Add Section</a>
                    <br />
                    <p className='delete-btn page-btn' onClick={deleteHandle}>Delete Docs</p>

                </div>
            )}
            <a href="/dashboard" className="nav-btn">Dashboard</a>
        </div>
    )
}
