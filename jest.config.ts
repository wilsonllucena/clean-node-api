export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
