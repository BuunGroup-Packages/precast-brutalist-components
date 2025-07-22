import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Progress } from '../Progress';

describe('Progress Component', () => {
  it('renders without crashing', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays correct progress value', () => {
    render(<Progress value={75} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '75');
  });

  it('supports max value', () => {
    render(<Progress value={30} max={100} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  });

  it('handles indeterminate state', () => {
    render(<Progress indeterminate />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('applies different variants', () => {
    const variants = ['default', 'striped', 'animated'] as const;
    variants.forEach(variant => {
      const { container } = render(<Progress value={50} variant={variant} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different colors', () => {
    const colors = ['accent', 'success', 'warning', 'error', 'info'] as const;
    colors.forEach(color => {
      const { container } = render(<Progress value={50} color={color} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(<Progress value={50} size={size} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});