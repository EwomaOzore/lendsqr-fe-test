import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import UserStats from '../../components/UserStats/UserStats';
import UserTable from '../../components/UserTable/UserTable';
import './Users.scss';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Sidebar className="sidebar" />
      <div className="main-content">
        <Header className="header" />
        <div className="content">
          <UserStats />
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;