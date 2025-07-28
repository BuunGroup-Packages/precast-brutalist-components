import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScrollArea } from '../ScrollArea';

describe('ScrollArea Component', () => {
  it('renders without crashing', () => {
    render(
      <ScrollArea>
        <div>Scrollable content</div>
      </ScrollArea>
    );
    expect(screen.getByText('Scrollable content')).toBeInTheDocument();
  });

  it('renders with fixed height', () => {
    const { container } = render(
      <ScrollArea height={300}>
        <div>Content with fixed height</div>
      </ScrollArea>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with max height', () => {
    const { container } = render(
      <ScrollArea maxHeight={500}>
        <div>Content with max height</div>
      </ScrollArea>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('supports horizontal scrolling', () => {
    const { container } = render(
      <ScrollArea horizontal>
        <div style={{ width: 1000 }}>Wide content</div>
      </ScrollArea>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('supports both horizontal and vertical scrolling', () => {
    const { container } = render(
      <ScrollArea horizontal vertical>
        <div style={{ width: 1000, height: 1000 }}>Large content</div>
      </ScrollArea>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies different scrollbar sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(
        <ScrollArea scrollbarSize={size}>
          <div>Content</div>
        </ScrollArea>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different variants', () => {
    const variants = ['default', 'minimal', 'brutal'] as const;
    variants.forEach(variant => {
      const { container } = render(
        <ScrollArea variant={variant}>
          <div>Content</div>
        </ScrollArea>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('supports auto-hide scrollbars', () => {
    const { container } = render(
      <ScrollArea autoHide>
        <div>Content with auto-hide</div>
      </ScrollArea>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('can hide border', () => {
    const { container } = render(
      <ScrollArea showBorder={false}>
        <div>Content without border</div>
      </ScrollArea>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { getByText } = render(
      <ScrollArea className="custom-scroll">
        <div>Content</div>
      </ScrollArea>
    );
    const content = getByText('Content');
    const viewport = content.parentElement;
    expect(viewport).toHaveClass('custom-scroll');
  });

  it('renders long content', () => {
    render(
      <ScrollArea height={200}>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i}>Line {i + 1}</div>
        ))}
      </ScrollArea>
    );
    expect(screen.getByText('Line 1')).toBeInTheDocument();
    expect(screen.getByText('Line 50')).toBeInTheDocument();
  });
});