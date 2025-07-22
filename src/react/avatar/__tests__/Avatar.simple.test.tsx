import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Avatar } from '../Avatar';

describe('Avatar Component', () => {
  it('renders without crashing', () => {
    render(<Avatar initials="AB" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('displays image when src provided', () => {
    render(<Avatar src="test.jpg" alt="Test Avatar" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('alt', 'Test Avatar');
  });

  it('displays initials fallback', () => {
    render(<Avatar initials="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('displays status indicator', () => {
    render(<Avatar initials="AB" status="online" />);
    const status = screen.getByLabelText('Status: online');
    expect(status).toBeInTheDocument();
  });

  it('handles clickable state', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Avatar initials="AB" onClick={onClick} clickable />);
    
    const avatar = screen.getByRole('button');
    expect(avatar).toHaveAttribute('tabIndex', '0');
    await user.click(avatar);
    expect(onClick).toHaveBeenCalled();
  });

  it('applies different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    sizes.forEach(size => {
      const { container } = render(<Avatar size={size} initials="AB" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});