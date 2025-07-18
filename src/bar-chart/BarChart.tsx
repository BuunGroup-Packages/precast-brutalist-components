import React from 'react'
import styles from './BarChart.module.css'
import { Tooltip } from '../tooltip'

// Define TypeScript interfaces
interface BarChartDataPoint {
  label: string
  value: number
  color?: string
}

interface BarChartProps {
  data: BarChartDataPoint[]
  title?: string
  subtitle?: string
  height?: number
  showValues?: boolean
  showGrid?: boolean
  animated?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal' | 'brutal'
  showContainer?: boolean
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double'
  className?: string
  style?: React.CSSProperties
}

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  ({ 
    data,
    title,
    subtitle,
    height = 300,
    showValues = true,
    showGrid = true,
    animated = true,
    size = 'md',
    variant = 'default',
    showContainer = false,
    borderStyle = 'solid',
    className,
    style,
    ...props 
  }, ref) => {
    
    if (!data || data.length === 0) {
      return (
        <div 
          ref={ref} 
          className={`${styles.barChart} ${styles.empty} ${className || ''}`}
          data-size={size}
          data-variant={variant}
          style={style}
          {...props}
        >
          <div className={styles.emptyState}>
            <span className={styles.emptyText}>NO DATA AVAILABLE</span>
          </div>
        </div>
      )
    }

    const maxValue = Math.max(...data.map(d => d.value))
    
    // Calculate dynamic heights based on size
    const sizeConfig = {
      sm: { headerHeight: 50, footerHeight: 40, padding: 12 },
      md: { headerHeight: 70, footerHeight: 50, padding: 16 },
      lg: { headerHeight: 90, footerHeight: 60, padding: 24 }
    }
    
    const config = sizeConfig[size]
    const headerHeight = (title || subtitle) ? config.headerHeight : 0
    const actualChartHeight = height - headerHeight - config.footerHeight

    // Default colors using CSS custom properties for theme support
    const defaultColors = [
      'var(--brutal-accent)',
      'var(--brutal-blue)',
      'var(--brutal-green)', 
      'var(--brutal-yellow)', 
      'var(--brutal-red)',
      'var(--brutal-orange)',
      'var(--brutal-purple)'
    ]

    return (
      <div 
        ref={ref} 
        className={`${styles.barChart} ${className || ''}`}
        data-size={size}
        data-variant={variant}
        data-animated={animated}
        data-show-grid={showGrid}
        data-show-container={showContainer}
        style={style}
        {...props}
      >
        {/* Chart Header */}
        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}

        {/* Chart Container */}
        <div 
          className={styles.chartContainer}
          style={{ 
            height: `${actualChartHeight}px`,
            minHeight: `${actualChartHeight}px`,
            maxHeight: `${actualChartHeight}px`,
            ...(showContainer ? { '--brutal-border-style': borderStyle } : {})
          } as React.CSSProperties}
        >
          {/* Y-axis grid and labels */}
          {showGrid && (
            <div className={styles.yAxis}>
              <div className={styles.yAxisLabels}>
                <span className={styles.yAxisLabel}>{Math.round(maxValue)}</span>
                <span className={styles.yAxisLabel}>{Math.round(maxValue * 0.75)}</span>
                <span className={styles.yAxisLabel}>{Math.round(maxValue * 0.5)}</span>
                <span className={styles.yAxisLabel}>{Math.round(maxValue * 0.25)}</span>
                <span className={styles.yAxisLabel}>0</span>
              </div>
              <div className={styles.gridLines}>
                <div className={styles.gridLine} />
                <div className={styles.gridLine} />
                <div className={styles.gridLine} />
                <div className={styles.gridLine} />
                <div className={styles.gridLine} />
              </div>
            </div>
          )}

          {/* Bars Container */}
          <div className={styles.barsContainer}>
            {data.map((item, index) => {
              // Calculate bar height to match Y-axis scale exactly
              const barHeight = Math.max(8, (item.value / maxValue) * actualChartHeight)
              const color = item.color || defaultColors[index % defaultColors.length]
              
              return (
                <div
                  key={`${item.label}-${index}`}
                  className={styles.barWrapper}
                  style={{ 
                    animationDelay: animated ? `${index * 100}ms` : undefined 
                  }}
                >
                  {/* Value label positioned absolutely above bar */}
                  {showValues && (
                    <div 
                      className={styles.barValue}
                      style={{
                        position: 'absolute',
                        bottom: `${barHeight + 5}px`,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 3
                      }}
                    >
                      {item.value}
                    </div>
                  )}
                  
                  {/* Spacer to push bar to bottom */}
                  <div style={{ flex: 1 }} />
                  
                  {/* Bar at bottom */}
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Tooltip content={`${item.label}: ${item.value}`}>
                      <div
                        className={styles.bar}
                        style={{
                          height: `${barHeight}px`,
                          backgroundColor: color,
                          animationDelay: animated ? `${index * 150}ms` : undefined
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Chart Footer with X-axis labels and data count */}
        <div className={styles.footer}>
          <div className={styles.xAxisLabels}>
            {data.map((item, index) => (
              <Tooltip key={`label-${index}`} content={item.label}>
                <div className={styles.xAxisLabel}>
                  {item.label}
                </div>
              </Tooltip>
            ))}
          </div>
          <div className={styles.dataCount}>
            {data.length} DATA POINTS
          </div>
        </div>
      </div>
    )
  }
)

BarChart.displayName = 'BarChart'

export { BarChart }
export type { BarChartProps, BarChartDataPoint }