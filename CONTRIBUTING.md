# Contributing to Brutalist UI Components

First off, thank you for considering contributing to Brutalist UI Components! It's people like you that make this component library such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Pull Request Process](#pull-request-process)
- [Development Guidelines](#development-guidelines)
- [Commit Messages](#commit-messages)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by the [Brutalist UI Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

Brutalist UI Components is a React component library built with TypeScript and CSS Modules. Before contributing, please:

1. Read our [documentation](https://brutalist.precast.dev)
2. Check our [issues page](https://github.com/BuunGroup-Packages/brutalist-components/issues) for existing discussions
3. Review our [design principles](https://brutalist-ui.com/docs/principles) to understand our aesthetic

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- Bun 1.0 or higher
- Git

### Installation

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/BuunGroup-Packages/https://github.com/BuunGroup-Packages/precast-brutalist-components.git
   cd precast-brutalist-components
   ```

3. Install dependencies:
   ```bash
   bun install
   ```

4. Start development:
   ```bash
   bun run dev
   ```

### Available Scripts

```bash
# Development mode with watch
bun run dev

# Build the library
bun run build

# Run tests
bun run test

# Run linter
bun run lint

# Type checking
bun run type-check
```

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, please include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

Use our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) when creating issues.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- A clear and descriptive title
- Detailed description of the proposed enhancement
- Rationale for why this would be useful
- Examples or mockups (if applicable)

Use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md) when creating enhancement issues.

### Creating Pull Requests

1. **Fork and create your branch**:
   ```bash
   git checkout -b feature/amazing-component
   ```

2. **Make your changes**:
   - Write clear, readable code following our style guide
   - Add tests if applicable
   - Update documentation as needed

3. **Ensure quality**:
   ```bash
   # Run linter
   bun run lint
   
   # Run type checking
   bun run type-check
   
   # Run tests
   bun run test
   
   # Build the library
   bun run build
   ```

4. **Commit your changes** (see [Commit Messages](#commit-messages))

5. **Push to your fork**:
   ```bash
   git push origin feature/amazing-component
   ```

6. **Create a Pull Request** using our [PR template](.github/pull_request_template.md)

## Development Guidelines

### Component Development

When creating new components:

1. **Location**: 
   - React components: `src/react/ComponentName/`
   - Tailwind components: `src/tailwind/ComponentName/`

2. **Structure**:
   ```
   ComponentName/
   ├── ComponentName.tsx       # Main component
   ├── ComponentName.module.css # Styles (for React components)
   └── index.ts               # Exports
   ```

3. **Requirements**:
   - Use TypeScript with proper type definitions
   - Implement `forwardRef` for all components
   - Include ARIA attributes for accessibility
   - Follow the brutalist design system
   - Add JSDoc comments for props

4. **Example component structure**:
   ```tsx
   import React from 'react';
   import styles from './ComponentName.module.css';

   export interface ComponentNameProps {
     /** Description of the prop */
     variant?: 'default' | 'brutal' | 'neo-brutal';
     children?: React.ReactNode;
   }

   export const ComponentName = React.forwardRef<
     HTMLDivElement,
     ComponentNameProps
   >(({ variant = 'default', children, ...props }, ref) => {
     return (
       <div
         ref={ref}
         className={styles[variant]}
         {...props}
       >
         {children}
       </div>
     );
   });

   ComponentName.displayName = 'ComponentName';
   ```

5. **Export the component**:
   - Add to `src/react/index.ts` or `src/tailwind/index.ts`
   - Ensure it's exported from `src/index.ts`

### CSS Guidelines

- Use CSS Modules for component styling
- Follow brutalist design principles:
  - Bold, geometric shapes
  - High contrast (black/white)
  - Thick borders (3-5px)
  - Raw, unpolished aesthetic
- Use CSS custom properties for theming:
  ```css
  .component {
    background: var(--brutal-white);
    border: 3px solid var(--brutal-black);
    color: var(--brutal-black);
  }
  ```

### Testing

- Write tests for new components and utilities
- Ensure existing tests pass before submitting PRs
- Test across different browsers and devices
- Include edge cases in your tests

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples
```
feat(button): add neo-brutal variant

Add a new neo-brutal variant to the Button component with enhanced shadow effects
and gradient borders.

Closes #123
```

```
fix(dialog): prevent body scroll when open

Implement scroll lock mechanism to prevent background scrolling when
dialog is open.

Fixes #456
```

## Pull Request Process

1. **Title**: Use a clear, descriptive title following our commit message format

2. **Description**: Fill out the PR template completely, including:
   - Summary of changes
   - Related issues
   - Type of change
   - Testing performed
   - Checklist completion

3. **Review Process**:
   - PRs require at least one maintainer approval
   - Address all review comments
   - Keep PRs focused and reasonably sized
   - Update your branch with the latest main if needed

4. **Merge Requirements**:
   - All CI checks must pass
   - No merge conflicts
   - Documentation updated (if needed)
   - Tests added/updated (if needed)
   - Component exported properly

## Release Process

Releases are managed by maintainers following semantic versioning:

- **Patch releases** (x.x.1): Bug fixes
- **Minor releases** (x.1.0): New features (backward compatible)
- **Major releases** (1.0.0): Breaking changes

## Community

- **Discussions**: Join our [GitHub Discussions](https://github.com/yourusername/brutalist-components/discussions)
- **Twitter**: Follow [@BrutalistUI](https://twitter.com/BrutalistUI)
- **Discord**: Join our [Discord server](https://discord.gg/brutalist-ui)

## Questions?

Feel free to:
- Open an issue for questions
- Start a discussion
- Reach out to maintainers

Thank you for contributing to Brutalist UI Components! 🏗️