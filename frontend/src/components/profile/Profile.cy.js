import UserProfile from './Profile';
import React from 'react';
import { AuthenticationContext } from '../authenticationProvider/AuthenticationProvider';
const navigate = () => {}

describe("UserProfile", () => {
  it("Renders the user profile and shows welcome username message", () => {
    const fakePost1 = {
      comments: [],
      _id: "1",
      message: "Hello, world",
      author: "Sam",
      likedBy: [],
      dateCreated: "2023-05-16T15:00:49.799Z",
    }

    cy.intercept('GET', '/posts/someone', (req) => {
      req.reply({
        statusCode: 200,
        body: { posts: [
          fakePost1
        ] }
      });
    }).as("getPostsByUser");

    const token = "token"
    const username = "someone"
    const setToken = () => {}
    cy.mount(
      <AuthenticationContext.Provider value={{ token, setToken, username }}>
        <UserProfile />
      </AuthenticationContext.Provider>
    );

    cy.wait("@getPostsByUser").then(() => {
      cy.get('[data-cy="userProfile"]')
        .should('contain.text', "Hello someone!Here are your posts:Hello, world")
    });
  });
});
