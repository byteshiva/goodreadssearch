// https://docs.cypress.io/api/introduction/api.html

describe('Goodread Search App Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('.display-5', ';Goodreads Search Center;')
    const keyword = 'Nancy'
    const searchMsg = 'Search!'
    const aboutMsg = 'About'
    const homeMsg = 'Home'
    cy.get('input.form-control').should('be.empty')
    cy.get(':button').should('be.disabled')

    cy.get('input.form-control') // 2.
    .type(keyword)
    
    cy.contains('button#btn',searchMsg)
    .should('contain', searchMsg).click()    
    
    cy.contains('.gd > div:nth-child(2) > ul:nth-child(3) > li:nth-child(5) > a:nth-child(1)','5').click()    // 6.
    cy.url()                   // 8.
     .should('include', 'pd/5/kw/'+keyword) 
    cy.contains('button#btn',searchMsg)
    .should('contain', searchMsg)
    .click()    
    
    cy.contains('#nav > a:nth-child(2)',aboutMsg)
    .should('contain', aboutMsg)
    .click()

    cy.contains('a.router-link-active:nth-child(1)',homeMsg)
    .should('contain', homeMsg)
    .click()

    cy.url()                   // 8.
    .should('include', '/') 
    cy.get('input.form-control').should('be.empty')
    cy.get(':button').should('be.disabled')

  })
})
