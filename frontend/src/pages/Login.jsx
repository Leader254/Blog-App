/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Login.css';
import Loading from './Loading';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(inputs);
      toast.success('Login successful', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      setLoading(false);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error === 'User not found') {
        toast.error('Invalid, check your credentials', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      } else {
        toast.error('An error occurred while logging in', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {
          loading ? <Loading /> : null
      }
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">Username:</label>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          id='username'
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          id='password'
          onChange={handleChange}
        />
        <button type="submit">
          {loading ? <Loading /> : 'Login'}
        </button>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
