/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      toast.success('Login successful', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
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
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">Username:</label>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;



// import { useForm } from 'react-hook-form';
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import './Login.css'
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();

//   const schema = yup.object().shape({
//     username: yup.string().required("Username is required"),
//     password: yup.string().required("Password is required"),
//   });
  

//   const { register, handleSubmit, formState: { errors }, reset } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmitHandler = async (data) => {
//     try {
//       await axios.post("http://localhost:4000/api/auth/login", data);
//       toast.success("Login successful", {
//         position: toast.POSITION.TOP_CENTER,
//         autoclose: 1000
//       });
//       navigate("/dashboard");
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.error === "Invalid credentials") {
//         toast.error("Invalid username or password", {
//           position: toast.POSITION.TOP_CENTER,
//           autoclose: 1000
//         });
//       } else {
//         toast.error("An error occurred while logging in", {
//           position: toast.POSITION.TOP_CENTER,
//           autoclose: 1000
//         });
//       }
//       reset();
//     }
//   };
  

//   return (
//     <div className='login'>
//       <div className="form-container">
//       <h1>Login Here</h1>
//       <form className="form-container" onSubmit={handleSubmit(onSubmitHandler)}>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           placeholder="Enter your name"
//           {...register("name")}
//         />
//         <p>{errors.name?.message}</p>
//         <label htmlFor="username">Password:</label>
//         <input
//           type="password"
//           placeholder="Password"
//           {...register("password")}
//         />
//         <p>{errors.password?.message}</p>
//         <button type='submit'>Login</button>
//         <span>Dont have an account? <Link to='/register'>Register</Link></span>
//       </form>
//       </div>
//     </div>
//   )
// }

// export default Login;