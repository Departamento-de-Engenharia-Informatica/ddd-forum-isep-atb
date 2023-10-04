const cucumber = require("cypress-cucumber-preprocessor").default;
require("dotenv").config();

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the "pluginsFile" configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @parameters on, config
 * on: Cypress event
 * config: Cypress config
 */
module.exports = (on, config) => {
  // Run Cypress-Cucumber-Preprocessor
  on("file:preprocessor", cucumber());

  // Load environment variables to Cypress
  config.env.URL = process.env.URL;

  // We return config to make them available during the tests
  return config;
};
