import CreateCommentForm from "./CommentForm"
import {AuthenticationContext} from '../authenticationProvider/AuthenticationProvider';
const navigate = () => {}

describe("Making a comment", () => {
  it("calls the /posts endpoint", () => {
    const token = "fakeToken"
    cy.mount(
      <AuthenticationContext.Provider value={{token}}>
        <CreateCommentForm onCreated={() => {}}/>
      </AuthenticationContext.Provider>
    )

    cy.intercept('POST', '/comments', {message: "OK"}).as("createCommentRequest")

    cy.get("#comment").type("this is a test message");
    cy.get("#submit-comment").click();
    cy.wait('@createCommentRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK");
      expect(interception.request.body.comment).to.eq("this is a test message");
    })
  })
})

