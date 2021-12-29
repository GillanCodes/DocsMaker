import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from '../Dashboard';
import DocEdit from '../dashboard/DocEdit';
import DocCreator from '../dashboard/DocCreator';
import SectionAdd from '../dashboard/SectionAdd';

import Home from '../Home';

export default function index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />

                <Route path="/dashboard" exact element={<Dashboard />} />
                <Route path="/dashboard/add" exact element={<DocCreator />} />
                <Route path="/dashboard/:id" exact element={<DocEdit />} />
                <Route path="/dashboard/:id/add" exact element={<SectionAdd />} />

            </Routes>
        </BrowserRouter>
    )
}
