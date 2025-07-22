import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Dropdown } from '../Dropdown';

describe('Dropdown Component', () => {
  it('renders without crashing', () => {
    render(
      <Dropdown>
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    expect(screen.getByText('Options')).toBeInTheDocument();
  });

  it('opens when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Dropdown>
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    
    await user.click(screen.getByText('Options'));
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('closes when clicking outside', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();
    
    render(
      <div>
        <Dropdown onOpenChange={onOpenChange}>
          <button>Options</button>
          <Dropdown.Menu>
            <Dropdown.Item>Edit</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <button>Outside</button>
      </div>
    );
    
    await user.click(screen.getByText('Options'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    
    await user.click(screen.getByText('Outside'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes on escape key', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();
    
    render(
      <Dropdown onOpenChange={onOpenChange}>
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    await user.click(screen.getByText('Options'));
    await user.keyboard('{Escape}');
    
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes when item is clicked', async () => {
    const user = userEvent.setup();
    const onItemClick = jest.fn();
    
    render(
      <Dropdown>
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Item onClick={onItemClick}>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    await user.click(screen.getByText('Options'));
    await user.click(screen.getByText('Edit'));
    
    expect(onItemClick).toHaveBeenCalled();
    
    await waitFor(() => {
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    });
  });

  it('does not close when closeOnItemClick is false', async () => {
    const user = userEvent.setup();
    
    render(
      <Dropdown closeOnItemClick={false}>
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    await user.click(screen.getByText('Options'));
    await user.click(screen.getByText('Edit'));
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('does not close on outside click when disabled', async () => {
    const user = userEvent.setup();
    
    render(
      <div>
        <Dropdown closeOnClickOutside={false}>
          <button>Options</button>
          <Dropdown.Menu>
            <Dropdown.Item>Edit</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <button>Outside</button>
      </div>
    );
    
    await user.click(screen.getByText('Options'));
    await user.click(screen.getByText('Outside'));
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('does not close on escape when disabled', async () => {
    const user = userEvent.setup();
    
    render(
      <Dropdown closeOnEscape={false}>
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    await user.click(screen.getByText('Options'));
    await user.keyboard('{Escape}');
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('supports disabled items', async () => {
    const user = userEvent.setup();
    const onItemClick = jest.fn();
    
    render(
      <Dropdown>
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Item disabled onClick={onItemClick}>
            Disabled Item
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    await user.click(screen.getByText('Options'));
    await user.click(screen.getByText('Disabled Item'));
    
    expect(onItemClick).not.toHaveBeenCalled();
  });

  it('renders items with icons and shortcuts', async () => {
    const user = userEvent.setup();
    
    render(
      <Dropdown>
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Item icon={<span>✏️</span>} shortcut="⌘E">
            Edit
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    await user.click(screen.getByText('Options'));
    
    expect(screen.getByText('✏️')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('⌘E')).toBeInTheDocument();
  });

  it('supports destructive items', async () => {
    const user = userEvent.setup();
    
    render(
      <Dropdown>
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Item destructive>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    await user.click(screen.getByText('Options'));
    
    const deleteItem = screen.getByText('Delete').parentElement;
    expect(deleteItem).toBeInTheDocument();
  });

  it('renders separators', async () => {
    const user = userEvent.setup();
    
    render(
      <Dropdown>
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    await user.click(screen.getByText('Options'));
    
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders labels', async () => {
    const user = userEvent.setup();
    
    render(
      <Dropdown>
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Label>Actions</Dropdown.Label>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    await user.click(screen.getByText('Options'));
    
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('supports controlled open state', () => {
    const { rerender } = render(
      <Dropdown open={false}>
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    
    rerender(
      <Dropdown open={true}>
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('applies different positions', async () => {
    const user = userEvent.setup();
    const positions = ['bottom', 'top', 'left', 'right'] as const;
    
    for (const position of positions) {
      render(
        <Dropdown position={position}>
          <button>Options {position}</button>
          <Dropdown.Menu>
            <Dropdown.Item>Edit</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
      
      await user.click(screen.getByText(`Options ${position}`));
      expect(screen.getByRole('menu')).toBeInTheDocument();
    }
  });

  it('applies custom offset', async () => {
    const user = userEvent.setup();
    
    render(
      <Dropdown offset={20}>
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    await user.click(screen.getByText('Options'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('sets aria attributes on trigger', async () => {
    const user = userEvent.setup();
    
    render(
      <Dropdown>
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    const trigger = screen.getByText('Options');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies custom className', async () => {
    const user = userEvent.setup();
    
    render(
      <Dropdown className="custom-dropdown">
        <button>Options</button>
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    await user.click(screen.getByText('Options'));
    const menu = screen.getByRole('menu');
    expect(menu).toHaveClass('custom-dropdown');
  });

  it('handles multiple dropdowns', async () => {
    const user = userEvent.setup();
    
    render(
      <div>
        <Dropdown>
          <button>Options 1</button>
          <Dropdown.Menu>
            <Dropdown.Item>Edit 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <button>Options 2</button>
          <Dropdown.Menu>
            <Dropdown.Item>Edit 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
    
    await user.click(screen.getByText('Options 1'));
    expect(screen.getByText('Edit 1')).toBeInTheDocument();
    expect(screen.queryByText('Edit 2')).not.toBeInTheDocument();
    
    await user.click(screen.getByText('Options 2'));
    expect(screen.getByText('Edit 2')).toBeInTheDocument();
  });
});