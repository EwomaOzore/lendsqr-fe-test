import React from 'react';
import './Pagination.scss';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onPageSelect: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, onPageSelect }) => {
    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <span
                    key={i}
                    className={`page ${i === currentPage ? 'active' : ''}`}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </span>
            );
        }
        return pages;
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="pagination">
            <div className="page-selection">
                <span>Showing </span>
                <select value={currentPage} onChange={(e) => onPageSelect(Number(e.target.value))}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <option key={page} value={page}>{page}</option>
                    ))}
                </select>
                <span> of {totalPages}</span>
            </div>
            <div className="pages">
                <span className={`chevron ${currentPage === 1 ? 'disabled' : ''}`} onClick={handlePreviousPage}>
                    <img src='svg/chevronleft.svg' alt='Previous' />
                </span>
                {renderPageNumbers()}
                <span className={`chevron ${currentPage === totalPages ? 'disabled' : ''}`} onClick={handleNextPage}>
                    <img src='svg/chevronright.svg' alt='Next' />
                </span>
            </div>
        </div>
    );
};

export default Pagination;