import React from 'react';
import styles from './Article3.module.css';

const Article3Page = () => {
  return (
    <div className={styles.article3Container}>
      <h1 className={styles.articleTitle}>Python Basics: Your Gateway to the World of Programming</h1>
      <p className={styles.intro}>
        Ready to dive into the exciting world of programming? Look no further! Python is your perfect starting point. 
        With its simple syntax and powerful capabilities, it’s no wonder that Python is loved by beginners and experts alike. 
        Let’s unlock the basics!
      </p>

      <h2>🚀 Why Python?</h2>
      <ul className={styles.benefitsList}>
        <li><strong>Easy to Learn:</strong> Python’s clear syntax makes it ideal for newcomers.</li>
        <li><strong>Versatile:</strong> Use Python for web development, data analysis, artificial intelligence, and more!</li>
        <li><strong>Strong Community:</strong> Join a vibrant community that offers tons of resources and support.</li>
        <li><strong>In-Demand Skills:</strong> Python skills can boost your career prospects significantly!</li>
      </ul>

      <h2>🛠️ Getting Started</h2>
      <p>
        To kick off your Python journey, follow these steps:
      </p>
      <ol className={styles.gettingStarted}>
        <li><strong>Install Python:</strong> Download it from the official <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">Python website</a>.</li>
        <li><strong>Set Up Your Environment:</strong> Choose an IDE or code editor like PyCharm, VSCode, or Jupyter Notebook.</li>
        <li><strong>Write Your First Program:</strong> Open your editor and type: <code>print("Hello, World!")</code>. Run it and celebrate your first Python output!</li>
      </ol>

      <h2>📚 Key Concepts to Master</h2>
      <p>
        Here are some fundamental concepts you should get comfortable with:
      </p>
      <div className={styles.concepts}>
        <div className={styles.concept}>
          <h3>Variables</h3>
          <p>Store data using variables! For example, <code>name = "Alice"</code>.</p>
        </div>
        <div className={styles.concept}>
          <h3>Data Types</h3>
          <p>Understand different data types: strings, integers, floats, and booleans.</p>
        </div>
        <div className={styles.concept}>
          <h3>Control Flow</h3>
          <p>Use <code>if</code> statements and loops to control the flow of your programs.</p>
        </div>
        <div className={styles.concept}>
          <h3>Functions</h3>
          <p>Create reusable blocks of code with functions. For example:
          <code>def greet(): print("Hello!")</code></p>
        </div>
      </div>

      <h2>🌟 Next Steps</h2>
      <p>
        Now that you have a grip on the basics, it’s time to explore more! Check out:
      </p>
      <ul className={styles.nextSteps}>
        <li>Practice coding challenges on platforms like <a href="https://www.hackerrank.com/domains/tutorials/10-days-of-python" target="_blank" rel="noopener noreferrer">HackerRank</a>.</li>
        <li>Build small projects, like a calculator or a simple game.</li>
        <li>Join Python communities online to connect with fellow learners.</li>
      </ul>

      <h2>🚀 Let’s Code!</h2>
      <p>
        Are you excited to start your Python journey? With practice and persistence, you’ll become a Python pro in no time! 
        Happy coding, and remember: the best way to learn is by doing!
      </p>
    </div>
  );
};

export default Article3Page;
