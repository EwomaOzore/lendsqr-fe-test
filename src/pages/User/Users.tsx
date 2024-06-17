import React, { useState, useEffect } from 'react';
import './Users.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import UserStats from '../../components/UserStats/UserStats';
import UserTable from '../../components/UserTable/UserTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Users: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 769);
    if (window.innerWidth >= 769) {
      setIsSidebarOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      <Sidebar className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} />
      <div className={`main-content ${isSidebarOpen ? '' : 'shifted'}`}>
      {isMobile && (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </button>
      )}
        <Header className="header" />
        <div className="content">
          <UserStats />
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default Users;