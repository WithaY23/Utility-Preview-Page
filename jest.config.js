export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '@testing-library/jest-dom'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy', // if you import CSS in components
  },
};