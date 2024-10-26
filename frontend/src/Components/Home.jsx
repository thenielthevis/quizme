import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleStartClick = () => {
    setShowLogin(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.user.id);
      localStorage.setItem('fullName', response.data.user.fullName);

      setMessage('Login successful!');
      navigate('/quiz-levels'); // Redirect after successful login
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        fullName,
        email,
        username,
        password,
      });
      setMessage(response.data.message);
      setIsLoginMode(true); // Switch to login mode after successful registration
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="home-container">
      <img src="./images/starting-pic.png" alt="ash-start-pic" width={"600px"} className={`ash ${showLogin ? 'blur' : ''}`} />
      <img src="./images/poke-balls.png" alt="poke-balls" width={"100px"} className={`poke-balls ${showLogin ? 'blur' : ''}`} />
      <div className={`greetings-card ${showLogin ? 'blur' : ''}`}>
        <h1>You are chosen to be the next QuizMe Catcher!</h1>
        <p>Are you ready to dive into fun quizzes and learn something cool? Let's see what you got!</p>
        <button className="start-button" onClick={handleStartClick}>Catch 'em</button>
      </div>

      {showLogin && (
        <div className="login-wrapper">
          <div className="login-card">
            {isLoginMode ? (
              <>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit">Login</button>
                  <p onClick={() => setIsLoginMode(false)} style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}>
                    Register
                  </p>
                </form>
              </>
            ) : (
              <>
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit">Register</button>
                  <p onClick={() => setIsLoginMode(true)} style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}>
                    Already have an account? Login here
                  </p>
                </form>
              </>
            )}
            {message && <p>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
