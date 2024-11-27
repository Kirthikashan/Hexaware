import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeQuiz from './Employeequiz'; // Import the quiz component
import styles from './LearningGoals.module.css'; // Import the CSS module
import { useNavigate } from 'react-router-dom';

const LearningGoals = () => {
    const [employeeName, setEmployeeName] = useState('');
    const [learningGoals, setLearningGoals] = useState([]);
    const [progress, setProgress] = useState({});
    const [loading, setLoading] = useState(false);
    const [difficultyLevels, setDifficultyLevels] = useState({});
    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const navigate = useNavigate();
    const [showQuiz, setShowQuiz] = useState(false); // Show quiz conditionally

    // Fetch learning goals from the backend
    const handleFetchGoals = () => {
        setLoading(true);
        axios.get(`http://localhost:8002/learning_goals/${employeeName}`)
            .then(response => {
                if (response.data && response.data.skills) {
                    setLearningGoals(response.data.skills);

                    const initialProgress = {};
                    const initialDifficultyLevels = {};
                    response.data.skills.forEach(skill => {
                        initialProgress[skill] = { completed: false, starRating: 0 };
                        initialDifficultyLevels[skill] = 'Beginner'; 
                    });
                    setProgress(initialProgress);
                    setDifficultyLevels(initialDifficultyLevels);
                }
            })
            .catch(error => console.error("Error fetching learning goals:", error))
            .finally(() => setLoading(false));
    };

    // Handle dropdown change for difficulty level
    const handleDifficultyChange = (skill, event) => {
        setDifficultyLevels({
            ...difficultyLevels,
            [skill]: event.target.value, 
        });
    };

    // Handle quiz initiation with the selected skill and difficulty
    const handleTakeQuiz = (skill) => {
        const difficulty = difficultyLevels[skill]; // Get the selected difficulty level
        setSelectedSkill(skill);
        setSelectedLevel(difficulty);
        setShowQuiz(true); // Show the quiz component

        // Navigate to a new quiz page when the quiz is initiated
        navigate('/quiz', { state: { skill, level: difficulty, employeeName } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.learningGoalsContainer}>
          <button className={styles.backButton} onClick={() => navigate('/employee/learning-plan')}>
          ← Back
          </button>
            <h1 className={styles.title1}>Learning Goals</h1>
            <p>Welcome! Stay focused and achieve your learning goals with ease.</p>
      
            {/* Input field for employee name */}
            <div className={styles.inputContainer1}>
                <input
                    className={styles.employeeInput}
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    placeholder="Enter Employee Name"
                />
                <button className={styles.fetchGoalsButton} onClick={handleFetchGoals}>
                    Fetch Learning Goals
                </button>
            </div>

            {learningGoals.length > 0 ? (
                learningGoals.map(skill => (
                    <div key={skill} className={styles.skillContainer}>
                        <h2 className={styles.skillTitle}>{skill}</h2>
                        <div className={styles.progressContainer}>
                            <progress 
                                className={styles.progressBar1} 
                                value={progress[skill]?.completed ? 100 : 0} 
                                max="100" 
                            />
                            <span className={styles.starRating}>
                                {progress[skill]?.starRating} Stars
                            </span>
                        </div>

                        {/* Dropdown for selecting difficulty level */}
                        <div className={styles.difficultyContainer}>
                            <label 
                                className={styles.difficultyLabel} 
                                htmlFor={`difficulty-${skill}`}
                            >
                                Difficulty:
                            </label>
                            <select
                                id={`difficulty-${skill}`}
                                className={styles.difficultySelect}
                                value={difficultyLevels[skill]}
                                onChange={(event) => handleDifficultyChange(skill, event)}
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        {/* Take Quiz button */}
                        <button 
                            className={styles.takeQuizButton} 
                            onClick={() => handleTakeQuiz(skill)}
                        >
                            Take Quiz
                        </button>
                    </div>
                ))
            ) : (
                <div className={styles.noGoalsMessage}>No learning goals available.</div>
            )}

            {/* Conditionally render the quiz */}
            {showQuiz && (
                <EmployeeQuiz 
                    employeeName={employeeName} 
                    skill={selectedSkill} 
                    level={selectedLevel} 
                />
            )}
        </div>
    );
};

export default LearningGoals;
