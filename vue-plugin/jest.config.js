module.exports = {
  moduleFileExtensions: [
    'js',
    'vue'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: [
    '**/tests/unit/**/*.spec.js'
  ],
  testEnvironmentOptions: {
    url: 'http://localhost/'
  },
  testEnvironment: 'jsdom',
}
