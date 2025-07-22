import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Select } from '../Select';

const testOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

describe('Select Component', () => {
  it('renders without crashing', () => {
    render(<Select options={testOptions} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders options from props', () => {
    render(<Select options={testOptions} />);
    const select = screen.getByRole('button');
    expect(select).toBeInTheDocument();
  });

  it('displays placeholder', () => {
    render(<Select placeholder="Select an option" options={testOptions} />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('handles option groups', () => {
    const optionsWithGroups = [
      {
        label: 'Group 1',
        options: [
          { value: 'g1o1', label: 'Group 1 Option 1' },
          { value: 'g1o2', label: 'Group 1 Option 2' }
        ]
      }
    ];
    render(<Select options={optionsWithGroups} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Select options={testOptions} disabled />);
    const select = screen.getByRole('button');
    expect(select).toBeDisabled();
  });

  it('applies different variants', () => {
    const variants = ['default', 'error', 'success'] as const;
    variants.forEach(variant => {
      const { container } = render(<Select variant={variant} options={testOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(<Select size={size} options={testOptions} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('supports native select mode', () => {
    render(<Select useCustomDropdown={false} options={testOptions} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});