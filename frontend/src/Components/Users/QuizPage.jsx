import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizPage = ({ category }) => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [ashImage, setAshImage] = useState('/images/ash-ready.png');
  const [dialogMessage, setDialogMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [passed, setPassed] = useState(false);
  const [userId, setUserId] = useState(null); // Initialize as null
  const [completedLevels, setCompletedLevels] = useState([]); // For user's completed levels
  const [unlockedLevels, setUnlockedLevels] = useState([]); // For user's unlocked levels

  useEffect(() => {
    // Retrieve userId from localStorage when component mounts
    const id = localStorage.getItem('id');
    setUserId(id);
  }, []);

  useEffect(() => {
    // Apply the category-based background class to the body element
    document.body.classList.add(category);

    // Remove the background class when the component unmounts
    return () => {
      document.body.classList.remove(category);
    };
  }, [category]);

  useEffect(() => {
    const fetchQuiz = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/quiz/${category}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const shuffledQuestions = response.data.questions.sort(() => 0.5 - Math.random()).slice(0, 10);
        setQuiz({ ...response.data, questions: shuffledQuestions });
      } catch (err) {
        console.error('Error fetching quiz:', err);
      }
    };
    fetchQuiz();
  }, [category]);

  // Fetch user data when userId is available
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompletedLevels(response.data.completedLevels || []);
        setUnlockedLevels(response.data.unlockedLevels || []);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleOptionClick = (option) => {
    if (!quiz) return;

    const isCorrect = option === quiz.questions[currentQuestionIndex].answer;
    setSelectedOption(option);
    
    if (isCorrect) {
      setAshImage('/images/ash-happy.png');
      setDialogMessage("Got 'em!!");
      setCorrectAnswersCount(correctAnswersCount + 1);
    } else {
      setAshImage('/images/ash-better.png');
      setDialogMessage("Let's do better next question!");
    }
    
    setShowDialog(true);

    setTimeout(() => {
      setAshImage('/images/ash-ready.png');
      setSelectedOption(null);
      setShowDialog(false);
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        const finalCorrectCount = correctAnswersCount + (isCorrect ? 1 : 0);
        setPassed(finalCorrectCount >= 7);
        setShowCompletionModal(true);
      }
    }, 1000);
  };

  const getCategoryImage = () => {
    switch (category) {
      case 'medium':
        return '/images/pidgeotto.png';
      case 'hard':
        return '/images/charizardc.png';
      case 'advance':
        return '/images/mewtwo.png';
      default:
        return '/images/caterpie.png';
    }
  };

  const updateUserLevels = async () => {
    if (!userId) return; // Ensure userId is available

    const completedLevelMap = {
      easy: 'medium',
      medium: 'hard',
      hard: 'advance',
      advance: null, // No more levels to unlock
    };

    const newLevel = completedLevelMap[category];
    
    // Prepare the data to update the user
    const updatedData = {
      completedLevels: [...new Set([...completedLevels, category])],
      unlockedLevels: newLevel ? [...new Set([...unlockedLevels, newLevel])] : unlockedLevels,
    };

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/users/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error('Error updating user levels:', err);
    }
  };

  useEffect(() => {
    if (showCompletionModal) {
      updateUserLevels(); // Call the function to update user levels when modal is shown
    }
  }, [showCompletionModal]);

  if (!quiz || !quiz.questions) return <p>Loading quiz...</p>;

  const { question, options } = quiz.questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2>Question {currentQuestionIndex + 1}</h2>
        <p>{question}</p>

        <ul className="options-list">
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleOptionClick(option)}
              className={`option-item ${selectedOption ? (option === quiz.questions[currentQuestionIndex].answer ? 'correct' : option === selectedOption ? 'wrong' : '') : ''}`}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      <img src="/images/pikachu-pokemon.gif" alt="fight" className='pikachu-fight' />
      <div className="quiz-images">
        <img src={ashImage} alt="Ash" className="ash-image" />
        <img src={getCategoryImage()} alt={category} className="category-image" />
      </div>
      {showDialog && (
        <div className="dialog">
          <p>{dialogMessage}</p>
        </div>
      )}
      {showCompletionModal && (
        <div className="completion-modal">
          <div className="modal-content">
            <h2>{passed ? "We've made it!" : 'Better luck next time!'}</h2>
            <p>You got {correctAnswersCount} out of 10 correct answers.</p>
            <button onClick={() => navigate('/quiz-levels')}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
