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

  // Clear session on window close
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     localStorage.removeItem('user');
  //   };
  
  //   const handleUnload = () => {
  //     localStorage.removeItem('user');
  //   };
  
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   window.addEventListener('unload', handleUnload);
  
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //     window.removeEventListener('unload', handleUnload);
  //   };
  // }, []);
  
  
  

  // Update localStorage on currentUser change
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

