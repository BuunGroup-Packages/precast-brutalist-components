import React, { forwardRef, createContext, useContext } from 'react'
import clsx from 'clsx'
import styles from './Chart.module.css'

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'brutal' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  showBorder?: boolean
  showShadow?: boolean
  showGrid?: boolean
  aspectRatio?: string
  height?: number | string
}

interface ChartContextValue {
  variant?: 'default' | 'brutal' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  showGrid?: boolean
}

const ChartContext = createContext<ChartContextValue | null>(null)

const useChart = () => {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error('Chart components must be used within a Chart')
  }
  return context
}

const Chart = forwardRef<HTMLDivElement, ChartProps>(
  ({ 
    variant = 'default',
    size = 'md',
    showBorder = true,
    showShadow = true,
    showGrid = true,
    aspectRatio = '16/9',
    height,
    children,
    className,
    style,
    ...props
  }, ref) => {
    const chartStyle: React.CSSProperties = {
      ...style,
      height: height,
      aspectRatio: !height ? aspectRatio : undefined
    }

    return (
      <ChartContext.Provider value={{ variant, size, showGrid }}>
        <div
          ref={ref}
          className={clsx(
            styles.chart,
            styles[`chart-${size}`],
            styles[`chart-${variant}`],
            !showBorder && styles.noBorder,
            !showShadow && styles.noShadow,
            className
          )}
          style={chartStyle}
          data-variant={variant}
          data-size={size}
          role="img"
          aria-label="Chart container"
          {...props}
        >
          {children}
        </div>
      </ChartContext.Provider>
    )
  }
)

interface ChartHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const ChartHeader = forwardRef<HTMLDivElement, ChartHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.chartHeader, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

interface ChartTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
}

const ChartTitle = forwardRef<HTMLHeadingElement, ChartTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={clsx(styles.chartTitle, className)}
        {...props}
      >
        {children}
      </h3>
    )
  }
)

interface ChartSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
}

const ChartSubtitle = forwardRef<HTMLParagraphElement, ChartSubtitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={clsx(styles.chartSubtitle, className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)

interface ChartContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const ChartContent = forwardRef<HTMLDivElement, ChartContentProps>(
  ({ children, className, ...props }, ref) => {
    const { showGrid } = useChart()
    
    return (
      <div
        ref={ref}
        className={clsx(styles.chartContent, className)}
        {...props}
      >
        <div className={styles.chartWrapper}>
          {showGrid && <div className={styles.chartGrid} aria-hidden="true" />}
          <div className={styles.chartContainer}>
            {children}
          </div>
        </div>
      </div>
    )
  }
)

interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'top' | 'bottom' | 'left' | 'right'
  children?: React.ReactNode
}

const ChartLegend = forwardRef<HTMLDivElement, ChartLegendProps>(
  ({ position = 'bottom', children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.chartLegend,
          styles[`legend-${position}`],
          className
        )}
        role="group"
        aria-label="Chart legend"
        {...props}
      >
        {children}
      </div>
    )
  }
)

interface ChartFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const ChartFooter = forwardRef<HTMLDivElement, ChartFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.chartFooter, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Component display names
Chart.displayName = 'Chart'
ChartHeader.displayName = 'ChartHeader'
ChartTitle.displayName = 'ChartTitle'
ChartSubtitle.displayName = 'ChartSubtitle'
ChartContent.displayName = 'ChartContent'
ChartLegend.displayName = 'ChartLegend'
ChartFooter.displayName = 'ChartFooter'

// Compound component pattern
const ChartComponent = Object.assign(Chart, {
  Header: ChartHeader,
  Title: ChartTitle,
  Subtitle: ChartSubtitle,
  Content: ChartContent,
  Legend: ChartLegend,
  Footer: ChartFooter
})

export { ChartComponent as Chart }
export type {
  ChartProps,
  ChartHeaderProps,
  ChartTitleProps,
  ChartSubtitleProps,
  ChartContentProps,
  ChartLegendProps,
  ChartFooterProps
}