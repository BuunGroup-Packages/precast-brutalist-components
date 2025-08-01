/**
 * @module Accordion
 * @description A collapsible content component that allows users to toggle the visibility of sections. Supports single and multiple selection modes with smooth animations and full keyboard navigation.
 */

import { createContext, forwardRef, HTMLAttributes, useContext, useState, useId, ReactNode, CSSProperties } from 'react'
import { clsx } from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './Accordion.module.css'

/**
 * Props for the Accordion component
 */
export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Determines whether only one item can be open at a time ('single') or multiple items can be open ('multiple')
   * @default 'single'
   */
  type?: 'single' | 'multiple'
  
  /**
   * For single type: whether the currently open item can be collapsed by clicking it again
   * @default false
   */
  collapsible?: boolean
  
  /**
   * Default open items (for uncontrolled usage). String for single type, array for multiple type
   */
  defaultValue?: string | string[]
  
  /**
   * Controlled value. String for single type, array for multiple type
   */
  value?: string | string[]
  
  /**
   * Callback function called when the open state changes
   */
  onValueChange?: (value: string | string[]) => void
  
  /**
   * Size variant for the accordion
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Visual style variant for the accordion
   * @default 'default'
   */
  variant?: 'default' | 'brutal' | 'outline'
  
  /**
   * Whether the entire accordion is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Custom CSS styles (supports utility classes)
   */
  style?: CSSProperties
}

/**
 * Props for the AccordionItem component
 */
export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Unique identifier for this accordion item
   */
  value: string
  
  /**
   * Whether this specific item is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Custom CSS styles (supports utility classes)
   */
  style?: CSSProperties
}

/**
 * Props for the AccordionTrigger component
 */
export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Custom icon element to display instead of the default chevron
   */
  icon?: ReactNode
  
  /**
   * Whether to hide the default chevron icon completely
   * @default false
   */
  hideIcon?: boolean

  /**
   * Custom CSS styles (supports utility classes)
   */
  style?: CSSProperties
}

/**
 * Props for the AccordionContent component
 */
export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content to display when the accordion item is expanded
   */
  children: ReactNode

  /**
   * Custom CSS styles (supports utility classes)
   */
  style?: CSSProperties
}

// Context for accordion state
interface AccordionContextValue {
  type: 'single' | 'multiple'
  value: string | string[]
  onValueChange: (value: string | string[]) => void
  size: 'sm' | 'md' | 'lg'
  variant: 'default' | 'brutal' | 'outline'
  disabled: boolean
  collapsible: boolean
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

// Context for accordion item
interface AccordionItemContextValue {
  value: string
  isOpen: boolean
  disabled: boolean
  toggle: () => void
  triggerId: string
  contentId: string
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null)

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      className,
      style,
      type = 'single',
      collapsible = false,
      defaultValue,
      value: controlledValue,
      onValueChange,
      size = 'md',
      variant = 'default',
      disabled = false,
      ...props
    },
    ref
  ) => {
    // Initialize internal state
    const [internalValue, setInternalValue] = useState<string | string[]>(() => {
      if (controlledValue !== undefined) return controlledValue
      if (defaultValue !== undefined) return defaultValue
      return type === 'multiple' ? [] : ''
    })

    const value = controlledValue !== undefined ? controlledValue : internalValue

    const handleValueChange = (newValue: string | string[]) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.accordion,
        styles[size],
        styles[variant],
        {
          [styles.disabled]: disabled,
        }
      )
    })

    return (
      <AccordionContext.Provider
        value={{
          type,
          value,
          onValueChange: handleValueChange,
          size,
          variant,
          disabled,
          collapsible,
        }}
      >
        <div
          ref={ref}
          className={processedClassName}
          style={processedStyle}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, style, value, disabled: itemDisabled = false, ...props }, ref) => {
    const context = useContext(AccordionContext)
    if (!context) {
      throw new Error('AccordionItem must be used within an Accordion')
    }

    const { type, value: accordionValue, onValueChange, disabled: accordionDisabled } = context
    const disabled = accordionDisabled || itemDisabled

    // Generate unique IDs for accessibility
    const baseId = useId()
    const triggerId = `${baseId}-trigger`
    const contentId = `${baseId}-content`

    // Determine if this item is open
    const isOpen = type === 'multiple' 
      ? Array.isArray(accordionValue) && accordionValue.includes(value)
      : accordionValue === value

    const toggle = () => {
      if (disabled) return

      if (type === 'multiple') {
        const currentValue = Array.isArray(accordionValue) ? accordionValue : []
        const newValue = isOpen
          ? currentValue.filter(v => v !== value)
          : [...currentValue, value]
        onValueChange(newValue)
      } else {
        const newValue = isOpen && context.collapsible ? '' : value
        onValueChange(newValue)
      }
    }

    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.item,
        {
          [styles.open]: isOpen,
          [styles.disabled]: disabled,
        }
      )
    })

    return (
      <AccordionItemContext.Provider
        value={{
          value,
          isOpen,
          disabled,
          toggle,
          triggerId,
          contentId,
        }}
      >
        <div
          ref={ref}
          className={processedClassName}
          style={processedStyle}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  }
)

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, style, icon, hideIcon = false, onClick, ...props }, ref) => {
    const itemContext = useContext(AccordionItemContext)
    const accordionContext = useContext(AccordionContext)
    
    if (!itemContext || !accordionContext) {
      throw new Error('AccordionTrigger must be used within an AccordionItem')
    }

    const { isOpen, disabled, toggle, triggerId, contentId } = itemContext

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      toggle()
      onClick?.(event)
    }

    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.trigger,
        {
          [styles.open]: isOpen,
          [styles.disabled]: disabled,
        }
      )
    })

    return (
      <button
        ref={ref}
        id={triggerId}
        type="button"
        className={processedClassName}
        style={processedStyle}
        onClick={handleClick}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={contentId}
        {...props}
      >
        <span className={styles.triggerText}>{children}</span>
        {!hideIcon && (
          <span 
            className={clsx(styles.triggerIcon, {
              [styles.rotated]: isOpen
            })}
          >
            {icon || <DefaultChevronIcon />}
          </span>
        )}
      </button>
    )
  }
)

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, style, ...props }, ref) => {
    const itemContext = useContext(AccordionItemContext)
    
    if (!itemContext) {
      throw new Error('AccordionContent must be used within an AccordionItem')
    }

    const { isOpen, contentId, triggerId } = itemContext

    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.content,
        {
          [styles.open]: isOpen,
        }
      )
    })

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={processedClassName}
        style={processedStyle}
        {...props}
      >
        <div className={styles.contentInner}>
          {children}
        </div>
      </div>
    )
  }
)

// Default chevron icon
const DefaultChevronIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
)

Accordion.displayName = 'Accordion'
AccordionItem.displayName = 'Accordion.Item'
AccordionTrigger.displayName = 'Accordion.Trigger'
AccordionContent.displayName = 'Accordion.Content'

// Compound component
const AccordionComponent = Accordion as typeof Accordion & {
  Item: typeof AccordionItem
  Trigger: typeof AccordionTrigger
  Content: typeof AccordionContent
}

AccordionComponent.Item = AccordionItem
AccordionComponent.Trigger = AccordionTrigger
AccordionComponent.Content = AccordionContent

export { AccordionComponent as Accordion }