import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PollOptions from './PollOptions';
import { useNavigate } from 'react-router-dom';

const VoteForm = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async () => {
        try {
            const response = await axios.get('/api/poll/configuration');
            setQuestion(response.data.question)
            setOptions(response.data.options);
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };

    const handleVote = async (option) => {
        try {
            const payload = {
                "option": option
            }
            await axios.post(`/api/poll/vote`, JSON.stringify(payload), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/results-page', { replace: true });
        } catch (error) {
            console.error('Error submitting vote:', error);
        }
    };

    return (
        <div class="modal-content" style={{ padding: '50px 75px' }}>
            <div class="modal-header">
                <h5 class="modal-title" style={{ margin: '30px 0' }}> {question} </h5>
            </div>
            {options.length > 0 ? (
                <PollOptions options={options} handleVote={handleVote} />
            ) : (
                <p> Loading options ... </p>
            )}
        </div>
    );
};

export default VoteForm;