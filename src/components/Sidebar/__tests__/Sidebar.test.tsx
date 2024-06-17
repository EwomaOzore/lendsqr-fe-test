import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';
import '@testing-library/jest-dom/extend-expect';

describe('Sidebar Component', () => {
  test('renders Sidebar with correct menu items', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText('Switch Organization')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Guarantors')).toBeInTheDocument();
    expect(screen.getByText('Loans')).toBeInTheDocument();

    expect(screen.getByText('Organizations')).toBeInTheDocument();
    expect(screen.getByText('Loan Products')).toBeInTheDocument();

    expect(screen.getByText('Preferences')).toBeInTheDocument();
    expect(screen.getByText('Fees and Pricing')).toBeInTheDocument();
  });
});
