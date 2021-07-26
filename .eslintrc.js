module.exports = {
  env: {
    es6: true,
    browser: true
  },
  extends: 'standard',
  plugins: ['svelte3'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  globals: {}
}
