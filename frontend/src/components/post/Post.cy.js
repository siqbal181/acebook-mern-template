import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    const fakePost1 = {comments: [],
      _id: "1",
      message: "Hello, world",
      author: "Sam",
      likedBy: ["Bob"],
      dateCreated: "2023-05-16T15:00:49.799Z",
    }
    cy.mount(<Post post={fakePost1} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })

  it('renders a post with an image', () => {
    cy.mount(<Post post={{ _id: 1, imageUrl: "/test/image.png" }} />);
    cy.get('[data-cy="img"]').should('have.attr', 'src', '/test/image.png');
  });
  
})
