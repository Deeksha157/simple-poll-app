import React, { useState } from 'react';

const PollOptions = ({ options, handleVote }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = () => {
        handleVote(selectedOption);
    };

    return (
        <div>
            <p>Choose your answer and click on "Submit".</p>
            {options.map((option) => (
                <div class="form-check" key={option.id}>
                    <input
                        type="radio"
                        id={option.id}
                        name="pollOption"
                        value={option.text}
                        checked={selectedOption === option.text}
                        onChange={handleChange}
                        class="form-check-input"
                    />
                    <label class="form-check-label" htmlFor={option.id}>{option.text}</label>
                </div>
            ))}
            <hr style={{ width: '100%', margin: '25px 0' }}></hr>
            <div class="modal-footer">
                <button class="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default PollOptions;