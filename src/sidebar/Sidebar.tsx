import React, { forwardRef, HTMLAttributes, createContext, useContext } from 'react'
import { clsx } from 'clsx'
import styles from './Sidebar.module.css'

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the sidebar is collapsible */
  collapsible?: boolean
  /** Whether the sidebar is collapsed */
  collapsed?: boolean
  /** Callback when collapse state changes */
  onCollapsedChange?: (collapsed: boolean) => void
  /** Sidebar position */
  side?: 'left' | 'right'
  /** Sidebar variant */
  variant?: 'default' | 'floating' | 'inset'
  /** Additional CSS classes */
  className?: string
}

export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string
}

export interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string
}

export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string
}

export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string
}

export interface SidebarGroupLabelProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string
}

export interface SidebarGroupContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string
}

export interface SidebarMenuProps extends HTMLAttributes<HTMLUListElement> {
  /** Additional CSS classes */
  className?: string
}

export interface SidebarMenuItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Additional CSS classes */
  className?: string
}

export interface SidebarMenuButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** Whether the menu item is active */
  isActive?: boolean
  /** Icon to display */
  icon?: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

interface SidebarContextValue {
  collapsed: boolean
  collapsible: boolean
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      collapsible = false,
      collapsed = false,
      onCollapsedChange: _onCollapsedChange,
      side = 'left',
      variant = 'default',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const contextValue: SidebarContextValue = {
      collapsed,
      collapsible,
    }

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={clsx(
            styles.sidebar,
            styles[side],
            styles[variant],
            {
              [styles.collapsed]: collapsed,
              [styles.collapsible]: collapsible,
            },
            className
          )}
          data-sidebar="sidebar"
          data-collapsed={collapsed}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }
)

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.header, className)}
        data-sidebar="header"
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.content, className)}
        data-sidebar="content"
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.footer, className)}
        data-sidebar="footer"
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.group, className)}
        data-sidebar="group"
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const SidebarGroupLabel = forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.groupLabel, className)}
        data-sidebar="group-label"
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const SidebarGroupContent = forwardRef<HTMLDivElement, SidebarGroupContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.groupContent, className)}
        data-sidebar="group-content"
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const SidebarMenu = forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={clsx(styles.menu, className)}
        data-sidebar="menu"
        {...props}
      >
        {children}
      </ul>
    )
  }
)

export const SidebarMenuItem = forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={clsx(styles.menuItem, className)}
        data-sidebar="menu-item"
        {...props}
      >
        {children}
      </li>
    )
  }
)

export const SidebarMenuButton = forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ isActive = false, icon, className, children, ...props }, ref) => {
    const context = useContext(SidebarContext)

    return (
      <button
        ref={ref}
        className={clsx(
          styles.menuButton,
          {
            [styles.active]: isActive,
            [styles.withIcon]: !!icon,
          },
          className
        )}
        data-sidebar="menu-button"
        data-active={isActive}
        {...props}
      >
        {icon && (
          <span className={styles.icon} data-sidebar="icon">
            {icon}
          </span>
        )}
        {(!context?.collapsed || !context?.collapsible) && (
          <span className={styles.text} data-sidebar="text">
            {children}
          </span>
        )}
      </button>
    )
  }
)

// Hook to use sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a Sidebar component')
  }
  return context
}

// Display names
Sidebar.displayName = 'Sidebar'
SidebarHeader.displayName = 'SidebarHeader'
SidebarContent.displayName = 'SidebarContent'
SidebarFooter.displayName = 'SidebarFooter'
SidebarGroup.displayName = 'SidebarGroup'
SidebarGroupLabel.displayName = 'SidebarGroupLabel'
SidebarGroupContent.displayName = 'SidebarGroupContent'
SidebarMenu.displayName = 'SidebarMenu'
SidebarMenuItem.displayName = 'SidebarMenuItem'
SidebarMenuButton.displayName = 'SidebarMenuButton'

// Attach subcomponents
const SidebarNamespace = Object.assign(Sidebar, {
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  GroupContent: SidebarGroupContent,
  Menu: SidebarMenu,
  MenuItem: SidebarMenuItem,
  MenuButton: SidebarMenuButton,
})

export default SidebarNamespace