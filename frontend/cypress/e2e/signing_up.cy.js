import 'cypress-file-upload';

describe("Signing up", () => {
  it("with valid credentials and uploaded photo, redirects to '/login'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("username");
  
    // Create a fixture file
    cy.fixture("sun.png").then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: "sun.png",
        mimeType: "image/png",
      });
    });
  
    cy.intercept("POST", "/uploadPhotos", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          message: "File uploaded successfully",
          file: {
            lastModified: "1684192820385",
            lastModifiedDate: "Tue May 16 2023 00:20:20 GMT+0100 (British Summer Time) {}",
            name: "sun.png",
            size: "61074",
            type: "image/png",
            webkitRelativePath: "",
          },
        },
      });
    }).as("fileUpload");
  
    cy.get("#submit").click();
  
    cy.wait("@fileUpload").then(() => {
      cy.url().should("include", "/login");
    });
  });

  it("with missing password, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });

  it("with missing email, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });
});