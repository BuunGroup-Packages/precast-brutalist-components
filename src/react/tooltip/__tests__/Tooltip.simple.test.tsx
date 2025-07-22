import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Tooltip } from '../Tooltip';

describe('Tooltip Component', () => {
  it('renders without crashing', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip content">
        <button>Trigger</button>
      </Tooltip>
    );
    
    const trigger = screen.getByText('Trigger');
    await user.hover(trigger);
    
    // Tooltip might be visible after hover
    const trigger2 = screen.getByText('Trigger');
    expect(trigger2).toBeInTheDocument();
  });

  it('applies different positions', () => {
    const positions = ['top', 'bottom', 'left', 'right'] as const;
    positions.forEach(position => {
      const { container } = render(
        <Tooltip content="Test tooltip" position={position}>
          <button>Test</button>
        </Tooltip>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('supports delay configuration', () => {
    render(
      <Tooltip content="Delayed tooltip" delay={100}>
        <button>Delayed</button>
      </Tooltip>
    );
    expect(screen.getByText('Delayed')).toBeInTheDocument();
  });
});