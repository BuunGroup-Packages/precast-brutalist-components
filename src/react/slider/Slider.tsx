/**
 * @module Slider
 * @description A range slider component for selecting values from a continuous range. Supports keyboard navigation and ARIA attributes.
 */

import React, { forwardRef, InputHTMLAttributes, useState, useEffect, useRef, CSSProperties } from 'react'
import { clsx } from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './Slider.module.css'

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'horizontal' | 'vertical'
  showValue?: boolean
  marks?: number[] | { value: number; label?: string }[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
  /** Custom CSS styles (supports utility classes) */
  style?: CSSProperties
  trackClassName?: string
  thumbClassName?: string
  valueClassName?: string
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      size = 'md',
      orientation = 'horizontal',
      showValue = false,
      marks,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      value: propValue,
      defaultValue = min,
      onChange,
      className,
      style,
      trackClassName,
      thumbClassName,
      valueClassName,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState<number>(
      propValue !== undefined ? Number(propValue) : Number(defaultValue)
    )
    const internalRef = useRef<HTMLInputElement>(null)
    const sliderRef = ref || internalRef

    useEffect(() => {
      if (propValue !== undefined) {
        setValue(Number(propValue))
      }
    }, [propValue])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value)
      setValue(newValue)
      onChange?.(e)
    }

    const percentage = ((value - min) / (max - min)) * 100

    const renderMarks = () => {
      if (!marks) return null

      const normalizedMarks = marks.map((mark) =>
        typeof mark === 'number' ? { value: mark } : mark
      )

      return (
        <div className={styles.marks}>
          {normalizedMarks.map((mark) => {
            const markPercentage = ((mark.value - min) / (max - min)) * 100
            const markStyle =
              orientation === 'horizontal'
                ? { left: `${markPercentage}%` }
                : { bottom: `${markPercentage}%` }

            return (
              <div
                key={mark.value}
                className={clsx(styles.mark, {
                  [styles.markActive]: value >= mark.value,
                })}
                style={markStyle}
              >
                <div className={styles.markTick} />
                {mark.label && (
                  <div className={styles.markLabel}>{mark.label}</div>
                )}
              </div>
            )
          })}
        </div>
      )
    }

    const sliderStyle =
      orientation === 'horizontal'
        ? {
            '--slider-percentage': `${percentage}%`,
          }
        : {
            '--slider-percentage': `${percentage}%`,
            height: '200px',
          }

    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.container,
        styles[size],
        styles[orientation],
        {
          [styles.disabled]: disabled,
          [styles.withValue]: showValue,
        }
      )
    })

    // Merge slider-specific styles with processed styles
    const finalStyle = { ...sliderStyle, ...processedStyle } as React.CSSProperties

    return (
      <div
        className={processedClassName}
        style={finalStyle}
      >
        <div className={clsx(styles.track, trackClassName)}>
          <div className={styles.progress} />
          <input
            ref={sliderRef}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={handleChange}
            className={clsx(styles.input)}
            {...props}
          />
          <div className={clsx(styles.thumb, thumbClassName)} />
          {renderMarks()}
        </div>
        {showValue && (
          <div className={clsx(styles.value, valueClassName)}>
            {value}
          </div>
        )}
      </div>
    )
  }
)

Slider.displayName = 'Slider'