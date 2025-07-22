import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Sheet } from '../Sheet';

describe('Sheet Component', () => {
  beforeEach(() => {
    // Clear DOM and reset state
    document.body.innerHTML = '';
    document.body.style.overflow = '';
    document.body.style.userSelect = '';
  });

  it('renders without crashing', () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );
    expect(screen.getByText('Open Sheet')).toBeInTheDocument();
  });

  it('opens sheet when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.queryByText('Sheet Title')).not.toBeInTheDocument();

    await user.click(screen.getByText('Open Sheet'));

    await waitFor(() => {
      expect(screen.getByText('Sheet Title')).toBeInTheDocument();
    });
  });

  it('closes sheet when close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
            <Sheet.Close>Close</Sheet.Close>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));
    
    await waitFor(() => {
      expect(screen.getByText('Sheet Title')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(screen.queryByText('Sheet Title')).not.toBeInTheDocument();
    });
  });

  it('closes sheet on escape key when closeOnEscape is true', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content closeOnEscape={true}>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));
    
    await waitFor(() => {
      expect(screen.getByText('Sheet Title')).toBeInTheDocument();
    });

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByText('Sheet Title')).not.toBeInTheDocument();
    });
  });

  it('does not close on escape when closeOnEscape is false', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content closeOnEscape={false}>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));
    
    await waitFor(() => {
      expect(screen.getByText('Sheet Title')).toBeInTheDocument();
    });

    await user.keyboard('{Escape}');

    // Wait a bit and verify sheet is still open
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(screen.getByText('Sheet Title')).toBeInTheDocument();
  });

  it('closes on overlay click when closeOnOverlayClick is true', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content closeOnOverlayClick={true}>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));
    
    await waitFor(() => {
      expect(screen.getByText('Sheet Title')).toBeInTheDocument();
    });

    // Find and click the overlay by data attribute
    const overlay = document.querySelector('[data-side="right"][data-variant="default"]:not([role="dialog"])');
    if (overlay) {
      // Use fireEvent.pointerDown to match the component's event listener
      fireEvent.pointerDown(overlay);
      
      await waitFor(() => {
        expect(screen.queryByText('Sheet Title')).not.toBeInTheDocument();
      });
    }
  });

  it('does not close on overlay click when closeOnOverlayClick is false', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content closeOnOverlayClick={false}>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));
    
    await waitFor(() => {
      expect(screen.getByText('Sheet Title')).toBeInTheDocument();
    });

    // Try to click on the overlay
    const overlay = document.body.lastElementChild?.firstElementChild;
    if (overlay) {
      await user.click(overlay);
    }

    // Wait and verify sheet is still open
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(screen.getByText('Sheet Title')).toBeInTheDocument();
  });

  it('hides overlay when showOverlay is false', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content showOverlay={false}>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));
    
    await waitFor(() => {
      expect(screen.getByText('Sheet Title')).toBeInTheDocument();
    });

    // Check that overlay is not present
    expect(document.body.lastElementChild?.firstElementChild).not.toHaveClass(/overlay/);
  });

  it('supports controlled open state', () => {
    const { rerender } = render(
      <Sheet open={false}>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.queryByText('Sheet Title')).not.toBeInTheDocument();

    rerender(
      <Sheet open={true}>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.getByText('Sheet Title')).toBeInTheDocument();
  });

  it('calls onOpenChange when state changes', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();
    
    render(
      <Sheet onOpenChange={onOpenChange}>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('supports defaultOpen prop', () => {
    render(
      <Sheet defaultOpen={true}>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.getByText('Sheet Title')).toBeInTheDocument();
  });

  it('renders all subcomponents correctly', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
            <Sheet.Description>Sheet Description</Sheet.Description>
            <Sheet.Close>×</Sheet.Close>
          </Sheet.Header>
          <div>Body Content</div>
          <Sheet.Footer>
            <button>Cancel</button>
            <button>Save</button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));

    await waitFor(() => {
      expect(screen.getByText('Sheet Title')).toBeInTheDocument();
      expect(screen.getByText('Sheet Description')).toBeInTheDocument();
      expect(screen.getByText('Body Content')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
      expect(screen.getByText('×')).toBeInTheDocument();
    });
  });

  it('applies different sides correctly', async () => {
    const user = userEvent.setup();
    const sides: Array<React.ComponentProps<typeof Sheet.Content>['side']> = ['top', 'bottom', 'left', 'right'];

    for (const side of sides) {
      const { unmount } = render(
        <Sheet>
          <Sheet.Trigger>Open {side} Sheet</Sheet.Trigger>
          <Sheet.Content side={side}>
            <Sheet.Header>
              <Sheet.Title>{side} Sheet</Sheet.Title>
            </Sheet.Header>
          </Sheet.Content>
        </Sheet>
      );

      await user.click(screen.getByText(`Open ${side} Sheet`));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('data-side', side);
      });

      unmount();
    }
  });

  it('applies different sizes correctly', async () => {
    const user = userEvent.setup();
    const sizes: Array<React.ComponentProps<typeof Sheet.Content>['size']> = ['sm', 'md', 'lg', 'xl', 'full'];

    for (const size of sizes) {
      const { unmount } = render(
        <Sheet>
          <Sheet.Trigger>Open {size} Sheet</Sheet.Trigger>
          <Sheet.Content size={size}>
            <Sheet.Header>
              <Sheet.Title>{size} Sheet</Sheet.Title>
            </Sheet.Header>
          </Sheet.Content>
        </Sheet>
      );

      await user.click(screen.getByText(`Open ${size} Sheet`));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('data-size', size);
      });

      unmount();
    }
  });

  it('applies different variants correctly', async () => {
    const user = userEvent.setup();
    const variants: Array<React.ComponentProps<typeof Sheet.Content>['variant']> = ['default', 'brutal', 'outline'];

    for (const variant of variants) {
      const { unmount } = render(
        <Sheet>
          <Sheet.Trigger>Open {variant} Sheet</Sheet.Trigger>
          <Sheet.Content variant={variant}>
            <Sheet.Header>
              <Sheet.Title>{variant} Sheet</Sheet.Title>
            </Sheet.Header>
          </Sheet.Content>
        </Sheet>
      );

      await user.click(screen.getByText(`Open ${variant} Sheet`));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('data-variant', variant);
      });

      unmount();
    }
  });

  it('supports asChild for trigger', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger asChild>
          <div>Custom Trigger</div>
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    await user.click(screen.getByText('Custom Trigger'));

    await waitFor(() => {
      expect(screen.getByText('Sheet Title')).toBeInTheDocument();
    });
  });

  it('supports asChild for close button', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
            <Sheet.Close asChild>
              <div>Custom Close</div>
            </Sheet.Close>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));
    
    await waitFor(() => {
      expect(screen.getByText('Sheet Title')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Custom Close'));

    await waitFor(() => {
      expect(screen.queryByText('Sheet Title')).not.toBeInTheDocument();
    });
  });

  it('applies custom classNames to subcomponents', async () => {
    const user = userEvent.setup();
    render(
      <Sheet className="custom-sheet">
        <Sheet.Trigger className="custom-trigger">Open Sheet</Sheet.Trigger>
        <Sheet.Content className="custom-content">
          <Sheet.Header className="custom-header">
            <Sheet.Title className="custom-title">Sheet Title</Sheet.Title>
            <Sheet.Description className="custom-description">Description</Sheet.Description>
            <Sheet.Close className="custom-close">×</Sheet.Close>
          </Sheet.Header>
          <Sheet.Footer className="custom-footer">Footer</Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.getByText('Open Sheet')).toHaveClass('custom-trigger');

    await user.click(screen.getByText('Open Sheet'));

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toHaveClass('custom-content');
      expect(screen.getByText('Sheet Title').closest('[class*="header"]')).toHaveClass('custom-header');
      expect(screen.getByText('Sheet Title')).toHaveClass('custom-title');
      expect(screen.getByText('Description')).toHaveClass('custom-description');
      expect(screen.getByText('×')).toHaveClass('custom-close');
      expect(screen.getByText('Footer')).toHaveClass('custom-footer');
    });
  });

  it('sets body overflow hidden when sheet is open', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    expect(document.body.style.overflow).not.toBe('hidden');

    await user.click(screen.getByText('Open Sheet'));

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  it('restores body overflow when sheet is closed', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
            <Sheet.Close>Close</Sheet.Close>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });

    await user.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(document.body.style.overflow).not.toBe('hidden');
    });
  });

  it('manages focus automatically', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <button>First Button</button>
            <button>Second Button</button>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));

    await waitFor(() => {
      // First focusable element should receive focus
      expect(screen.getByText('First Button')).toHaveFocus();
    });
  });

  it('sets correct ARIA attributes', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));

    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('tabIndex', '-1');
      expect(dialog).toHaveAttribute('data-state', 'open');
    });
  });

  it('renders close button with correct aria-label', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Close>×</Sheet.Close>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));

    await waitFor(() => {
      expect(screen.getByLabelText('Close sheet')).toBeInTheDocument();
    });
  });

  it('renders in portal', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <div data-testid="container">
        <Sheet>
          <Sheet.Trigger>Open Sheet</Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Header>
              <Sheet.Title>Sheet Title</Sheet.Title>
            </Sheet.Header>
          </Sheet.Content>
        </Sheet>
      </div>
    );

    await user.click(screen.getByText('Open Sheet'));

    await waitFor(() => {
      const sheetContent = screen.getByText('Sheet Title');
      expect(sheetContent).toBeInTheDocument();
      // Sheet should not be inside the container (it's in a portal)
      expect(container).not.toContainElement(sheetContent);
    });
  });
});