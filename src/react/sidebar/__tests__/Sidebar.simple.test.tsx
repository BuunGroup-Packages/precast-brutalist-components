import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Sidebar } from '../Sidebar';

describe('Sidebar Component', () => {
  it('renders without crashing', () => {
    render(
      <Sidebar>
        <Sidebar.Content>
          <div>Sidebar content</div>
        </Sidebar.Content>
      </Sidebar>
    );
    expect(screen.getByText('Sidebar content')).toBeInTheDocument();
  });

  it('renders with header and footer', () => {
    render(
      <Sidebar>
        <Sidebar.Header>
          <h2>Sidebar Header</h2>
        </Sidebar.Header>
        <Sidebar.Content>
          <div>Main Content</div>
        </Sidebar.Content>
        <Sidebar.Footer>
          <div>Footer Content</div>
        </Sidebar.Footer>
      </Sidebar>
    );
    
    expect(screen.getByText('Sidebar Header')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('supports collapsible functionality', () => {
    const onCollapsedChange = jest.fn();
    render(
      <Sidebar collapsible collapsed={false} onCollapsedChange={onCollapsedChange}>
        <Sidebar.Content>Content</Sidebar.Content>
      </Sidebar>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies different sides', () => {
    const sides = ['left', 'right'] as const;
    sides.forEach(side => {
      const { container } = render(
        <Sidebar side={side}>
          <Sidebar.Content>Content</Sidebar.Content>
        </Sidebar>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different variants', () => {
    const variants = ['default', 'floating', 'inset'] as const;
    variants.forEach(variant => {
      const { container } = render(
        <Sidebar variant={variant}>
          <Sidebar.Content>Content</Sidebar.Content>
        </Sidebar>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('renders sidebar groups', () => {
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>Home</Sidebar.MenuItem>
                <Sidebar.MenuItem>About</Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>
    );
    
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders menu items with active state', () => {
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton isActive>Active Item</Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>Inactive Item</Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar>
    );
    
    expect(screen.getByText('Active Item')).toBeInTheDocument();
    expect(screen.getByText('Inactive Item')).toBeInTheDocument();
  });

  it('renders menu items with icons', () => {
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton icon={<span>🏠</span>}>
                Home
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar>
    );
    
    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('handles menu item clicks', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem onClick={handleClick}>
              Click me
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar>
    );
    
    await user.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders nested menu structure', () => {
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Main</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>Dashboard</Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>Profile</Sidebar.MenuItem>
                <Sidebar.MenuItem>Security</Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>
    );
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Sidebar className="custom-sidebar">
        <Sidebar.Content>Content</Sidebar.Content>
      </Sidebar>
    );
    expect(container.firstChild).toHaveClass('custom-sidebar');
  });

  it('renders with multiple groups', () => {
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>Item 1</Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>Item 2</Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>
    );
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders complex sidebar structure', () => {
    render(
      <Sidebar collapsible>
        <Sidebar.Header>
          <h2>My App</h2>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Main Menu</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton icon={<span>🏠</span>} isActive>
                    Dashboard
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton icon={<span>📊</span>}>
                    Analytics
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton icon={<span>⚙️</span>}>
                    Preferences
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <div>v1.0.0</div>
        </Sidebar.Footer>
      </Sidebar>
    );
    
    expect(screen.getByText('My App')).toBeInTheDocument();
    expect(screen.getByText('Main Menu')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Preferences')).toBeInTheDocument();
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
  });
});