import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VoteForm from './components/VoteForm';
import ResultPage from './components/ResultPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<VoteForm />} />
            <Route path="results-page" element={<ResultPage />} />
        </Routes>
    );
}

export default App;
