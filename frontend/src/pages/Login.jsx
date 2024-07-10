import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => {
  return (
    // change classes so that background fills the whole screen
    // <div className="min-h-screen min-w-screen bg-gradient-to-br from-background-start to-background-end">
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-background-start to-background-end">
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
