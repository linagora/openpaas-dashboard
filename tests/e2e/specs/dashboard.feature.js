describe("The dashboard feature", () => {
  beforeEach(() => {
    cy.server();
    cy.fixture("adminUser.json").then(fixture => cy.route("/api/user", fixture));
    cy.login("user", "secret");
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
        cy.url().as("initialUrl");
        dashboardName = "OpenPaaS";
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
});
