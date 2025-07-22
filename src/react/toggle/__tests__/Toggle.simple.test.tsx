import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Toggle } from '../Toggle';

describe('Toggle Component', () => {
  it('renders without crashing', () => {
    render(<Toggle aria-label="Toggle button" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles pressed state', () => {
    render(<Toggle pressed aria-label="Pressed toggle" />);
    const toggle = screen.getByRole('button');
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });

  it('handles toggle interaction', async () => {
    const user = userEvent.setup();
    const onPressedChange = jest.fn();
    render(<Toggle onPressedChange={onPressedChange} aria-label="Interactive toggle" />);
    
    const toggle = screen.getByRole('button');
    await user.click(toggle);
    expect(onPressedChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Toggle disabled aria-label="Disabled toggle" />);
    const toggle = screen.getByRole('button');
    expect(toggle).toBeDisabled();
  });

  it('applies different variants', () => {
    const variants = ['default', 'brutal', 'outline'] as const;
    variants.forEach(variant => {
      const { container } = render(<Toggle variant={variant} aria-label={`${variant} toggle`} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(<Toggle size={size} aria-label={`${size} toggle`} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});