import Home from './Home';

describe('Home page', () => {
  it('displays a welcome message', () => {
    cy.visit('/')
    cy.contains('Welcome to Acebook')
  })
})
