import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Switch } from '../Switch';

describe('Switch Component', () => {
  it('renders without crashing', () => {
    render(<Switch aria-label="Test switch" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('handles checked state', () => {
    render(<Switch checked readOnly aria-label="Checked switch" />);
    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeChecked();
  });

  it('handles toggle interaction', async () => {
    const user = userEvent.setup();
    const onCheckedChange = jest.fn();
    render(<Switch onCheckedChange={onCheckedChange} aria-label="Toggle switch" />);
    
    const switchElement = screen.getByRole('checkbox');
    await user.click(switchElement);
    expect(onCheckedChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Switch disabled aria-label="Disabled switch" />);
    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeDisabled();
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(<Switch size={size} aria-label={`${size} switch`} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});