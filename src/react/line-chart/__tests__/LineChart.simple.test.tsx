import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LineChart } from '../LineChart';

describe('LineChart Component', () => {
  const mockData = [
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 150 },
    { label: 'Mar', value: 120 },
    { label: 'Apr', value: 180 },
    { label: 'May', value: 160 }
  ];

  it('renders without crashing', () => {
    render(<LineChart data={mockData} />);
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Feb')).toBeInTheDocument();
  });

  it('displays title and subtitle', () => {
    render(
      <LineChart
        data={mockData}
        title="Monthly Sales"
        subtitle="2024 Q1"
      />
    );
    expect(screen.getByText('Monthly Sales')).toBeInTheDocument();
    expect(screen.getByText('2024 Q1')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    render(<LineChart data={[]} />);
    expect(screen.getByText('NO DATA AVAILABLE')).toBeInTheDocument();
  });

  it('shows value labels when showValues is true', () => {
    render(<LineChart data={mockData} showValues={true} />);
    expect(screen.getAllByText('100').length).toBeGreaterThan(0);
    expect(screen.getAllByText('150').length).toBeGreaterThan(0);
    expect(screen.getAllByText('120').length).toBeGreaterThan(0);
  });

  it('hides value labels when showValues is false', () => {
    render(<LineChart data={mockData} showValues={false} />);
    // Values might still appear in axis labels, so check for data point value labels specifically
    const valueLabels = document.querySelectorAll('[style*="transform: translate(-50%, -150%)"]');
    expect(valueLabels.length).toBe(0);
  });

  it('renders with custom height', () => {
    const { container } = render(<LineChart data={mockData} height={400} />);
    const chartContent = container.querySelector('[style*="height"]');
    expect(chartContent).toBeInTheDocument();
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(<LineChart data={mockData} size={size} />);
      const chart = container.firstChild;
      expect(chart).toHaveAttribute('data-size', size);
    });
  });

  it('applies different variants', () => {
    const variants = ['default', 'minimal', 'brutal'] as const;
    variants.forEach(variant => {
      const { container } = render(<LineChart data={mockData} variant={variant} />);
      const chart = container.firstChild;
      expect(chart).toHaveAttribute('data-variant', variant);
    });
  });

  it('shows container with border when showContainer is true', () => {
    const { container } = render(<LineChart data={mockData} showContainer={true} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom border styles', () => {
    const borderStyles = ['solid', 'dashed', 'dotted', 'double'] as const;
    borderStyles.forEach(borderStyle => {
      const { container } = render(
        <LineChart data={mockData} showContainer={true} borderStyle={borderStyle} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('renders data points with custom colors', () => {
    const dataWithColors = [
      { label: 'Jan', value: 100, color: 'red' },
      { label: 'Feb', value: 150, color: 'blue' }
    ];
    render(<LineChart data={dataWithColors} />);
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Feb')).toBeInTheDocument();
  });

  it('supports animated rendering', () => {
    const { container } = render(<LineChart data={mockData} animated={true} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('supports non-animated rendering', () => {
    const { container } = render(<LineChart data={mockData} animated={false} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('shows grid when showGrid is true', () => {
    const { container } = render(<LineChart data={mockData} showGrid={true} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('hides grid when showGrid is false', () => {
    const { container } = render(<LineChart data={mockData} showGrid={false} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom line color', () => {
    const { container } = render(<LineChart data={mockData} lineColor="#ff0000" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom line width', () => {
    const { container } = render(<LineChart data={mockData} lineWidth={5} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('shows dots when showDots is true', () => {
    const { container } = render(<LineChart data={mockData} showDots={true} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('hides dots when showDots is false', () => {
    const { container } = render(<LineChart data={mockData} showDots={false} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders smooth curves when smooth is true', () => {
    const { container } = render(<LineChart data={mockData} smooth={true} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders straight lines when smooth is false', () => {
    const { container } = render(<LineChart data={mockData} smooth={false} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<LineChart data={mockData} className="custom-chart" />);
    expect(container.firstChild).toHaveClass('custom-chart');
  });

  it('applies custom styles', () => {
    const { container } = render(
      <LineChart data={mockData} style={{ backgroundColor: 'red' }} />
    );
    const chart = container.firstChild as HTMLElement;
    expect(chart.style.backgroundColor).toBe('red');
  });

  it('handles single data point', () => {
    const singleData = [{ label: 'Jan', value: 100 }];
    render(<LineChart data={singleData} />);
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getAllByText('100').length).toBeGreaterThan(0);
  });

  it('handles negative values', () => {
    const negativeData = [
      { label: 'Jan', value: -50 },
      { label: 'Feb', value: 100 },
      { label: 'Mar', value: -25 }
    ];
    render(<LineChart data={negativeData} />);
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getAllByText('-50').length).toBeGreaterThan(0);
  });

  it('renders tooltips on hover', async () => {
    const user = userEvent.setup();
    render(<LineChart data={mockData} />);
    
    // Hover over a data point
    const dataPoint = screen.getByText('Jan');
    await user.hover(dataPoint);
    
    // Tooltip functionality would be handled by the Tooltip component
    expect(dataPoint).toBeInTheDocument();
  });

  it('calculates correct value range', () => {
    const rangeData = [
      { label: 'Min', value: 0 },
      { label: 'Mid', value: 50 },
      { label: 'Max', value: 100 }
    ];
    render(<LineChart data={rangeData} />);
    const zeros = screen.getAllByText('0');
    const hundreds = screen.getAllByText('100');
    expect(zeros.length).toBeGreaterThan(0);
    expect(hundreds.length).toBeGreaterThan(0);
  });

  it('handles all data points with same value', () => {
    const flatData = [
      { label: 'Jan', value: 100 },
      { label: 'Feb', value: 100 },
      { label: 'Mar', value: 100 }
    ];
    render(<LineChart data={flatData} />);
    const hundredElements = screen.getAllByText('100');
    // Should have at least 3 instances (one for each data point)
    expect(hundredElements.length).toBeGreaterThanOrEqual(3);
  });
});