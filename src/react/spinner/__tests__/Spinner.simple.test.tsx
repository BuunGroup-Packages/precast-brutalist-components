import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Spinner } from '../Spinner';

describe('Spinner Component', () => {
  it('renders without crashing', () => {
    render(<Spinner aria-label="Loading" />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('displays loading indicator', () => {
    render(<Spinner aria-label="Loading spinner" />);
    expect(screen.getByLabelText('Loading spinner')).toBeInTheDocument();
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;
    sizes.forEach(size => {
      const { container } = render(<Spinner size={size} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('supports different variants', () => {
    const variants = ['dots', 'bars', 'square', 'glitch'] as const;
    variants.forEach(variant => {
      const { container } = render(<Spinner variant={variant} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('supports custom colors', () => {
    const colors = ['default', 'accent', 'success', 'warning', 'error', 'info'] as const;
    colors.forEach(color => {
      const { container } = render(<Spinner color={color} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});