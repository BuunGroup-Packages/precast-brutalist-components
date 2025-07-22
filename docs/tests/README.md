# Testing Guide for Brutalist UI Components

This guide outlines the testing standards and practices for the Brutalist UI component library.

## Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Test Structure](#test-structure)
- [Writing Tests for New Components](#writing-tests-for-new-components)
- [Test File Naming Convention](#test-file-naming-convention)
- [Common Test Patterns](#common-test-patterns)
- [Running Tests](#running-tests)
- [Best Practices](#best-practices)

## Testing Philosophy

We prioritize simple, maintainable tests that verify component behavior without over-engineering. Each component should have a dedicated test file that covers:

1. **Basic Rendering** - Component renders without crashing
2. **Props Validation** - All prop variations work correctly
3. **User Interactions** - Click handlers, form inputs, etc.
4. **Accessibility** - ARIA attributes and keyboard navigation
5. **Edge Cases** - Error states, empty states, loading states

## Test Structure

```
src/react/[component-name]/
├── [ComponentName].tsx
├── [ComponentName].module.css
├── index.ts
└── __tests__/
    └── [ComponentName].simple.test.tsx
```

## Writing Tests for New Components

### 1. Create Test File

Create a test file in the component's `__tests__` directory:

```typescript
// src/react/[component-name]/__tests__/[ComponentName].simple.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ComponentName } from '../ComponentName';

describe('ComponentName Component', () => {
  // Tests go here
});
```

### 2. Essential Tests Template

```typescript
describe('ComponentName Component', () => {
  // 1. Basic Rendering
  it('renders without crashing', () => {
    render(<ComponentName>Test Content</ComponentName>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  // 2. Prop Variations
  it('applies different variants', () => {
    const variants = ['default', 'primary', 'secondary'] as const;
    variants.forEach(variant => {
      const { container } = render(
        <ComponentName variant={variant}>Test</ComponentName>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(
        <ComponentName size={size}>Test</ComponentName>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // 3. Interactive Components
  it('handles click events', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<ComponentName onClick={onClick}>Click me</ComponentName>);
    
    const element = screen.getByText('Click me');
    await user.click(element);
    expect(onClick).toHaveBeenCalled();
  });

  // 4. Form Components
  it('handles input changes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<ComponentName onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'test value');
    expect(onChange).toHaveBeenCalled();
  });

  // 5. Disabled State
  it('can be disabled', () => {
    render(<ComponentName disabled>Disabled</ComponentName>);
    const element = screen.getByText('Disabled');
    expect(element).toBeDisabled();
  });

  // 6. Accessibility
  it('has proper ARIA attributes', () => {
    render(<ComponentName aria-label="Test component" />);
    const element = screen.getByLabelText('Test component');
    expect(element).toBeInTheDocument();
  });
});
```

## Test File Naming Convention

- Test files: `[ComponentName].simple.test.tsx`
- Use `.simple.test.tsx` suffix to distinguish from complex integration tests
- Keep test files in `__tests__` directory within component folder

## Common Test Patterns

### Testing Components with Children

```typescript
// For void elements (input, img, etc.) - DO NOT pass children
render(<Input aria-label="Test input" />);

// For container elements - pass children normally
render(<Button>Click me</Button>);
```

### Testing Form Components

```typescript
// Always use proper form control patterns
it('handles controlled input', () => {
  render(<Input value="test" readOnly />);
  expect(screen.getByDisplayValue('test')).toBeInTheDocument();
});

// For checkboxes/switches with controlled state
it('handles checked state', () => {
  render(<Checkbox checked readOnly aria-label="Test" />);
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeChecked();
});
```

### Testing Components with TypeScript Enums

Always check the component's TypeScript interface for valid prop values:

```typescript
// Check ComponentName.tsx for valid variants
export interface ComponentProps {
  variant?: 'default' | 'primary' | 'secondary'; // Use these exact values
  size?: 'sm' | 'md' | 'lg'; // Not 'small', 'medium', 'large'
}
```

### Testing Async Behaviors

```typescript
it('handles async operations', async () => {
  const user = userEvent.setup();
  render(<ComponentName />);
  
  const button = screen.getByRole('button');
  await user.click(button);
  
  // Wait for async updates
  await screen.findByText('Updated content');
});
```

## Running Tests

```bash
# Run all tests
bun test

# Run tests for a specific component
bunx jest src/react/button

# Run tests in watch mode
bunx jest --watch

# Run tests with coverage
bunx jest --coverage
```

## Best Practices

### DO:
- ✅ Test user-facing behavior, not implementation details
- ✅ Use semantic queries (getByRole, getByLabelText) over test IDs
- ✅ Test all documented props from the component's interface
- ✅ Include accessibility tests (ARIA attributes, keyboard nav)
- ✅ Keep tests simple and focused on one behavior
- ✅ Use TypeScript `as const` for arrays of valid prop values

### DON'T:
- ❌ Test CSS classes or styles directly
- ❌ Test internal component state
- ❌ Mock components unless absolutely necessary
- ❌ Write overly complex test utilities
- ❌ Test React internals or lifecycle methods
- ❌ Pass children to void HTML elements (input, img, br, hr)

### Component-Specific Considerations

#### Input Components (Input, Textarea, Select)
- Use `getByRole('textbox')` for text inputs
- Use `getByRole('combobox')` for select elements
- Add `readOnly` prop when testing controlled inputs without onChange

#### Toggle Components (Switch, Checkbox, Radio)
- Note: Switch might use role="checkbox" internally
- Always provide `aria-label` for accessibility
- Use `readOnly` for controlled components in tests

#### Container Components (Card, Dialog, Sheet)
- Test compound components if applicable (Card.Header, Card.Body)
- Verify portal rendering for overlay components

#### Feedback Components (Toast, Alert, Tooltip)
- Toast uses a provider pattern - test the provider and hook
- Tooltips may need hover/focus simulation
- Test auto-dismiss timers with fake timers if needed

## Example: Complete Test File

```typescript
// src/react/button/__tests__/Button.simple.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders without crashing', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies different variants', () => {
    const variants = ['default', 'primary', 'secondary', 'danger'] as const;
    variants.forEach(variant => {
      const { container } = render(
        <Button variant={variant}>Test</Button>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;
    sizes.forEach(size => {
      const { container } = render(
        <Button size={size}>Test</Button>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('forwards refs correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders as different element with asChild', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## Adding Tests to CI/CD

Tests are automatically run in GitHub Actions on:
- Every push to main/develop branches
- Every pull request

See `.github/workflows/ci.yml` for the test configuration.

## Getting Help

If you need help writing tests:
1. Check existing test files for similar components
2. Refer to Testing Library documentation
3. Ask in pull request reviews

Remember: Simple, readable tests are better than complex, "clever" tests!