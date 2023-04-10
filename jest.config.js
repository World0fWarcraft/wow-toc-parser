// eslint-disable-next-line import/no-commonjs, import/unambiguous
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**', '!build/**'],
  coverageThreshold: {
    global: {
      lines: 100,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/build/'],
}
