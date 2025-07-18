import React from 'react'
import styles from './PieChart.module.css'
import { Tooltip } from '../tooltip'

// Define TypeScript interfaces
interface PieChartDataPoint {
  label: string
  value: number
  color?: string
}

interface PieChartProps {
  data: PieChartDataPoint[]
  title?: string
  subtitle?: string
  size?: number
  showValues?: boolean
  showLabels?: boolean
  animated?: boolean
  variant?: 'default' | 'minimal' | 'brutal'
  showContainer?: boolean
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double'
  strokeWidth?: number
  className?: string
  style?: React.CSSProperties
}

const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  ({ 
    data,
    title,
    subtitle,
    size = 300,
    showValues = true,
    showLabels = true,
    animated = true,
    variant = 'default',
    showContainer = false,
    borderStyle = 'solid',
    strokeWidth = 2,
    className,
    style,
    ...props 
  }, ref) => {
    
    if (!data || data.length === 0) {
      return (
        <div 
          ref={ref} 
          className={`${styles.pieChart} ${styles.empty} ${className || ''}`}
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

    const total = data.reduce((sum, item) => sum + item.value, 0)
    const radius = (size - 40) / 2
    const centerX = size / 2
    const centerY = size / 2

    // Generate pie slices
    let cumulativeAngle = 0
    const slices = data.map((item, index) => {
      const percentage = (item.value / total) * 100
      const angle = (item.value / total) * 360
      const startAngle = cumulativeAngle
      const endAngle = cumulativeAngle + angle
      
      // Calculate path for slice
      const startAngleRad = (startAngle - 90) * (Math.PI / 180)
      const endAngleRad = (endAngle - 90) * (Math.PI / 180)
      
      const x1 = centerX + radius * Math.cos(startAngleRad)
      const y1 = centerY + radius * Math.sin(startAngleRad)
      const x2 = centerX + radius * Math.cos(endAngleRad)
      const y2 = centerY + radius * Math.sin(endAngleRad)
      
      const largeArcFlag = angle > 180 ? 1 : 0
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ')

      // Calculate label position
      const labelAngle = (startAngle + angle / 2 - 90) * (Math.PI / 180)
      const labelRadius = radius * 0.7
      const labelX = centerX + labelRadius * Math.cos(labelAngle)
      const labelY = centerY + labelRadius * Math.sin(labelAngle)

      cumulativeAngle += angle

      return {
        path: pathData,
        color: item.color || `hsl(${(index * 360) / data.length}, 70%, 50%)`,
        percentage,
        labelX,
        labelY,
        item,
        angle
      }
    })

    const defaultColors = [
      '#FF0000', '#0066FF', '#00FF41', '#FFFF00', 
      '#FF6600', '#9900FF', '#00FFFF', '#FF0099'
    ]

    return (
      <div 
        ref={ref} 
        className={`${styles.pieChart} ${className || ''}`}
        data-variant={variant}
        data-animated={animated}
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
            ...(showContainer ? { '--brutal-border-style': borderStyle } : {}),
            width: `${size}px`,
            height: `${size}px`
          } as React.CSSProperties}
        >
          <svg 
            className={styles.pieSvg}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
          >
            {/* Pie slices */}
            {slices.map((slice, index) => (
              <g key={`slice-${index}`}>
                <path
                  d={slice.path}
                  fill={slice.item.color || defaultColors[index % defaultColors.length]}
                  stroke="var(--brutal-white)"
                  strokeWidth={strokeWidth}
                  className={animated ? styles.animatedSlice : ''}
                  style={{ animationDelay: animated ? `${index * 150}ms` : undefined }}
                />
                
                {/* Value labels */}
                {showValues && slice.percentage > 5 && (
                  <text
                    x={slice.labelX}
                    y={slice.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={styles.valueLabel}
                    style={{ animationDelay: animated ? `${index * 200}ms` : undefined }}
                  >
                    {Math.round(slice.percentage)}%
                  </text>
                )}
              </g>
            ))}
          </svg>

          {/* Interactive hover areas for tooltips */}
          {slices.map((slice, index) => (
            <Tooltip 
              key={`tooltip-${index}`} 
              content={`${slice.item.label}: ${slice.item.value} (${Math.round(slice.percentage)}%)`}
            >
              <div
                className={styles.sliceHover}
                style={{
                  position: 'absolute',
                  left: `${slice.labelX - 20}px`,
                  top: `${slice.labelY - 20}px`,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%'
                }}
              />
            </Tooltip>
          ))}
        </div>

        {/* Legend */}
        {showLabels && (
          <div className={styles.legend}>
            {data.map((item, index) => (
              <div key={`legend-${index}`} className={styles.legendItem}>
                <div 
                  className={styles.legendColor}
                  style={{ 
                    backgroundColor: item.color || defaultColors[index % defaultColors.length]
                  }}
                />
                <span className={styles.legendLabel}>{item.label}</span>
                <span className={styles.legendValue}>{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Data Count */}
        <div className={styles.dataCount}>
          {data.length} DATA SEGMENTS • TOTAL: {total}
        </div>
      </div>
    )
  }
)

PieChart.displayName = 'PieChart'

export { PieChart }
export type { PieChartProps, PieChartDataPoint }