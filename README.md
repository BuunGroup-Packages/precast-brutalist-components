<div align="center">
  <img src="public/precast/logo.png" alt="Precast" width="120" height="120" />
  
  # Brutalist UI Components
  
  <h3>A brutalist-styled React component library that embraces raw, unpolished aesthetics</h3>
  <p>Bold typography • Stark contrasts • Geometric shapes • Raw functionality</p>
  
  [![npm version](https://img.shields.io/npm/v/@buun_group/brutalist-ui.svg)](https://www.npmjs.com/package/@buun_group/brutalist-ui)
  [![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-black.svg)](CONTRIBUTING.md)
  
  **[📚 Documentation](https://brutalist.precast.dev)** | **[🎨 Live Examples](https://brutalist.precast.dev/components)**
</div>

---

## 📦 Installation

```bash
npm install @buun_group/brutalist-ui
# or
yarn add @buun_group/brutalist-ui
# or
pnpm add @buun_group/brutalist-ui
# or
bun add @buun_group/brutalist-ui
```

## 🚀 Quick Start

```jsx
import { Button, Card, Input } from '@buun_group/brutalist-ui';
// Styles are automatically included! No need to import CSS

function App() {
  return (
    <Card variant="brutal">
      <Card.Header>
        <h1>Welcome to Brutalist UI</h1>
      </Card.Header>
      <Card.Content>
        <Input placeholder="Enter text" variant="brutal" />
        <Button variant="brutal">Click me</Button>
      </Card.Content>
    </Card>
  );
}
```

## 🎨 Styling & Theming

### CSS Import Options

```javascript
// Option 1: Automatic styles (default, recommended)
import { Button } from '@buun_group/brutalist-ui';
// ✅ Styles are automatically injected on import

// Option 2: Components without styles (for custom styling)
import { Button } from '@buun_group/brutalist-ui/no-styles';
import '@buun_group/brutalist-ui/styles'; // Import CSS separately

// Option 3: Direct CSS import in your CSS file
// @import '@buun_group/brutalist-ui/styles';
```

### Custom Theming

Override CSS variables to customize the look:

```css
:root {
  --brutal-accent: #ff0066;          /* Change accent color */
  --brutal-border-width: 3px;        /* Thicker borders */
  --brutal-shadow: 6px 6px 0px #000; /* Bigger shadows */
  --brutal-font-display: 'Bebas Neue', cursive;
}
```

**📖 [Complete Styling Guide](STYLES.md)** - Detailed documentation on theming, CSS variables, and customization.

## 🎨 Design Principles

| Principle | Description |
|-----------|-------------|
| **Raw Aesthetics** | Unpolished, honest design that shows the structure |
| **Bold Typography** | Strong, impactful text that commands attention |
| **High Contrast** | Stark black and white with accent colors |
| **Geometric Shapes** | Simple, bold shapes with thick borders |
| **Functional Focus** | Utility over decoration, form follows function |

## 📚 Components

### Layout Components

| Component | Description | Variants |
|-----------|-------------|----------|
| `Container` | Responsive container with max-width | `default`, `fluid`, `tight` |
| `Stack` | Flexible stack layout with spacing | `horizontal`, `vertical` |
| `AspectRatio` | Maintains aspect ratio for content | - |
| `Separator` | Visual divider between content | `horizontal`, `vertical` |

### Form Components

| Component | Description | Features |
|-----------|-------------|----------|
| `Button` | Interactive button element | Variants, sizes, loading state |
| `Input` | Text input field | Variants, sizes, validation |
| `InputOTP` | One-time password input | Auto-focus, paste support |
| `Textarea` | Multi-line text input | Auto-resize, character count |
| `Select` | Dropdown selection | Native & custom variants |
| `Checkbox` | Toggle selection | Indeterminate state |
| `Radio` | Single selection from group | Custom styling |
| `Switch` | Toggle switch | Accessible labels |
| `Slider` | Range slider input | Steps, marks |
| `Toggle` | Toggle button group | Multiple selection |
| `Combobox` | Searchable select | Filtering, async loading |

### Data Display

| Component | Description | Features |
|-----------|-------------|----------|
| `Table` | Data table | Sorting, selection, pagination |
| `Card` | Content container | Header, content, footer sections |
| `Badge` | Status indicator | Variants, sizes |
| `Avatar` | User representation | Image, fallback, status |
| `Typography` | Text styling | Headings, paragraphs, links |
| `Alert` | Notification message | Types, dismissible |
| `Toast` | Temporary notification | Auto-dismiss, actions |

### Navigation

| Component | Description | Features |
|-----------|-------------|----------|
| `Navigation` | Site navigation | Responsive, dropdowns |
| `Sidebar` | Side navigation | Collapsible, fixed |
| `Breadcrumb` | Location indicator | Separators, truncation |
| `Tabs` | Tabbed interface | Lazy loading, keyboard nav |
| `Pagination` | Page navigation | Page size, jump to page |
| `TableOfContents` | Document outline | Smooth scroll, active tracking |

### Overlay Components

| Component | Description | Features |
|-----------|-------------|----------|
| `Dialog` | Modal dialog | Sizes, close on outside click |
| `Drawer` | Slide-out panel | Positions, overlay |
| `Popover` | Floating content | Positioning, triggers |
| `Tooltip` | Helpful hints | Delay, positions |
| `HoverCard` | Rich hover content | Delay, interactive |
| `ContextMenu` | Right-click menu | Nested menus, shortcuts |
| `Sheet` | Bottom sheet | Swipe to dismiss, snap points |
| `Dropdown` | Dropdown menu | Nested items, dividers |
| `Command` | Command palette | Search, shortcuts |

### Feedback Components

| Component | Description | Features |
|-----------|-------------|----------|
| `Progress` | Progress indicator | Determinate, indeterminate |
| `Spinner` | Loading spinner | Sizes, custom animation |
| `Skeleton` | Loading placeholder | Shapes, animation |

### Data Visualization

| Component | Description | Features |
|-----------|-------------|----------|
| `BarChart` | Bar chart visualization | Responsive, tooltips |
| `LineChart` | Line chart visualization | Multiple series, interpolation |
| `PieChart` | Pie chart visualization | Labels, animations |
| `AreaChart` | Area chart visualization | Stacked, gradients |
| `Chart` | Base chart component | Customizable, plugins |

### Interactive Components

| Component | Description | Features |
|-----------|-------------|----------|
| `Accordion` | Collapsible content | Single/multiple, animations |
| `Carousel` | Content slider | Touch support, indicators |
| `ScrollArea` | Custom scrollbar | Horizontal/vertical scroll |

### Utilities

| Component | Description |
|-----------|-------------|
| `Theme` | Theme provider and utilities |
| `Shapes` | Brutalist SVG shapes collection |

## 🛠️ Development

### Prerequisites

- Node.js 18+ or Bun 1.0+
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/brutalist-components.git
cd brutalist-components/packages/components

# Install dependencies
bun install

# Start development
bun run dev
```

### Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development mode with watch |
| `bun run build` | Build the library |
| `bun run test` | Run tests |
| `bun run lint` | Run linter |
| `bun run type-check` | Check TypeScript types |

## 🤝 Contributing

We love contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Links

- 📋 [Contributing Guidelines](CONTRIBUTING.md)
- 🐛 [Report a Bug](.github/ISSUE_TEMPLATE/bug_report.md)
- 💡 [Request a Feature](.github/ISSUE_TEMPLATE/feature_request.md)
- 📜 [Code of Conduct](CODE_OF_CONDUCT.md)

## 📄 License

MIT © [Brutalist UI Contributors](LICENSE)

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [CSS Modules](https://github.com/css-modules/css-modules)

---

<div align="center">
  <strong>Making the web bold, raw, and beautiful.</strong>
</div>