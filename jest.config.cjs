/** @type {import('jest').Config} */
module.exports = {
  // Test environment
  testEnvironment: 'jsdom',
  
  // TypeScript support
  preset: 'ts-jest',
  
  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Transform files
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json',
    }],
  },
  
  // Test match patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.(ts|tsx|js|jsx)',
    '<rootDir>/src/**/__tests__/**/*.spec.(ts|tsx|js|jsx)',
    '<rootDir>/src/**/*.(test|spec).(ts|tsx|js|jsx)',
  ],
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
  
  // Module name mapping
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub',
  },
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.d.ts',
    '!src/test/**',
    '!src/**/*.stories.*',
    '!src/index.ts',
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 55,
      functions: 50,
      lines: 60,
      statements: 60,
    },
  },
  
  // Ignore patterns
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  
  // Module directories
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  
  // Verbose output
  verbose: true,
};