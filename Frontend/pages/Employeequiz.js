// EmployeeQuiz.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styles from './EmployeeQuiz.module.css';

const EmployeeQuiz = () => {
    const location = useLocation();
    const { employeeName, skill, level } = location.state || {};
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [submittedAnswers, setSubmittedAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

    // Fetch quiz questions from the backend (FastAPI)
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                setLoading(true);
                const response = await axios.post('http://localhost:8002/generate_quiz/', {
                    skill: skill,
                    difficulty: level,
                });

                if (response.data && Array.isArray(response.data.questions) && response.data.questions.length > 0) {
                    setQuestions(response.data.questions);
                } else {
                    throw new Error("No quiz data available.");
                }
            } catch (error) {
                console.error("Error fetching quiz questions:", error);
                setErrorMessage("Failed to load quiz. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [skill, level]);

    // Handle answer selection
    const handleAnswerChange = (event) => {
        setCurrentAnswer(event.target.value);
    };

    // Handle answer submission for each question
    const handleSubmitAnswer = async () => {
        if (currentAnswer === '') {
            alert("Please select an answer.");
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = currentAnswer === currentQuestion.correctAnswer;
        setIsAnswerCorrect(isCorrect);

        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
        }

        setSubmittedAnswers([...submittedAnswers, { question: currentQuestion.question, selectedAnswer: currentAnswer, isCorrect }]);
        setShowAnswer(true);

        try {
            await axios.post('http://localhost:5006/api/quiz/submit_answer', {
                employeeName: employeeName,
                skill: skill,
                level: level,
                question: currentQuestion.question,
                selectedAnswer: currentAnswer,
                isCorrect: isCorrect
            });
        } catch (error) {
            console.error('Error storing the answer:', error);
        }
    };

    const handleNextQuestion = () => {
        setCurrentAnswer('');
        setShowAnswer(false);
        setIsAnswerCorrect(null);
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setQuizSubmitted(true);
        }
    };

    if (loading) {
        return <div className={styles.loadingMessage}>Loading quiz questions...</div>;
    }

    if (errorMessage) {
        return <div className={styles.errorMessage}>{errorMessage}</div>;
    }

    return (
        <div className={styles.quizContainer}>
            {!quizSubmitted ? (
                <>
                    <h2 className={styles.quizTitle}>Quiz for {skill} - {level} level</h2>
                    <div className={styles.questionContainer}>
                        <p className={styles.questionText}>
                            Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex]?.question}
                        </p>
                        <div className={styles.optionsContainer}>
                            {questions[currentQuestionIndex]?.options.map((option, idx) => (
                                <label className={styles.optionLabel} key={idx}>
                                    <input
                                        type="radio"
                                        name="option"
                                        value={option}
                                        checked={currentAnswer === option}
                                        onChange={handleAnswerChange}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                        <button
                            className={styles.submitButton}
                            type="button"
                            onClick={handleSubmitAnswer}
                            disabled={showAnswer}
                        >
                            Submit Answer
                        </button>

                        {showAnswer && (
                            <div className={styles.answerContainer}>
                                <p className={styles.correctAnswer}>
                                    Correct answer: {questions[currentQuestionIndex]?.correctAnswer}
                                </p>
                                <p className={styles.resultText}>
                                    Your answer is {isAnswerCorrect ? 'correct' : 'incorrect'}.
                                </p>
                                <button
                                    className={styles.nextButton}
                                    type="button"
                                    onClick={handleNextQuestion}
                                >
                                    {currentQuestionIndex + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
                                </button>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className={styles.finalScoreContainer}>
                    <h2 className={styles.finalScoreTitle}>Quiz Submitted</h2>
                    <p className={styles.scoreText}>Your final score is: {score}/{questions.length}</p>
                    <p className={styles.scoreText}>
                        Thank you for completing the quiz!
                    </p>
                </div>
            )}
        </div>
    );
};

export default EmployeeQuiz;