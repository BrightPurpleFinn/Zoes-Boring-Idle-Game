module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.js"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testMatch: [
    "<rootDir>/test/**/__tests__/**/*.{js,jsx}",
    "<rootDir>/test/**/*.{spec,test}.{js,jsx}",
  ],
  collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/index.js"],
};
