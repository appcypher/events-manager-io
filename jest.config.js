module.exports = {
  setupFiles: [
    '<rootDir>/tests/client/setup.js',
  ],
  testRegex: './tests/client/.*/.*.js$',
  testPathIgnorePatterns: ['./tests/client/mocks', './server'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/client/mocks/fileMock.js',
    '\\.(css|scss)$':
      '<rootDir>/tests/client/mocks/styleMock.js',
  },
};
