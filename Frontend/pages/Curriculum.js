import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2'; // Import the Pie chart from react-chartjs-2
import SidebarAdmin from '../components/SidebarAdmin';
import styles from './Curriculum.module.css'; // Import the CSS module
import 'chart.js/auto'; // Import Chart.js to register all chart types

const CurriculumMapping = () => {
  const [mapping, setMapping] = useState([]); // State for storing curriculum mapping data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for handling errors
  const [statistics, setStatistics] = useState({ mappedCount: 0, unmappedCount: 0, totalCount: 0 }); // State for statistics

  // Fetch curriculum mapping data from FastAPI when the component is mounted
  useEffect(() => {
    const fetchMapping = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/curriculummapping'); // Fetch data from the FastAPI endpoint
        setMapping(response.data); // Set the fetched data into state
        calculateStatistics(response.data); // Calculate statistics for curriculum mapping
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError('Failed to fetch curriculum mapping.');
        setLoading(false); // Stop loading if an error occurs
      }
    };

    fetchMapping();
  }, []); // Empty dependency array to run this effect only once when the component mounts

  // Function to calculate statistics for curriculum mapping
  const calculateStatistics = (data) => {
    let mappedCount = 0;
    let unmappedCount = 0;
    let totalCount = 0;

    data.forEach((curriculum) => {
      curriculum.subtopics.forEach((subtopic) => {
        totalCount++;
        if (subtopic.count > 0) {
          mappedCount++;
        } else {
          unmappedCount++;
        }
      });
    });

    setStatistics({ mappedCount, unmappedCount, totalCount });
  };

  // Data for the pie chart
  const pieData = {
    labels: ['Mapped', 'Unmapped'],
    datasets: [
      {
        data: [statistics.mappedCount, statistics.unmappedCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className={styles.curriculumMappingContainer}>
      <SidebarAdmin />
      <h2 className={styles.curriculumMappingTitle}>Curriculum Mapping</h2>
      
      {/* Display statistics */}
      <div className={styles.statisticsContainer}>
        <p>Total Subtopics: {statistics.totalCount}</p>
        <p>Mapped Subtopics: {statistics.mappedCount}</p>
        <p>Unmapped Subtopics: {statistics.unmappedCount}</p>
      </div>

      {/* Display the pie chart */}
      <div className={styles.pieChartContainer}>
        <h3>Mapped vs Unmapped Subtopics</h3>
        <div className={styles.pieChartWrapper}>
          <Pie data={pieData} />
        </div>
      </div>

      {loading ? (
        <p className={styles.loadingMessage}>Loading...</p> // Display a loading message while data is being fetched
      ) : error ? (
        <p className={styles.errorMessage}>{error}</p> // Display an error message if there's an issue
      ) : (
        <table className={styles.curriculumMappingTable}>
          <thead>
            <tr>
              <th>Curriculum Name</th>
              <th>Keyword</th>
              <th>Mapped Questions</th>
              <th>Question Count</th>
            </tr>
          </thead>
          <tbody>
            {mapping.map((curriculum, index) => (
              <React.Fragment key={index}>
                {curriculum.subtopics.map((subtopic, subIndex) => (
                  <tr key={subIndex}>
                    <td>{curriculum.curriculum_name}</td> {/* Curriculum name */}
                    <td>{subtopic.keyword}</td> {/* Keyword or subtopic */}
                    <td>
                      <ul>
                        {subtopic.mapped_questions.map((question, qIndex) => (
                          <li key={qIndex}>{question}</li> // Render each mapped question
                        ))}
                      </ul>
                    </td>
                    <td>{subtopic.count}</td> {/* Number of questions mapped */}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CurriculumMapping;