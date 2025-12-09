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
  setupFilesAfterEnv: ['<rootDir>/tests/utils/jest-setup.ts'],
  snapshotSerializers: ['<rootDir>/tests/utils/jest-circular-serializer.ts'],
};

export default config;
