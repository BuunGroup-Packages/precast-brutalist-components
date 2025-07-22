import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Carousel } from '../Carousel';

describe('Carousel Component', () => {
  it('renders without crashing', () => {
    render(
      <Carousel>
        <Carousel.Content>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </Carousel.Content>
      </Carousel>
    );
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('navigates between slides with controls', async () => {
    const user = userEvent.setup();
    render(
      <Carousel>
        <Carousel.Content>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </Carousel.Content>
        <Carousel.Controls>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Controls>
      </Carousel>
    );
    
    // Initially on slide 1
    expect(screen.getByText('Slide 1').closest('[data-active="true"]')).toBeInTheDocument();
    
    // Navigate to slide 2
    const nextButton = screen.getByLabelText('Next slide');
    await user.click(nextButton);
    expect(screen.getByText('Slide 2').closest('[data-active="true"]')).toBeInTheDocument();
    
    // Navigate back to slide 1
    const prevButton = screen.getByLabelText('Previous slide');
    await user.click(prevButton);
    expect(screen.getByText('Slide 1').closest('[data-active="true"]')).toBeInTheDocument();
  });

  it('disables previous button on first slide without loop', () => {
    render(
      <Carousel loop={false}>
        <Carousel.Content>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel.Content>
        <Carousel.Controls>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Controls>
      </Carousel>
    );
    
    const prevButton = screen.getByLabelText('Previous slide');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last slide without loop', async () => {
    const user = userEvent.setup();
    render(
      <Carousel loop={false}>
        <Carousel.Content>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel.Content>
        <Carousel.Controls>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Controls>
      </Carousel>
    );
    
    const nextButton = screen.getByLabelText('Next slide');
    await user.click(nextButton); // Go to slide 2
    expect(nextButton).toBeDisabled();
  });

  it('enables looping through slides', async () => {
    const user = userEvent.setup();
    render(
      <Carousel loop={true}>
        <Carousel.Content>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel.Content>
        <Carousel.Controls>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Controls>
      </Carousel>
    );
    
    const prevButton = screen.getByLabelText('Previous slide');
    const nextButton = screen.getByLabelText('Next slide');
    
    // Previous button should not be disabled on first slide
    expect(prevButton).not.toBeDisabled();
    
    // Go to last slide
    await user.click(nextButton);
    // Next button should not be disabled on last slide
    expect(nextButton).not.toBeDisabled();
  });

  it('renders indicators', () => {
    render(
      <Carousel>
        <Carousel.Content>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </Carousel.Content>
        <Carousel.Indicators />
      </Carousel>
    );
    
    const indicators = screen.getAllByRole('button', { name: /Go to slide/i });
    expect(indicators).toHaveLength(3);
  });

  it('navigates to specific slide via indicators', async () => {
    const user = userEvent.setup();
    render(
      <Carousel>
        <Carousel.Content>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </Carousel.Content>
        <Carousel.Indicators />
      </Carousel>
    );
    
    const indicator3 = screen.getByLabelText('Go to slide 3');
    await user.click(indicator3);
    expect(screen.getByText('Slide 3').closest('[data-active="true"]')).toBeInTheDocument();
  });

  it('starts from defaultValue', () => {
    render(
      <Carousel defaultValue={1}>
        <Carousel.Content>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </Carousel.Content>
      </Carousel>
    );
    
    expect(screen.getByText('Slide 2').closest('[data-active="true"]')).toBeInTheDocument();
  });

  it('supports controlled mode', async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();
    
    render(
      <Carousel value={0} onValueChange={onValueChange}>
        <Carousel.Content>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel.Content>
        <Carousel.Controls>
          <Carousel.Next />
        </Carousel.Controls>
      </Carousel>
    );
    
    const nextButton = screen.getByLabelText('Next slide');
    await user.click(nextButton);
    expect(onValueChange).toHaveBeenCalledWith(1);
  });

  it('applies different size variants', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(
        <Carousel size={size}>
          <Carousel.Content>
            <div>Slide</div>
          </Carousel.Content>
        </Carousel>
      );
      expect(container.querySelector('[data-size]')).toHaveAttribute('data-size', size);
    });
  });

  it('applies different visual variants', () => {
    const variants = ['default', 'brutal', 'outline'] as const;
    variants.forEach(variant => {
      const { container } = render(
        <Carousel variant={variant}>
          <Carousel.Content>
            <div>Slide</div>
          </Carousel.Content>
        </Carousel>
      );
      expect(container.querySelector('[data-variant]')).toHaveAttribute('data-variant', variant);
    });
  });

  it('supports vertical orientation', () => {
    const { container } = render(
      <Carousel orientation="vertical">
        <Carousel.Content>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel.Content>
      </Carousel>
    );
    
    expect(container.querySelector('[data-orientation]')).toHaveAttribute('data-orientation', 'vertical');
  });
});