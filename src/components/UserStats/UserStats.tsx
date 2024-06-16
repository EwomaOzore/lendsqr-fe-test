import React, { useEffect, useState } from 'react';
import StatCard from '../StatCard/StatCard';
import './UserStats.scss';
import { fetchUsers } from '../../api/mockApi';

const UserStats: React.FC = () => {
    const [statistics, setStatistics] = useState({
        total_users: 0,
        active_users: 0,
        users_with_loans: 0,
        users_with_savings: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUsers();
            setStatistics(data.statistics);
        };

        fetchData();
    }, []);

    return (
        <div className="user-stats">
            <StatCard
                title="USERS"
                value={statistics.total_users}
                imgSrc='/svg/users.svg'
                imgClassName="users custom-image"
            />
            <StatCard
                title="ACTIVE USERS"
                value={statistics.active_users}
                imgSrc='/svg/active-users.svg'
                imgClassName="active custom-image"
            />
            <StatCard
                title="USERS WITH LOANS"
                value={statistics.users_with_loans}
                imgSrc='/svg/users-with-loans.svg'
                imgClassName="loans custom-image"

            />
            <StatCard
                title="USERS WITH SAVINGS"
                value={statistics.users_with_savings}
                imgSrc='/svg/users-with-savings.svg'
                imgClassName="savings custom-image"
            />
        </div>
    );
};

export default UserStats;