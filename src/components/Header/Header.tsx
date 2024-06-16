import React from 'react';
import './Header.scss';

const Header: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={className}>
            <div className="header">
                <img src="logo.svg" alt="Logo" className="logo" />

                <div className="search-container">
                    <input type="text" placeholder="Search for anything" />
                    <img src='/svg/search.svg' alt="Search" className="search-icon" />
                </div>

                <div className="user-info">
                    <a href="/docs">Docs</a>
                    <div className="notification">
                        <img src="/svg/notification.svg" alt="Notifications" />
                    </div>
                    <div className="user-profile">
                        <img src="/user-profile.png" alt="User" />
                        <span>Adedeji</span>
                        <img src="/svg/dropdown.svg" alt="Dropdpwn" style={{ width: 7, marginLeft: 10 }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;