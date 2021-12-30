import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import axios from 'axios';

import { getDocs } from '../../actions/docs.action';


export default function SectionAdd() {


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    

    const dispatch = useDispatch()

    const handlePost = async () => {
        
        const data = {
            name,
            description
        }

        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/docs/new`,
            data
        }).then((res) => {
            dispatch(getDocs());
            window.location = '/dashboard/' + res.data._id
        }).catch((err) => {
            console.log(err);
        });

    } 


    return (
        <div className='dashboard-container'>
            
                <div className="content">
                   
                   
                        <input type="text" name="name" id="name" placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                        <input type="text" name="desc" id="desc" placeholder='Description' onChange={(e) => setDescription(e.target.value)}/>

                        <input type="submit" value="Save" onClick={handlePost}/>

                </div>

                
        </div>
    )
}
