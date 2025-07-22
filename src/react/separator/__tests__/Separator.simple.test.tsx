import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Separator } from '../Separator';

describe('Separator Component', () => {
  it('renders without crashing', () => {
    render(<Separator />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('applies horizontal orientation by default', () => {
    render(<Separator />);
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('applies vertical orientation', () => {
    render(<Separator orientation="vertical" />);
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('applies different thickness variants', () => {
    const thicknesses = ['thin', 'medium', 'thick'] as const;
    thicknesses.forEach(thickness => {
      const { container } = render(<Separator thickness={thickness} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different style variants', () => {
    const variants = ['solid', 'dashed', 'dotted', 'double'] as const;
    variants.forEach(variant => {
      const { container } = render(<Separator variant={variant} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('renders with text label', () => {
    render(<Separator label="OR" />);
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('renders with React node label', () => {
    render(
      <Separator label={<strong>Section Break</strong>} />
    );
    expect(screen.getByText('Section Break')).toBeInTheDocument();
  });

  it('applies different label positions', () => {
    const positions = ['start', 'center', 'end'] as const;
    positions.forEach(position => {
      const { container } = render(
        <Separator label="Label" labelPosition={position} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('does not show label in vertical orientation', () => {
    render(<Separator orientation="vertical" label="Label" />);
    expect(screen.queryByText('Label')).not.toBeInTheDocument();
  });

  it('applies custom aria-label', () => {
    render(<Separator ariaLabel="Content divider" />);
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-label', 'Content divider');
  });

  it('applies custom className', () => {
    const { container } = render(<Separator className="custom-separator" />);
    expect(container.firstChild).toHaveClass('custom-separator');
  });

  it('applies custom style', () => {
    const { container } = render(
      <Separator style={{ marginTop: '20px', marginBottom: '20px' }} />
    );
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveStyle('margin-top: 20px');
    expect(separator).toHaveStyle('margin-bottom: 20px');
  });

  it('renders with combination of props', () => {
    render(
      <Separator 
        thickness="thick" 
        variant="dashed" 
        label="Section" 
        labelPosition="start"
      />
    );
    expect(screen.getByText('Section')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});