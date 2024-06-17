import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import UserStats from '../UserStats';
import '@testing-library/jest-dom/extend-expect';

const mock = new MockAdapter(axios);

const mockData = {
  statistics: {
    total_users: 100,
    active_users: 50,
    users_with_loans: 25,
    users_with_savings: 30,
  }
};

describe('UserStats Component', () => {
  beforeEach(() => {
    mock.onGet('https://run.mocky.io/v3/1af640a7-f83b-444a-99db-f81b4491e2d7').reply(200, mockData);
  });

  afterEach(() => {
    mock.reset();
  });

  test('renders UserStats component correctly', async () => {
    render(<UserStats />);

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('USERS')).toBeInTheDocument();
      expect(screen.getByText('ACTIVE USERS')).toBeInTheDocument();
      expect(screen.getByText('USERS WITH LOANS')).toBeInTheDocument();
      expect(screen.getByText('USERS WITH SAVINGS')).toBeInTheDocument();
    });

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });
});