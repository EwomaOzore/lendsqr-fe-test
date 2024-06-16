import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import Filters from '../Filters/Filters';
import './UserTable.scss';

const API_URL = 'https://run.mocky.io/v3/e23f44a0-ab98-4b96-8ed8-83b88952868c';

interface User {
  organization: string;
  id: number;
  full_name: string;
  phone_number: string;
  office_email: string;
  date_joined: string;
  time_joined: string;
  status: string;
}

const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data.users;
};

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [openFilterDropdownId, setOpenFilterDropdownId] = useState<number | null>(null);
  const [openMoreDropdownId, setOpenMoreDropdownId] = useState<number | null>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
      setFilteredUsers(usersData);
    };

    getUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setOpenFilterDropdownId(null);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setOpenMoreDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleFilterDropdown = (id: number) => {
    setOpenFilterDropdownId(openFilterDropdownId === id ? null : id);
    setOpenMoreDropdownId(null);
  };

  const toggleMoreDropdown = (id: number) => {
    setOpenMoreDropdownId(openMoreDropdownId === id ? null : id);
    setOpenFilterDropdownId(null);
  };

  const handleViewDetails = (userId: number) => {
      console.log('Navigating to user details:', userId);
      navigate(`/user/${userId}`);
      };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filters: { [key: string]: string }) => {
    let filtered = users;

    if (filters.organization) {
      filtered = filtered.filter(user => user.organization === filters.organization);
    }
    if (filters.username) {
      filtered = filtered.filter(user => user.full_name.toLowerCase().includes(filters.username.toLowerCase()));
    }
    if (filters.email) {
      filtered = filtered.filter(user => user.office_email.toLowerCase().includes(filters.email.toLowerCase()));
    }
    if (filters.date) {
      filtered = filtered.filter(user => user.date_joined === filters.date);
    }
    if (filters.phoneNumber) {
      filtered = filtered.filter(user => user.phone_number.includes(filters.phoneNumber));
    }
    if (filters.status) {
      filtered = filtered.filter(user => user.status.toLowerCase() === filters.status.toLowerCase());
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="user-table-container">
      <div className="user-table">
        <table>
          <thead>
            <tr>
              {['organization', 'username', 'email', 'phoneNumber', 'date', 'status'].map((key, index) => (
                <th key={index}>
                  <span className='table-header'>
                    {key.toUpperCase()}
                    <img
                      src="/svg/filter.svg"
                      alt="Filter"
                      className='filter-img'
                      onClick={() => toggleFilterDropdown(index)}
                    />
                    {openFilterDropdownId === index && (
                      <div ref={filterDropdownRef} className="filter-dropdown">
                        <Filters
                          onFilterChange={handleFilterChange}
                        />
                      </div>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.full_name}</td>
                <td>{user.office_email}</td>
                <td>{user.phone_number}</td>
                <td>{`${user.date_joined} ${user.time_joined}`}</td>
                <td>
                  <span className={`status ${user.status.toLowerCase()}`}>{user.status}</span>
                </td>
                <td className="actions">
                  <div ref={moreDropdownRef}>
                    <img
                      src="/svg/more-vert.svg"
                      alt="More"
                      onClick={() => toggleMoreDropdown(user.id)}
                    />
                    {openMoreDropdownId === user.id && (
                      <div className="dropdown-menu">
                        <ul>
                          <li onClick={() => handleViewDetails(user.id)}>
                            <img src="/svg/viewdetails.svg" alt="View Details" />View Details
                          </li>
                          <li>
                            <img src="/svg/blacklistuser.svg" alt="Blacklist User" />Blacklist User
                          </li>
                          <li>
                            <img src="/svg/activateuser.svg" alt="Activate User" />Activate User
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
          onPageChange={handlePageChange}
          onPageSelect={handlePageSelect}
        />
      </div>
    </div>
  );
};

export default UserTable;