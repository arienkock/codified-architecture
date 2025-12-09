import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: '<rootDir>/tsconfig.jest.json',
      },
    ],
  },
  transformIgnorePatterns: [],
  globalSetup: '<rootDir>/tests/utils/globalSetup.ts',
  globalTeardown: '<rootDir>/tests/utils/globalTeardown.ts',
  // Improve stack trace display
  errorOnDeprecated: true,
  // Show more detailed error information
  verbose: false,
  // Better error formatting
  displayName: {
    name: 'codified-architecture',
    color: 'blue',
  },
};

export default config;
