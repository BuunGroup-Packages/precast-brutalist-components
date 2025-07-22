import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Typography } from '../Typography';

describe('Typography Component', () => {
  it('renders without crashing', () => {
    render(<Typography>Test text</Typography>);
    expect(screen.getByText('Test text')).toBeInTheDocument();
  });

  it('renders different heading variants', () => {
    const headingVariants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
    headingVariants.forEach(variant => {
      render(<Typography variant={variant}>{variant} heading</Typography>);
      const element = screen.getByText(`${variant} heading`);
      expect(element.tagName.toLowerCase()).toBe(variant);
    });
  });

  it('renders paragraph variants', () => {
    const paragraphVariants = ['p', 'lead', 'large', 'small', 'muted'] as const;
    paragraphVariants.forEach(variant => {
      render(<Typography variant={variant}>{variant} text</Typography>);
      const element = screen.getByText(`${variant} text`);
      expect(element.tagName.toLowerCase()).toBe('p');
    });
  });

  it('renders blockquote variant', () => {
    render(<Typography variant="blockquote">Quote text</Typography>);
    const element = screen.getByText('Quote text');
    expect(element.tagName.toLowerCase()).toBe('blockquote');
  });

  it('renders code variant', () => {
    render(<Typography variant="code">Code text</Typography>);
    const element = screen.getByText('Code text');
    expect(element.tagName.toLowerCase()).toBe('code');
  });

  it('applies different sizes', () => {
    const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'] as const;
    sizes.forEach(size => {
      const { container } = render(
        <Typography size={size}>Sized text</Typography>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different weights', () => {
    const weights = ['normal', 'medium', 'semibold', 'bold', 'black'] as const;
    weights.forEach(weight => {
      const { container } = render(
        <Typography weight={weight}>Weighted text</Typography>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies text alignment', () => {
    const alignments = ['left', 'center', 'right', 'justify'] as const;
    alignments.forEach(align => {
      const { container } = render(
        <Typography align={align}>Aligned text</Typography>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies text transformations', () => {
    const transforms = ['none', 'uppercase', 'lowercase', 'capitalize'] as const;
    transforms.forEach(transform => {
      const { container } = render(
        <Typography transform={transform}>Transformed text</Typography>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different colors', () => {
    const colors = ['default', 'muted', 'accent', 'destructive', 'warning', 'success'] as const;
    colors.forEach(color => {
      const { container } = render(
        <Typography color={color}>Colored text</Typography>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different font families', () => {
    const families = ['mono', 'sans', 'serif'] as const;
    families.forEach(family => {
      const { container } = render(
        <Typography family={family}>Font family text</Typography>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('supports text truncation', () => {
    const { container } = render(
      <Typography truncate>
        This is a very long text that should be truncated with ellipsis
      </Typography>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders as span when asChild is true', () => {
    render(
      <Typography variant="h1" asChild>
        Span text
      </Typography>
    );
    const element = screen.getByText('Span text');
    expect(element.tagName.toLowerCase()).toBe('span');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Typography className="custom-typography">Custom class</Typography>
    );
    expect(container.firstChild).toHaveClass('custom-typography');
  });

  it('forwards additional props', () => {
    render(
      <Typography data-testid="test-typography">Test props</Typography>
    );
    expect(screen.getByTestId('test-typography')).toBeInTheDocument();
  });

  it('renders with multiple style options', () => {
    const { container } = render(
      <Typography
        variant="h2"
        size="xl"
        weight="bold"
        align="center"
        color="accent"
        transform="uppercase"
      >
        Styled heading
      </Typography>
    );
    const element = screen.getByText('Styled heading');
    expect(element).toBeInTheDocument();
    expect(element.tagName.toLowerCase()).toBe('h2');
    expect(container.firstChild).toBeInTheDocument();
  });
});