/**
 * @module Command
 * @description A command palette component for building searchable, keyboard-navigable menus. Inspired by command palettes in modern applications with compound components for flexible composition.
 */

import React, { forwardRef, useState, useRef, useEffect, ReactNode, KeyboardEvent, useMemo, useCallback, CSSProperties } from 'react'
import { clsx } from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './Command.module.css'

// Context for compound components
const CommandContext = React.createContext<{
  search: string
  setSearch: (search: string) => void
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  items: CommandItemData[]
  setItems: React.Dispatch<React.SetStateAction<CommandItemData[]>>
  onSelect?: (value: string) => void
  visibleCount: number
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>
} | null>(null)

const useCommand = () => {
  const context = React.useContext(CommandContext)
  if (!context) {
    throw new Error('Command components must be used within a Command')
  }
  return context
}

interface CommandItemData {
  value: string
  keywords?: string[]
  disabled?: boolean
}

/**
 * Props for the Command component
 */
export interface CommandProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * The content of the command palette (typically Command.Input, Command.List, etc.)
   */
  children: ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom inline styles (supports utility classes)
   */
  style?: CSSProperties
  
  /**
   * Callback fired when an item is selected
   */
  onSelect?: (value: string) => void
  
  /**
   * Default search value when uncontrolled
   * @default ''
   */
  defaultValue?: string
  
  /**
   * Controlled search value
   */
  value?: string
  
  /**
   * Callback fired when the search value changes
   */
  onValueChange?: (value: string) => void
  
  /**
   * Custom filter function for matching items
   */
  filter?: (value: string, search: string, keywords?: string[]) => number
  
  /**
   * Whether to filter items based on search input
   * @default true
   */
  shouldFilter?: boolean
  
  /**
   * Placeholder text for the search input
   */
  placeholder?: string
}

/**
 * A command palette component for searchable, keyboard-navigable menus.
 * Provides a flexible structure for building command interfaces with filtering and grouping.
 * 
 * @example
 * ```tsx
 * <Command onSelect={(value) => console.log(value)}>
 *   <Command.Input placeholder="Type a command..." />
 *   <Command.List>
 *     <Command.Empty>No results found.</Command.Empty>
 *     <Command.Group heading="Suggestions">
 *       <Command.Item value="profile">Profile</Command.Item>
 *       <Command.Item value="settings">Settings</Command.Item>
 *     </Command.Group>
 *   </Command.List>
 * </Command>
 * ```
 */
export const Command: React.FC<CommandProps> & {
  Input: typeof CommandInput
  List: typeof CommandList
  Empty: typeof CommandEmpty
  Group: typeof CommandGroup
  Item: typeof CommandItem
  Separator: typeof CommandSeparator
} = ({
  children,
  className,
  style,
  onSelect,
  defaultValue = '',
  value: controlledValue,
  onValueChange,
  filter: _filter,
  shouldFilter = true, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...props
}) => {
  const [search, setSearch] = useState(defaultValue)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [items, setItems] = useState<CommandItemData[]>([])
  const [visibleCount, setVisibleCount] = useState(0)
  const isControlled = controlledValue !== undefined
  
  // Process utility classes
  const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
    className,
    style,
    componentClasses: styles.command
  })

  const currentSearch = isControlled ? controlledValue : search

  const handleSearchChange = useCallback((newSearch: string) => {
    if (!isControlled) {
      setSearch(newSearch)
    }
    onValueChange?.(newSearch)
    setSelectedIndex(0)
  }, [isControlled, onValueChange])

  // Default filter function and custom filter are available for future use
  // They can be implemented when needed for custom filtering logic

  const contextValue = useMemo(() => ({
    search: currentSearch,
    setSearch: handleSearchChange,
    selectedIndex,
    setSelectedIndex,
    items,
    setItems,
    onSelect,
    visibleCount,
    setVisibleCount
  }), [currentSearch, handleSearchChange, selectedIndex, items, onSelect, visibleCount])

  return (
    <CommandContext.Provider value={contextValue}>
      <div
        className={processedClassName}
        style={processedStyle}
        {...props}
      >
        {children}
      </div>
    </CommandContext.Provider>
  )
}

/**
 * Props for the Command.Input component
 */
export interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom inline styles (supports utility classes)
   */
  style?: CSSProperties
}

/**
 * Search input for the command palette.
 * Handles keyboard navigation and filtering of command items.
 */
const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, style, ...props }, ref) => {
    const { search, setSearch, selectedIndex, setSelectedIndex, items, onSelect } = useCommand()
    
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.input
    })

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(Math.min(selectedIndex + 1, items.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(Math.max(selectedIndex - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (items[selectedIndex] && !items[selectedIndex].disabled) {
            onSelect?.(items[selectedIndex].value)
          }
          break
        case 'Escape':
          e.preventDefault()
          setSearch('')
          break
      }
      props.onKeyDown?.(e)
    }

    return (
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          className={processedClassName}
          style={processedStyle}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          {...props}
        />
      </div>
    )
  }
)

CommandInput.displayName = 'CommandInput'

/**
 * Props for the Command.List component
 */
export interface CommandListProps {
  /**
   * Command items and groups to display
   */
  children: ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
}

/**
 * Container for command items and groups.
 * Provides scrollable area for the command options.
 */
const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.list, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CommandList.displayName = 'CommandList'

/**
 * Props for the Command.Empty component
 */
export interface CommandEmptyProps {
  /**
   * Content to show when no results are found
   */
  children: ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
}

/**
 * Placeholder content shown when no command items match the search.
 * Only visible when search is active and no results are found.
 */
const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ children, className, ...props }, ref) => {
    const { visibleCount, search } = useCommand()
    
    if (visibleCount > 0 || !search) return null
    
    return (
      <div
        ref={ref}
        className={clsx(styles.empty, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CommandEmpty.displayName = 'CommandEmpty'

/**
 * Props for the Command.Group component
 */
export interface CommandGroupProps {
  /**
   * Command items within this group
   */
  children: ReactNode
  
  /**
   * Optional heading text for the group
   */
  heading?: string
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
}

/**
 * Groups related command items together with an optional heading.
 * Useful for organizing commands by category or type.
 */
const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ children, heading, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.group, className)}
        {...props}
      >
        {heading && (
          <div className={styles.groupHeading}>
            {heading}
          </div>
        )}
        <div className={styles.groupItems}>
          {children}
        </div>
      </div>
    )
  }
)

CommandGroup.displayName = 'CommandGroup'

/**
 * Props for the Command.Item component
 */
export interface CommandItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * The content to display for this command
   */
  children: ReactNode
  
  /**
   * The value to return when this item is selected
   */
  value: string
  
  /**
   * Additional keywords to match during search
   * @default []
   */
  keywords?: string[]
  
  /**
   * Whether this item is disabled and cannot be selected
   * @default false
   */
  disabled?: boolean
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Callback fired when this specific item is selected
   */
  onSelect?: (value: string) => void
}

/**
 * Individual command option within the palette.
 * Supports keyboard navigation and search filtering.
 */
const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ children, value, keywords = [], disabled = false, className, onSelect: onItemSelect, ...props }, ref) => {
    const { search, selectedIndex, setItems, onSelect, setVisibleCount } = useCommand()
    const itemIndex = useRef<number>(-1)
    const isMounted = useRef(false)

    // Register item with command context
    useEffect(() => {
      isMounted.current = true
      const item: CommandItemData = { value, keywords, disabled }
      setItems((prev: CommandItemData[]) => {
        const newItems = [...prev, item]
        itemIndex.current = newItems.length - 1
        return newItems
      })

      return () => {
        isMounted.current = false
        // Use setTimeout to avoid state update during render
        setTimeout(() => {
          if (!isMounted.current) {
            setItems((prev: CommandItemData[]) => prev.filter((prevItem: CommandItemData) => prevItem.value !== value))
          }
        }, 0)
      }
    }, [value, keywords, disabled])

    const isSelected = itemIndex.current === selectedIndex

    const handleClick = () => {
      if (!disabled) {
        onItemSelect?.(value)
        onSelect?.(value)
      }
    }

    const handleMouseEnter = () => {
      if (!disabled && itemIndex.current >= 0) {
        // setSelectedIndex(itemIndex.current)
      }
    }

    // Filter logic
    const shouldShow = React.useMemo(() => {
      if (!search) return true
      
      const searchLower = search.toLowerCase()
      const valueLower = value.toLowerCase()
      
      if (valueLower.includes(searchLower)) return true
      
      return keywords.some(keyword => 
        keyword.toLowerCase().includes(searchLower)
      )
    }, [search, value, keywords])

    // Update visible count when visibility changes
    useEffect(() => {
      if (shouldShow) {
        setVisibleCount(prev => prev + 1)
        return () => setVisibleCount(prev => prev - 1)
      }
    }, [shouldShow])

    if (!shouldShow) return null

    return (
      <div
        ref={ref}
        className={clsx(
          styles.item,
          {
            [styles.itemSelected]: isSelected,
            [styles.itemDisabled]: disabled
          },
          className
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        data-value={value}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CommandItem.displayName = 'CommandItem'

/**
 * Props for the Command.Separator component
 */
export interface CommandSeparatorProps {
  /**
   * Additional CSS class name for styling
   */
  className?: string
}

/**
 * Visual separator between command groups or items.
 * Helps organize and structure the command palette visually.
 */
const CommandSeparator = forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.separator, className)}
        role="separator"
        {...props}
      />
    )
  }
)

CommandSeparator.displayName = 'CommandSeparator'

// Attach compound components
Command.Input = CommandInput
Command.List = CommandList
Command.Empty = CommandEmpty
Command.Group = CommandGroup
Command.Item = CommandItem
Command.Separator = CommandSeparator

export { CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator }