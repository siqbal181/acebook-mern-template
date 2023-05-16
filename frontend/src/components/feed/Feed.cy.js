import Feed from './Feed'
import { AuthenticationContext } from '../authenticationProvider/AuthenticationProvider'
const navigate = () => {}

describe("Feed", () => {
  const fakePost1 = {comments: [],
    _id: "1",
    message: "Hello, world",
    author: "Sam",
    dateCreated: "2023-05-16T15:00:49.799Z",
  }
  const fakePost2 = {
    comments: [],
    _id: "2",
    message: "Hello again, world",
    author: "Bob",
    dateCreated: "2023-05-16T15:00:49.799Z",
  }
  it("Calls the /posts endpoint and lists all the posts", () => {
    cy.intercept('GET', '/posts', (req) => {
      req.reply({
        statusCode: 200,
        body: { posts: [
          fakePost1,
          fakePost2
        ] }
      })
    }
    ).as("getPosts")
    
    const token = "token"
    const setToken = () => {}
    cy.mount(
      <AuthenticationContext.Provider value={{token, setToken}}>
        <Feed navigate={navigate}/>
      </AuthenticationContext.Provider>
    )
    
    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post"]')
      .should('contain.text', "Hello, world")
      .and('contain.text', "Hello again, world")
    })
  })
})


      