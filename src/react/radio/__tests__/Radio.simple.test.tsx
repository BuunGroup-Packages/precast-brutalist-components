import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Radio, RadioGroup } from '../Radio';

describe('Radio Component', () => {
  it('renders without crashing', () => {
    render(
      <RadioGroup name="test-group">
        <Radio value="test" aria-label="Test radio" />
      </RadioGroup>
    );
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('handles checked state', () => {
    render(
      <RadioGroup name="test-group" value="test">
        <Radio value="test" aria-label="Checked radio" />
      </RadioGroup>
    );
    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
  });

  it('can be disabled', () => {
    render(
      <RadioGroup name="test-group">
        <Radio value="test" disabled aria-label="Disabled radio" />
      </RadioGroup>
    );
    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(
        <RadioGroup name="test-group" size={size}>
          <Radio value="test" aria-label={`${size} radio`} />
        </RadioGroup>
      );
      expect(container.querySelector('input[type="radio"]')).toBeInTheDocument();
    });
  });
});

describe('RadioGroup Component', () => {
  it('renders without crashing', () => {
    render(
      <RadioGroup name="test-group">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('handles value changes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(
      <RadioGroup name="test-group" onChange={onChange}>
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const option2 = screen.getByLabelText('Option 2');
    await user.click(option2);
    expect(onChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(
      <RadioGroup name="test-group" disabled>
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const radios = screen.getAllByRole('radio');
    radios.forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });
});