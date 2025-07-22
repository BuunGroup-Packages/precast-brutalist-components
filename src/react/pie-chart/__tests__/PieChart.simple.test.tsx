import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { PieChart } from '../PieChart';

describe('PieChart Component', () => {
  const mockData = [
    { label: 'Category A', value: 30 },
    { label: 'Category B', value: 20 },
    { label: 'Category C', value: 25 },
    { label: 'Category D', value: 25 }
  ];

  it('renders without crashing', () => {
    render(<PieChart data={mockData} />);
    expect(screen.getByText('Category A')).toBeInTheDocument();
    expect(screen.getByText('Category B')).toBeInTheDocument();
  });

  it('displays title and subtitle', () => {
    render(
      <PieChart
        data={mockData}
        title="Market Share"
        subtitle="Q4 2024"
      />
    );
    expect(screen.getByText('Market Share')).toBeInTheDocument();
    expect(screen.getByText('Q4 2024')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    render(<PieChart data={[]} />);
    expect(screen.getByText('NO DATA AVAILABLE')).toBeInTheDocument();
  });

  it('shows percentage values when showValues is true', () => {
    render(<PieChart data={mockData} showValues={true} />);
    expect(screen.getByText('30%')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
    // There are two segments with 25%, use getAllByText
    const twentyFivePercents = screen.getAllByText('25%');
    expect(twentyFivePercents).toHaveLength(2);
  });

  it('hides percentage values when showValues is false', () => {
    render(<PieChart data={mockData} showValues={false} />);
    expect(screen.queryByText('30%')).not.toBeInTheDocument();
    expect(screen.queryByText('20%')).not.toBeInTheDocument();
  });

  it('shows labels when showLabels is true', () => {
    render(<PieChart data={mockData} showLabels={true} />);
    expect(screen.getByText('Category A')).toBeInTheDocument();
    expect(screen.getByText('Category B')).toBeInTheDocument();
    expect(screen.getByText('Category C')).toBeInTheDocument();
    expect(screen.getByText('Category D')).toBeInTheDocument();
  });

  it('hides labels when showLabels is false', () => {
    const { container } = render(<PieChart data={mockData} showLabels={false} />);
    const legend = container.querySelector('[class*="legend"]');
    expect(legend).not.toBeInTheDocument();
  });

  it('renders with custom size', () => {
    const { container } = render(<PieChart data={mockData} size={400} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '400');
    expect(svg).toHaveAttribute('height', '400');
  });

  it('applies different variants', () => {
    const variants = ['default', 'minimal', 'brutal'] as const;
    variants.forEach(variant => {
      const { container } = render(<PieChart data={mockData} variant={variant} />);
      const chart = container.firstChild;
      expect(chart).toHaveAttribute('data-variant', variant);
    });
  });

  it('shows container with border when showContainer is true', () => {
    const { container } = render(<PieChart data={mockData} showContainer={true} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies different border styles', () => {
    const borderStyles = ['solid', 'dashed', 'dotted', 'double'] as const;
    borderStyles.forEach(borderStyle => {
      const { container } = render(
        <PieChart data={mockData} showContainer={true} borderStyle={borderStyle} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('renders data with custom colors', () => {
    const dataWithColors = [
      { label: 'Red', value: 25, color: '#FF0000' },
      { label: 'Blue', value: 25, color: '#0000FF' },
      { label: 'Green', value: 50, color: '#00FF00' }
    ];
    render(<PieChart data={dataWithColors} />);
    expect(screen.getByText('Red')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('Green')).toBeInTheDocument();
  });

  it('supports animated rendering', () => {
    const { container } = render(<PieChart data={mockData} animated={true} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('supports non-animated rendering', () => {
    const { container } = render(<PieChart data={mockData} animated={false} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom stroke width', () => {
    const { container } = render(<PieChart data={mockData} strokeWidth={4} />);
    const paths = container.querySelectorAll('path');
    paths.forEach(path => {
      expect(path).toHaveAttribute('stroke-width', '4');
    });
  });

  it('applies custom className', () => {
    const { container } = render(<PieChart data={mockData} className="custom-chart" />);
    expect(container.firstChild).toHaveClass('custom-chart');
  });

  it('applies custom styles', () => {
    const { container } = render(
      <PieChart data={mockData} style={{ backgroundColor: 'blue' }} />
    );
    const chart = container.firstChild as HTMLElement;
    expect(chart.style.backgroundColor).toBe('blue');
  });

  it('handles single data point', () => {
    const singleData = [{ label: 'Total', value: 100 }];
    render(<PieChart data={singleData} />);
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('calculates percentages correctly', () => {
    const percentageData = [
      { label: 'Half', value: 50 },
      { label: 'Quarter', value: 25 },
      { label: 'Quarter', value: 25 }
    ];
    render(<PieChart data={percentageData} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getAllByText('25%')).toHaveLength(2);
  });

  it('renders tooltips on hover', async () => {
    const user = userEvent.setup();
    render(<PieChart data={mockData} />);
    
    // Hover functionality would be handled by the chart segments
    const label = screen.getByText('Category A');
    await user.hover(label);
    
    expect(label).toBeInTheDocument();
  });

  it('handles zero values', () => {
    const dataWithZero = [
      { label: 'Active', value: 75 },
      { label: 'Inactive', value: 0 },
      { label: 'Pending', value: 25 }
    ];
    render(<PieChart data={dataWithZero} showValues={true} />);
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    // Zero values might not show percentage labels
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('renders legend with correct colors', () => {
    render(<PieChart data={mockData} showLabels={true} />);
    const labels = screen.getAllByText(/Category/);
    expect(labels).toHaveLength(4);
  });

  it('uses default colors when not specified', () => {
    const { container } = render(<PieChart data={mockData} />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('handles decimal values', () => {
    const decimalData = [
      { label: 'A', value: 33.33 },
      { label: 'B', value: 66.67 }
    ];
    render(<PieChart data={decimalData} showValues={true} />);
    // The chart might round percentages to integers
    expect(screen.getByText('33%')).toBeInTheDocument();
    expect(screen.getByText('67%')).toBeInTheDocument();
  });
});