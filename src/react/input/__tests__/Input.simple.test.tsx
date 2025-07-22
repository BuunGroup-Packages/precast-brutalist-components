import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Input } from '../Input';

describe('Input Component', () => {
  it('renders without crashing', () => {
    render(<Input placeholder="Test input" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('handles different input types', () => {
    const types = ['text', 'email', 'password', 'number'];
    types.forEach(type => {
      const { container } = render(<Input type={type} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('supports controlled value', () => {
    render(<Input value="test value" readOnly />);
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('handles input changes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('applies different variants', () => {
    const variants = ['default', 'error', 'success'] as const;
    variants.forEach(variant => {
      const { container } = render(<Input variant={variant} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(<Input size={size} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});