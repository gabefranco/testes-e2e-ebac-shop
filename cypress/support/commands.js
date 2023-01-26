
//Login
/*Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, { log: false })
    cy.get('.woocommerce-form > .button').click()
});*/

//Produto com variações
Cypress.Commands.add('addProdutoVariavel', (busca, produto, tamanho, quantidade) => {
    cy.visit('produtos')
    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('.search').type(busca)
    cy.get('.search > .tbay-search-form > .form-ajax-search > .form-group > .input-group > .button-group').click()
    cy.get('.product-block')
        .contains(produto).click()
    cy.get('.button-variable-item-' + tamanho).click()
    cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()
    cy.get('.woocommerce-message').contains('foram adicionados no seu carrinho').should('be.visible')
})

//Produto simples
Cypress.Commands.add('addProdutoSimples', (busca, produto) => {
    cy.visit('produtos')
    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('.search').type(busca)
    cy.get('.search > .tbay-search-form > .form-ajax-search > .form-group > .input-group > .button-group').click()
    cy.get('.product-block')
        .contains(produto).click()
    cy.get('.single_add_to_cart_button').click()
    cy.get('.woocommerce-message').contains('foi adicionado no seu carrinho').should('be.visible')
})

//Produto simples, escolhe o primeiro da lista
Cypress.Commands.add('addProdutoSimplesPrimeiro', (busca) => {
    cy.visit('produtos')
    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('.search').type(busca)
    cy.get('.search > .tbay-search-form > .form-ajax-search > .form-group > .input-group > .button-group').click()
    cy.get('.product-block')
        .first().click()
    cy.get('.single_add_to_cart_button').click()
    cy.get('.woocommerce-message').contains('foi adicionado no seu carrinho').should('be.visible')
})

//Produto com variação, escolhe o segundo da lista.
Cypress.Commands.add('addProdutoVariavelSegundo', (busca, tamanho, cor, quantidade) => {
    cy.visit('produtos')
    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('.search').type(busca)
    cy.get('.search > .tbay-search-form > .form-ajax-search > .form-group > .input-group > .button-group').click()
    cy.get('.product-block')
        .eq(1).click()
    cy.get('.button-variable-item-' + tamanho).click()
    cy.get('.button-variable-item-' + cor).click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()
    cy.get('.woocommerce-message').contains('foram adicionados no seu carrinho').should('be.visible')
})