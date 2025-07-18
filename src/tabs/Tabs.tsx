import React, { forwardRef, HTMLAttributes, useState, useCallback, createContext, useContext } from 'react'
import { clsx } from 'clsx'
import styles from './Tabs.module.css'

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** The default active tab */
  defaultValue?: string
  /** The controlled active tab */
  value?: string
  /** Callback when active tab changes */
  onValueChange?: (value: string) => void
  /** Orientation of the tabs */
  orientation?: 'horizontal' | 'vertical'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Whether tabs should be full width */
  fullWidth?: boolean
  /** Additional CSS classes */
  className?: string
}

interface TabsContextValue {
  activeTab: string
  setActiveTab: (value: string) => void
  orientation: 'horizontal' | 'vertical'
  size: 'sm' | 'md' | 'lg'
}

const TabsContext = createContext<TabsContextValue | null>(null)

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue = '',
      value: controlledValue,
      onValueChange,
      orientation = 'horizontal',
      size = 'md',
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const activeTab = controlledValue !== undefined ? controlledValue : internalValue

    const setActiveTab = useCallback((newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }, [controlledValue, onValueChange])

    const contextValue: TabsContextValue = {
      activeTab,
      setActiveTab,
      orientation,
      size,
    }

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={clsx(
            styles.tabs,
            styles[orientation],
            styles[size],
            {
              [styles.fullWidth]: fullWidth,
            },
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)

// Tabs List container
interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(TabsContext)
    if (!context) {
      throw new Error('TabsList must be used within Tabs')
    }

    return (
      <div
        ref={ref}
        className={clsx(
          styles.list,
          styles[context.orientation],
          className
        )}
        role="tablist"
        aria-orientation={context.orientation}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Tab Trigger
interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /** The value of the tab */
  value: string
  /** Whether the tab is disabled */
  disabled?: boolean
  /** Additional CSS classes */
  className?: string
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled, className, children, onClick, ...props }, ref) => {
    const context = useContext(TabsContext)
    if (!context) {
      throw new Error('TabsTrigger must be used within Tabs')
    }

    const isActive = context.activeTab === value

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        context.setActiveTab(value)
        onClick?.(e)
      }
    }

    return (
      <button
        ref={ref}
        className={clsx(
          styles.trigger,
          styles[context.size],
          {
            [styles.active]: isActive,
            [styles.disabled]: disabled,
          },
          className
        )}
        role="tab"
        aria-selected={isActive}
        aria-controls={`tabpanel-${value}`}
        id={`tab-${value}`}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    )
  }
)

// Tab Content
interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /** The value of the tab */
  value: string
  /** Whether to force mount the content */
  forceMount?: boolean
  /** Additional CSS classes */
  className?: string
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, forceMount = false, className, children, ...props }, ref) => {
    const context = useContext(TabsContext)
    if (!context) {
      throw new Error('TabsContent must be used within Tabs')
    }

    const isActive = context.activeTab === value

    if (!isActive && !forceMount) {
      return null
    }

    return (
      <div
        ref={ref}
        className={clsx(
          styles.content,
          {
            [styles.active]: isActive,
            [styles.inactive]: !isActive,
          },
          className
        )}
        role="tabpanel"
        aria-labelledby={`tab-${value}`}
        id={`tabpanel-${value}`}
        tabIndex={0}
        hidden={!isActive}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Hook to use tabs context
export const useTabs = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('useTabs must be used within Tabs')
  }
  return context
}

// Display names
Tabs.displayName = 'Tabs'
TabsList.displayName = 'TabsList'
TabsTrigger.displayName = 'TabsTrigger'
TabsContent.displayName = 'TabsContent'

// Attach subcomponents
const TabsNamespace = Object.assign(Tabs, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
})

export default TabsNamespace