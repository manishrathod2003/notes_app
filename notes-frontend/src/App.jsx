import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import './App.module.css';


const App = () => {
  const [activeTab, setActiveTab] = useState('login'); // Tracks which tab is active

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      case 'dashboard':
        return <DashboardPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <Login />;
    }
  };

  return (
    <div>
      <header style={{ padding: '10px', display: 'flex', justifyContent: 'space-around' }}>
        <button onClick={() => setActiveTab('login')}>Login</button>
        <button onClick={() => setActiveTab('signup')}>Signup</button>
        <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        <button onClick={() => setActiveTab('admin')}>Admin Panel</button>
      </header>
      <main style={{ padding: '20px' }}>{renderActiveTab()}</main>
    </div>
  );
};

export default App;
