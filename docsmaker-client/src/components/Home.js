import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { getDocs } from '../actions/docs.action';
import { isEmpty } from './Utils';

export default function Home() {

	const docsData = useSelector(state => state.docsReducer)

	const dispatch = useDispatch();


	const [currentDoc, setCurrentDoc] = useState("");
	const [content, setContent] = useState("");
	const [select, setSelect] = useState("");
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if(!isEmpty(docsData)) {
			setIsLoading(false);
		}
	}, [docsData])


	const deleteHandle = async () => {
		
		var deleteConfirm = prompt('Type "DELETE" to delete this section');

		if (deleteConfirm === "DELETE") {

			await axios({
				method:'delete',
				url: `${process.env.REACT_APP_API_URL}/docs/${currentDoc._id}/section/${select}/delete`
			}).then((res) => {
				dispatch(getDocs());
				setContent('');
				setSelect('');
			})
		}

	}


const sanitize = (input) => {
	const doc = new DOMParser().parseFromString(input, 'text/html');
	for (const elm of doc.querySelectorAll('*')) {
		for (const attrib of elm.attributes) {
			if (attrib.name.startsWith('on')) {
				elm.removeAttribute(attrib.name);
			}
		}
	}
	return doc.body.innerHTML;
};


	return (
		<>
			{isLoading ? (
				<>
					<h1>loading</h1>
					<a href="/dashboard" className="page-btn">Dashboard</a>
				</>
			) : (
				<div className='container'>

				<div className="content">
					<div className="left">

						<div className='dropdown'>
							<ul>
								<li>{!isEmpty(currentDoc.name) ? currentDoc.name : "Select a Docs !"}
								<ul className="dropdown" aria-label="submenu">
								{
										docsData.map((doc) => {
											return <li key={doc._id} className='btn' onClick={() => setCurrentDoc(doc)} key={doc._id}>{doc.name}</li>
										})
									}
								</ul>
								</li>
							</ul>
						</div>

						<div className="sections">
							{!isEmpty(currentDoc) && (
									docsData.map((doc) => {
										if (doc._id === currentDoc._id) {
											return ( 
												<>
													{
														doc.section.map((sections) => {
															return ( 
																<>
																	
																	<p 
																		key={sections._id} 
																		onClick={() => setContent(sections.content) & setSelect(sections._id)}
																		className={sections._id === select ? "active side-btn" : "side-btn"}
																	> 

																			{sections.method && (<span className='tag is-method'>{sections.method}</span>)}
																			{sections.stype && (<span className='tag is-type'> {sections.stype}</span>)} 
																			{sections.title}

																	</p>
																</>
															)
														})
													}
												
												</>
											)
										}
										return null
									})
								)}
								{!isEmpty(currentDoc) && (<a href={"/dashboard/"+ currentDoc._id +"/add"} className='page-btn' >Add Section</a>)}
						</div>
					</div>

						<div className="right">
							<p className="delete-btn page-btn" onClick={deleteHandle}>Delete Section</p>
														
							{!isEmpty(content) ? (
									<div dangerouslySetInnerHTML={{__html: sanitize(content)}}></div>
							) : (
								<h1>Welcome</h1>
							)}


						</div>
					</div>

					<a href="/dashboard" className="nav-btn">Dashboard</a>
				</div>
			)}
		
		</>
	)
}
