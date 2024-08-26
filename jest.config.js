module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',  // Change this from 'node' to 'jsdom'
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    collectCoverage: true, // Enable coverage collection
    collectCoverageFrom: [
      "src/**/*.{ts,tsx}", // Specify the file patterns for which coverage is collected
      "!src/**/*.d.ts", // Exclude TypeScript declaration files
    ],
    coverageDirectory: "coverage", // Directory where coverage reports will be saved
    coverageReporters: ["json", "lcov", "text", "clover"], // Formats for the coverage report
  };
  
  