import React from 'react'
import styles from './LineChart.module.css'
import { Tooltip } from '../tooltip'

// Define TypeScript interfaces
interface LineChartDataPoint {
  label: string
  value: number
  color?: string
}

interface LineChartProps {
  data: LineChartDataPoint[]
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
  lineColor?: string
  lineWidth?: number
  showDots?: boolean
  smooth?: boolean
  className?: string
  style?: React.CSSProperties
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
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
    lineColor = 'var(--brutal-accent)',
    lineWidth = 3,
    showDots = true,
    smooth = false,
    className,
    style,
    ...props 
  }, ref) => {
    
    if (!data || data.length === 0) {
      return (
        <div 
          ref={ref} 
          className={`${styles.lineChart} ${styles.empty} ${className || ''}`}
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
    const minValue = Math.min(...data.map(d => d.value))
    const valueRange = maxValue - minValue
    
    // Calculate dynamic heights based on size
    const sizeConfig = {
      sm: { headerHeight: 50, footerHeight: 40, padding: 12 },
      md: { headerHeight: 70, footerHeight: 50, padding: 16 },
      lg: { headerHeight: 90, footerHeight: 60, padding: 24 }
    }
    
    const config = sizeConfig[size]
    const headerHeight = (title || subtitle) ? config.headerHeight : 0
    const actualChartHeight = height - headerHeight - config.footerHeight

    // Generate SVG path for the line
    const generatePath = (smooth: boolean) => {
      if (data.length === 0) return ''
      
      const points = data.map((point, index) => {
        const x = (index / (data.length - 1)) * 100
        const y = 100 - ((point.value - minValue) / valueRange) * 100
        return { x, y }
      })

      if (smooth && data.length > 2) {
        // Generate smooth curve using cubic bezier
        let path = `M ${points[0].x} ${points[0].y}`
        
        for (let i = 1; i < points.length; i++) {
          const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) / 3
          const cp1y = points[i - 1].y
          const cp2x = points[i].x - (points[i].x - points[i - 1].x) / 3
          const cp2y = points[i].y
          
          path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i].x} ${points[i].y}`
        }
        
        return path
      } else {
        // Generate straight lines
        return points.map((point, index) => 
          index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
        ).join(' ')
      }
    }

    const pathData = generatePath(smooth)

    return (
      <div 
        ref={ref} 
        className={`${styles.lineChart} ${className || ''}`}
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
                <span className={styles.yAxisLabel}>{Math.round(maxValue * 0.75 + minValue * 0.25)}</span>
                <span className={styles.yAxisLabel}>{Math.round(maxValue * 0.5 + minValue * 0.5)}</span>
                <span className={styles.yAxisLabel}>{Math.round(maxValue * 0.25 + minValue * 0.75)}</span>
                <span className={styles.yAxisLabel}>{Math.round(minValue)}</span>
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

          {/* Line Chart SVG */}
          <div className={styles.lineContainer}>
            <svg 
              className={styles.lineSvg}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Line path */}
              <path
                d={pathData}
                fill="none"
                stroke={lineColor}
                strokeWidth={lineWidth / 10}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={animated ? styles.animatedLine : ''}
              />
              
              {/* Data points */}
              {showDots && data.map((point, index) => {
                const x = (index / (data.length - 1)) * 100
                const y = 100 - ((point.value - minValue) / valueRange) * 100
                const dotSize = 4 // Fixed small size
                
                return (
                  <rect
                    key={`dot-${index}`}
                    x={x - dotSize/2}
                    y={y - dotSize/2}
                    width={dotSize}
                    height={dotSize}
                    fill={point.color || lineColor}
                    stroke="none"
                    className={animated ? styles.animatedDot : ''}
                    style={{ animationDelay: animated ? `${index * 100}ms` : undefined }}
                  />
                )
              })}
            </svg>

            {/* Interactive data point areas for tooltips */}
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100
              const y = 100 - ((point.value - minValue) / valueRange) * 100
              
              return (
                <Tooltip key={`tooltip-${index}`} content={`${point.label}: ${point.value}`}>
                  <div
                    className={styles.dataPointHover}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                </Tooltip>
              )
            })}

            {/* Value labels */}
            {showValues && data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100
              const y = 100 - ((point.value - minValue) / valueRange) * 100
              
              return (
                <div
                  key={`value-${index}`}
                  className={styles.valueLabel}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -150%)',
                    animationDelay: animated ? `${index * 150}ms` : undefined
                  }}
                >
                  {point.value}
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

LineChart.displayName = 'LineChart'

export { LineChart }
export type { LineChartProps, LineChartDataPoint }