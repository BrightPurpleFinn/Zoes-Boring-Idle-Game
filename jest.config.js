module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.js"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/CSSStub.js'
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testMatch: [
    "<rootDir>/test/**/__tests__/**/*.{js,jsx}",
    "<rootDir>/test/**/*.{spec,test}.{js,jsx}",
  ],
    "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",   
    "!src/**/*.d.ts",
    "!src/reportWebVitals.js",
    "!src/stores/templateStore.js",
    "!src/**/index.{js,ts}",
    "!src/**/__tests__/**"
  ]
};
