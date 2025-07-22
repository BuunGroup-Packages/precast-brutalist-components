import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Breadcrumb from '../Breadcrumb';

describe('Breadcrumb Component', () => {
  it('renders without crashing', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Page>Current Page</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('renders navigation with proper ARIA label', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();
  });

  it('renders default separator between items', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(screen.getByText('/')).toBeInTheDocument();
  });

  it('renders custom separator', () => {
    render(
      <Breadcrumb separator=">">
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('marks current page with aria-current', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isCurrentPage>
          <Breadcrumb.Page>Current</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
    
    const currentItem = screen.getByText('Current').closest('li');
    expect(currentItem).toHaveAttribute('aria-current', 'page');
  });

  it('renders links with href', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
    
    const link = screen.getByText('Products');
    expect(link).toHaveAttribute('href', '/products');
  });

  it('handles click events on links', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(
      <Breadcrumb>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/" onClick={handleClick}>
            Home
          </Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
    
    await user.click(screen.getByText('Home'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom className to root', () => {
    const { container } = render(
      <Breadcrumb className="custom-breadcrumb">
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
    
    expect(container.querySelector('nav')).toHaveClass('custom-breadcrumb');
  });

  it('does not render separator after last item', () => {
    const { container } = render(
      <Breadcrumb>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Page>Current</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
    
    const separators = container.querySelectorAll('li[aria-hidden="true"]');
    expect(separators).toHaveLength(2); // 3 items = 2 separators
  });

  it('renders complex breadcrumb structure', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/category">Category</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/category/subcategory">Subcategory</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isCurrentPage>
          <Breadcrumb.Page>Product</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Subcategory')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
  });
});