import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AspectRatio } from '../AspectRatio';

describe('AspectRatio Component', () => {
  it('renders without crashing', () => {
    render(
      <AspectRatio>
        <img src="test.jpg" alt="Test" />
      </AspectRatio>
    );
    expect(screen.getByAltText('Test')).toBeInTheDocument();
  });

  it('maintains default 16:9 ratio', () => {
    const { container } = render(
      <AspectRatio>
        <div>Content</div>
      </AspectRatio>
    );
    
    const sizer = container.querySelector('[style*="padding-bottom"]');
    expect(sizer).toHaveStyle('padding-bottom: 56.25%'); // 9/16 = 0.5625
  });

  it('applies custom ratio', () => {
    const { container } = render(
      <AspectRatio ratio={1}>
        <div>Square content</div>
      </AspectRatio>
    );
    
    const sizer = container.querySelector('[style*="padding-bottom"]');
    expect(sizer).toHaveStyle('padding-bottom: 100%'); // 1:1 ratio
  });

  it('applies different aspect ratios', () => {
    const ratios = [4/3, 3/2, 21/9];
    ratios.forEach(ratio => {
      const { container } = render(
        <AspectRatio ratio={ratio}>
          <div>Content</div>
        </AspectRatio>
      );
      
      const sizer = container.querySelector('[style*="padding-bottom"]');
      const expectedPadding = `${(1 / ratio) * 100}%`;
      expect(sizer).toHaveStyle(`padding-bottom: ${expectedPadding}`);
    });
  });

  it('applies object-fit attribute', () => {
    const objectFits = ['contain', 'cover', 'fill', 'none', 'scale-down'] as const;
    objectFits.forEach(objectFit => {
      const { container } = render(
        <AspectRatio objectFit={objectFit}>
          <img src="test.jpg" alt="Test" />
        </AspectRatio>
      );
      
      expect(container.firstChild).toHaveAttribute('data-object-fit', objectFit);
    });
  });

  it('applies custom background color', () => {
    const { container } = render(
      <AspectRatio backgroundColor="#f0f0f0">
        <div>Content</div>
      </AspectRatio>
    );
    
    expect(container.firstChild).toHaveStyle('background-color: #f0f0f0');
  });

  it('applies custom className', () => {
    const { container } = render(
      <AspectRatio className="custom-aspect">
        <div>Content</div>
      </AspectRatio>
    );
    
    expect(container.firstChild).toHaveClass('custom-aspect');
  });

  it('renders different types of children', () => {
    render(
      <AspectRatio>
        <video src="test.mp4" data-testid="video" />
      </AspectRatio>
    );
    
    expect(screen.getByTestId('video')).toBeInTheDocument();
  });

  it('spreads additional props', () => {
    render(
      <AspectRatio data-testid="aspect-ratio">
        <div>Content</div>
      </AspectRatio>
    );
    
    expect(screen.getByTestId('aspect-ratio')).toBeInTheDocument();
  });
});