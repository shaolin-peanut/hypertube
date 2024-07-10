import React from 'react';
// components
import AuthForm from '../components/AuthForm';
import MatchaBackground from '../components/MatchaBackground';

const Login = () => {
  return (
    <MatchaBackground>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    </MatchaBackground>
  );
};

export default Login;
