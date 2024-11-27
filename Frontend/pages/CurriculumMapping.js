import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurriculumMapping.module.css'; 

const CurriculumMapping = () => {
    const [curriculumName, setCurriculumName] = useState('');
    const [mappingData, setMappingData] = useState(null);
    const [error, setError] = useState('');

    const handleFetchMapping = async () => {
        if (!curriculumName) {
            setError("Please enter a curriculum name.");
            return;
        }
        setError('');
        try {
            const response = await axios.get(`http://localhost:8000/curriculumMapping/${curriculumName}`);
            setMappingData(response.data);
        } catch (err) {
            setError("Curriculum mapping not found. Please check the name and try again.");
            setMappingData(null);
        }
    };

    return (
        <div>
            <h2>Curriculum Mapping</h2>
            <input
                type="text"
                value={curriculumName}
                onChange={(e) => setCurriculumName(e.target.value)}
                placeholder="Enter Curriculum Name"
            />
            <button onClick={handleFetchMapping}>Fetch Mapping</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {mappingData && (
                <div>
                    <h3>Mapping for {curriculumName}</h3>
                    <h4>Topics and Questions:</h4>
                    <ul>
                        {Object.entries(mappingData.topics).map(([topic, questions]) => (
                            <li key={topic}>
                                <strong>{topic}</strong>
                                <ul>
                                    {questions.map((question, index) => (
                                        <li key={index}>{question}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CurriculumMapping;
