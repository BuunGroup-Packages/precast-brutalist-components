import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Accordion } from '../Accordion';

describe('Accordion Component', () => {
  it('renders without crashing', () => {
    render(
      <Accordion>
        <Accordion.Item value="item1">
          <Accordion.Trigger>Item 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('expands and collapses items on click', async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <Accordion.Item value="item1">
          <Accordion.Trigger>Item 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
    
    const trigger = screen.getByRole('button', { name: 'Item 1' });
    // Initially collapsed
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    
    await user.click(trigger);
    // After click, should be expanded
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('supports single selection mode', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single">
        <Accordion.Item value="item1">
          <Accordion.Trigger>Item 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2">
          <Accordion.Trigger>Item 2</Accordion.Trigger>
          <Accordion.Content>Content 2</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
    
    const trigger1 = screen.getByRole('button', { name: 'Item 1' });
    const trigger2 = screen.getByRole('button', { name: 'Item 2' });
    
    await user.click(trigger1);
    expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    expect(trigger2).toHaveAttribute('aria-expanded', 'false');
    
    await user.click(trigger2);
    expect(trigger1).toHaveAttribute('aria-expanded', 'false');
    expect(trigger2).toHaveAttribute('aria-expanded', 'true');
  });

  it('supports multiple selection mode', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="multiple">
        <Accordion.Item value="item1">
          <Accordion.Trigger>Item 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2">
          <Accordion.Trigger>Item 2</Accordion.Trigger>
          <Accordion.Content>Content 2</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
    
    await user.click(screen.getByText('Item 1'));
    await user.click(screen.getByText('Item 2'));
    
    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('supports collapsible in single mode', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single" collapsible>
        <Accordion.Item value="item1">
          <Accordion.Trigger>Item 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
    
    const trigger = screen.getByRole('button', { name: 'Item 1' });
    
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('can be disabled entirely', () => {
    render(
      <Accordion disabled>
        <Accordion.Item value="item1">
          <Accordion.Trigger>Item 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
    
    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
  });

  it('supports disabled individual items', () => {
    render(
      <Accordion>
        <Accordion.Item value="item1" disabled>
          <Accordion.Trigger>Item 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2">
          <Accordion.Trigger>Item 2</Accordion.Trigger>
          <Accordion.Content>Content 2</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
    
    expect(screen.getByText('Item 1').closest('button')).toBeDisabled();
    expect(screen.getByText('Item 2').closest('button')).not.toBeDisabled();
  });

  it('applies different size variants', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(
        <Accordion size={size}>
          <Accordion.Item value="item1">
            <Accordion.Trigger>Item</Accordion.Trigger>
            <Accordion.Content>Content</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different style variants', () => {
    const variants = ['default', 'brutal', 'outline'] as const;
    variants.forEach(variant => {
      const { container } = render(
        <Accordion variant={variant}>
          <Accordion.Item value="item1">
            <Accordion.Trigger>Item</Accordion.Trigger>
            <Accordion.Content>Content</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('supports controlled mode', async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();
    render(
      <Accordion value="item1" onValueChange={onValueChange}>
        <Accordion.Item value="item1">
          <Accordion.Trigger>Item 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2">
          <Accordion.Trigger>Item 2</Accordion.Trigger>
          <Accordion.Content>Content 2</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
    
    await user.click(screen.getByText('Item 2'));
    expect(onValueChange).toHaveBeenCalledWith('item2');
  });
});