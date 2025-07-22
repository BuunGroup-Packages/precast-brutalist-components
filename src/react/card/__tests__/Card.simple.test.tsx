import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from '../Card';

describe('Card Component', () => {
  it('renders without crashing', () => {
    render(<Card>Test Card Content</Card>);
    expect(screen.getByText('Test Card Content')).toBeInTheDocument();
  });

  it('applies different variants', () => {
    const variants = ['elevated', 'flat', 'outline'] as const;
    variants.forEach(variant => {
      const { container } = render(<Card variant={variant}>Test</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different padding sizes', () => {
    const paddings = ['none', 'sm', 'md', 'lg'] as const;
    paddings.forEach(padding => {
      const { container } = render(<Card padding={padding}>Test</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('supports clickable state', () => {
    render(<Card clickable>Clickable Card</Card>);
    expect(screen.getByText('Clickable Card')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Test</Card>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('spreads additional props', () => {
    render(<Card data-testid="test-card">Test</Card>);
    expect(screen.getByTestId('test-card')).toBeInTheDocument();
  });
});