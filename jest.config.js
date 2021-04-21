module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node"
  ],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  transform: {
    "^.+\.(js|jsx|ts|tsx|json)$": "babel-jest",
    "^.+\.(css|less|sass|scss)$": "jest-css-modules-transform",
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/fileTransformer.js',
  },

  //An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    "/node_modules/",
    '<rootDir>/node_modules/'
  ],

};
