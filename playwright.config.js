const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  // São APIs públicas: poucos testes em paralelo para não sobrecarregar.
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  projects: [
    {
      name: 'brasil-api',
      testMatch: 'brasil-api/**/*.spec.js',
      use: {
        baseURL: process.env.BRASIL_API_URL || 'https://brasilapi.com.br',
      },
    },
    {
      name: 'restful-booker',
      testMatch: 'restful-booker/**/*.spec.js',
      use: {
        baseURL: process.env.BOOKER_URL || 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: { Accept: 'application/json' },
      },
    },
  ],
});
