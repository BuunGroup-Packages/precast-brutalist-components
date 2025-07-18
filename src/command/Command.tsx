import React, { forwardRef, useState, useRef, useEffect, ReactNode, KeyboardEvent } from 'react'
import { clsx } from 'clsx'
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

export interface CommandProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  children: ReactNode
  className?: string
  onSelect?: (value: string) => void
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  filter?: (value: string, search: string, keywords?: string[]) => number
  shouldFilter?: boolean
  placeholder?: string
}

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
  onSelect,
  defaultValue = '',
  value: controlledValue,
  onValueChange,
  filter,
  shouldFilter = true, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...props
}) => {
  const [search, setSearch] = useState(defaultValue)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [items, setItems] = useState<CommandItemData[]>([])
  const [visibleCount, setVisibleCount] = useState(0)
  const isControlled = controlledValue !== undefined

  const currentSearch = isControlled ? controlledValue : search

  const handleSearchChange = (newSearch: string) => {
    if (!isControlled) {
      setSearch(newSearch)
    }
    onValueChange?.(newSearch)
    setSelectedIndex(0)
  }

  // Default filter function
  const defaultFilter = (value: string, search: string, keywords?: string[]) => {
    const searchLower = search.toLowerCase()
    const valueLower = value.toLowerCase()
    
    if (valueLower.includes(searchLower)) return 1
    
    if (keywords) {
      for (const keyword of keywords) {
        if (keyword.toLowerCase().includes(searchLower)) return 1
      }
    }
    
    return 0
  }

  // Filter function available for potential future use
  filter || defaultFilter

  return (
    <CommandContext.Provider 
      value={{
        search: currentSearch,
        setSearch: handleSearchChange,
        selectedIndex,
        setSelectedIndex,
        items,
        setItems,
        onSelect,
        visibleCount,
        setVisibleCount
      }}
    >
      <div
        className={clsx(styles.command, className)}
        {...props}
      >
        {children}
      </div>
    </CommandContext.Provider>
  )
}

export interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => {
    const { search, setSearch, selectedIndex, setSelectedIndex, items, onSelect } = useCommand()

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
          className={clsx(styles.input, className)}
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

export interface CommandListProps {
  children: ReactNode
  className?: string
}

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

export interface CommandEmptyProps {
  children: ReactNode
  className?: string
}

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

export interface CommandGroupProps {
  children: ReactNode
  heading?: string
  className?: string
}

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

export interface CommandItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  children: ReactNode
  value: string
  keywords?: string[]
  disabled?: boolean
  className?: string
  onSelect?: (value: string) => void
}

const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ children, value, keywords = [], disabled = false, className, onSelect: onItemSelect, ...props }, ref) => {
    const { search, selectedIndex, setItems, onSelect, setVisibleCount } = useCommand()
    const itemIndex = useRef<number>(-1)

    // Register item with command context
    useEffect(() => {
      const item: CommandItemData = { value, keywords, disabled }
      setItems((prev: CommandItemData[]) => {
        const newItems = [...prev, item]
        itemIndex.current = newItems.length - 1
        return newItems
      })

      return () => {
        setItems((prev: CommandItemData[]) => prev.filter((prevItem: CommandItemData) => prevItem.value !== value))
      }
    }, [value, keywords, disabled, setItems])

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
    }, [shouldShow, setVisibleCount])

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

export interface CommandSeparatorProps {
  className?: string
}

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