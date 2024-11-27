import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import Contact from './pages/Contact';
import AdminDashboard from './pages/adminDashboard';
import TrainerDashboard from './pages/trainerDashboard';
import EmployeeDashboard from './pages/employeeDashboard';
import Article1 from './pages/Article1Page';
import Article2 from './pages/Article2Page';
import Article3 from './pages/Article3Page';
import Article4 from './pages/Article4Page';
import Profile from './pages/Profile';
import Report from './pages/Report';  // Import Report component
import LearningPlan from './pages/LearningPlan';
import EvaluationFeedback from './pages/EvaluationFeedback';
import SelfAssessment from './pages/SelfAssessment';
import TakeQuiz from './pages/TakeQuiz';
import Chatbot from './pages/Chatbot';
import LearningGoals from './pages/LearningGoals'; // Import LearningGoals component
import QuestionBank from './pages/questionBank';
import QuesBank from './pages/quesBank';
import LayoutWithSidebar from './components/layouts/LayoutWithSidebar';
import LayoutWithoutSidebar from './components/layouts/LayoutWithoutSidebar';
import History from './pages/History';
import CurriculumMapping from './pages/Curriculum';
import EmployeeQuiz from './pages/Employeequiz';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes without Sidebar */}
        <Route element={<LayoutWithoutSidebar />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employee/article1" element={<Article1 />} />
          <Route path="/employee/article2" element={<Article2 />} />
          <Route path="/employee/article3" element={<Article3 />} />
          <Route path="/employee/article4" element={<Article4 />} />
        </Route>

        {/* Routes with Sidebar */}
        <Route element={<LayoutWithSidebar />}>
          {/* Admin routes */}
          <Route path="/administrator-dashboard" element={<AdminDashboard />} />

          {/* Trainer routes */}
          <Route path="/trainer/trainer-dashboard" element={<TrainerDashboard />} />

          {/* Employee routes */}
          <Route path="/employee/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/learning-plan" element={<LearningPlan />} />
          <Route path="/employee/article1" element={<Article1 />} />
          <Route path="/employee/article2" element={<Article2 />} />
          <Route path="/employee/article3" element={<Article3 />} />
          <Route path="/employee/article4" element={<Article4 />} />
          
          {/* Additional Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Other Routes */}
        <Route path="/self-assessment" element={<SelfAssessment />} />
        <Route path="/learning-goals" element={<LearningGoals />} /> {/* Updated LearningGoals route */}
        <Route path="/curated-pathways" element={<LearningPlan />} />
        <Route path="/feedback" element={<EvaluationFeedback />} />
        <Route path="/take-quiz" element={<TakeQuiz topic="TopicName" questions={[]} />} /> 
        <Route path="/chatbot" element={<Chatbot />} />   
        <Route path="/questionbank" element={<QuestionBank />} />
        <Route path="/question-bank" element={<QuesBank />} />
        <Route path="/report" element={<Report />} />  {/* Add route for Report */}
        <Route path="/trainer/history" element={<History />} />
        <Route path="/admin/curriculum-mapping" element={<CurriculumMapping />} />
        <Route path="/quiz" element={<EmployeeQuiz />} />
      </Routes>
    </Router>
  );
};

export default App;