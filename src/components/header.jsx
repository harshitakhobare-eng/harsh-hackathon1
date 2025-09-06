import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // <-- Import useLocation
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 

  
  useEffect(() => {
    
    if (!user && location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate('/login');
    }
  }, [user, location, navigate]); 


  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="app-header">
      <h1>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          EcoFinds
        </Link>
      </h1>
      <nav>
        {user ? (
          <>
            <span style={{ marginRight: '1rem' }}>Welcome, {user.username}</span>
            <button onClick={handleLogout} style={{ border: 'none', background: 'transparent', color: '#2c5b3d', cursor: 'pointer', fontSize: '1rem' }}>
              Logout
            </button>
          </>
        ) : (
          
          <>
            <Link to="/login" style={{ marginLeft: '1rem' }}>
              Login
            </Link>
            <Link to="/signup" style={{ marginLeft: '1rem' }}>
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;