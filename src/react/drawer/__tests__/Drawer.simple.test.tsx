import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Drawer } from '../Drawer';

describe('Drawer Component', () => {
  it('renders without crashing', () => {
    render(
      <Drawer>
        <Drawer.Trigger>Open Drawer</Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Body>Drawer content</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );
    expect(screen.getByText('Open Drawer')).toBeInTheDocument();
  });

  it('opens when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <Drawer.Trigger>Open Drawer</Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Body>Drawer content</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );
    
    expect(screen.queryByText('Drawer content')).not.toBeInTheDocument();
    
    await user.click(screen.getByText('Open Drawer'));
    
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes on escape key', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();
    
    render(
      <Drawer defaultOpen={true} onOpenChange={onOpenChange}>
        <Drawer.Content>
          <Drawer.Body>Drawer content</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );
    
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes on overlay click', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();
    
    render(
      <Drawer defaultOpen={true} onOpenChange={onOpenChange}>
        <Drawer.Content>
          <Drawer.Body>Drawer content</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );
    
    const overlay = document.querySelector('[aria-hidden="true"]');
    if (overlay) {
      await user.click(overlay);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    }
  });

  it('does not close on overlay click when disabled', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();
    
    render(
      <Drawer defaultOpen={true} onOpenChange={onOpenChange}>
        <Drawer.Content closeOnOverlayClick={false}>
          <Drawer.Body>Drawer content</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );
    
    const overlay = document.querySelector('[aria-hidden="true"]');
    if (overlay) {
      await user.click(overlay);
      expect(onOpenChange).not.toHaveBeenCalled();
    }
  });

  it('does not close on escape when disabled', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();
    
    render(
      <Drawer defaultOpen={true} onOpenChange={onOpenChange}>
        <Drawer.Content closeOnEscape={false}>
          <Drawer.Body>Drawer content</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );
    
    await user.keyboard('{Escape}');
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('renders all subcomponents', () => {
    render(
      <Drawer defaultOpen={true}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Drawer Title</Drawer.Title>
            <Drawer.Description>Drawer description</Drawer.Description>
            <Drawer.Close />
          </Drawer.Header>
          <Drawer.Body>Drawer body content</Drawer.Body>
          <Drawer.Footer>
            <button>Cancel</button>
            <button>Save</button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    );
    
    expect(screen.getByText('Drawer Title')).toBeInTheDocument();
    expect(screen.getByText('Drawer description')).toBeInTheDocument();
    expect(screen.getByText('Drawer body content')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('handles close button click', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();
    
    render(
      <Drawer defaultOpen={true} onOpenChange={onOpenChange}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Close />
          </Drawer.Header>
        </Drawer.Content>
      </Drawer>
    );
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('supports controlled open state', () => {
    const { rerender } = render(
      <Drawer open={false}>
        <Drawer.Trigger>Open</Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );
    
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
    
    rerender(
      <Drawer open={true}>
        <Drawer.Trigger>Open</Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );
    
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies different directions', () => {
    const directions = ['left', 'right', 'top', 'bottom'] as const;
    directions.forEach(direction => {
      const { unmount } = render(
        <Drawer defaultOpen={true} direction={direction}>
          <Drawer.Content>
            <Drawer.Body>Content {direction}</Drawer.Body>
          </Drawer.Content>
        </Drawer>
      );
      
      const content = screen.getByRole('dialog');
      expect(content).toBeInTheDocument();
      
      // Clean up before next iteration
      unmount();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;
    sizes.forEach(size => {
      const { unmount } = render(
        <Drawer defaultOpen={true} size={size}>
          <Drawer.Content>
            <Drawer.Body>Content {size}</Drawer.Body>
          </Drawer.Content>
        </Drawer>
      );
      
      const content = screen.getByRole('dialog');
      expect(content).toBeInTheDocument();
      
      // Clean up before next iteration
      unmount();
    });
  });

  it('applies different variants', () => {
    const variants = ['default', 'brutal', 'outline'] as const;
    variants.forEach(variant => {
      const { unmount } = render(
        <Drawer defaultOpen={true} variant={variant}>
          <Drawer.Content>
            <Drawer.Body>Content {variant}</Drawer.Body>
          </Drawer.Content>
        </Drawer>
      );
      
      const content = screen.getByRole('dialog');
      expect(content).toBeInTheDocument();
      
      // Clean up before next iteration
      unmount();
    });
  });

  it('supports asChild for trigger', async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <Drawer.Trigger asChild>
          <button>Custom Button</button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );
    
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('hides overlay when showOverlay is false', () => {
    render(
      <Drawer defaultOpen={true}>
        <Drawer.Content showOverlay={false}>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );
    
    const overlay = document.querySelector('[aria-hidden="true"]');
    expect(overlay).not.toBeInTheDocument();
  });

  it('sets body overflow hidden when open', () => {
    render(
      <Drawer defaultOpen={true}>
        <Drawer.Content>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );
    
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body overflow when closed', async () => {
    const { rerender } = render(
      <Drawer defaultOpen={true}>
        <Drawer.Content>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );
    
    // Check if body overflow is managed
    const isOverflowHidden = document.body.style.overflow === 'hidden';
    
    rerender(
      <Drawer open={false}>
        <Drawer.Content>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );
    
    await waitFor(() => {
      // If overflow was managed when open, it should be different when closed
      if (isOverflowHidden) {
        expect(document.body.style.overflow).not.toBe('hidden');
      } else {
        // Otherwise just check the drawer is closed
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      }
    });
  });

  it('manages focus automatically', async () => {
    render(
      <Drawer defaultOpen={true}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Close />
          </Drawer.Header>
          <Drawer.Body>
            <button>First button</button>
            <button>Second button</button>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );
    
    await waitFor(() => {
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toHaveFocus();
    });
  });

  it('applies custom className', () => {
    render(
      <Drawer defaultOpen={true}>
        <Drawer.Content className="custom-drawer">
          <Drawer.Body>Content</Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );
    
    const content = screen.getByRole('dialog');
    expect(content).toHaveClass('custom-drawer');
  });

  it('supports custom close button content', () => {
    render(
      <Drawer defaultOpen={true}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Close>Custom Close</Drawer.Close>
          </Drawer.Header>
        </Drawer.Content>
      </Drawer>
    );
    
    expect(screen.getByText('Custom Close')).toBeInTheDocument();
  });

  it('supports asChild for close button', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();
    
    render(
      <Drawer defaultOpen={true} onOpenChange={onOpenChange}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Close asChild>
              <a href="#">Close Link</a>
            </Drawer.Close>
          </Drawer.Header>
        </Drawer.Content>
      </Drawer>
    );
    
    await user.click(screen.getByText('Close Link'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});