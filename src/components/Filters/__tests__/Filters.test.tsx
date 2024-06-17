import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../Filters';
import '@testing-library/jest-dom/extend-expect';

describe('Filters Component', () => {
  test('renders Filters component correctly', () => {
    render(<Filters onFilterChange={jest.fn()} />);

    expect(screen.getByLabelText(/Organization/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date Joined/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();

    expect(screen.getByText(/Reset/i)).toBeInTheDocument();
    expect(screen.getByText(/Apply/i)).toBeInTheDocument();
  });

  test('updates input fields correctly', () => {
    render(<Filters onFilterChange={jest.fn()} />);

    const organizationInput = screen.getByLabelText(/Organization/i);
    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const dateInput = screen.getByLabelText(/Date Joined/i);
    const phoneNumberInput = screen.getByLabelText(/Phone Number/i);
    const statusSelect = screen.getByLabelText(/Status/i);

    fireEvent.change(organizationInput, { target: { value: 'Test Organization' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(dateInput, { target: { value: '2023-06-17' } });
    fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
    fireEvent.change(statusSelect, { target: { value: 'active' } });

    expect(organizationInput).toHaveValue('Test Organization');
    expect(usernameInput).toHaveValue('testuser');
    expect(emailInput).toHaveValue('test@example.com');
    expect(dateInput).toHaveValue('2023-06-17');
    expect(phoneNumberInput).toHaveValue('1234567890');
    expect(statusSelect).toHaveValue('active');
  });

  test('resets input fields when Reset button is clicked', () => {
    const mockOnFilterChange = jest.fn();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    const organizationInput = screen.getByLabelText(/Organization/i);
    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const dateInput = screen.getByLabelText(/Date Joined/i);
    const phoneNumberInput = screen.getByLabelText(/Phone Number/i);
    const statusSelect = screen.getByLabelText(/Status/i);

    fireEvent.change(organizationInput, { target: { value: 'Test Organization' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(dateInput, { target: { value: '2023-06-17' } });
    fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
    fireEvent.change(statusSelect, { target: { value: 'active' } });

    fireEvent.click(screen.getByText(/Reset/i));

    expect(organizationInput).toHaveValue('');
    expect(usernameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(dateInput).toHaveValue('');
    expect(phoneNumberInput).toHaveValue('');
    expect(statusSelect).toHaveValue('');

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      organization: '',
      username: '',
      email: '',
      date: '',
      phoneNumber: '',
      status: '',
    });
  });

  test('applies filters when Apply button is clicked', () => {
    const mockOnFilterChange = jest.fn();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    const organizationInput = screen.getByLabelText(/Organization/i);
    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const dateInput = screen.getByLabelText(/Date Joined/i);
    const phoneNumberInput = screen.getByLabelText(/Phone Number/i);
    const statusSelect = screen.getByLabelText(/Status/i);

    fireEvent.change(organizationInput, { target: { value: 'Test Organization' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(dateInput, { target: { value: '2023-06-17' } });
    fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
    fireEvent.change(statusSelect, { target: { value: 'active' } });

    fireEvent.click(screen.getByText(/Apply/i));

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      organization: 'Test Organization',
      username: 'testuser',
      email: 'test@example.com',
      date: '2023-06-17',
      phoneNumber: '1234567890',
      status: 'active',
    });
  });
});