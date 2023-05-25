import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Label, CartesianGrid, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
            const response = await axios.get('/api/poll/results');
            setResults(response.data);
    };

    const chartData = results.map(result => ({
        option: result.option,
        count: result.count,
    }));

    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#33FF99', '#FF9933'];

    const handleReturn = async () => {
        navigate('/', { replace: true });
    }

    return (
        <div>
            <button class="btn btn-link" onClick={handleReturn}>Back to Form</button>
            <div style={{ padding: '0 75px' }}>
                <h4 class="modal-title" style={{ margin: '30px 0' }}> Poll Results </h4>
                {results.length > 0 ? (
                    <ResponsiveContainer width="80%" height={450}>
                        <BarChart data={chartData}>
                            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                            <XAxis dataKey="option">
                                <Label value="Options" offset={-2} position="insideBottom" />
                            </XAxis>
                            <YAxis>
                                <Label value="Count" offset={0} position="insideLeft" angle={-90} />
                            </YAxis>
                            <Bar dataKey="count" fill="#8884d8">
                                {chartData.map((entry, index) => (
                                    <Cell key={index} fill={colors[index % colors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p>Loading results...</p>
                )}
            </div>
        </div>
    );
};

export default ResultPage;