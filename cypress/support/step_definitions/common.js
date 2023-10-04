import { Given, When } from "cypress-cucumber-preprocessor/steps";

// ***********************************************************
// Here it start. Define your step definitions here.
// You can use a file with commononly used step definition, like this one
// or you can use differen .js files to define specific topics.
// All of the files are available globally for all feature files.
// ***********************************************************

When(/^I visit Cypress Examples$/, () => {
    /* return "skipped"; */
  cy.visit("https://example.cypress.io/commands/actions")
    .get("body").should("be.visible"); 
});