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
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("application", () => cy.window().its("Application"));
Cypress.Commands.add("nextTick", callback =>
  cy.application().then(app => app.$nextTick(() => callback && callback(app)))
);
// eslint-disable-next-line vue-i18n/no-dynamic-keys
Cypress.Commands.add("$t", text => cy.application().then(app => app.$t(text)));
Cypress.Commands.add(
  "login",
  ({
    user = "admin",
    password = "secret",
    jwtFixture = undefined,
    userFixture = undefined,
    redirectPath = "/"
  } = {}) => {
    cy.visit("/");
    cy.server();

    userFixture = userFixture || `${user}User.json`;
    jwtFixture = jwtFixture || `${user}UserJwt.json`;

    cy.fixture(jwtFixture).then(fixture1 => {
      cy.route({
        method: "POST",
        url: "/api/jwt/generate",
        status: 200,
        response: fixture1
      }).as("jwtAPIResponse");
    });

    cy.fixture(userFixture).as("user");
    cy.get("@user").then(user => {
      cy.route({
        method: "GET",
        url: "/api/user",
        status: 200,
        response: user
      }).as("userAPIResponse");

      cy.route({
        method: "GET",
        url: "/linagora.esn.dashboard/api/boards",
        response: [
          {
            _id: user._id,
            name: "default",
            widgets: {
              instances: [],
              order: []
            }
          }
        ]
      });
    });

    cy.fixture("avatar.png").as("userAvatar");
    cy.route("GET", "/api/users/5bebeeae1931ee6d1cc1f32a/profile/avatar", "@userAvatar");

    cy.application().then(app => {
      cy.wait("@userAPIResponse");
      cy.wait("@jwtAPIResponse");

      app.$auth.ready = callback => {
        if (callback) {
          return callback();
        }

        return true;
      };

      app.$auth.check = () => {
        return true;
      };
      app.$auth.login({
        url: "api/jwt/generate",
        auth: {
          username: user,
          password
        },
        rememberMe: false
      });
    });

    cy.visit(redirectPath);
  }
);
