import React from 'react';
import './Sidebar.scss';
import { NavLink } from 'react-router-dom';

const menuItems = {
    customers: [
        { to: '/users', name: 'Users', icon: '/svg/users.svg' },
        { to: '/', name: 'Guarantors', icon: '/svg/guarantors.svg' },
        { to: '/', name: 'Loans', icon: '/svg/loans.svg' },
        { to: '/', name: 'Decision Models', icon: '/svg/decisionmodels.svg' },
        { to: '/', name: 'Savings', icon: '/svg/savings.svg' },
        { to: '/', name: 'Loan Requests', icon: '/svg/loanrequests.svg' },
        { to: '/', name: 'Whitelist', icon: '/svg/whitelist.svg' },
        { to: '/', name: 'Karma', icon: '/svg/karma.svg' },
    ],
    businesses: [
        { to: '/', name: 'Organizations', icon: '/svg/switchorganization.svg' },
        { to: '/', name: 'Loan Products', icon: '/svg/loanrequests.svg' },
        { to: '/', name: 'Savings Products', icon: '/svg/savingsproduct.svg' },
        { to: '/', name: 'Fees and Charges', icon: '/svg/feesandcharges.svg' },
        { to: '/', name: 'Transactions', icon: '/svg/transactions.svg' },
        { to: '/', name: 'Services', icon: '/svg/services.svg' },
        { to: '/', name: 'Service Account', icon: '/svg/serviceaccounts.svg' },
        { to: '/', name: 'Settlements', icon: '/svg/settlements.svg' },
        { to: '/', name: 'Reports', icon: '/svg/reports.svg' },
    ],
    settings: [
        { to: '/', name: 'Preferences', icon: '/svg/preferences.svg' },
        { to: '/', name: 'Fees and Pricing', icon: '/svg/feesandpricing.svg' },
        { to: '/', name: 'Audit Logs', icon: '/svg/auditlog.svg' },
    ],
};

const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={className}>
            <div className="sidebar">
                <nav>
                    <NavLink to="/" className="nav-item" style={{ marginBottom: '20px' }}>
                        <img src={process.env.PUBLIC_URL + '/svg/switchorganization.svg'} alt="Switch Organization" className="icon" />
                        Switch Organization
                    </NavLink>
                    <NavLink to="/" className="nav-item">
                        <img src={process.env.PUBLIC_URL + '/svg/dashboard.svg'} alt="Dashboard" className="icon" />
                        Dashboard
                    </NavLink>
                    <SidebarSection title="CUSTOMERS" items={menuItems.customers} />
                    <SidebarSection title="BUSINESSES" items={menuItems.businesses} />
                    <SidebarSection title="SETTINGS" items={menuItems.settings} />
                </nav>
            </div>
        </div>
    );
};

const SidebarSection: React.FC<{ title: string; items: { to: string; name: string; icon: string }[] }> = ({ title, items }) => {
    return (
        <React.Fragment>
            <div className="section-title">{title}</div>
            {items.map((item, index) => (
                <NavLink key={index} to={item.to} className="nav-item" >
                    <img src={process.env.PUBLIC_URL + item.icon} alt={item.name} className="icon" />
                    {item.name}
                </NavLink>
            ))}
        </React.Fragment>
    );
};

export default Sidebar;