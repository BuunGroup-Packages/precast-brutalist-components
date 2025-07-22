import '@testing-library/jest-dom';

// Mock CSS modules
const mockCSSModule = new Proxy(
  {},
  {
    get: (_target, property) => {
      if (typeof property === 'string') {
        return `mocked-${property}`;
      }
      return '';
    },
  }
);

// Mock CSS imports
jest.mock('*.module.css', () => mockCSSModule);
jest.mock('*.css', () => ({}));

// Mock SVG imports
jest.mock('*.svg', () => 'MockedSVGComponent');

// Setup global mocks
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});