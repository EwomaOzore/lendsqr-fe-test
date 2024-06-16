import React from 'react';
import './StatCard.scss';

interface StatCardProps {
    title: string;
    value: number;
    imgSrc: string;
    imgClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, imgSrc, imgClassName }) => {
    return (
        <div className="stat-card">
            <img src={imgSrc} alt={title} className={`stat-card__image ${imgClassName}`} />
            <h3 className="stat-card__title">{title}</h3>
            <p className="stat-card__value">{value}</p>
        </div>
    );
};

export default StatCard;
