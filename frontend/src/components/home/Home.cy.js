describe('Home', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders the component', () => {
    cy.get('h1').should('contain', 'Welcome to Acebook')
  })
})
