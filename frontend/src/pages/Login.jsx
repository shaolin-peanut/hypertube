import React from 'react';
// components
import AuthForm from '../components/AuthForm';
import MatchaLayout from '../components/MatchaLayout';

const Login = () => {
  return (
    <MatchaLayout>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    </MatchaLayout>
  );
};

export default Login;
