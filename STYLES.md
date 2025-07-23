# Brutalist UI Styles Guide

## Quick Start

### Automatic Import (Recommended)
When you import components, styles are automatically included:

```javascript
import { Button, Card, Input } from '@buun_group/brutalist-ui'
// Styles are automatically loaded
```

### Manual CSS Import
If you need to import styles separately:

```javascript
// Option 1: Import in JavaScript/TypeScript
import '@buun_group/brutalist-ui/styles'

// Option 2: Import in CSS file
@import '@buun_group/brutalist-ui/styles';
```

## CSS Variables & Theming

Brutalist UI uses CSS custom properties for easy theming. You can override any variable:

```css
:root {
  /* Colors */
  --brutal-accent: #ff0066;          /* Primary accent color */
  --brutal-black: #000000;           /* Primary black */
  --brutal-white: #ffffff;           /* Primary white */
  
  /* Typography */
  --brutal-font-mono: 'JetBrains Mono', monospace;
  --brutal-font-sans: 'Inter', sans-serif;
  --brutal-font-display: 'Space Grotesk', sans-serif;
  
  /* Spacing */
  --brutal-space-4: 1rem;            /* Base spacing unit */
  --brutal-border-width: 2px;        /* Default border width */
  
  /* Shadows */
  --brutal-shadow: 4px 4px 0px var(--brutal-black);
}
```

## Available CSS Variables

### Colors
```css
/* Base colors */
--brutal-black: #000000;
--brutal-white: #ffffff;
--brutal-accent: #ff0066;
--brutal-accent-dark: #cc0052;
--brutal-accent-light: #ff3385;

/* Gray scale */
--brutal-gray-50 through --brutal-gray-900;

/* Semantic colors */
--brutal-error: #ef4444;
--brutal-success: #10b981;
--brutal-warning: #f59e0b;
--brutal-info: #3b82f6;
```

### Typography
```css
/* Font families */
--brutal-font-sans: 'Inter', sans-serif;
--brutal-font-mono: 'JetBrains Mono', monospace;
--brutal-font-display: 'Space Grotesk', sans-serif;

/* Font sizes */
--brutal-text-xs: 0.75rem;
--brutal-text-sm: 0.875rem;
--brutal-text-base: 1rem;
--brutal-text-lg: 1.125rem;
--brutal-text-xl: 1.25rem;
/* ... up to --brutal-text-6xl */

/* Font weights */
--brutal-font-normal: 400;
--brutal-font-medium: 500;
--brutal-font-bold: 700;
--brutal-font-black: 900;
```

### Spacing & Layout
```css
/* Spacing scale */
--brutal-space-1: 0.25rem;
--brutal-space-2: 0.5rem;
--brutal-space-3: 0.75rem;
--brutal-space-4: 1rem;
/* ... up to --brutal-space-24 */

/* Borders */
--brutal-border-width: 2px;
--brutal-border-width-thick: 3px;
--brutal-border-style: solid;

/* Shadows */
--brutal-shadow-sm: 2px 2px 0px var(--brutal-black);
--brutal-shadow: 4px 4px 0px var(--brutal-black);
--brutal-shadow-lg: 8px 8px 0px var(--brutal-black);
--brutal-shadow-xl: 12px 12px 0px var(--brutal-black);
```

## Utility Classes

Brutalist UI includes utility classes for common styling needs:

### Layout
```css
.brutal-container    /* Responsive container */
.brutal-grid         /* CSS Grid with gap */
.brutal-flex         /* Flexbox */
.brutal-stack        /* Vertical flex stack */
```

### Typography
```css
.brutal-text-xs      /* Small text */
.brutal-text-lg      /* Large text */
.brutal-font-mono    /* Monospace font */
.brutal-font-display /* Display font */
.brutal-uppercase    /* Uppercase text */
```

### Colors
```css
.brutal-bg-black     /* Black background */
.brutal-bg-accent    /* Accent background */
.brutal-text-white   /* White text */
.brutal-text-accent  /* Accent text */
```

### Effects
```css
.brutal-shadow       /* Drop shadow */
.brutal-border       /* Standard border */
.brutal-interactive  /* Hover effects */
.brutal-glitch       /* Glitch animation */
```

## Custom Themes

### Dark Theme Example
```css
:root {
  --brutal-background: #000000;
  --brutal-foreground: #ffffff;
  --brutal-muted: #1a1a1a;
  --brutal-border-color: #ffffff;
}
```

### Colorful Theme Example
```css
:root {
  --brutal-accent: #ff6b35;
  --brutal-accent-dark: #e55a2b;
  --brutal-success: #4ecdc4;
  --brutal-error: #ff6b6b;
  --brutal-warning: #ffe66d;
}
```

### Custom Font Example
```css
:root {
  --brutal-font-display: 'Bebas Neue', cursive;
  --brutal-font-mono: 'Fira Code', monospace;
  --brutal-font-sans: 'Roboto', sans-serif;
}
```

## Framework Integration

### Next.js
Add to your `globals.css`:
```css
@import '@buun_group/brutalist-ui/styles';

/* Your custom overrides */
:root {
  --brutal-accent: #your-color;
}
```

### Vite/React
In your main entry file:
```javascript
import '@buun_group/brutalist-ui/styles'
import './your-custom-styles.css'
```

### CSS-in-JS (Styled Components, Emotion)
```javascript
import '@buun_group/brutalist-ui/styles'

const GlobalStyles = createGlobalStyle`
  :root {
    --brutal-accent: ${props => props.theme.primary};
  }
`
```

## Component-Specific Variables

Some components have their own CSS variables for fine-tuned control:

### Button Variables
```css
--brutal-button-bg: var(--brutal-white);
--brutal-button-border: var(--brutal-black);
--brutal-button-shadow: var(--brutal-shadow);
```

### Input Variables
```css
--brutal-input-bg: var(--brutal-white);
--brutal-input-border: var(--brutal-black);
--brutal-input-focus-shadow: 6px 6px 0 var(--brutal-black);
```

## Accessibility

Brutalist UI respects user preferences:

```css
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Bundle Size

- **Full CSS Bundle**: ~258KB (~36KB gzipped)
- **CSS Variables Only**: Use individual variables in your own CSS for smaller bundles
- **Tree Shaking**: Not available for CSS (use CSS purging tools if needed)

## Troubleshooting

### Styles Not Loading
1. Ensure you've imported the styles: `import '@buun_group/brutalist-ui/styles'`
2. Check your bundler supports CSS imports
3. Verify the CSS file exists in `node_modules/@buun_group/brutalist-ui/dist/brutalist-ui.css`

### Variables Not Working
1. Make sure CSS variables are defined in `:root` or a parent element
2. Check for typos in variable names (they're case-sensitive)
3. Ensure your browser supports CSS custom properties

### Conflicting Styles
1. Import Brutalist UI styles before your custom styles
2. Use CSS specificity or `!important` to override
3. Consider scoping with CSS modules or styled-components