# Brutalist UI Styles Documentation

## Importing Styles

There are two ways to import Brutalist UI styles:

### Option 1: Import with Components (Recommended)

When you import components from the main entry point, styles are automatically included:

```javascript
import { Button, Card } from '@buun_group/brutalist-ui'
// Styles are automatically imported
```

### Option 2: Import Styles Separately

If you need to import styles separately (e.g., for CSS-in-JS solutions or specific bundler configurations):

```javascript
// In your JavaScript/TypeScript entry point
import '@buun_group/brutalist-ui/styles'
```

Or import directly in CSS:

```css
/* In your CSS file */
@import '@buun_group/brutalist-ui/styles';
```

## CSS Variables

All Brutalist UI styles use CSS custom properties (variables) for theming. Key variables include:

- `--brutal-black`: Primary black color
- `--brutal-white`: Primary white color
- `--brutal-accent`: Accent color (customizable)
- `--brutal-border-width`: Default border width
- `--brutal-shadow`: Default box shadow
- `--brutal-font-mono`: Monospace font family
- `--brutal-font-sans`: Sans-serif font family

## Customizing Theme

You can override any CSS variable to customize the theme:

```css
:root {
  --brutal-accent: #FF0066;
  --brutal-border-width: 4px;
  --brutal-shadow: 6px 6px 0px var(--brutal-black);
}
```

## File Structure

- **CSS Bundle**: All styles are bundled into `brutalist-ui.css`
- **CSS Modules**: Individual component styles use CSS modules for scoping
- **Base Styles**: Includes reset, utilities, animations, and variables