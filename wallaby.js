// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = function(wallaby) {
  return {
    files: ['src/**/*.ts'],
    tests: ['test/**/*.test.ts'],
    env: { type: 'node', runner: 'node' },
    testFramework: 'jest',
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({ useStandardDefaults: true }),
    },
    delays: {
      run: 10000,
    },
  }
}
