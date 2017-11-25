
// This file is for wallaby.js (wallabyjs.com) support

module.exports = function (wallaby) {

  return {
    files: [
      'package.json',
      'src/**/*.ts',
      'src/**/*.tsx',
      '!src/**/__tests__/*.spec.ts',
      '!src/**/__tests__/*.spec.tsx',
      'src/**/*.unexpected-snap',
      'types/**/*.d.ts'
    ],
    tests: ['src/**/__tests__/*.spec.ts', 'src/**/__tests__/*.spec.tsx'],

    testFramework: 'jest',

    env: {
      type: 'node',
      runner: 'node'
    },
    debug: true,
    compilers: {
      'src/**/*.ts': wallaby.compilers.typeScript({}),
      'src/**/*.tsx': wallaby.compilers.typeScript({})
    },

    setup: function (wallaby) {
      var jestConfig = require('./package.json').jest;
      wallaby.testFramework.configure(jestConfig);
    }
  }
};
