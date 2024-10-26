import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  
  useEffect(() => {
    const userId = localStorage.getItem('id');
    const storedFullName = localStorage.getItem('fullName'); // Get from local storage
    if (userId) {
      setFullName(storedFullName); // Set fullName from local storage
    }
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/');
  };

  return (
    <header className="header">
     <span>Welcome {fullName} !</span>
      <div className="header-right">
        
        {/* Learn Menu */}
        <div className="dropdown">
          <button className="dropdown-button">Learn</button>
          <div className="dropdown-content">
            <Link to="/learn/science">Science</Link>
            <Link to="/learn/math">Math</Link>
          </div>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </header>
  );
};

export default Header;
