import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Container } from '../Container';

describe('Container Component', () => {
  it('renders without crashing', () => {
    render(
      <Container>
        <div>Container content</div>
      </Container>
    );
    expect(screen.getByText('Container content')).toBeInTheDocument();
  });

  it('applies different size variants', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;
    sizes.forEach(size => {
      const { container } = render(
        <Container size={size}>
          <div>Content</div>
        </Container>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('centers content by default', () => {
    const { container } = render(
      <Container>
        <div>Centered content</div>
      </Container>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('can disable centering', () => {
    const { container } = render(
      <Container centered={false}>
        <div>Not centered</div>
      </Container>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies different padding sizes', () => {
    const paddings = ['none', 'sm', 'md', 'lg'] as const;
    paddings.forEach(padding => {
      const { container } = render(
        <Container padding={padding}>
          <div>Content</div>
        </Container>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <Container className="custom-container">
        <div>Content</div>
      </Container>
    );
    expect(container.firstChild).toHaveClass('custom-container');
  });

  it('forwards additional props', () => {
    render(
      <Container data-testid="test-container">
        <div>Content</div>
      </Container>
    );
    expect(screen.getByTestId('test-container')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <Container>
        <h1>Title</h1>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </Container>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
  });

  it('handles responsive content', () => {
    render(
      <Container size="lg" padding="lg">
        <div style={{ width: '100%' }}>Responsive content</div>
      </Container>
    );
    expect(screen.getByText('Responsive content')).toBeInTheDocument();
  });
});