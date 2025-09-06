import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/mockApiService';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();
  const auth = useAuth();

  
  const validateForm = () => {
    const newErrors = {};
    
  
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'A valid email address is required.';
    }
    
  
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; 
    }
    
    
    setErrors({});
    
    try {
      const response = await api.login(email, password);
      auth.login(response);
      navigate('/');
    } catch (err) {
    
      setApiError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {/* Display email validation error */}
          {errors.email && <p style={{ color: 'red', fontSize: '0.8rem', margin: '4px 0 0' }}>{errors.email}</p>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {/* Display password validation error */}
          {errors.password && <p style={{ color: 'red', fontSize: '0.8rem', margin: '4px 0 0' }}>{errors.password}</p>}
        </div>
        {/* Display errors from the API call */}
        {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
        <button type="submit">Login</button>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginScreen;