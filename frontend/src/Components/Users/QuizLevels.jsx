import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizLevels = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(''); // Set custom messages for different levels
  const navigate = useNavigate();

  const handleCardClick = (level, message) => {
    setIsLoading(true);
    setLoadingMessage(message); // Custom message for each quiz level
    setTimeout(() => {
      navigate(`/quiz/${level}`); // Dynamic navigation based on clicked level
    }, 3000); // 3 seconds for animation effect
  };

  return (
    <div className="quiz-levels-container">
      {isLoading && (
        <div className="loading-screen">
          <div className="pikachu-animation"></div> {/* Pikachu running animation */}
          <p>{loadingMessage}</p> {/* Display loading message */}
        </div>
      )}
      {!isLoading && (
        <>
          {/* Easy Level Card */}
          <div className="card easy" onClick={() => handleCardClick('easy', 'Loading your easy level quiz...')}>
            <h1>Easy</h1>
            <p>"I’m just a little bug!"</p>
            <p>It is one of the first Pokémon you encounter in the wild. It's easy to catch and evolves into Metapod and then Butterfree.</p>
          </div>

          {/* Medium Level Card */}
          <div className="card medium" onClick={() => handleCardClick('medium', 'Loading your medium level quiz...')}>
            <h1>Medium</h1>
            <p>"Pidgeotto, Pidgeotto!"</p>
            <p>Pidgeotto is still relatively easy to catch, but it’s a stronger and faster bird Pokémon, making the challenge a bit tougher.</p>
          </div>

          {/* Hard Level Card */}
          <div className="card hard" onClick={() => handleCardClick('hard', 'Loading your hard level quiz...')}>
            <h1>Hard</h1>
            <p>"I am Charizard, feel my fire!"</p>
            <p>Charizard is strong and tough, requiring advanced skills to capture and control in battle.</p>
          </div>

          {/* Advance Level Card */}
          <div className="card advance" onClick={() => handleCardClick('advance', 'Loading your advance level quiz...')}>
            <h1>Advance</h1>
            <p>"You cannot defeat me!"</p>
            <p>Mewtwo is the ultimate test for any trainer, requiring the best techniques and strategies to capture.</p>
          </div>
          {/* Ash's Dialog Panel */}
          <div className="ash-dialog">
            <img src="./images/ash-ready.png" alt="Ash speaking" className="ash-ready" />
            <div className="dialog-box1">
              <p>Greetings! You may now choose a quiz difficult level.</p>
            </div>
            <div className="dialog-box2">
              <p>Complete the quizzes from easy difficulty to unlock the next levels.</p>
            </div>
            <div className="dialog-box3">
              <p>I'm counting on you!</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizLevels;
