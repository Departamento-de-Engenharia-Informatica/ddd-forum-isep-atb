// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: "element"}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: "optional"}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


/* 
 * Check elements inside an iframe.
 * Read the documentation about web security
 * https://docs.cypress.io/guides/guides/web-security.html#Limitations
*/
Cypress.Commands.add("getIframeBody", (selector) => {

    return cy
      .get(selector)
      .its("0.contentDocument.body").should("not.be.empty")
      .then(cy.wrap);
  });
  
  /* 
   * Add Routes you want to listen and wait for here
   * https://docs.cypress.io/guides/guides/network-requests.html#Waiting
  */
  Cypress.Commands.add("listenToRoutes", () => {
    cy.server();
    cy.route("POST", "myRoute/").as("myRoute");
    cy.route("POST", "myRoute/*/item").as("item");
    return cy;
  });
  
  /* 
   * Example of conditional testing:
   * Conditional testing is bad practise and Cypress has given lots
   * of reasons not to do it. But just in case your architecture does
   * not give you a choice, here is an example: 
   * Let's imagine your e-commerce platform shows a state wether an
   * offer is available or not:
  */
  Cypress.Commands.add("checkAvailability", ( position = 0) => {
    const item = ".class-of-100%tly-rednered-object";
    // 100%tly rendered object:
    cy.get(item).eq(position).then(($item) => {
      // search for:
      if ($item.find(".available").length > 0) {
        $item.find(".available").click();
        // This might still fail the test:
        // If an offer is not available, there will be no fav button
      } else {
        cy.log("Didn't find availability check button.");
        cy.log("Continuing with test...");
      }
    });
  });