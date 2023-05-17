import Post from '../post/Post';
import React from 'react';
import Like from './Like';

describe('Like component', () => {
  it('shows like button', () => {
    cy.mount(<Like postId={1} likesCount={1} />);
    cy.get('button').click(); // select the like button and click it

    cy.get('button').should('have.text', 'Like'); // assert that the button now shows the updated like count
  });

  it('likes a post', () => {
    const fakePost = {comments: [],
      _id: "1",
      message: "Hello, world",
      author: "Sam",
      likedBy: ["Bob","Jerry"],
      dateCreated: "2023-05-16T15:00:49.799Z",
    }
    cy.mount(<Like postId={1} likesCount={1} />);
    
    cy.intercept('PATCH', '/posts/1', (req) => {
      req.reply({
        statusCode: 200,
        body: { post: fakePost, message: "OK" }
      })
    }
    ).as("UpdateLikeCount")
    cy.get('button').click(); // select the like button and click it

    cy.wait('@UpdateLikeCount').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
      expect(interception.response.body.post.likedBy.length).to.eq(2)
    })
  });

});
