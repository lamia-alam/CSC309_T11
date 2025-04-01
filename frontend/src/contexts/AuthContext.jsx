// src/contexts/authContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // For Vite, environment variables must start with 'VITE_'
  // e.g. create a .env file with: VITE_BACKEND_URL=http://localhost:3000
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  /**
   * On component mount, check if we have a stored token.
   * If so, attempt to fetch user data from /user/me and set user state.
   * If the token is invalid, remove it and set user to null.
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${BACKEND_URL}/user/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Invalid token');
          return res.json();
        })
        .then((data) => {
          setUser(data.user);
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem('token');
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, [BACKEND_URL]);

  /**
   * Login a user with their credentials.
   * 
   * 1. Send credentials to /login
   * 2. If failure, return the error message
   * 3. If success, store the token, fetch user data, set user context, navigate to /profile
   */
  const login = async (username, password) => {
    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // On failure, the backend returns { "message": "error message" }
        const errorData = await response.json();
        return errorData.message;
      }

      const data = await response.json();
      const { token } = data;

      // Store the token
      localStorage.setItem('token', token);

      // Retrieve user data from /user/me
      const userResponse = await fetch(`${BACKEND_URL}/user/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        return errorData.message;
      }

      const userData = await userResponse.json();
      setUser(userData.user);

      // Navigate to /profile on success
      navigate('/profile');
    } catch (err) {
      return err.message;
    }
  };

  /**
   * Registers a new user.
   * 
   * 1. Send user data to /register
   * 2. If backend responds with an error, return the error message
   * 3. If success, navigate to /success (or wherever your instructions say)
   */
  const register = async ({ username, firstname, lastname, password }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, firstname, lastname, password }),
      });

      if (!response.ok) {
        // For errors, e.g. 409 Conflict, you get { "message": "error message" }
        const errorData = await response.json();
        return errorData.message;
      }

      // On success, the server returns { "message": "User registered successfully" }
      navigate('/success');
    } catch (err) {
      return err.message;
    }
  };

  /**
   * Logout the currently authenticated user.
   * 
   * Remove the token from localStorage and set user to null,
   * then navigate to the homepage.
   */
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
