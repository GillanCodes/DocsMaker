import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isEmpty } from '../Utils';

import axios from 'axios';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDocs } from '../../actions/docs.action';


export default function SectionAdd() {

    const docsData = useSelector(state => state.docsReducer);
    const [isLoading, setisLoading] = useState(true)

    const {id} = useParams();

    const [text, setText] = useState("");
    const [method, setMethod] = useState("");
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");

    const [previous, setPrevious] = useState("");
    

    const dispatch = useDispatch()

    

    useEffect(() => {
        if (!isEmpty(docsData)) {
            setisLoading(false);
        }
    }, [docsData])

    const modules = {
        toolbar: [
          [{ 'header': [1,2,3,4,5,6,false]}],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          [{"script" : "sub"},{"script" : "super"}], 
          ['clean'],
        ],
      }

    const handleChange = (value) => {
        setText(value);
    }

    const handlePost = async () => {
        
        const data = {
            title:title,
            method:method,
            stype:type,
            content:text
        }

        await axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/docs/${id}/new`,
            data
        }).then((res) => {
            setPrevious(res.data);
            console.log(res.data)
            dispatch(getDocs());
        }).catch((err) => {
            console.log(err);
        });

    } 

    return (
        <div className='dashboard-container'>
            {isLoading ? (
                <h1>Loading</h1>
            ) : (
                <div className="content">
                   
                   
                        <input type="text" name="title" id="title" placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
                        <input type="text" name="method" id="method" placeholder='method' onChange={(e) => setMethod(e.target.value)}/>
                        <input type="text" name="stype" id="stype" placeholder='Type' onChange={(e) => setType(e.target.value)}/>

                        <ReactQuill onChange={handleChange} modules={modules} theme={'snow'}></ReactQuill>

                        <input type="submit" value="Save" onClick={handlePost}/>


                        {!isEmpty(previous) && (
                            <p>Sucessfully Added !</p>
                        )}
                    
                </div>
            )}
            <a href="/dashboard" className="nav-btn">Dashboard</a>
        </div>
    )
}
