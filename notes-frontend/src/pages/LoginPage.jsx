import React from 'react';
import Login from '../components/Auth/Login';
import DashboardPage from "./DashboardPage"


const LoginPage = () => {
  return (
    <div>
      <Login />
      <DashboardPage />
    </div>
  );
};

export default LoginPage;
