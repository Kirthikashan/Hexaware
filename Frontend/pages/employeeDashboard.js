import React, { useState, useEffect } from 'react';
import styles from './employeeDashboard.module.css'; // Updated to CSS module import
import SidebarEmployee from '../components/SidebarEmployee'; // Ensure correct import

const EmployeeDashboard = () => {
  // Feedback state
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5006/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });

      const data = await response.json();
      setMessage(data.message);
      setFeedback(''); // Clear feedback input
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('Failed to submit feedback. Please try again.');
    }
  };

  // Sample learning resources
  const resources = [
    {
      id: 1,
      title: 'React JS for Intermediates',
      description: 'Master React.js by building real-world projects that focus on components, state management, routing, and API integration.',
      format: 'Video',
      link: 'https://youtu.be/b9eMGE7QtTk',
      articleLink: '/employee/article1',
      image: 'https://img.youtube.com/vi/b9eMGE7QtTk/hqdefault.jpg',
    },
    {
      id: 2,
      title: 'Node JS for Advanced Levels',
      description: 'Learn Node.js, a powerful JavaScript runtime for building scalable, server-side applications.',
      format: 'Video',
      link: 'https://youtu.be/gq6gIz3-wuw',
      articleLink: '/employee/article2',
      image: 'https://img.youtube.com/vi/gq6gIz3-wuw/hqdefault.jpg', 
    },
    {
      id: 3,
      title: 'Python Basics',
      description: 'Learn the fundamentals of Python, including key components like data types, functions, and control structures.',
      format: 'Video',
      link: 'https://youtu.be/_uQrJ0TkZlc',
      articleLink: '/employee/article3',
      image: 'https://img.youtube.com/vi/_uQrJ0TkZlc/hqdefault.jpg',
    },
    {
      id: 4,
      title: 'Artificial Intelligence for Beginners',
      description: 'Explore the basics of Artificial Intelligence to understand how AI can be used to solve everyday problems.',
      format: 'Video',
      link: 'https://youtu.be/FWOZmmIUqHg',
      articleLink: '/employee/article4',
      image: 'https://img.youtube.com/vi/FWOZmmIUqHg/hqdefault.jpg',
    },
  ];

  // Track the progress for each resource in localStorage
  const getProgress = (id) => {
    const progress = localStorage.getItem(`progress_${id}`);
    return progress ? parseInt(progress, 10) : 0;
  };

  const setProgress = (id, progress) => {
    localStorage.setItem(`progress_${id}`, progress);
  };

  const [progresses, setProgresses] = useState(
    resources.reduce((acc, resource) => {
      acc[resource.id] = getProgress(resource.id);
      return acc;
    }, {})
  );

  const handleProgressUpdate = (id, videoLength) => {
    // Simulate progress update based on video length (for demo purposes)
    const progressIncrement = Math.min(getProgress(id) + 10, 100); // Increment progress by 10%, max 100%
    setProgress(id, progressIncrement);
    setProgresses((prevProgresses) => ({
      ...prevProgresses,
      [id]: progressIncrement,
    }));
  };

  useEffect(() => {
    // For real-world use, you would use the video player API to update progress dynamically
    // For example, you can listen to video player's onProgress or onTimeUpdate events
  }, []);

  return (
    <div className={styles['employee-dashboard']}>
      <SidebarEmployee /> {/* Include the SidebarEmployee component */}
      <div className={styles['employee1-head-dashboard']}>
        <header>
          <h1>EMPLOYEE DASHBOARD</h1>
        </header>
        <p className={styles['welcome-message']}>
          Welcome to your Employee Dashboard – your hub for tracking progress, learning resources, and staying informed!
        </p>
      </div>

      <section className={styles['learning-resources']}>
        <h2>Learning Resources</h2>
        {resources.map((resource) => (
          <div className={styles.resource} key={resource.id}>
            {resource.format === 'Video' && (
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleProgressUpdate(resource.id, 100)}
              >
                <img
                  src={resource.image}
                  alt={resource.title}
                  className={styles['resource-image']}
                />
              </a>
            )}
            <div className={styles['resource-details']}>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <p>
                <strong>Format:</strong> {resource.format}
              </p>
              <div className={styles['progress-bar']}>
                <div
                  className={styles.progress}
                  style={{ width: `${progresses[resource.id]}%` }} // Dynamic progress based on state
                />
              </div>
              <p>Progress: {progresses[resource.id]}%</p>
              <div className={styles['article-section']}>
                <p className={styles['catchy-text']}>
                  Expand your knowledge with this article!
                </p>
                <a
                  href={resource.articleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['article-button']}
                >
                  Read Article
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default EmployeeDashboard;
