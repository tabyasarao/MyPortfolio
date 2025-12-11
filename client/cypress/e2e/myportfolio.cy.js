describe("Portfolio App E2E Test", () => {
  it("loads the Sign In page correctly", () => {
    cy.visit("http://localhost:5173");

 
    cy.url().should("include", "/signin");

  
    cy.contains("Sign In").should("exist");
    cy.get("input[name=email]").should("exist");
    cy.get("input[name=password]").should("exist");
    cy.get("button").contains("Sign In").should("exist");
  });
});
