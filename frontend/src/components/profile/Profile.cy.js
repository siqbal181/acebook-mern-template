import UserProfile from './Profile';
import React from 'react';
import { AuthenticationContext } from '../authenticationProvider/AuthenticationProvider';

describe("UserProfile", () => {
  it("Renders the user profile and shows welcome username message", () => {
    const token = "token";
    const setToken = () => {};
    const navigate = () => {};
    cy.mount(
      <AuthenticationContext.Provider value={{ token, setToken }}>
        <UserProfile navigate={navigate} />
      </AuthenticationContext.Provider>
    );
    cy.intercept('GET', '/profile/123', (req) => {
      req.reply({
        statusCode: 200,
        body: { username: 'someone', email: 'someone@example.com', message: 'Found user' }
      });
    }).as("findUserProfile");

    cy.wait("@findUserProfile").then(() => {
      cy.get('[data-cy="userProfile"]')
        .should('contain.text', "Hello, someone");
    });
  });
});
