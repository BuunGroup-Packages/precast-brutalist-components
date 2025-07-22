/**
 * @module Chart
 * @description A comprehensive chart container component that provides structure and styling for data visualizations. Includes compound components for headers, legends, and content areas.
 */

import React, { forwardRef, createContext, useContext } from 'react'
import clsx from 'clsx'
import styles from './Chart.module.css'

/**
 * Props for the Chart component
 */
interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The visual style variant of the chart
   * @default 'default'
   */
  variant?: 'default' | 'brutal' | 'outline'
  
  /**
   * The size of the chart
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Whether to show a border around the chart
   * @default true
   */
  showBorder?: boolean
  
  /**
   * Whether to apply the brutalist shadow effect
   * @default true
   */
  showShadow?: boolean
  
  /**
   * Whether to display a background grid in the chart content area
   * @default true
   */
  showGrid?: boolean
  
  /**
   * The aspect ratio of the chart (CSS aspect-ratio value)
   * @default '16/9'
   */
  aspectRatio?: string
  
  /**
   * Fixed height for the chart (overrides aspectRatio)
   */
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

/**
 * A container component for data visualizations.
 * Provides consistent styling and structure for charts with support for headers, legends, and content areas.
 * 
 * @example
 * ```tsx
 * <Chart variant="brutal" size="lg">
 *   <Chart.Header>
 *     <Chart.Title>Sales Overview</Chart.Title>
 *     <Chart.Subtitle>Q4 2023</Chart.Subtitle>
 *   </Chart.Header>
 *   <Chart.Content>
 *     <MyChartComponent data={data} />
 *   </Chart.Content>
 *   <Chart.Legend position="bottom">
 *     <LegendItems />
 *   </Chart.Legend>
 * </Chart>
 * ```
 */
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

/**
 * Props for the Chart.Header component
 */
interface ChartHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The header content (typically Chart.Title and Chart.Subtitle)
   */
  children?: React.ReactNode
}

/**
 * Header section of the Chart component.
 * Contains the chart title and optional subtitle.
 */
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

/**
 * Props for the Chart.Title component
 */
interface ChartTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The title text for the chart
   */
  children?: React.ReactNode
}

/**
 * Title component for the chart.
 * Renders as an h3 element with appropriate styling.
 */
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

/**
 * Props for the Chart.Subtitle component
 */
interface ChartSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * The subtitle text for the chart
   */
  children?: React.ReactNode
}

/**
 * Subtitle component for the chart.
 * Provides additional context or time period information.
 */
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

/**
 * Props for the Chart.Content component
 */
interface ChartContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The chart visualization content (e.g., SVG, canvas, or third-party chart library)
   */
  children?: React.ReactNode
}

/**
 * Main content area of the Chart component.
 * Contains the actual chart visualization with optional grid background.
 */
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

/**
 * Props for the Chart.Legend component
 */
interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The position of the legend relative to the chart content
   * @default 'bottom'
   */
  position?: 'top' | 'bottom' | 'left' | 'right'
  
  /**
   * The legend items to display
   */
  children?: React.ReactNode
}

/**
 * Legend component for the chart.
 * Displays color/pattern mappings for data series.
 */
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

/**
 * Props for the Chart.Footer component
 */
interface ChartFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The footer content (typically source information or notes)
   */
  children?: React.ReactNode
}

/**
 * Footer section of the Chart component.
 * Typically contains data source information or additional notes.
 */
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