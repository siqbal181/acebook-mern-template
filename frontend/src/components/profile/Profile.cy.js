import UserProfile from './Profile';
import React from 'react';
import { AuthenticationContext } from '../authenticationProvider/AuthenticationProvider';
const navigate = () => {}

describe("UserProfile", () => {
  it("Renders the user profile with default profile picture and welcome username message", () => {
    const fakePost1 = {
      comments: [],
      _id: "1",
      message: "Hello, world",
      author: "Anon",
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
    const userPic = "/images/default-profile-img.jpeg"
    const setToken = () => {}
    cy.mount(
      <AuthenticationContext.Provider value={{ token, setToken, username, userPic }}>
        <UserProfile />
      </AuthenticationContext.Provider>
    );

    cy.wait("@getPostsByUser").then(() => {
      cy.get('[data-cy="userProfile"]')
        .should('contain.text', `Hello, ${username}!Here are your posts:Hello, world`)
        .find('.profile-pic') // Find the <img> element with the class 'profile-pic' within the parent container
        .should('be.visible') // Assert that the element is visible on the page
        .should('have.attr', 'src', userPic)
    });
  });

  it("Renders the user profile with chosen profile picture and welcome username message", () => {
    const fakePost2 = {
      comments: [],
      _id: "2",
      message: "Hello, acebook",
      author: "Earth",
      likedBy: [],
      dateCreated: "2023-05-19T15:00:49.799Z",
    }

    cy.intercept('GET', '/posts/arth', (req) => {
      req.reply({
        statusCode: 200,
        body: { posts: [fakePost2] }
      });
    }).as("getPostsByUser");
    
    const token = "token"
    const username = "arth"
    const userPic = "/images/earth.jpeg"
    const setToken = () => {}
    cy.mount(
      <AuthenticationContext.Provider value={{ token, setToken, username, userPic }}>
        <UserProfile />
      </AuthenticationContext.Provider>
    );

    cy.wait("@getPostsByUser").then(() => {
      cy.get('[data-cy="userProfile"]')
        .should('contain.text', `Hello, ${username}!Here are your posts:Hello, acebook`)
        .find('.profile-pic') // Find the <img> element with the class 'profile-pic' within the parent container
        .should('be.visible') // Assert that the element is visible on the page
        .should('have.attr', 'src', userPic)
    });
  });

});
