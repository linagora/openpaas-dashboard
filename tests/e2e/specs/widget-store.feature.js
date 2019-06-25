describe.skip("The widget store feature", () => {
  function openWidgetStore() {
    cy.get("[data-test=sidebar]").within(() => {
      cy.get("[data-test=dashboard-sidebar-actions]").click();
    });
    cy.get("[data-test=dashboard-open-store]").click();
  }

  beforeEach(() => {
    cy.server();
    cy.fixture("adminUser.json").then(fixture => cy.route("/api/user", fixture));
    cy.login("user", "secret");
    cy.get("[data-test=app]").as("app");
    cy.nextTick();
  });

  describe("Dashboard widgets", () => {
    describe("on open widget store button click", () => {
      it("should open the widget store dialog", () => {
        openWidgetStore();
        cy.get("[data-test=widget-store]").should("be.visible");
      });

      it("should have a close dialog button", () => {
        openWidgetStore();
        cy.get("[data-test=widget-dialog-close]").should("be.visible");
      });

      it("should contain some widgets", () => {
        openWidgetStore();
        cy.get("[data-test=widget-store]")
          .find("[data-test=widget-card]")
          .its("length")
          .should("be.gte", 1);
      });

      it("should close the dialog on close button click", () => {
        openWidgetStore();
        cy.get("[data-test=widget-dialog-close]").click();
        cy.get("[data-test=widget-store]").should("not.be.visible");
      });
    });

    describe("on a widget selection", () => {
      beforeEach(() => {
        cy.get("@user").then(user => {
          cy.route({
            method: "PUT",
            url: `linagora.esn.dashboard/api/boards/${user._id}/widgets`,
            response: {}
          });
        });
      });

      it("should find a widget selection button", () => {
        openWidgetStore();
        cy.get("[data-test=widget-card-add]")
          .its("length")
          .should("be.gte", 1);
      });

      it("should add the widget to dashboard when clicked", () => {
        openWidgetStore();
        cy.get("[data-test=widget-card-add]")
          .first()
          .click();
        cy.get("[data-test=widget-dialog-close]").click();
        cy.$t("There are no widgets").then(translatedText => {
          cy.get("[data-test=dashboard-card-grid]").should("not.contain", translatedText);
        });
      });
    });
  });
});
