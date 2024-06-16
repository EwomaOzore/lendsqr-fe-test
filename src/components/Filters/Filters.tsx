import React, { useState } from 'react';
import './Filters.scss';

interface FiltersProps {
    onFilterChange: (filters: { [key: string]: string }) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        organization: '',
        username: '',
        email: '',
        date: '',
        phoneNumber: '',
        status: '',
    });

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleResetFilters = () => {
        const resetFilters = {
            organization: '',
            username: '',
            email: '',
            date: '',
            phoneNumber: '',
            status: '',
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    const handleApplyFilters = () => {
        onFilterChange(filters);
    };

    return (
        <div className="filters">
            <div className="filter-group">
                <label htmlFor="organization">Organization</label>
                <input type="text" id="organization" name="organization" value={filters.organization} onChange={handleFilterChange} />
            </div>
            <div className="filter-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={filters.username} onChange={handleFilterChange} />
            </div>
            <div className="filter-group">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" value={filters.email} onChange={handleFilterChange} />
            </div>
            <div className="filter-group">
                <label htmlFor="date">Date Joined</label>
                <input type="date" id="date" name="date" value={filters.date} onChange={handleFilterChange} />
            </div>
            <div className="filter-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text" id="phoneNumber" name="phoneNumber" value={filters.phoneNumber} onChange={handleFilterChange} />
            </div>
            <div className="filter-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={filters.status} onChange={handleFilterChange}>
                    <option value="">Select</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="blacklisted">Blacklisted</option>
                </select>
            </div>
            <div className="filter-buttons">
                <button className="reset-button" onClick={handleResetFilters}>Reset</button>
                <button className="apply-button" onClick={handleApplyFilters}>Apply</button>
            </div>
        </div>
    );
};

export default Filters;