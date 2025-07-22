import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Table } from '../Table';

describe('Table Component', () => {
  it('renders without crashing', () => {
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header>Header 1</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Cell 1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 1')).toBeInTheDocument();
  });

  it('applies different variants', () => {
    const variants = ['default', 'striped', 'bordered'] as const;
    variants.forEach(variant => {
      const { container } = render(
        <Table variant={variant}>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Test</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
      expect(container.querySelector('table')).toBeInTheDocument();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(
        <Table size={size}>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Test</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
      expect(container.querySelector('table')).toBeInTheDocument();
    });
  });

  it('supports hoverable rows', () => {
    const { container } = render(
      <Table hoverable>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Hoverable row</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('supports full width', () => {
    const { container } = render(
      <Table fullWidth={false}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Not full width</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('renders with sticky header', () => {
    render(
      <Table>
        <Table.Head sticky>
          <Table.Row>
            <Table.Header>Sticky Header</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    expect(screen.getByText('Sticky Header')).toBeInTheDocument();
  });

  it('supports sortable columns', () => {
    const handleSort = jest.fn();
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header sortable onSort={handleSort}>
              Sortable Column
            </Table.Header>
          </Table.Row>
        </Table.Head>
      </Table>
    );
    expect(screen.getByText('Sortable Column')).toBeInTheDocument();
  });

  it('handles sort click events', async () => {
    const user = userEvent.setup();
    const handleSort = jest.fn();
    
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header sortable sortDirection="none" onSort={handleSort}>
              Click to Sort
            </Table.Header>
          </Table.Row>
        </Table.Head>
      </Table>
    );
    
    const header = screen.getByText('Click to Sort');
    await user.click(header);
    expect(handleSort).toHaveBeenCalled();
  });

  it('displays sort direction', () => {
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header sortable sortDirection="asc">
              Ascending
            </Table.Header>
            <Table.Header sortable sortDirection="desc">
              Descending
            </Table.Header>
          </Table.Row>
        </Table.Head>
      </Table>
    );
    expect(screen.getByText('Ascending')).toBeInTheDocument();
    expect(screen.getByText('Descending')).toBeInTheDocument();
  });

  it('supports text alignment in headers', () => {
    const alignments = ['left', 'center', 'right'] as const;
    alignments.forEach(align => {
      render(
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Header align={align}>{align} aligned</Table.Header>
            </Table.Row>
          </Table.Head>
        </Table>
      );
      expect(screen.getByText(`${align} aligned`)).toBeInTheDocument();
    });
  });

  it('supports text alignment in cells', () => {
    const alignments = ['left', 'center', 'right'] as const;
    alignments.forEach(align => {
      render(
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell align={align}>{align} aligned</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
      expect(screen.getByText(`${align} aligned`)).toBeInTheDocument();
    });
  });

  it('renders complex table structure', () => {
    render(
      <Table variant="striped" size="md" hoverable>
        <Table.Head>
          <Table.Row>
            <Table.Header>Name</Table.Header>
            <Table.Header align="center">Age</Table.Header>
            <Table.Header align="right">Score</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>John Doe</Table.Cell>
            <Table.Cell align="center">25</Table.Cell>
            <Table.Cell align="right">95</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jane Smith</Table.Cell>
            <Table.Cell align="center">30</Table.Cell>
            <Table.Cell align="right">88</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Table className="custom-table">
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    expect(container.querySelector('table')).toHaveClass('custom-table');
  });
});