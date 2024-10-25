import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import QuizLevels from './Components/Users/QuizLevels';
import QuizPage from './Components/Users/QuizPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz-levels" element={<QuizLevels />} />
        <Route path="/quiz/easy" element={<QuizPage category="easy" />} />
        <Route path="/quiz/medium" element={<QuizPage category="medium" />} />
        <Route path="/quiz/hard" element={<QuizPage category="hard" />} />
        <Route path="/quiz/advance" element={<QuizPage category="advance" />} />
      </Routes>
    </Router>
  );
}

export default App;
