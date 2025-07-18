import { createContext, forwardRef, HTMLAttributes, useContext, useState, useId, ReactNode } from 'react'
import { clsx } from 'clsx'
import styles from './Accordion.module.css'

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** Type of accordion behavior */
  type?: 'single' | 'multiple'
  /** For single type: whether an item can be collapsed */
  collapsible?: boolean
  /** Default open items (for controlled) */
  defaultValue?: string | string[]
  /** Controlled value */
  value?: string | string[]
  /** Callback when value changes */
  onValueChange?: (value: string | string[]) => void
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Visual variant */
  variant?: 'default' | 'brutal' | 'outline'
  /** Disabled state */
  disabled?: boolean
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique value for this item */
  value: string
  /** Whether this item is disabled */
  disabled?: boolean
}

export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /** Custom icon to display */
  icon?: ReactNode
  /** Hide the default chevron icon */
  hideIcon?: boolean
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Content to display when expanded */
  children: ReactNode
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
          className={clsx(
            styles.accordion,
            styles[size],
            styles[variant],
            {
              [styles.disabled]: disabled,
            },
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, value, disabled: itemDisabled = false, ...props }, ref) => {
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
          className={clsx(
            styles.item,
            {
              [styles.open]: isOpen,
              [styles.disabled]: disabled,
            },
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  }
)

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, icon, hideIcon = false, onClick, ...props }, ref) => {
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

    return (
      <button
        ref={ref}
        id={triggerId}
        type="button"
        className={clsx(
          styles.trigger,
          {
            [styles.open]: isOpen,
            [styles.disabled]: disabled,
          },
          className
        )}
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
  ({ children, className, ...props }, ref) => {
    const itemContext = useContext(AccordionItemContext)
    
    if (!itemContext) {
      throw new Error('AccordionContent must be used within an AccordionItem')
    }

    const { isOpen, contentId, triggerId } = itemContext

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={clsx(
          styles.content,
          {
            [styles.open]: isOpen,
          },
          className
        )}
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