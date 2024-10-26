import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Layout/Header';
import QuizLevels from './Components/Users/QuizLevels';
import QuizPage from './Components/Users/QuizPage';
import Science from './Components/Users/Science';
import Math from './Components/Users/Math';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/quiz-levels" element={<QuizLevels />} />
        <Route path="/quiz/easy" element={<QuizPage category="easy" />} />
        <Route path="/quiz/medium" element={<QuizPage category="medium" />} />
        <Route path="/quiz/hard" element={<QuizPage category="hard" />} />
        <Route path="/quiz/advance" element={<QuizPage category="advance" />} />
        <Route path="/learn/science" element={<Science />} />
        <Route path="/learn/math" element={<Math />} />
      </Routes>
    </Router>
  );
}

export default App;
