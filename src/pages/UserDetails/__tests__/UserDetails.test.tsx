import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserDetails from '../UserDetails';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  useNavigate: () => jest.fn(),
}));

const mockUser = {
  id: '1',
  full_name: 'John Doe',
  serial_number: '123456789',
  users_tier: 2,
  account_owed: '10,000',
  account_number: '1234567890',
  bank: 'Mock Bank',
  phone_number: '123-456-7890',
  email_address: 'john.doe@example.com',
  bvn: '12345678901',
  gender: 'Male',
  marital: 'Single',
  children: 2,
  type_of_residence: 'Apartment',
  level_of_education: 'Bachelor\'s Degree',
  employment_status: 'Employed',
  sector_of_employment: 'IT',
  duration_of_employment: '3 years',
  office_email: 'john.doe@work.com',
  monthly_income: '5,000',
  loan_repayment: '500',
  social_media: {
    twitter: '@johndoe',
    facebook: 'facebook.com/johndoe',
    instagram: '@johndoe_insta',
  },
  guarantor: {
    full_name: 'Jane Doe',
    phone_number: '098-765-4321',
    email_address: 'jane.doe@example.com',
    relationship: 'Sister',
  },
  date_joined: '2022-01-01',
  time_joined: '10:00 AM',
  status: 'Active',
};

jest.spyOn(global, 'fetch').mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ users: [mockUser] }),
  }) as Promise<Response>
);

describe('UserDetails Component', () => {
  test('renders user details', async () => {
    render(
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
    expect(screen.getByText('123456789')).toBeInTheDocument();
    expect(screen.getByText('10,000')).toBeInTheDocument();
    expect(screen.getByText('Mock Bank')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Single')).toBeInTheDocument();
    expect(screen.getByText('Bachelor\'s Degree')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  test('navigates back to users list on clicking "Back to Users"', async () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
    
    fireEvent.click(screen.getByText('Back to Users'));

    expect(mockNavigate).toHaveBeenCalledWith('/users');
  });
});