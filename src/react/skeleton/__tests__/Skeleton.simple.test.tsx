import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Skeleton } from '../Skeleton';

describe('Skeleton Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies different shapes', () => {
    const shapes = ['text', 'circular', 'rectangular'] as const;
    shapes.forEach(shape => {
      const { container } = render(<Skeleton shape={shape} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different variants', () => {
    const variants = ['default', 'rounded'] as const;
    variants.forEach(variant => {
      const { container } = render(<Skeleton variant={variant} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies custom width and height', () => {
    const { container } = render(<Skeleton width={200} height={100} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('supports different animations', () => {
    const animations = ['pulse', 'wave', 'none'] as const;
    animations.forEach(animation => {
      const { container } = render(<Skeleton animation={animation} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="custom-skeleton" />);
    expect(container.firstChild).toHaveClass('custom-skeleton');
  });

  it('supports multiple text lines', () => {
    const { container } = render(<Skeleton shape="text" lines={3} />);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(3);
  });

  it('renders with role status for accessibility', () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector('[role="status"]')).toBeInTheDocument();
  });
});