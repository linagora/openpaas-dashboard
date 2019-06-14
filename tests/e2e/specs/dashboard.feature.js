describe("The dashboard feature", () => {
  function openCreateDashboardForm() {
    cy.get("[data-test=sidebar]").within(() => {
      cy.get("[data-test=dashboard-sidebar-actions]").click();
    });
    cy.get("[data-test=dashboard-create-item]").click();
  }

  function fillCreateDashboardForm(name) {
    cy.get("[data-test=dashboard-create-form]").within(() => {
      cy.get("[name=name]").type(name);
    });
  }

  function submitCreateDashboardForm() {
    cy.get("[data-test=dashboard-create-form-button]").click();
  }

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

  it("should display an empty dashboard", () => {
    cy.$t("There are no widgets").then(translatedText => {
      cy.get("[data-test=dashboard-card-grid]").contains(translatedText);
    });
  });

  describe("Dashboard creation", () => {
    it("should display a dialog on sidebar create click", () => {
      openCreateDashboardForm();

      cy.get("[data-test=dashboard-create-dialog]").should("be.visible");
    });

    it("should have a disabled submit button when name length is too small", () => {
      openCreateDashboardForm();
      fillCreateDashboardForm("a");
      cy.get("[data-test=dashboard-create-form-button]").should("be.disabled");
    });

    it("should display error message when name length is too small", () => {
      openCreateDashboardForm();
      fillCreateDashboardForm("a");
      cy.get("[data-test=dashboard-create-form-button]").should("be.disabled");
      cy.get("[data-test=dashboard-create-dialog] .error--text").should("be.visible");
    });

    it("should have an enabled submit button when name length OK", () => {
      openCreateDashboardForm();
      fillCreateDashboardForm("A valid name");
      cy.get("[data-test=dashboard-create-form-button]").should("be.enabled");
    });

    describe("on dashboard submitted", () => {
      let dashboardName;

      beforeEach(() => {
        dashboardName = "OpenPaaS";
        cy.route({
          method: "PUT",
          url: "/linagora.esn.dashboard/api/boards",
          response: {
            _id: "1",
            name: dashboardName
          }
        });

        cy.url().as("initialUrl");
        openCreateDashboardForm();
        fillCreateDashboardForm(dashboardName);
        submitCreateDashboardForm();
      });

      it("should appear in the sidebar", () => {
        cy.get("[data-test=sidebar]").within(() => {
          cy.get("[data-test=sidebar-dashboard-item]").should($items => {
            expect($items).to.have.length(2);
            expect($items.last()).to.contain(dashboardName);
          });
        });
      });

      it("should redirect to the new dashboard", () => {
        cy.get("@initialUrl").then(initialUrl => {
          cy.url().should("not.eq", initialUrl);
        });
      });

      it("should not have any widget", () => {
        cy.$t("There are no widgets").then(translatedText => {
          cy.get("[data-test=dashboard-card-grid]").contains(translatedText);
        });
      });
    });
  });

  describe("Dashboard deletion", () => {
    let dashboardName, dashboardId;

    beforeEach(() => {
      dashboardName = "To Delete";
      dashboardId = "123456789";
      cy.route({
        method: "PUT",
        url: "/linagora.esn.dashboard/api/boards",
        response: {
          _id: dashboardId,
          name: dashboardName
        }
      });
    });

    function createTestBoardAndOpenItsDeleteDialog() {
      openCreateDashboardForm();
      fillCreateDashboardForm(dashboardName);
      submitCreateDashboardForm();
      cy.get("[data-test=dashboard-operations]")
        .last()
        .click();
      cy.get("[data-test=dashboard-delete-trigger]")
        .first()
        .click();
    }

    it("should display a dialog on sidebar delete click", () => {
      createTestBoardAndOpenItsDeleteDialog();
      cy.get("[data-test=dashboard-delete-dialog]").should("be.visible");
    });

    describe("on dashboard dialog CANCEL submit", () => {
      beforeEach(() => {
        createTestBoardAndOpenItsDeleteDialog();
        cy.get("[data-test=dashboard-delete-dialog-cancel]")
          .first()
          .click();
      });

      it("should NOT delete the dashboard", () => {
        cy.get("[data-test=sidebar]").within(() => {
          cy.get("[data-test=sidebar-dashboard-item]").should($items => {
            expect($items).to.have.length(2);
          });
        });
      });

      it("should close the dialog", () => {
        cy.get("[data-test=dashboard-delete-dialog]").should("not.be.visible");
      });
    });

    describe("on dashboard dialog DELETE submit", () => {
      beforeEach(() => {
        cy.route({
          method: "DELETE",
          url: `/linagora.esn.dashboard/api/boards/${dashboardId}`,
          response: {}
        });
        createTestBoardAndOpenItsDeleteDialog();
        cy.get("[data-test=dashboard-delete-dialog-delete]")
          .first()
          .click();
      });

      it("should disappear from the sidebar", () => {
        cy.get("[data-test=sidebar]").within(() => {
          cy.get("[data-test=sidebar-dashboard-item]").should($items => {
            expect($items).to.have.length(1);
          });
        });
      });

      it("should redirect to the default dashboard", () => {
        cy.url().should("eq", `${Cypress.config().baseUrl}boards`);
      });

      it("should close the dialog", () => {
        cy.get("[data-test=dashboard-delete-dialog]").should("not.be.visible");
      });
    });
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
