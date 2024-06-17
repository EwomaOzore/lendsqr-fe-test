import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Users from '../Users';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../components/Sidebar/Sidebar', () => () => <div>Mocked Sidebar</div>);
jest.mock('../../components/Header/Header', () => () => <div>Mocked Header</div>);
jest.mock('../../components/UserStats/UserStats', () => () => <div>Mocked UserStats</div>);
jest.mock('../../components/UserTable/UserTable', () => () => <div>Mocked UserTable</div>);
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span>Icon</span>,
}));

describe('Dashboard Component', () => {
  test('renders correctly', () => {
    render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );

    expect(screen.getByText('Mocked Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
    expect(screen.getByText('Mocked UserStats')).toBeInTheDocument();
    expect(screen.getByText('Mocked UserTable')).toBeInTheDocument();
  });

  test('toggles sidebar on mobile', () => {
    // Set the window width to a mobile size
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByText('Mocked Sidebar')).not.toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByText('Mocked Sidebar')).toBeInTheDocument();
  });

  test('does not show toggle button on desktop', () => {
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));

    render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );

    const toggleButton = screen.queryByRole('button');
    expect(toggleButton).not.toBeInTheDocument();
  });
});