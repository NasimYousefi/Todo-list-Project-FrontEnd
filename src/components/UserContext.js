

import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from '../axiosConfig';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    console.log("Initial token from localStorage:", storedToken);
    return storedToken;
  });
  const [loading, setLoading] = useState(true);

  console.log("UserProvider rendering, user:", user, "token:", token);


  const checkAuthStatus = useCallback(async () => {
    if (token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get('/user/info');
        setUser(response.data);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  

  const fetchUserInfo = useCallback(async (tokenToUse) => {
    if (!tokenToUse) {
      setLoading(false);
      return;
    }
    try {
      console.log("fetchUserInfo starting with token:", tokenToUse);
      const response = await axios.get('/user/info', {
        headers: {
          Authorization: `Bearer ${tokenToUse}`
        }
      });
      console.log("User info response received:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("UserProvider useEffect is running with token:", token);
    if (token) {
      fetchUserInfo(token);
    } else {
      setLoading(false);
    }
  }, [token, fetchUserInfo]);

  const login = async (credentials) => {
    console.log("Login function called");
    try {
      const response = await axios.post('/auth/login', credentials);
      const { token: newToken } = response.data;
      console.log("Login successful, received token:", newToken);
      localStorage.setItem('token', newToken);
      setToken(newToken);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    console.log("Logout function called");
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const updateUserInfo = (newInfo) => {
    setUser(prevUser => ({ ...prevUser, ...newInfo }));
  };

  return (
    <UserContext.Provider value={{ user, token, loading, login, logout, updateUserInfo }}>
      {console.log("UserContext.Provider rendering", { user, token, loading })}
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => {
  const context = React.useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};