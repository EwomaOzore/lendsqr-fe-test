import React from 'react';
import { render, screen } from '@testing-library/react';
import StatCard from '../StatCard';
import '@testing-library/jest-dom/extend-expect';

describe('StatCard Component', () => {
  test('renders StatCard with correct props', () => {
    const props = {
      title: 'USERS',
      value: 100,
      imgSrc: '/svg/users.svg',
      imgClassName: 'users'
    };

    render(<StatCard {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();

    expect(screen.getByText(props.value.toString())).toBeInTheDocument();

    const imgElement = screen.getByAltText(props.title);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', props.imgSrc);

    expect(imgElement).toHaveClass(`stat-card__image ${props.imgClassName}`);
  });

  test('renders StatCard without imgClassName', () => {
    const props = {
      title: 'ACTIVE USERS',
      value: 50,
      imgSrc: '/svg/active-users.svg'
    };

    render(<StatCard {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();

    expect(screen.getByText(props.value.toString())).toBeInTheDocument();

    const imgElement = screen.getByAltText(props.title);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', props.imgSrc);

    expect(imgElement).toHaveClass('stat-card__image');
  });
});
