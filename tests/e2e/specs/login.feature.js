const loginFromForm = (email, password) => {
  cy.visit("/login");

  cy.get("[data-test=login-form]").within(() => {
    cy.get("[name=login]").type(email);
    cy.get("[name=password]").type(password);
  });

  cy.get("[data-test=login-form]").trigger("keydown", { key: "Enter" });
};

describe("The login feature", () => {
  beforeEach(() => {
    cy.server();
    cy.fixture("adminUser.json").then(fixture => cy.route("/api/user", fixture));
  });

  it("should display the login form when not logged in and opening /", () => {
    cy.visit("/");
    cy.nextTick(() => {
      cy.get("[data-test=login-form]").should("exist");
    });
  });

  describe("When on login page", () => {
    describe("On login failure", () => {
      it("should notify user", () => {
        cy.route({
          method: "POST",
          url: "/api/jwt/generate",
          status: 503,
          response: {}
        }).as("loginSubmit");

        loginFromForm("user", "secret");
        cy.wait("@loginSubmit");
        cy.get("[data-test=snackbar]").should("be.visible");
        cy.get("[data-test=snackbar]").should("contain", "Login error, please retry");
      });
    });

    describe("On login success", () => {
      it("should have user menu filled", () => {
        cy.login("user", "secret");
        // hack to wait for the menu to be rendered
        cy.get("[data-test=user-menu]")
          .invoke("width")
          .should("be.gt", 0);
        cy.get("[data-test=user-menu]").click();

        cy.get("[data-test=user-menu-title]").contains("admin admin");
        cy.get("[data-test=user-menu-email]").contains("admin@open-paas.org");
      });

      it("should be able to log out from user menu", () => {
        cy.login("user", "secret");
        cy.get("[data-test=user-menu]").click();
        cy.get("[data-test=user-menu-logout]").click();

        cy.location().then(location => expect(location.pathname).to.eql("/login"));
      });
    });
  });
});
