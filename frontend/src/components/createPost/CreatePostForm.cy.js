import CreatePostForm from './CreatePostForm'

describe("Making a post", () => {
  it("calls the /posts endpoint", () => {
    cy.mount(<CreatePostForm onCreated={() => {}}/>)

    cy.intercept('POST', '/posts', { token: "fakeToken", message: "OK" }).as("createPostRequest")

    cy.get("#message").type("this is a test message");
    cy.get("#submit").click();
    cy.wait('@createPostRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
})