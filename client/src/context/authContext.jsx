/* eslint-disable react/prop-types */
import { createContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:4000/api/auth/login", inputs);
    setCurrentUser(res.data);
  };

  // logout
  const logout = async () => {
    await axios.post("http://localhost:4000/api/auth/logout");
    setCurrentUser(null);
  };

  // useEffect
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  // console.log('currentUser:', currentUser); // Add this console.log statement

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
