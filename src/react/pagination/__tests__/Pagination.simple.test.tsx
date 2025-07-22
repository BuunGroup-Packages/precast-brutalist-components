import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Pagination } from '../Pagination';

describe('Pagination Component', () => {
  it('renders without crashing', () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('displays page numbers', () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('highlights current page', () => {
    render(<Pagination currentPage={3} totalPages={5} />);
    const currentPageButton = screen.getByText('3').closest('button');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  });

  it('handles page change', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(<Pagination currentPage={1} totalPages={5} onChange={onChange} />);
    
    await user.click(screen.getByText('3'));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('shows previous and next buttons', () => {
    render(<Pagination currentPage={2} totalPages={5} showPrevNext />);
    expect(screen.getByLabelText('Previous')).toBeInTheDocument();
    expect(screen.getByLabelText('Next')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} showPrevNext />);
    expect(screen.getByLabelText('Previous')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} showPrevNext />);
    expect(screen.getByLabelText('Next')).toBeDisabled();
  });

  it('shows first and last buttons', () => {
    render(<Pagination currentPage={3} totalPages={10} showFirstLast />);
    expect(screen.getByLabelText('First')).toBeInTheDocument();
    expect(screen.getByLabelText('Last')).toBeInTheDocument();
  });

  it('handles ellipsis for many pages', () => {
    render(<Pagination currentPage={5} totalPages={20} siblingCount={1} boundaryCount={1} />);
    const ellipses = screen.getAllByText('...');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('uses custom labels', () => {
    const labels = {
      previous: 'Prev',
      next: 'Next',
      first: 'Start',
      last: 'End'
    };
    
    render(
      <Pagination 
        currentPage={3} 
        totalPages={10} 
        showPrevNext 
        showFirstLast
        labels={labels}
      />
    );
    
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('End')).toBeInTheDocument();
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(
        <Pagination currentPage={1} totalPages={5} size={size} />
      );
      expect(container.querySelector('nav')).toBeInTheDocument();
    });
  });

  it('respects disabled state', () => {
    render(<Pagination currentPage={1} totalPages={5} disabled />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('handles navigation with previous/next', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        showPrevNext 
        onChange={onChange}
      />
    );
    
    await user.click(screen.getByLabelText('Previous'));
    expect(onChange).toHaveBeenCalledWith(2);
    
    await user.click(screen.getByLabelText('Next'));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('handles navigation with first/last', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(
      <Pagination 
        currentPage={5} 
        totalPages={10} 
        showFirstLast 
        onChange={onChange}
      />
    );
    
    await user.click(screen.getByLabelText('First'));
    expect(onChange).toHaveBeenCalledWith(1);
    
    await user.click(screen.getByLabelText('Last'));
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it('applies custom className', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={5} className="custom-pagination" />
    );
    expect(container.querySelector('nav')).toHaveClass('custom-pagination');
  });
});