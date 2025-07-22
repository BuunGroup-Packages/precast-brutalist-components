import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Alert } from '../Alert';

describe('Alert Component', () => {
  it('renders without crashing', () => {
    render(<Alert>Test alert message</Alert>);
    expect(screen.getByText('Test alert message')).toBeInTheDocument();
  });

  it('applies different types', () => {
    const types = ['info', 'success', 'warning', 'error'] as const;
    types.forEach(type => {
      const { container } = render(
        <Alert type={type}>Test alert</Alert>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('displays title when provided', () => {
    render(
      <Alert>
        <Alert.Title>Alert Title</Alert.Title>
        <Alert.Description>Alert content</Alert.Description>
      </Alert>
    );
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert content')).toBeInTheDocument();
  });

  it('supports dismissible functionality', () => {
    const onDismiss = jest.fn();
    render(
      <Alert dismissible onDismiss={onDismiss}>
        Dismissible alert
      </Alert>
    );
    
    const dismissButton = screen.getByLabelText('Dismiss alert');
    expect(dismissButton).toBeInTheDocument();
  });

  it('handles dismiss click', async () => {
    const user = userEvent.setup();
    const onDismiss = jest.fn();
    render(
      <Alert dismissible onDismiss={onDismiss}>
        Dismissible alert
      </Alert>
    );
    
    const dismissButton = screen.getByLabelText('Dismiss alert');
    await user.click(dismissButton);
    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, 350));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('displays custom icon', () => {
    render(
      <Alert>
        <Alert.Icon>⚠️</Alert.Icon>
        <Alert.Content>Alert with icon</Alert.Content>
      </Alert>
    );
    expect(screen.getByText('Alert with icon')).toBeInTheDocument();
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Alert className="custom-alert">Test</Alert>
    );
    expect(container.firstChild).toHaveClass('custom-alert');
  });
});