import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Navigation } from '../Navigation';

describe('Navigation Component', () => {
  it('renders without crashing', () => {
    render(
      <Navigation>
        <Navigation.List>
          <Navigation.Item>
            <Navigation.Link href="/">Home</Navigation.Link>
          </Navigation.Item>
        </Navigation.List>
      </Navigation>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders horizontal layout by default', () => {
    const { container } = render(
      <Navigation>
        <Navigation.List>
          <Navigation.Item>Item</Navigation.Item>
        </Navigation.List>
      </Navigation>
    );
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('renders vertical layout', () => {
    const { container } = render(
      <Navigation vertical>
        <Navigation.List>
          <Navigation.Item>Item</Navigation.Item>
        </Navigation.List>
      </Navigation>
    );
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('applies different size variants', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(
        <Navigation size={size}>
          <Navigation.List>
            <Navigation.Item>Item</Navigation.Item>
          </Navigation.List>
        </Navigation>
      );
      expect(container.querySelector('nav')).toBeInTheDocument();
    });
  });

  it('renders navigation items', () => {
    render(
      <Navigation>
        <Navigation.List>
          <Navigation.Item>
            <Navigation.Link href="/home">Home</Navigation.Link>
          </Navigation.Item>
          <Navigation.Item>
            <Navigation.Link href="/about">About</Navigation.Link>
          </Navigation.Item>
          <Navigation.Item>
            <Navigation.Link href="/contact">Contact</Navigation.Link>
          </Navigation.Item>
        </Navigation.List>
      </Navigation>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('supports active state', () => {
    render(
      <Navigation>
        <Navigation.List>
          <Navigation.Item isActive>
            <Navigation.Link href="/" isActive>Active Item</Navigation.Link>
          </Navigation.Item>
        </Navigation.List>
      </Navigation>
    );
    expect(screen.getByText('Active Item')).toBeInTheDocument();
  });

  it('supports disabled state', () => {
    render(
      <Navigation>
        <Navigation.List>
          <Navigation.Item disabled>
            <Navigation.Link disabled>Disabled Item</Navigation.Link>
          </Navigation.Item>
        </Navigation.List>
      </Navigation>
    );
    expect(screen.getByText('Disabled Item')).toBeInTheDocument();
  });

  it('renders with icons', () => {
    render(
      <Navigation>
        <Navigation.List>
          <Navigation.Item>
            <Navigation.Link href="/" icon={<span>🏠</span>}>
              Home
            </Navigation.Link>
          </Navigation.Item>
        </Navigation.List>
      </Navigation>
    );
    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders separator', () => {
    render(
      <Navigation>
        <Navigation.List>
          <Navigation.Item>Item 1</Navigation.Item>
          <Navigation.Separator />
          <Navigation.Item>Item 2</Navigation.Item>
        </Navigation.List>
      </Navigation>
    );
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('handles click events on links', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(
      <Navigation>
        <Navigation.List>
          <Navigation.Item>
            <Navigation.Link href="#" onClick={handleClick}>
              Click me
            </Navigation.Link>
          </Navigation.Item>
        </Navigation.List>
      </Navigation>
    );
    
    await user.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom className to navigation', () => {
    const { container } = render(
      <Navigation className="custom-nav">
        <Navigation.List>
          <Navigation.Item>Item</Navigation.Item>
        </Navigation.List>
      </Navigation>
    );
    expect(container.querySelector('nav')).toHaveClass('custom-nav');
  });

  it('renders nested navigation structure', () => {
    render(
      <Navigation>
        <Navigation.List>
          <Navigation.Item>
            <Navigation.Link href="/products">Products</Navigation.Link>
          </Navigation.Item>
          <Navigation.Item>
            <Navigation.Link href="/services">Services</Navigation.Link>
          </Navigation.Item>
          <Navigation.Separator />
          <Navigation.Item>
            <Navigation.Link href="/account">Account</Navigation.Link>
          </Navigation.Item>
        </Navigation.List>
      </Navigation>
    );
    
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});