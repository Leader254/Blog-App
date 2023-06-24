import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is invalid"),
    password: yup
      .string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol'),
    password2: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password2'), null], 'Must match "password" field value'),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmitHandler = async (data) => {
    try {
      await axios.post("http://localhost:4000/api/auth/register", data);
      toast.success("Congratulations! Please login to your account now", {
        position: toast.POSITION.TOP_CENTER,
        autoclose: 1000
      });
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error === "User already exists") {
        toast.error("User already exists", {
          position: toast.POSITION.TOP_CENTER,
          autoclose: 1000
        });
      } else {
        toast.error("An error occurred while registering", {
          position: toast.POSITION.TOP_CENTER,
          autoclose: 1000
        });
      }
      reset();
    }
  };


  return (
    <div className='auth'>
      <div className="form-container">
        <h1>Register</h1>
        <form action='' onSubmit={handleSubmit(onSubmitHandler)}>
          <label htmlFor="username">Username</label>
          <input
            type="text" placeholder='Enter your name' id='username' name='username' required {...register('username')} />
          <p>{errors.username?.message}</p>
          <label htmlFor="email">Email</label>
          <input
            type="email" placeholder='Enter your email' id='email' name='email' required {...register('email')} />
          <p>{errors.email?.message}</p>
          <label htmlFor="password">Password</label>
          <input
            type="password" placeholder='Enter your password' id='password' name='password' required {...register('password')} />
          <p>{errors.password?.message}</p>
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password" placeholder='Confirm your password' id='password2' name='password2' required {...register('password2')} />
          <p>{errors.password2?.message}</p>
          <button type='submit'>Register</button>

          <span>Already have an account? <Link to='/login'>Login</Link></span>

        </form>
      </div>
    </div>
  )
}

export default Register