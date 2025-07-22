import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Combobox } from '../Combobox';

describe('Combobox Component', () => {
  const mockOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' }
  ];

  it('renders without crashing', () => {
    render(
      <Combobox options={mockOptions}>
        <Combobox.Trigger />
        <Combobox.Content />
      </Combobox>
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays placeholder text', () => {
    render(
      <Combobox options={mockOptions} placeholder="Select framework">
        <Combobox.Trigger />
        <Combobox.Content />
      </Combobox>
    );
    expect(screen.getByText('Select framework')).toBeInTheDocument();
  });

  it('opens dropdown on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Combobox options={mockOptions}>
        <Combobox.Trigger />
        <Combobox.Content />
      </Combobox>
    );
    
    const trigger = screen.getByRole('combobox');
    await user.click(trigger);
    
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('displays all options when opened', async () => {
    const user = userEvent.setup();
    render(
      <Combobox options={mockOptions}>
        <Combobox.Trigger />
        <Combobox.Content />
      </Combobox>
    );
    
    await user.click(screen.getByRole('combobox'));
    
    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('filters options based on search', async () => {
    const user = userEvent.setup();
    render(
      <Combobox options={mockOptions}>
        <Combobox.Trigger />
        <Combobox.Content />
      </Combobox>
    );
    
    await user.click(screen.getByRole('combobox'));
    const searchInput = screen.getByPlaceholderText('Search options...');
    
    await user.type(searchInput, 'reac');
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('Vue')).not.toBeInTheDocument();
    expect(screen.queryByText('Angular')).not.toBeInTheDocument();
  });

  it('displays empty message when no options match', async () => {
    const user = userEvent.setup();
    render(
      <Combobox options={mockOptions} emptyMessage="No frameworks found">
        <Combobox.Trigger />
        <Combobox.Content />
      </Combobox>
    );
    
    await user.click(screen.getByRole('combobox'));
    const searchInput = screen.getByPlaceholderText('Search options...');
    
    await user.type(searchInput, 'xyz');
    
    expect(screen.getByText('No frameworks found')).toBeInTheDocument();
  });

  it('selects option on click', async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();
    
    render(
      <Combobox options={mockOptions} onValueChange={onValueChange}>
        <Combobox.Trigger />
        <Combobox.Content />
      </Combobox>
    );
    
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Vue'));
    
    expect(onValueChange).toHaveBeenCalledWith('vue');
    expect(screen.getByRole('combobox')).toHaveTextContent('Vue');
  });

  it('supports controlled value', () => {
    const { rerender } = render(
      <Combobox options={mockOptions} value="react">
        <Combobox.Trigger />
        <Combobox.Content />
      </Combobox>
    );
    
    expect(screen.getByRole('combobox')).toHaveTextContent('React');
    
    rerender(
      <Combobox options={mockOptions} value="vue">
        <Combobox.Trigger />
        <Combobox.Content />
      </Combobox>
    );
    
    expect(screen.getByRole('combobox')).toHaveTextContent('Vue');
  });

  it('supports default value', () => {
    render(
      <Combobox options={mockOptions} defaultValue="angular">
        <Combobox.Trigger />
        <Combobox.Content />
      </Combobox>
    );
    
    expect(screen.getByRole('combobox')).toHaveTextContent('Angular');
  });

  it('handles disabled options', async () => {
    const user = userEvent.setup();
    const disabledOptions = [
      ...mockOptions.slice(0, 2),
      { value: 'angular', label: 'Angular', disabled: true },
      mockOptions[3]
    ];
    
    const onValueChange = jest.fn();
    
    render(
      <Combobox options={disabledOptions} onValueChange={onValueChange}>
        <Combobox.Trigger />
        <Combobox.Content />
      </Combobox>
    );
    
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Angular'));
    
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    render(
      <Combobox options={mockOptions}>
        <Combobox.Trigger />
        <Combobox.Content />
      </Combobox>
    );
    
    const trigger = screen.getByRole('combobox');
    trigger.focus();
    
    // Open with Enter
    await user.keyboard('{Enter}');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    
    // Close with Escape
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('closes on outside click', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Combobox options={mockOptions}>
          <Combobox.Trigger />
          <Combobox.Content />
        </Combobox>
        <button>Outside</button>
      </div>
    );
    
    const trigger = screen.getByRole('combobox');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    
    await user.click(screen.getByText('Outside'));
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(
        <Combobox options={mockOptions} size={size}>
          <Combobox.Trigger />
          <Combobox.Content />
        </Combobox>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different variants', () => {
    const variants = ['default', 'brutal', 'outline'] as const;
    variants.forEach(variant => {
      const { container } = render(
        <Combobox options={mockOptions} variant={variant}>
          <Combobox.Trigger />
          <Combobox.Content />
        </Combobox>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('supports custom trigger with icon', () => {
    render(
      <Combobox options={mockOptions}>
        <Combobox.Trigger icon={<span>🚀</span>} />
        <Combobox.Content />
      </Combobox>
    );
    
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Combobox options={mockOptions} className="custom-combobox">
        <Combobox.Trigger />
        <Combobox.Content />
      </Combobox>
    );
    expect(container.firstChild).toHaveClass('custom-combobox');
  });
});