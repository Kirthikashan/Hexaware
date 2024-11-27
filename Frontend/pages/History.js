import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../pages/History.module.css';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const [history, setHistory] = useState([]);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Attempt to fetch history from the API
        const response = await axios.get('http://localhost:8000/history');
        setHistory(response.data);
        // Store fetched history in local storage
        localStorage.setItem('history', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching history:', error);
        // If fetching fails, load history from local storage
        const storedHistory = localStorage.getItem('history');
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/history/${id}`); // Endpoint to delete history
      const updatedHistory = history.filter(item => item.id !== id); // Update local state
      setHistory(updatedHistory);
      // Reset selected curriculum if the deleted one is selected
      if (selectedCurriculum && selectedCurriculum.id === id) {
        setSelectedCurriculum(null);
      }
      // Update local storage with the new history
      localStorage.setItem('history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error deleting history:', error);
    }
  };

  const handleCurriculumClick = (item) => {
    setSelectedCurriculum(item); // Set selected curriculum to view details
  };

  return (
    <div className={styles.historyContainer}>
      <button className={styles.backButton} onClick={() => navigate('/trainer/trainer-dashboard')}>
        ← Back
      </button>
      <div className={styles.sidebar}>
        <h2>Uploaded Curriculums</h2>
        <ul>
          {history.map(item => (
            <li key={item.id} onClick={() => handleCurriculumClick(item)} className={styles.sidebarItem}>
              {item.curriculumName}
            </li>
          ))}
        </ul>
      </div>

      {selectedCurriculum && (
        <div className={styles.detailsContainer}>
          <h2>Details for: {selectedCurriculum.curriculumName}</h2>
          <strong>Question Type:</strong> {selectedCurriculum.questionType} <br />
          <strong>Number of Questions:</strong> {selectedCurriculum.numQuestions} <br />
          <strong>Difficulty:</strong> {selectedCurriculum.difficulty} <br />
          <strong>Generated Questions:</strong> <br />
          <ul>
            {selectedCurriculum.generatedQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
          <button onClick={() => handleDelete(selectedCurriculum.id)}>Delete History</button>
        </div>
      )}
    </div>
  );
};

export default History;