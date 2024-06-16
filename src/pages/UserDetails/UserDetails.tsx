import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import './UserDetails.scss';

interface User {
  id: any;
  full_name: string;
  serial_number: string;
  users_tier: number; // Assuming users_tier is a number
  account_owed: string;
  account_number: string;
  bank: string;
  phone_number: string;
  email_address: string;
  bvn: string;
  gender: string;
  marital: string;
  children: number;
  type_of_residence: string;
  level_of_education: string;
  employment_status: string;
  sector_of_employment: string;
  duration_of_employment: string;
  office_email: string;
  monthly_income: string;
  loan_repayment: string;
  social_media: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    full_name: string;
    phone_number: string;
    email_address: string;
    relationship: string;
  };
  date_joined: string;
  time_joined: string;
  status: string;
}

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/1af640a7-f83b-444a-99db-f81b4491e2d7');
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        const userDetail = userData.users.find((user: User) => user.id.toString() === id);
        setUser(userDetail);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const goBack = () => {
    navigate(`/users`);
  };

  const renderStars = (tier: number) => {
    const stars = [];
    const maxStars = 3;

    for (let i = 1; i <= maxStars; i++) {
      if (i <= tier) {
        stars.push(<img key={i} src="/svg/star_filled.svg" alt="Filled Star" className="star-icon" />);
      } else {
        stars.push(<img key={i} src="/svg/star_empty.svg" alt="Empty Star" className="star-icon" />);
      }
    }

    return stars;
  };

  return (
    <div className="dashboard">
      <Sidebar className="sidebar" />
      <div className="main-content">
        <Header className="header" />
        <div className="content">
          <div className="user-details">
            <div className="back-to-users" onClick={goBack}>
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
            <div className="profile">
              <div className="profile-image">
                <img src="/avatar.png" alt="User Avatar" style={{ width: 100 }} />
              </div>
              <div className="profile-info">
                <div>
                  <h3>{user.full_name}</h3>
                  <p>{user.serial_number}</p>
                </div>
                <div className="vertical-line"></div>
                <div className="user-tier">
                  <p>User’s Tier</p>
                  <div className="star-icons">{renderStars(user.users_tier)}</div>
                </div>
                <div className="vertical-line"></div>
                <div className="amount-owed">
                  <h3>{user.account_owed}</h3>
                  <p>{user.account_number}/{user.bank}</p>
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
                  <p>{user.full_name}</p>
                </div>
                <div>
                  PHONE NUMBER
                  <p>{user.phone_number}</p>
                </div>
                <div>
                  EMAIL ADDRESS
                  <p>{user.email_address}</p>
                </div>
                <div>
                  BVN
                  <p>{user.bvn}</p>
                </div>
                <div>
                  GENDER
                  <p>{user.gender}</p>
                </div>
                <div>
                  MARITAL STATUS
                  <p>{user.marital}</p>
                </div>
                <div>
                  NUMBER OF CHILDREN
                  <p>{user.children}</p>
                </div>
                <div>
                  TYPE OF RESIDENCE
                  <p>{user.type_of_residence}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="section">
              <h3>Education and Employment</h3>
              <div className="details">
                <div>
                  LEVEL OF EDUCATION
                  <p>{user.level_of_education}</p>
                </div>
                <div>
                  EMPLOYMENT STATUS
                  <p>{user.employment_status}</p>
                </div>
                <div>
                  SECTOR OF EMPLOYMENT
                  <p>{user.sector_of_employment}</p>
                </div>
                <div>
                  DURATION OF EMPLOYMENT
                  <p>{user.duration_of_employment}</p>
                </div>
                <div>
                  OFFICE EMAIL
                  <p>{user.office_email}</p>
                </div>
                <div>
                  MONTHLY INCOME
                  <p>{user.monthly_income}</p>
                </div>
                <div>
                  LOAN REPAYMENT
                  <p>{user.loan_repayment}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="section">
              <h3>Socials</h3>
              <div className="details">
                <div>
                  TWITTER
                  <p>{user.social_media.twitter}</p>
                </div>
                <div>
                  FACEBOOK
                  <p>{user.social_media.facebook}</p>
                </div>
                <div>
                  INSTAGRAM
                  <p>{user.social_media.instagram}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="section">
              <h3>Guarantor</h3>
              <div className="details">
                <div>
                  FULL NAME
                  <p>{user.guarantor.full_name}</p>
                </div>
                <div>
                  PHONE NUMBER
                  <p>{user.guarantor.phone_number}</p>
                </div>
                <div>
                  EMAIL ADDRESS
                  <p>{user.guarantor.email_address}</p>
                </div>
                <div>
                  RELATIONSHIP
                  <p> {user.guarantor.relationship}</p>
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