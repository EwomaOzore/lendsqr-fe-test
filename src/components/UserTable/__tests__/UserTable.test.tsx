import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserTable from '../UserTable';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom/extend-expect';

const API_URL = 'https://run.mocky.io/v3/1af640a7-f83b-444a-99db-f81b4491e2d7';

const mock = new MockAdapter(axios);
const mockUsers = [
    {
        organization: 'Org1',
        id: 1,
        full_name: 'John Doe',
        phone_number: '123456789',
        office_email: 'john@example.com',
        date_joined: '2023-01-01',
        time_joined: '10:00 AM',
        status: 'Active'
    },
    {
        organization: 'Org2',
        id: 2,
        full_name: 'Jane Doe',
        phone_number: '987654321',
        office_email: 'jane@example.com',
        date_joined: '2023-01-02',
        time_joined: '11:00 AM',
        status: 'Inactive'
    }
];

describe('UserTable Component', () => {
    beforeEach(() => {
        mock.onGet(API_URL).reply(200, { users: mockUsers });
    });

    afterEach(() => {
        mock.reset();
    });

    test('renders correctly', async () => {
        render(
            <BrowserRouter>
                <UserTable />
            </BrowserRouter>
        );

        expect(screen.getByText('LOADING...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        });
    });

    test('toggles filter dropdown', async () => {
        render(
            <BrowserRouter>
                <UserTable />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        const filterIcons = screen.getAllByAltText('Filter');
        fireEvent.click(filterIcons[0]);

        await waitFor(() => {
            expect(screen.getByText('Filter')).toBeInTheDocument();
        });

        fireEvent.click(filterIcons[0]);

        await waitFor(() => {
            expect(screen.queryByText('Filter')).not.toBeInTheDocument();
        });
    });

    test('toggles more dropdown', async () => {
        render(
            <BrowserRouter>
                <UserTable />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        const moreIcons = screen.getAllByAltText('More');
        fireEvent.click(moreIcons[0]);

        await waitFor(() => {
            expect(screen.getByText('View Details')).toBeInTheDocument();
        });

        fireEvent.click(moreIcons[0]);

        await waitFor(() => {
            expect(screen.queryByText('View Details')).not.toBeInTheDocument();
        });
    });

    test('navigates to user details on view details click', async () => {
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        render(
            <BrowserRouter>
                <UserTable />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        const moreIcons = screen.getAllByAltText('More');
        fireEvent.click(moreIcons[0]);

        await waitFor(() => {
            expect(screen.getByText('View Details')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('View Details'));

        expect(mockNavigate).toHaveBeenCalledWith('/users/1');
    });
});