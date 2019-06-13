describe("The dashboard feature", () => {
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
    function openForm() {
      cy.get("[data-test=sidebar]").within(() => {
        cy.get("[data-test=dashboard-create-button]").click();
      });
    }

    function submitForm() {
      cy.get("[data-test=dashboard-create-form-button]").click();
    }

    function fillForm(name) {
      cy.get("[data-test=dashboard-create-form]").within(() => {
        cy.get("[name=name]").type(name);
      });
    }

    it("should display a dialog on sidebar create click", () => {
      openForm();

      cy.get("[data-test=dashboard-create-dialog]").should("be.visible");
    });

    it("should have a disabled submit button when name length is too small", () => {
      openForm();
      fillForm("a");
      cy.get("[data-test=dashboard-create-form-button]").should("be.disabled");
    });

    it("should display error message when name length is too small", () => {
      openForm();
      fillForm("a");
      cy.get("[data-test=dashboard-create-form-button]").should("be.disabled");
      cy.get("[data-test=dashboard-create-dialog] .error--text").should("be.visible");
    });

    it("should have an enabled submit button when name length OK", () => {
      openForm();
      fillForm("A valid name");
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
        openForm();
        fillForm(dashboardName);
        submitForm();
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

      it("should display the new dashboard as current one", () => {
        cy.get("[data-test=sidebar-dashboard-current]").should("contain", dashboardName);
      });

      it("should not have any widget", () => {
        cy.$t("There are no widgets").then(translatedText => {
          cy.get("[data-test=dashboard-card-grid]").contains(translatedText);
        });
      });
    });
  });

  describe("Dashboard deletion", () => {
    function createTestBoardAndOpenItsDeleteDialog() {
      cy.get("[data-test=sidebar]").within(() => {
        cy.get("[data-test=dashboard-create-button]").click();
      });
      cy.get("[data-test=dashboard-create-form]").within(() => {
        cy.get("[name=name]").type("To Delete");
      });
      cy.get("[data-test=dashboard-create-form-button]").click();
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
        createTestBoardAndOpenItsDeleteDialog();
        cy.get("[data-test=dashboard-delete-dialog-delete]")
          .first()
          .click();
      });
      it("should disappear in the sidebar", () => {
        cy.get("[data-test=sidebar]").within(() => {
          cy.get("[data-test=sidebar-dashboard-item]").should($items => {
            expect($items).to.have.length(1);
          });
        });
      });
      it("should redirect to the default dashboard", () => {
        cy.url().should("include", "/boards/default");
      });
      it("should close the dialog", () => {
        cy.get("[data-test=dashboard-delete-dialog]").should("not.be.visible");
      });
    });
  });

  describe("Dashboard widgets", () => {
    function openWidgetStore() {
      cy.get("[data-test=sidebar]").within(() => {
        cy.get("[data-test=widget-add-button]").click();
      });
    }
    it("should display a button to open widget store dialog", () => {
      cy.get("[data-test=widget-add-button]").should("be.visible");
    });
    it("should not open widget store dialog", () => {
      cy.get("[data-test=widget-store-dialog]").should("not.be.visible");
    });

    describe("on open widget store button click", () => {
      it("should open the widget store dialog", () => {
        openWidgetStore();
        cy.get("[data-test=widget-store-dialog]").should("be.visible");
      });
      it("should have a close dialog button", () => {
        openWidgetStore();
        cy.get("[data-test=widget-dialog-close]").should("be.visible");
      });
      it("should contain some widgets", () => {
        openWidgetStore();
        cy.get("[data-test=widget-store-dialog]")
          .find("[data-test=widget-card]")
          .its("length")
          .should("be.gte", 1);
      });
      it("should close the dialog on close button click", () => {
        openWidgetStore();
        cy.get("[data-test=widget-dialog-close]").click();
        cy.get("[data-test=widget-store-dialog]").should("not.be.visible");
      });
    });

    describe("on a widget selection, add widget to dashboard", () => {
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
