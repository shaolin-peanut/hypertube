import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(6).required('Password is required'),
  name: yup.string().when('isNewUser', {
    is: true,
    then: yup.string().required('Name is required'),
  }),
});

const AuthForm = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const watchEmail = watch('email');

  const onSubmit = async (data) => {
    try {
      let response;
      if (isNewUser) {
        response = await axios.post('/api/users', data);
      } else {
        response = await axios.post('/api/login', data);
      }
      
      if (response.data.success) {
        // Handle successful login/signup (e.g., store token, update state)
        navigate('/member/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle error (e.g., show error message)
    }
  };

  const checkUserExists = async (email) => {
    try {
      const response = await axios.get(`/api/users/check?email=${email}`);
      setIsNewUser(!response.data.exists);
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        type="email" 
        placeholder="Email" 
        {...register('email')} 
        onBlur={() => checkUserExists(watchEmail)}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input 
        type="password" 
        placeholder="Password" 
        {...register('password')} 
      />
      {errors.password && <p>{errors.password.message}</p>}

      {isNewUser && (
        <>
          <input 
            type="text" 
            placeholder="Name" 
            {...register('name')} 
          />
          {errors.name && <p>{errors.name.message}</p>}
        </>
      )}

      <button type="submit">
        {isNewUser ? 'Sign Up' : 'Log In'}
      </button>
    </form>
  );
};

export default AuthForm;
