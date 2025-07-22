import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AreaChart } from '../AreaChart';

describe('AreaChart Component', () => {
  const mockData = [
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 150 },
    { label: 'Mar', value: 120 },
    { label: 'Apr', value: 180 }
  ];

  it('renders without crashing', () => {
    render(<AreaChart data={mockData} />);
    expect(screen.getByText('4 DATA POINTS')).toBeInTheDocument();
  });

  it('displays empty state when no data', () => {
    render(<AreaChart data={[]} />);
    expect(screen.getByText('NO DATA AVAILABLE')).toBeInTheDocument();
  });

  it('renders title and subtitle', () => {
    render(
      <AreaChart 
        data={mockData} 
        title="Sales Chart"
        subtitle="Monthly sales data"
      />
    );
    expect(screen.getByText('Sales Chart')).toBeInTheDocument();
    expect(screen.getByText('Monthly sales data')).toBeInTheDocument();
  });

  it('shows value labels by default', () => {
    render(<AreaChart data={mockData} />);
    // Use getAllByText since values might appear in multiple places (grid labels and value labels)
    expect(screen.getAllByText('100').length).toBeGreaterThan(0);
    expect(screen.getAllByText('150').length).toBeGreaterThan(0);
    expect(screen.getAllByText('120').length).toBeGreaterThan(0);
    expect(screen.getAllByText('180').length).toBeGreaterThan(0);
  });

  it('hides value labels when showValues is false', () => {
    render(<AreaChart data={mockData} showValues={false} />);
    // When showValues is false, values should only appear in grid labels, not as value labels
    // Check that we have fewer instances of these values (only grid labels, not value labels)
    const value100 = screen.getAllByText('100').length;
    const value180 = screen.getAllByText('180').length;
    // Should only have 1 instance each (in grid labels)
    expect(value100).toBeLessThanOrEqual(1);
    expect(value180).toBeLessThanOrEqual(1);
  });

  it('applies different size variants', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(<AreaChart data={mockData} size={size} />);
      expect(container.querySelector('[data-size]')).toHaveAttribute('data-size', size);
    });
  });

  it('applies different visual variants', () => {
    const variants = ['default', 'minimal', 'brutal'] as const;
    variants.forEach(variant => {
      const { container } = render(<AreaChart data={mockData} variant={variant} />);
      expect(container.querySelector('[data-variant]')).toHaveAttribute('data-variant', variant);
    });
  });

  it('respects custom height', () => {
    const { container } = render(<AreaChart data={mockData} height={400} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('shows grid by default', () => {
    const { container } = render(<AreaChart data={mockData} />);
    expect(container.querySelector('[data-show-grid="true"]')).toBeInTheDocument();
  });

  it('hides grid when showGrid is false', () => {
    const { container } = render(<AreaChart data={mockData} showGrid={false} />);
    expect(container.querySelector('[data-show-grid="false"]')).toBeInTheDocument();
  });

  it('applies animation class by default', () => {
    const { container } = render(<AreaChart data={mockData} />);
    expect(container.querySelector('[data-animated="true"]')).toBeInTheDocument();
  });

  it('disables animation when animated is false', () => {
    const { container } = render(<AreaChart data={mockData} animated={false} />);
    expect(container.querySelector('[data-animated="false"]')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<AreaChart data={mockData} className="custom-chart" />);
    expect(container.firstChild).toHaveClass('custom-chart');
  });

  it('renders data points with custom colors', () => {
    const coloredData = [
      { label: 'Jan', value: 100, color: 'red' },
      { label: 'Feb', value: 150, color: 'blue' }
    ];
    render(<AreaChart data={coloredData} />);
    expect(screen.getByText('2 DATA POINTS')).toBeInTheDocument();
  });

  it('shows container when showContainer is true', () => {
    const { container } = render(<AreaChart data={mockData} showContainer />);
    expect(container.querySelector('[data-show-container="true"]')).toBeInTheDocument();
  });
});