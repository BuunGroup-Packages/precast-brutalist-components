import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { HoverCard } from '../HoverCard';

describe('HoverCard Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    render(
      <HoverCard>
        <HoverCard.Trigger>
          <span>Hover me</span>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div>Card content</div>
        </HoverCard.Content>
      </HoverCard>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows content on hover after delay', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <HoverCard openDelay={100}>
        <HoverCard.Trigger>
          <span>Hover me</span>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div>Card content</div>
        </HoverCard.Content>
      </HoverCard>
    );
    
    expect(screen.queryByText('Card content')).not.toBeInTheDocument();
    
    await user.hover(screen.getByText('Hover me'));
    
    // Content should not appear immediately
    expect(screen.queryByText('Card content')).not.toBeInTheDocument();
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });
  });

  it('hides content on mouse leave after delay', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <HoverCard openDelay={0} closeDelay={100}>
        <HoverCard.Trigger>
          <span>Hover me</span>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div>Card content</div>
        </HoverCard.Content>
      </HoverCard>
    );
    
    await user.hover(screen.getByText('Hover me'));
    
    // Wait for content to appear first
    act(() => {
      jest.advanceTimersByTime(0);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });
    
    await user.unhover(screen.getByText('Hover me'));
    
    // Content should still be visible
    expect(screen.getByText('Card content')).toBeInTheDocument();
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    await waitFor(() => {
      expect(screen.queryByText('Card content')).not.toBeInTheDocument();
    });
  });

  it('shows content on focus', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <HoverCard openDelay={100}>
        <HoverCard.Trigger>
          <button>Focus me</button>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div>Card content</div>
        </HoverCard.Content>
      </HoverCard>
    );
    
    await user.tab();
    
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });
  });

  it('hides content on blur', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <HoverCard openDelay={0} closeDelay={100}>
        <HoverCard.Trigger>
          <button>Focus me</button>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div>Card content</div>
        </HoverCard.Content>
      </HoverCard>
    );
    
    const trigger = screen.getByText('Focus me');
    await user.click(trigger);
    trigger.focus();
    
    // Wait for content to appear
    act(() => {
      jest.advanceTimersByTime(0);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });
    
    trigger.blur();
    
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    await waitFor(() => {
      expect(screen.queryByText('Card content')).not.toBeInTheDocument();
    });
  });

  it('supports controlled open state', () => {
    const { rerender } = render(
      <HoverCard open={false}>
        <HoverCard.Trigger>
          <span>Hover me</span>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div>Card content</div>
        </HoverCard.Content>
      </HoverCard>
    );
    
    expect(screen.queryByText('Card content')).not.toBeInTheDocument();
    
    rerender(
      <HoverCard open={true}>
        <HoverCard.Trigger>
          <span>Hover me</span>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div>Card content</div>
        </HoverCard.Content>
      </HoverCard>
    );
    
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('fires onOpenChange callback', async () => {
    const user = userEvent.setup({ delay: null });
    const onOpenChange = jest.fn();
    
    render(
      <HoverCard onOpenChange={onOpenChange} openDelay={0}>
        <HoverCard.Trigger>
          <span>Hover me</span>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div>Card content</div>
        </HoverCard.Content>
      </HoverCard>
    );
    
    await user.hover(screen.getByText('Hover me'));
    
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  it('supports asChild for trigger', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <HoverCard openDelay={0}>
        <HoverCard.Trigger asChild>
          <button>Custom Button</button>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div>Card content</div>
        </HoverCard.Content>
      </HoverCard>
    );
    
    await user.hover(screen.getByRole('button'));
    
    // Wait for hover delay
    act(() => {
      jest.advanceTimersByTime(0);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });
  });

  it('supports custom open and close delays', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <HoverCard openDelay={500} closeDelay={200}>
        <HoverCard.Trigger>
          <span>Hover me</span>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div>Card content</div>
        </HoverCard.Content>
      </HoverCard>
    );
    
    await user.hover(screen.getByText('Hover me'));
    
    // Should not be visible before open delay
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(screen.queryByText('Card content')).not.toBeInTheDocument();
    
    // Should be visible after open delay
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });
  });

  it('cancels timers when hovering quickly', async () => {
    const user = userEvent.setup({ delay: null });
    const onOpenChange = jest.fn();
    
    render(
      <HoverCard onOpenChange={onOpenChange} openDelay={200} closeDelay={200}>
        <HoverCard.Trigger>
          <span>Hover me</span>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div>Card content</div>
        </HoverCard.Content>
      </HoverCard>
    );
    
    // Hover and quickly unhover
    await user.hover(screen.getByText('Hover me'));
    act(() => {
      jest.advanceTimersByTime(100);
    });
    await user.unhover(screen.getByText('Hover me'));
    
    // Wait for what would have been the open delay
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // Should have called onOpenChange with false (close)
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('applies custom className to trigger', () => {
    render(
      <HoverCard>
        <HoverCard.Trigger className="custom-trigger">
          <span>Hover me</span>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div>Card content</div>
        </HoverCard.Content>
      </HoverCard>
    );
    
    const trigger = screen.getByText('Hover me').parentElement;
    expect(trigger).toHaveClass('custom-trigger');
  });

  it('applies different positions to content', () => {
    const positions = ['top', 'right', 'bottom', 'left'] as const;
    
    positions.forEach(position => {
      render(
        <HoverCard defaultOpen={true} key={position}>
          <HoverCard.Trigger>
            <span>Hover me</span>
          </HoverCard.Trigger>
          <HoverCard.Content side={position}>
            <div>Card content {position}</div>
          </HoverCard.Content>
        </HoverCard>
      );
      
      expect(screen.getByText(`Card content ${position}`)).toBeInTheDocument();
    });
  });

  it('applies different alignments', () => {
    const alignments = ['start', 'center', 'end'] as const;
    
    alignments.forEach(align => {
      render(
        <HoverCard defaultOpen={true} key={align}>
          <HoverCard.Trigger>
            <span>Hover me</span>
          </HoverCard.Trigger>
          <HoverCard.Content align={align}>
            <div>Card content {align}</div>
          </HoverCard.Content>
        </HoverCard>
      );
      
      expect(screen.getByText(`Card content ${align}`)).toBeInTheDocument();
    });
  });

  it('supports custom side offset', () => {
    render(
      <HoverCard defaultOpen={true}>
        <HoverCard.Trigger>
          <span>Hover me</span>
        </HoverCard.Trigger>
        <HoverCard.Content sideOffset={20}>
          <div>Card content</div>
        </HoverCard.Content>
      </HoverCard>
    );
    
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies custom className to content', () => {
    render(
      <HoverCard defaultOpen={true}>
        <HoverCard.Trigger>
          <span>Hover me</span>
        </HoverCard.Trigger>
        <HoverCard.Content className="custom-content">
          <div>Card content</div>
        </HoverCard.Content>
      </HoverCard>
    );
    
    // Find the content element and check for custom class
    const contentElements = document.querySelectorAll('.custom-content');
    expect(contentElements.length).toBeGreaterThan(0);
  });

  it('supports default open state', () => {
    render(
      <HoverCard defaultOpen={true}>
        <HoverCard.Trigger>
          <span>Hover me</span>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div>Card content</div>
        </HoverCard.Content>
      </HoverCard>
    );
    
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });
});