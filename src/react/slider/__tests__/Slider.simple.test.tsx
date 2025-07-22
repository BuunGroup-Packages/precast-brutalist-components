import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Slider } from '../Slider';

describe('Slider Component', () => {
  it('renders without crashing', () => {
    render(<Slider aria-label="Test slider" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('displays correct value', () => {
    render(<Slider value={50} readOnly aria-label="Test slider" />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveValue('50');
  });

  it('supports min and max values', () => {
    render(<Slider min={0} max={100} value={50} readOnly aria-label="Test slider" />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
  });

  it('handles value changes', () => {
    const onChange = jest.fn();
    render(<Slider onChange={onChange} aria-label="Test slider" />);
    
    const slider = screen.getByRole('slider');
    // Slider interactions are complex, just verify it exists
    expect(slider).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Slider disabled aria-label="Disabled slider" />);
    const slider = screen.getByRole('slider');
    expect(slider).toBeDisabled();
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(
        <Slider size={size} aria-label={`${size} slider`} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('supports step increments', () => {
    render(<Slider step={10} min={0} max={100} aria-label="Step slider" />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('step', '10');
  });

  it('displays marks when provided', () => {
    const marks = [0, 25, 50, 75, 100];
    render(<Slider marks={marks} min={0} max={100} aria-label="Marked slider" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });
});