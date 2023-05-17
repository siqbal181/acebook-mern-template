import Post from '../post/Post';
import React from 'react';
import Like from './Like';
import { AuthenticationContext } from '../authenticationProvider/AuthenticationProvider'

describe('Like component', () => {
  it('shows like button', () => {
    cy.mount(<Like postId={1} liked={["Jimmy"]} author={"Bob"} />);
    cy.get('button').click(); // select the like button and click it

    cy.get('button').should('have.text', 'LIKE'); // assert that the button now shows the updated like count
  });

  it('likes a post', () => {
    const fakePost = {
      comments: [],
      _id: "1",
      message: "Hello, world",
      author: "Sam",
      likedBy: ["Bob","Jerry"],
      dateCreated: "2023-05-16T15:00:49.799Z",
    }

    cy.mount(<Like postId={1} liked={["Bob"]} author={"Sam"} />)
    
    cy.intercept('PATCH', '/posts/1', (req) => {
      req.reply({
        statusCode: 200,
        body: { post: fakePost, message: "OK" }
      })
    }
    ).as("UpdateLikeCount")

    cy.get('button').click(); // select the like button and click it

    cy.wait("@UpdateLikeCount").then(() =>{
      cy.get('p')
      .should('contain.text', "Bob")
      .and('contain.text', "Jerry")
    })
  });


  it('disabled like button if you are the author', () => {
    const username = "Sam"
    const fakePost = {
      comments: [],
      _id: "1",
      message: "Hello, world",
      author: "Sam",
      likedBy: ["Bob","Jerry"],
      dateCreated: "2023-05-16T15:00:49.799Z",
    }
    cy.mount(
      <AuthenticationContext.Provider value={{username}}>
        <Post post={fakePost} />
      </AuthenticationContext.Provider>
    )

    cy.get('button').should('be.disabled');
  })

});
