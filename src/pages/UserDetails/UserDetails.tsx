import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import './UserDetails.scss';

const UserDetails: React.FC<{ organization: string }> = ({ organization }) => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://run.mocky.io/v3/e23f44a0-ab98-4b96-8ed8-83b88952868c`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading user...</p>;
  }

  return (
    <div className="dashboard">
      <Sidebar className="sidebar" />
      <div className="main-content">
        <Header className="header" />
        <div className="content">
          <div className="user-details">
            <div className="back-to-users">
              <img src='/svg/backarrow.svg' alt='Back Arrow' /> Back to Users
            </div>
            <div className="user-header">
              <h2>User Details</h2>
              <div className="user-actions">
                <button className="blacklist-button">BLACKLIST USER</button>
                <button className="activate-button">ACTIVATE USER</button>
              </div>
            </div>
          </div>
          <div className="user-profile">
            <div className='profile'>
              <div className="profile-image">
                <img src="/avatar.png" alt="User Avatar" style={{ width: 100 }} />
              </div>
              <div className="profile-info">
                <div>
                  <h3>Oluwaseun Adeyemi</h3>
                  <p>LSQFf587g90</p>
                </div>
                <div className="vertical-line"></div>
                <div className="user-tier">
                  <p>User’s Tier</p>
                  {/* Placeholder for star ratings */}
                </div>
                <div className="vertical-line"></div>
                <div className="amount-owed">
                  <h3>₦200,000.00</h3>
                  <p>9912345678/Providus Bank</p>
                </div>
              </div>
            </div>
            <nav className="user-navigation">
              <ul>
                <li className="active">General Details</li>
                <li>Documents</li>
                <li>Bank Details</li>
                <li>Loans</li>
                <li>Savings</li>
                <li>App and System</li>
              </ul>
            </nav>
          </div>

          <div className="user-section">
            <div className="section">
              <h3>Personal Information</h3>
              <div className="details">
                <div>
                  FULL NAME
                  <p>Oluwaseun Adeyemi</p>
                </div>
                <div>
                  PHONE NUMBER
                  <p>2348012345678</p>
                </div>
                <div>
                  EMAIL ADDRESS
                  <p>oluwaseun@gmail.com</p>
                </div>
                <div>
                  BVN
                  <p>12345678901</p>
                </div>
                <div>
                  GENDER
                  <p>Male</p>
                </div>
                <div>
                  MARITAL STATUS
                  <p>Single</p>
                </div>
                <div>
                  NUMBER OF CHILDREN
                  <p>2</p>
                </div>
                <div>
                  TYPE OF RESIDENCE
                  <p>Apartment</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="section">
              <h3>Education and Employment</h3>
              <div className="details">
                <div>
                  LEVEL OF EDUCATION
                  <p>B.Sc</p>
                </div>
                <div>
                  EMPLOYMENT STATUS
                  <p>Employed</p>
                </div>
                <div>
                  SECTOR OF EMPLOYMENT
                  <p>Banking</p>
                </div>
                <div>
                  DURATION OF EMPLOYMENT
                  <p>5 years</p>
                </div>
                <div>
                  OFFICE EMAIL
                  <p>oluwaseun@lendsqr.com</p>
                </div>
                <div>
                  MONTHLY INCOME
                  <p>₦150,000.00 - ₦250,000.00</p>
                </div>
                <div>
                  LOAN REPAYMENT
                  <p>40,000</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="section">
              <h3>Socials</h3>
              <div className="details">
                <div>
                  TWITTER
                  <p>@oluwaseun</p>
                </div>
                <div>
                  FACEBOOK
                  <p>oluwaseun.adeyemi</p>
                </div>
                <div>
                  INSTAGRAM
                  <p>@oluwaseun_adeyemi</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="section">
              <h3>Guarantor</h3>
              <div className="details">
                <div>
                  FULL NAME
                  <p>Temitope Adeyemi</p>
                </div>
                <div>
                  PHONE NUMBER
                  <p>2348098765432</p>
                </div>
                <div>
                  EMAIL ADDRESS
                  <p>temitope@gmail.com</p>
                </div>
                <div>
                  RELATIONSHIP
                  <p>Sibling</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;