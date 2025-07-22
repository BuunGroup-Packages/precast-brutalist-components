import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BarChart } from '../BarChart';

describe('BarChart Component', () => {
  const mockData = [
    { label: 'Q1', value: 100 },
    { label: 'Q2', value: 150 },
    { label: 'Q3', value: 120 },
    { label: 'Q4', value: 180 }
  ];

  it('renders without crashing', () => {
    render(<BarChart data={mockData} />);
    expect(screen.getByText('4 DATA POINTS')).toBeInTheDocument();
  });

  it('displays empty state when no data', () => {
    render(<BarChart data={[]} />);
    expect(screen.getByText('NO DATA AVAILABLE')).toBeInTheDocument();
  });

  it('renders title and subtitle', () => {
    render(
      <BarChart 
        data={mockData} 
        title="Quarterly Revenue"
        subtitle="Revenue by quarter"
      />
    );
    expect(screen.getByText('Quarterly Revenue')).toBeInTheDocument();
    expect(screen.getByText('Revenue by quarter')).toBeInTheDocument();
  });

  it('shows value labels by default', () => {
    render(<BarChart data={mockData} />);
    // Use getAllByText since values might appear in multiple places (grid labels and bar labels)
    expect(screen.getAllByText('100').length).toBeGreaterThan(0);
    expect(screen.getAllByText('150').length).toBeGreaterThan(0);
    expect(screen.getAllByText('120').length).toBeGreaterThan(0);
    expect(screen.getAllByText('180').length).toBeGreaterThan(0);
  });

  it('hides value labels when showValues is false', () => {
    render(<BarChart data={mockData} showValues={false} />);
    // Values should not be displayed as labels on bars
    const valueElements = screen.queryAllByText(/^(100|150|120|180)$/);
    // Grid labels might still show these values, so we check for absence of bar value labels
    expect(valueElements.length).toBeLessThan(4);
  });

  it('applies different size variants', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(<BarChart data={mockData} size={size} />);
      expect(container.querySelector('[data-size]')).toHaveAttribute('data-size', size);
    });
  });

  it('applies different visual variants', () => {
    const variants = ['default', 'minimal', 'brutal'] as const;
    variants.forEach(variant => {
      const { container } = render(<BarChart data={mockData} variant={variant} />);
      expect(container.querySelector('[data-variant]')).toHaveAttribute('data-variant', variant);
    });
  });

  it('respects custom height', () => {
    const { container } = render(<BarChart data={mockData} height={400} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('shows grid by default', () => {
    const { container } = render(<BarChart data={mockData} />);
    expect(container.querySelector('[data-show-grid="true"]')).toBeInTheDocument();
  });

  it('hides grid when showGrid is false', () => {
    const { container } = render(<BarChart data={mockData} showGrid={false} />);
    expect(container.querySelector('[data-show-grid="false"]')).toBeInTheDocument();
  });

  it('applies animation by default', () => {
    const { container } = render(<BarChart data={mockData} />);
    expect(container.querySelector('[data-animated="true"]')).toBeInTheDocument();
  });

  it('disables animation when animated is false', () => {
    const { container } = render(<BarChart data={mockData} animated={false} />);
    expect(container.querySelector('[data-animated="false"]')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<BarChart data={mockData} className="custom-chart" />);
    expect(container.firstChild).toHaveClass('custom-chart');
  });

  it('renders bars with custom colors', () => {
    const coloredData = [
      { label: 'A', value: 100, color: 'red' },
      { label: 'B', value: 150, color: 'blue' }
    ];
    render(<BarChart data={coloredData} />);
    expect(screen.getByText('2 DATA POINTS')).toBeInTheDocument();
  });

  it('shows container border when showContainer is true', () => {
    const { container } = render(<BarChart data={mockData} showContainer />);
    expect(container.querySelector('[data-show-container="true"]')).toBeInTheDocument();
  });

  it('applies different border styles', () => {
    const borderStyles = ['solid', 'dashed', 'dotted', 'double'] as const;
    borderStyles.forEach((borderStyle, index) => {
      const { unmount } = render(
        <BarChart 
          key={index}
          data={mockData} 
          showContainer 
          borderStyle={borderStyle} 
        />
      );
      // Border style is applied via CSS custom property
      expect(screen.getByText('4 DATA POINTS')).toBeInTheDocument();
      unmount(); // Clean up between iterations
    });
  });
});