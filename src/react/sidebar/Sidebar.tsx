/**
 * @module Sidebar
 * @description A comprehensive sidebar navigation component with collapsible functionality, hierarchical menu structure, and multiple layout variants. Features responsive design and accessibility support.
 */

import React, { forwardRef, HTMLAttributes, createContext, useContext, CSSProperties } from 'react'
import { clsx } from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './Sidebar.module.css'

/**
 * Props for the Sidebar component
 */
export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the sidebar can be collapsed and expanded
   * @default false
   */
  collapsible?: boolean
  
  /**
   * Whether the sidebar is currently in collapsed state
   * @default false
   */
  collapsed?: boolean
  
  /**
   * Callback function called when the collapsed state changes
   */
  onCollapsedChange?: (collapsed: boolean) => void
  
  /**
   * Which side of the screen the sidebar should appear on
   * @default 'left'
   */
  side?: 'left' | 'right'
  
  /**
   * Visual style variant for the sidebar
   * @default 'default'
   */
  variant?: 'default' | 'floating' | 'inset'
  
  /**
   * Additional CSS classes to apply to the sidebar
   */
  className?: string
  
  /**
   * Custom inline styles (supports utility classes)
   */
  style?: CSSProperties
}

/**
 * Props for the SidebarHeader component
 */
export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Additional CSS classes to apply to the sidebar header
   */
  className?: string
}

/**
 * Props for the SidebarContent component
 */
export interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Additional CSS classes to apply to the sidebar content
   */
  className?: string
}

/**
 * Props for the SidebarFooter component
 */
export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Additional CSS classes to apply to the sidebar footer
   */
  className?: string
}

/**
 * Props for the SidebarGroup component
 */
export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Additional CSS classes to apply to the sidebar group
   */
  className?: string
}

/**
 * Props for the SidebarGroupLabel component
 */
export interface SidebarGroupLabelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Additional CSS classes to apply to the group label
   */
  className?: string
}

/**
 * Props for the SidebarGroupContent component
 */
export interface SidebarGroupContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Additional CSS classes to apply to the group content
   */
  className?: string
}

/**
 * Props for the SidebarMenu component
 */
export interface SidebarMenuProps extends HTMLAttributes<HTMLUListElement> {
  /**
   * Additional CSS classes to apply to the sidebar menu
   */
  className?: string
}

/**
 * Props for the SidebarMenuItem component
 */
export interface SidebarMenuItemProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Additional CSS classes to apply to the menu item
   */
  className?: string
}

/**
 * Props for the SidebarMenuButton component
 */
export interface SidebarMenuButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Whether this menu item is currently active/selected
   * @default false
   */
  isActive?: boolean
  
  /**
   * Icon element to display alongside the menu button text
   */
  icon?: React.ReactNode
  
  /**
   * Additional CSS classes to apply to the menu button
   */
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
      style,
      children,
      ...props
    },
    ref
  ) => {
    const contextValue: SidebarContextValue = {
      collapsed,
      collapsible,
    }
    
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.sidebar,
        styles[side],
        styles[variant],
        {
          [styles.collapsed]: collapsed,
          [styles.collapsible]: collapsible,
        }
      )
    })

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={processedClassName}
          style={processedStyle}
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
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.header
    })
    
    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        data-sidebar="header"
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.content
    })
    
    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        data-sidebar="content"
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.footer
    })
    
    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        data-sidebar="footer"
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.group
    })
    
    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        data-sidebar="group"
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const SidebarGroupLabel = forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.groupLabel
    })
    
    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        data-sidebar="group-label"
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const SidebarGroupContent = forwardRef<HTMLDivElement, SidebarGroupContentProps>(
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.groupContent
    })
    
    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        data-sidebar="group-content"
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const SidebarMenu = forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.menu
    })
    
    return (
      <ul
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        data-sidebar="menu"
        {...props}
      >
        {children}
      </ul>
    )
  }
)

export const SidebarMenuItem = forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.menuItem
    })
    
    return (
      <li
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        data-sidebar="menu-item"
        {...props}
      >
        {children}
      </li>
    )
  }
)

export const SidebarMenuButton = forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ isActive = false, icon, className, style, children, ...props }, ref) => {
    const context = useContext(SidebarContext)
    
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.menuButton,
        {
          [styles.active]: isActive,
          [styles.withIcon]: !!icon,
        }
      )
    })

    return (
      <button
        ref={ref}
        className={processedClassName}
        style={processedStyle}
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