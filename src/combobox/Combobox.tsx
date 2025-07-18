import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import styles from './Combobox.module.css'

interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  emptyMessage?: string
  searchPlaceholder?: string
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'brutal' | 'outline' | 'info' | 'system' | 'destructive' | 'success' | 'warning' | 'ghost' | 'neon' | 'retro'
  style?: React.CSSProperties
}

interface ComboboxContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  selectedValue: string
  setSelectedValue: (value: string) => void
  searchValue: string
  setSearchValue: (value: string) => void
  options: ComboboxOption[]
  filteredOptions: ComboboxOption[]
  triggerRef: React.RefObject<HTMLButtonElement>
  contentRef: React.RefObject<HTMLDivElement>
  highlightedIndex: number
  setHighlightedIndex: (index: number) => void
  onSelect: (value: string) => void
  placeholder?: string
  emptyMessage?: string
  searchPlaceholder?: string
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null)

const useCombobox = () => {
  const context = useContext(ComboboxContext)
  if (!context) {
    throw new Error('Combobox components must be used within a Combobox')
  }
  return context
}

const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  ({ 
    options = [], 
    value, 
    defaultValue = '', 
    onValueChange, 
    placeholder,
    emptyMessage,
    searchPlaceholder,
    className, 
    children, 
    size = 'md',
    variant = 'default',
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(value ?? defaultValue)
    const [searchValue, setSearchValue] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    
    const triggerRef = useRef<HTMLButtonElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    // Filter options based on search
    const filteredOptions = React.useMemo(() => {
      if (!searchValue) return options
      return options.filter(option => 
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    }, [options, searchValue])

    // Handle value changes
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value)
      }
    }, [value])

    const onSelect = useCallback((optionValue: string) => {
      setSelectedValue(optionValue)
      setIsOpen(false)
      setSearchValue('')
      setHighlightedIndex(-1)
      onValueChange?.(optionValue)
    }, [onValueChange])

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault()
          setIsOpen(true)
          setHighlightedIndex(0)
        }
        return
      }

      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          setHighlightedIndex(-1)
          triggerRef.current?.focus()
          break
        case 'ArrowDown':
          e.preventDefault()
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          )
          break
        case 'Enter':
          e.preventDefault()
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            onSelect(filteredOptions[highlightedIndex].value)
          }
          break
      }
    }, [isOpen, filteredOptions, highlightedIndex, onSelect])

    // Close on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current && 
          !contentRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
          setHighlightedIndex(-1)
        }
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen])

    const contextValue: ComboboxContextValue = {
      isOpen,
      setIsOpen,
      selectedValue,
      setSelectedValue,
      searchValue,
      setSearchValue,
      options,
      filteredOptions,
      triggerRef,
      contentRef,
      highlightedIndex,
      setHighlightedIndex,
      onSelect,
      placeholder,
      emptyMessage,
      searchPlaceholder
    }

    return (
      <ComboboxContext.Provider value={contextValue}>
        <div 
          ref={ref}
          className={clsx(
            styles.combobox,
            styles[`combobox--${size}`],
            styles[`combobox--${variant}`],
            className
          )}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </ComboboxContext.Provider>
    )
  }
)

interface ComboboxTriggerProps {
  children?: React.ReactNode
  className?: string
  placeholder?: string
  icon?: React.ReactNode
}

const ComboboxTrigger = React.forwardRef<HTMLButtonElement, ComboboxTriggerProps>(
  ({ className, placeholder: triggerPlaceholder, icon, ...props }, _ref) => {
    const { isOpen, setIsOpen, selectedValue, options, triggerRef, placeholder: contextPlaceholder } = useCombobox()
    
    const selectedOption = options.find(option => option.value === selectedValue)
    const finalPlaceholder = triggerPlaceholder || contextPlaceholder || 'Select option...'
    
    return (
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={clsx(styles.trigger, className)}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        {icon && <span className={styles.triggerIcon}>{icon}</span>}
        <span className={styles.triggerText}>
          {selectedOption ? selectedOption.label : finalPlaceholder}
        </span>
        <svg 
          className={clsx(styles.triggerArrow, { [styles.triggerArrowOpen]: isOpen })}
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="none"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    )
  }
)

interface ComboboxContentProps {
  children?: React.ReactNode
  className?: string
  searchPlaceholder?: string
  emptyMessage?: string
}

const ComboboxContent = React.forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ 
    children, 
    className, 
    searchPlaceholder: contentSearchPlaceholder, 
    emptyMessage: contentEmptyMessage,
    ...props 
  }, _ref) => {
    const { 
      isOpen, 
      searchValue, 
      setSearchValue, 
      filteredOptions, 
      contentRef,
      triggerRef,
      searchPlaceholder: contextSearchPlaceholder,
      emptyMessage: contextEmptyMessage
    } = useCombobox()
    
    const finalSearchPlaceholder = contentSearchPlaceholder || contextSearchPlaceholder || 'Search options...'
    const finalEmptyMessage = contentEmptyMessage || contextEmptyMessage || 'No options found.'
    
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })
    
    // Position the content relative to trigger and update on scroll/resize
    const updatePosition = useCallback(() => {
      if (isOpen && triggerRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect()
        setPosition({
          top: triggerRect.bottom + 4,
          left: triggerRect.left,
          width: triggerRect.width
        })
      }
    }, [isOpen, triggerRef])

    useEffect(() => {
      updatePosition()
    }, [updatePosition])

    useEffect(() => {
      if (isOpen) {
        const handleUpdate = () => updatePosition()
        window.addEventListener('scroll', handleUpdate, true)
        window.addEventListener('resize', handleUpdate)
        return () => {
          window.removeEventListener('scroll', handleUpdate, true)
          window.removeEventListener('resize', handleUpdate)
        }
      }
    }, [isOpen, updatePosition])

    if (!isOpen) return null

    const content = (
      <div
        ref={contentRef}
        className={clsx(styles.content, className)}
        style={{
          top: position.top,
          left: position.left,
          minWidth: position.width
        }}
        role="listbox"
        {...props}
      >
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={finalSearchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus
          />
        </div>
        
        <div className={styles.optionsList}>
          {filteredOptions.length === 0 ? (
            <div className={styles.emptyMessage}>{finalEmptyMessage}</div>
          ) : (
            children || filteredOptions.map((option) => (
              <ComboboxOption 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </ComboboxOption>
            ))
          )}
        </div>
      </div>
    )

    return createPortal(content, document.body)
  }
)

interface ComboboxOptionProps {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

const ComboboxOption = React.forwardRef<HTMLDivElement, ComboboxOptionProps>(
  ({ value, children, disabled = false, className, ...props }, ref) => {
    const { 
      selectedValue, 
      onSelect, 
      highlightedIndex, 
      setHighlightedIndex,
      filteredOptions 
    } = useCombobox()
    
    const optionIndex = filteredOptions.findIndex(option => option.value === value)
    const isSelected = selectedValue === value
    const isHighlighted = highlightedIndex === optionIndex

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        className={clsx(
          styles.option,
          {
            [styles.optionSelected]: isSelected,
            [styles.optionHighlighted]: isHighlighted,
            [styles.optionDisabled]: disabled
          },
          className
        )}
        onClick={() => !disabled && onSelect(value)}
        onMouseEnter={() => !disabled && setHighlightedIndex(optionIndex)}
        {...props}
      >
        {children}
        {isSelected && (
          <svg 
            className={styles.checkIcon}
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none"
          >
            <path 
              d="M13.5 4.5L6 12L2.5 8.5" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    )
  }
)

// Display names
Combobox.displayName = 'Combobox'
ComboboxTrigger.displayName = 'ComboboxTrigger'
ComboboxContent.displayName = 'ComboboxContent'
ComboboxOption.displayName = 'ComboboxOption'

// Compound component pattern with proper typing
interface ComboboxCompound extends React.ForwardRefExoticComponent<ComboboxProps & React.RefAttributes<HTMLDivElement>> {
  Trigger: typeof ComboboxTrigger
  Content: typeof ComboboxContent
  Option: typeof ComboboxOption
}

const ComboboxWithSubComponents = Combobox as ComboboxCompound
ComboboxWithSubComponents.Trigger = ComboboxTrigger
ComboboxWithSubComponents.Content = ComboboxContent
ComboboxWithSubComponents.Option = ComboboxOption

export { ComboboxWithSubComponents as Combobox }
export type { 
  ComboboxProps, 
  ComboboxOption, 
  ComboboxTriggerProps, 
  ComboboxContentProps, 
  ComboboxOptionProps 
}