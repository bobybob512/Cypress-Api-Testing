/// <reference types = "cypress" />

describe('Learn REST API Testing with Cypress', () => {
  it('passes', () => {
    cy.request('/users/2').then((response) => {
      cy.log(JSON.stringify(response.body.data.email))
      cy.log(JSON.stringify(response.headers))
    })
  })

  it('API Tests - Validate Headers', () => {
    cy.request('/user/2').as('whateverUser')
    cy.get('@whateverUser')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')

    cy.get('@whateverUser')
      .its('headers')
      .its('connection')
      .should('include', 'keep-alive')
  })

  it('API Tests Status Codes', () => {
    cy.request('/user/2').as('existingUser')
    cy.get('@existingUser').its('status').should('equal', 200)

    cy.request({ url: '/users/non-exist', failOnStatusCode: false }).as('nonExistingUser')
    cy.get('@nonExistingUser').its('status').should('equal', 404)
  })

  it.only('API Tests - GET Request', () => {
    cy.request({url: '/users/2', method: 'GET'}).as('whateverUser')
    cy.get('@whateverUser').then((res) => {
      cy.log(JSON.stringify(res.body))
      expect(res.body.data.id).equal(2)
      expect(res.body.data.email).contain('janet.weaver@reqres.in')
      expect(res.body.data.last_name).not.to.contain('SomeFunnyName')

      const userID = res.body.data.id
      expect(userID).to.equal(2)
    })
  })

})