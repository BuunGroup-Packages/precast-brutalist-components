import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Stack } from '../Stack';

describe('Stack Component', () => {
  it('renders without crashing', () => {
    render(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies vertical direction by default', () => {
    const { container } = render(
      <Stack>
        <div>Vertical item</div>
      </Stack>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies horizontal direction', () => {
    const { container } = render(
      <Stack direction="horizontal">
        <div>Horizontal item 1</div>
        <div>Horizontal item 2</div>
      </Stack>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies different gap sizes', () => {
    const gaps = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
    gaps.forEach(gap => {
      const { container } = render(
        <Stack gap={gap}>
          <div>Item</div>
        </Stack>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different alignment options', () => {
    const alignments = ['start', 'center', 'end', 'stretch'] as const;
    alignments.forEach(align => {
      const { container } = render(
        <Stack align={align}>
          <div>Item</div>
        </Stack>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different justification options', () => {
    const justifications = ['start', 'center', 'end', 'between', 'around', 'evenly'] as const;
    justifications.forEach(justify => {
      const { container } = render(
        <Stack justify={justify}>
          <div>Item</div>
        </Stack>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('supports wrapping', () => {
    const { container } = render(
      <Stack wrap>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stack>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders as different HTML elements', () => {
    const elements = ['div', 'section', 'article', 'aside', 'header', 'footer', 'main', 'nav'] as const;
    elements.forEach(element => {
      const { container } = render(
        <Stack as={element}>
          <div>Content</div>
        </Stack>
      );
      expect(container.firstChild?.nodeName.toLowerCase()).toBe(element);
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <Stack className="custom-stack">
        <div>Item</div>
      </Stack>
    );
    expect(container.firstChild).toHaveClass('custom-stack');
  });

  it('forwards additional props', () => {
    render(
      <Stack data-testid="test-stack">
        <div>Item</div>
      </Stack>
    );
    expect(screen.getByTestId('test-stack')).toBeInTheDocument();
  });

  it('renders with complex layout options', () => {
    render(
      <Stack
        direction="horizontal"
        gap="lg"
        align="center"
        justify="between"
        wrap
      >
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      </Stack>
    );
    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
    expect(screen.getByText('Button 3')).toBeInTheDocument();
  });

  it('handles nested stacks', () => {
    render(
      <Stack direction="vertical" gap="lg">
        <Stack direction="horizontal" gap="sm">
          <div>Row 1 Item 1</div>
          <div>Row 1 Item 2</div>
        </Stack>
        <Stack direction="horizontal" gap="sm">
          <div>Row 2 Item 1</div>
          <div>Row 2 Item 2</div>
        </Stack>
      </Stack>
    );
    expect(screen.getByText('Row 1 Item 1')).toBeInTheDocument();
    expect(screen.getByText('Row 2 Item 2')).toBeInTheDocument();
  });
});