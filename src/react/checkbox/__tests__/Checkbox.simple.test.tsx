import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Checkbox } from '../Checkbox';

describe('Checkbox Component', () => {
  it('renders without crashing', () => {
    render(<Checkbox aria-label="Test checkbox" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('handles checked state', () => {
    render(<Checkbox checked readOnly aria-label="Checked checkbox" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('handles change events', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Checkbox onChange={onChange} aria-label="Interactive checkbox" />);
    
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(onChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Checkbox disabled aria-label="Disabled checkbox" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('applies different variants', () => {
    const variants = ['default', 'success', 'warning', 'error'] as const;
    variants.forEach(variant => {
      const { container } = render(<Checkbox variant={variant} aria-label={`${variant} checkbox`} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(<Checkbox size={size} aria-label={`${size} checkbox`} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});