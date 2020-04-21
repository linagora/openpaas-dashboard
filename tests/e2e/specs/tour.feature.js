describe("The tour feature", () => {
  beforeEach(() => {
    cy.server();
    cy.fixture("adminUser.json").then(fixture => cy.route("/api/user", fixture));
    cy.login();
    cy.get("[data-test=app]").as("app");
    cy.nextTick();
  });

  it("should display the tour when enabled in settings /", () => {
    cy.visit("/", {
      onBeforeLoad: window => {
        window._e2esettings = { VUE_APP_TOUR: true };
      }
    });
    cy.get("[data-test=tour-dialog]").should("be.visible");
  });

  it("should not display the tour when disabled in settings /", () => {
    cy.visit("/", {
      onBeforeLoad: window => {
        window._e2esettings = { VUE_APP_TOUR: false };
      }
    });
    cy.get("[data-test=tour-dialog]").should("not.be.visible");
  });
});
