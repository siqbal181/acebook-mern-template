import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world"}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })

  it('renders a post with an image', () => {
    cy.mount(<Post post={{ _id: 1, imageUrl: "/test/image.png" }} />);
    cy.get('[data-cy="img"]').should('have.attr', 'src', '/test/image.png');
  });
  
})
