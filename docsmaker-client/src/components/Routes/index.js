import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from '../Home';

export default function index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />

            </Routes>
        </BrowserRouter>
    )
}
