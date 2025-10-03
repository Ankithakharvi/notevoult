import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'; // Make sure the path is correct (may need to be '../../api/axios')
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from '../utils/storage'; // Make sure the path is correct

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [user, setUserState] = useState(getUser()); 
  const [loading, setLoading] = useState(true);
  // NOTE: Assuming you are passing error and loading from the AuthContext to RegisterForm
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const setUserAndStorage = (userData) => {
    setUserState(userData);
    setUser(userData);
  };

  const fetchProfile = useCallback(async () => {
    const token = getToken();
    if (token) {
      try {
        const response = await axios.get('/api/users/profile');
        setUserAndStorage(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const login = async (email, password) => {
    setError(null); // Clear previous errors
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user: userData } = response.data;
      setToken(token);
      setUserAndStorage(userData);
      await fetchProfile();
      navigate('/');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const register = async (username, email, password) => {
    setError(null); // Clear previous errors
    setLoading(true); // Set loading state
    try {
      // 🔑 FINAL FIX: Sending 'username' as the key to match backend validation (authRoutes.js)
      const response = await axios.post('/api/auth/register', { 
        username, // Equivalent to username: username
        email, 
        password 
      });
      
      const { token, user: userData } = response.data;
      setToken(token);
      setUserAndStorage(userData);
      
      // Do NOT navigate here yet if you are using a toast message in RegisterForm.js
      // The RegisterForm handles navigation after showing the toast.
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed.';
      // Try to get message from backend payload
      if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors?.length > 0) {
          // If backend returns express-validator errors array
          errorMessage = error.response.data.errors[0].msg || 'Validation error.';
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
        setLoading(false);
    }
  };

  const updateProfile = async (name, email) => {
    setError(null);
    try {
      const response = await axios.put('/api/users/profile', { name, email });
      setUserAndStorage(response.data);
      return { success: true, message: 'Profile updated successfully!' };
    } catch (error) {
      console.error('Profile update error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update profile.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const logout = () => {
    removeToken();
    removeUser();
    setIsAuthenticated(false);
    setUserState(null);
    navigate('/login');
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    error, // ✅ Expose error state for forms
    login,
    register,
    logout,
    updateProfile,
    fetchProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};