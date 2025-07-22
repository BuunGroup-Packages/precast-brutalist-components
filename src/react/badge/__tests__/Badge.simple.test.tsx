import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Badge } from '../Badge';

describe('Badge Component', () => {
  it('renders without crashing', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies different variants', () => {
    const variants = ['solid', 'outline', 'dot', 'secondary'] as const;
    variants.forEach(variant => {
      const { container } = render(<Badge variant={variant}>Test</Badge>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(<Badge size={size}>Test</Badge>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('supports dismissible functionality', () => {
    const onDismiss = jest.fn();
    render(<Badge dismissible onDismiss={onDismiss}>Dismissible</Badge>);
    
    const dismissButton = screen.getByLabelText('Dismiss badge');
    expect(dismissButton).toBeInTheDocument();
  });

  it('handles dismiss click', async () => {
    const user = userEvent.setup();
    const onDismiss = jest.fn();
    render(<Badge dismissible onDismiss={onDismiss}>Dismissible</Badge>);
    
    const dismissButton = screen.getByLabelText('Dismiss badge');
    await user.click(dismissButton);
    expect(onDismiss).toHaveBeenCalled();
  });

  it('renders dot variant without children', () => {
    render(<Badge variant="dot" />);
    const badge = screen.getByRole('status');
    expect(badge).toBeInTheDocument();
  });
});