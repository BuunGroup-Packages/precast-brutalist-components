import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'
import styles from './Typography.module.css'

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'lead' | 'large' | 'small' | 'muted' | 'blockquote' | 'code' | 'list'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'black'
  align?: 'left' | 'center' | 'right' | 'justify'
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  color?: 'default' | 'muted' | 'accent' | 'destructive' | 'warning' | 'success'
  family?: 'mono' | 'sans' | 'serif'
  truncate?: boolean
  children: ReactNode
  asChild?: boolean
}

const variantElementMap = {
  h1: 'h1',
  h2: 'h2', 
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  lead: 'p',
  large: 'p',
  small: 'p',
  muted: 'p',
  blockquote: 'blockquote',
  code: 'code',
  list: 'ul'
} as const

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({
    variant = 'p',
    size,
    weight,
    align,
    transform,
    color = 'default',
    family,
    truncate = false,
    className,
    children,
    asChild = false,
    ...props
  }, ref) => {
    const Component = asChild ? 'span' : variantElementMap[variant] as keyof JSX.IntrinsicElements

    const classNames = clsx(
      styles.typography,
      styles[variant],
      size && styles[`size-${size}`],
      weight && styles[`weight-${weight}`],
      align && styles[`align-${align}`],
      transform && styles[`transform-${transform}`],
      color && styles[`color-${color}`],
      family && styles[`family-${family}`],
      {
        [styles.truncate]: truncate
      },
      className
    )

    // Handle different component types manually to avoid type conflicts
    if (Component === 'h1') {
      return <h1 ref={ref as React.ForwardedRef<HTMLHeadingElement>} className={classNames} {...props}>{children}</h1>
    }
    if (Component === 'h2') {
      return <h2 ref={ref as React.ForwardedRef<HTMLHeadingElement>} className={classNames} {...props}>{children}</h2>
    }
    if (Component === 'h3') {
      return <h3 ref={ref as React.ForwardedRef<HTMLHeadingElement>} className={classNames} {...props}>{children}</h3>
    }
    if (Component === 'h4') {
      return <h4 ref={ref as React.ForwardedRef<HTMLHeadingElement>} className={classNames} {...props}>{children}</h4>
    }
    if (Component === 'h5') {
      return <h5 ref={ref as React.ForwardedRef<HTMLHeadingElement>} className={classNames} {...props}>{children}</h5>
    }
    if (Component === 'h6') {
      return <h6 ref={ref as React.ForwardedRef<HTMLHeadingElement>} className={classNames} {...props}>{children}</h6>
    }
    if (Component === 'blockquote') {
      return <blockquote ref={ref as React.ForwardedRef<HTMLQuoteElement>} className={classNames} {...props}>{children}</blockquote>
    }
    if (Component === 'code') {
      return <code ref={ref as React.ForwardedRef<HTMLElement>} className={classNames} {...props}>{children}</code>
    }
    if (Component === 'ul') {
      return <ul ref={ref as React.ForwardedRef<HTMLUListElement>} className={classNames} {...props}>{children}</ul>
    }
    if (Component === 'span') {
      return <span ref={ref as React.ForwardedRef<HTMLSpanElement>} className={classNames} {...props}>{children}</span>
    }
    
    // Default to paragraph
    return <p ref={ref as React.ForwardedRef<HTMLParagraphElement>} className={classNames} {...props}>{children}</p>
  }
)

Typography.displayName = 'Typography'

// Convenience components for common use cases
export const TypographyH1 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography variant="h1" ref={ref} {...props} />
)
TypographyH1.displayName = 'TypographyH1'

export const TypographyH2 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography variant="h2" ref={ref} {...props} />
)
TypographyH2.displayName = 'TypographyH2'

export const TypographyH3 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography variant="h3" ref={ref} {...props} />
)
TypographyH3.displayName = 'TypographyH3'

export const TypographyH4 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography variant="h4" ref={ref} {...props} />
)
TypographyH4.displayName = 'TypographyH4'

export const TypographyP = forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography variant="p" ref={ref} {...props} />
)
TypographyP.displayName = 'TypographyP'

export const TypographyLead = forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography variant="lead" ref={ref} {...props} />
)
TypographyLead.displayName = 'TypographyLead'

export const TypographyLarge = forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography variant="large" ref={ref} {...props} />
)
TypographyLarge.displayName = 'TypographyLarge'

export const TypographySmall = forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography variant="small" ref={ref} {...props} />
)
TypographySmall.displayName = 'TypographySmall'

export const TypographyMuted = forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography variant="muted" ref={ref} {...props} />
)
TypographyMuted.displayName = 'TypographyMuted'

export const TypographyBlockquote = forwardRef<HTMLQuoteElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography variant="blockquote" ref={ref} {...props} />
)
TypographyBlockquote.displayName = 'TypographyBlockquote'

export const TypographyCode = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography variant="code" ref={ref} {...props} />
)
TypographyCode.displayName = 'TypographyCode'

export const TypographyList = forwardRef<HTMLUListElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography variant="list" ref={ref} {...props} />
)
TypographyList.displayName = 'TypographyList'