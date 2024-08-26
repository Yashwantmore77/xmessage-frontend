module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',  // Change this from 'node' to 'jsdom'
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  };
  