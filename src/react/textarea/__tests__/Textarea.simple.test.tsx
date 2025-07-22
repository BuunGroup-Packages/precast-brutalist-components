import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Textarea } from '../Textarea';

describe('Textarea Component', () => {
  it('renders without crashing', () => {
    render(<Textarea placeholder="Enter text..." />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('supports multiline input', () => {
    render(<Textarea rows={4} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '4');
  });

  it('supports character limit', () => {
    render(<Textarea maxLength={100} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('maxLength', '100');
  });

  it('handles input changes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Textarea onChange={onChange} />);
    
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'hello world');
    expect(onChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('applies different variants', () => {
    const variants = ['default', 'error', 'success'] as const;
    variants.forEach(variant => {
      const { container } = render(<Textarea variant={variant} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(<Textarea size={size} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});