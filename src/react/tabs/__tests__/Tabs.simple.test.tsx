import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Tabs } from '../Tabs';

describe('Tabs Component', () => {
  it('renders without crashing', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content 1</Tabs.Content>
        <Tabs.Content value="tab2">Content 2</Tabs.Content>
      </Tabs>
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('shows default active tab content', () => {
    render(
      <Tabs defaultValue="tab2">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content 1</Tabs.Content>
        <Tabs.Content value="tab2">Content 2</Tabs.Content>
      </Tabs>
    );
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('switches tabs on click', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content 1</Tabs.Content>
        <Tabs.Content value="tab2">Content 2</Tabs.Content>
      </Tabs>
    );
    
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    
    await user.click(screen.getByText('Tab 2'));
    
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('supports controlled mode', async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();
    
    render(
      <Tabs value="tab1" onValueChange={onValueChange}>
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content 1</Tabs.Content>
        <Tabs.Content value="tab2">Content 2</Tabs.Content>
      </Tabs>
    );
    
    await user.click(screen.getByText('Tab 2'));
    expect(onValueChange).toHaveBeenCalledWith('tab2');
  });

  it('applies different orientations', () => {
    const orientations = ['horizontal', 'vertical'] as const;
    orientations.forEach(orientation => {
      const { container } = render(
        <Tabs defaultValue="tab1" orientation={orientation}>
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content</Tabs.Content>
        </Tabs>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(
        <Tabs defaultValue="tab1" size={size}>
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content</Tabs.Content>
        </Tabs>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('supports full width tabs', () => {
    const { container } = render(
      <Tabs defaultValue="tab1" fullWidth>
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content</Tabs.Content>
      </Tabs>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('supports disabled tabs', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2" disabled>Disabled Tab</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content 1</Tabs.Content>
        <Tabs.Content value="tab2">Content 2</Tabs.Content>
      </Tabs>
    );
    
    const disabledTab = screen.getByText('Disabled Tab');
    expect(disabledTab.closest('button')).toBeDisabled();
  });

  it('sets correct tabindex and aria attributes', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content 1</Tabs.Content>
        <Tabs.Content value="tab2">Content 2</Tabs.Content>
        <Tabs.Content value="tab3">Content 3</Tabs.Content>
      </Tabs>
    );
    
    const tab1 = screen.getByText('Tab 1');
    const tab2 = screen.getByText('Tab 2');
    
    expect(tab1).toHaveAttribute('tabindex', '0');
    expect(tab2).toHaveAttribute('tabindex', '-1');
    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'false');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Tabs defaultValue="tab1" className="custom-tabs">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content</Tabs.Content>
      </Tabs>
    );
    expect(container.firstChild).toHaveClass('custom-tabs');
  });

  it('renders with custom content in triggers', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">
            <span>📋</span> Tab with Icon
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content</Tabs.Content>
      </Tabs>
    );
    expect(screen.getByText('📋')).toBeInTheDocument();
    expect(screen.getByText('Tab with Icon')).toBeInTheDocument();
  });

  it('handles multiple tab contents', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Settings</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Profile</Tabs.Trigger>
          <Tabs.Trigger value="tab3">Security</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <h3>Settings Content</h3>
          <p>Configure your preferences</p>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <h3>Profile Content</h3>
          <p>Update your profile information</p>
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <h3>Security Content</h3>
          <p>Manage security settings</p>
        </Tabs.Content>
      </Tabs>
    );
    
    expect(screen.getByText('Settings Content')).toBeInTheDocument();
    expect(screen.queryByText('Profile Content')).not.toBeInTheDocument();
    expect(screen.queryByText('Security Content')).not.toBeInTheDocument();
  });
});