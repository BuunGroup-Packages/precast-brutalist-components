import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Chart } from '../Chart';

describe('Chart Component', () => {
  it('renders without crashing', () => {
    render(
      <Chart>
        <Chart.Content>
          <div>Chart content</div>
        </Chart.Content>
      </Chart>
    );
    expect(screen.getByText('Chart content')).toBeInTheDocument();
  });

  it('renders with header components', () => {
    render(
      <Chart>
        <Chart.Header>
          <Chart.Title>Chart Title</Chart.Title>
          <Chart.Subtitle>Chart Subtitle</Chart.Subtitle>
        </Chart.Header>
      </Chart>
    );
    expect(screen.getByText('Chart Title')).toBeInTheDocument();
    expect(screen.getByText('Chart Subtitle')).toBeInTheDocument();
  });

  it('renders with legend', () => {
    render(
      <Chart>
        <Chart.Legend>
          <div>Legend items</div>
        </Chart.Legend>
      </Chart>
    );
    expect(screen.getByText('Legend items')).toBeInTheDocument();
  });

  it('applies different variants', () => {
    const variants = ['default', 'brutal', 'outline'] as const;
    variants.forEach(variant => {
      const { container } = render(
        <Chart variant={variant}>
          <Chart.Content>Content</Chart.Content>
        </Chart>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(
        <Chart size={size}>
          <Chart.Content>Content</Chart.Content>
        </Chart>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('respects showBorder prop', () => {
    const { container } = render(
      <Chart showBorder={false}>
        <Chart.Content>Content</Chart.Content>
      </Chart>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('respects showShadow prop', () => {
    const { container } = render(
      <Chart showShadow={false}>
        <Chart.Content>Content</Chart.Content>
      </Chart>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('respects showGrid prop', () => {
    const { container } = render(
      <Chart showGrid={false}>
        <Chart.Content>Content</Chart.Content>
      </Chart>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom aspect ratio', () => {
    const { container } = render(
      <Chart aspectRatio="4/3">
        <Chart.Content>Content</Chart.Content>
      </Chart>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies fixed height', () => {
    const { container } = render(
      <Chart height={400}>
        <Chart.Content>Content</Chart.Content>
      </Chart>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('supports different legend positions', () => {
    const positions = ['top', 'bottom', 'left', 'right'] as const;
    positions.forEach(position => {
      const { container } = render(
        <Chart>
          <Chart.Legend position={position}>Legend</Chart.Legend>
        </Chart>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <Chart className="custom-chart">
        <Chart.Content>Content</Chart.Content>
      </Chart>
    );
    expect(container.firstChild).toHaveClass('custom-chart');
  });
});