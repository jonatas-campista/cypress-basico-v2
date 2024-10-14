const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Desabilitando plugins
    setupNodeEvents() {
      // você pode configurar eventos aqui se precisar
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  },
  viewportWidth: 1280,
  viewportHeight: 880,
});
