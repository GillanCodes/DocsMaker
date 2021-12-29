import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux";
import { isEmpty } from './Utils';

export default function Home() {

	const docsData = useSelector(state => state.docsReducer)


	const [currentDoc, setCurrentDoc] = useState("");
	const [content, setContent] = useState("");
	const [select, setSelect] = useState("");
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if(!isEmpty(docsData)) {
			setIsLoading(false);
		}
	}, [docsData])


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
				<h1>loading</h1>
			) : (
				<div className='container'>

				<div className="content">
					<div className="left">

						<div className='dropdown'>
							<ul>
								<li><a href="#" aria-haspopup="true">{currentDoc.name}</a>
								<ul class="dropdown" aria-label="submenu">
								{
										docsData.map((doc) => {
											return <li className='btn' onClick={() => setCurrentDoc(doc)} key={doc._id}>{doc.name}</li>
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
																		key={sections.id} 
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
						</div>
					</div>

						<div className="right">
														
							{!isEmpty(content) ? (
								<div dangerouslySetInnerHTML={{__html: sanitize(content)}}></div>
							) : (
								<h1>Welcome</h1>
							)}


						</div>
					</div>
				</div>
			)}
		
		</>
	)
}
