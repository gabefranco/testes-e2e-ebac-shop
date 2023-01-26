/// <reference types="cypress" />

import EnderecoPage from '../support/page_objects/endereco.page'

const endEntrega = require('../fixtures/endEntrega.json')

const faker = require('faker-br')



describe('Teste de E2E - Login, Compras, Carrinho, Alteração Cadastro e Finalização', () => {

    //LOGIN DA FORMA TRADICIONAL SEM CUSTOMIZAR COMANDOS
    it('Deve fazer login com sucesso - sem otimização', () => {
        cy.visit('http://lojaebac.ebaconline.art.br')
        cy.get('.icon-user-unfollow').click()
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
       cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac')
    })



    //01 - Alterando dados de Faturamento
   /* it('Alteração de dados Faturamento - usando PAGE OBJECTS', () => {
        var nomeFaker = faker.name.firstName()
        var sobrenomeFaker = faker.name.lastName()
        var empresaFaker = faker.company.companyName()
        var paisFaker = faker.address.country()
        var enderecoFaker = faker.address.streetAddress()
        var complementoFaker = faker.address.secondaryAddress()
        var cidadeFaker = faker.address.city()
        var estadoFaker = faker.address.state()
        var cepFaker = faker.address.zipCode()
        var telefoneFaker = faker.phone.phoneNumber()
        var emailFaker = faker.internet.email()

        EnderecoPage.alterarEnderecoFaturamento(nomeFaker, sobrenomeFaker, empresaFaker, paisFaker, enderecoFaker, complementoFaker, cidadeFaker, estadoFaker, cepFaker, telefoneFaker, emailFaker),
        cy.get('.woocommerce-message').should('contain', "Endereço alterado com sucesso.")
    })*/

    it('Alteração de dados Entrega - usando arquivo de dados FIXTURE', () => {
        EnderecoPage.alterarEnderecoEntrega(
            endEntrega[0].nome,
            endEntrega[0].sobrenome,
            endEntrega[0].empresa,
            endEntrega[0].endereco,
            endEntrega[0].numero,
            endEntrega[0].cidade,
            endEntrega[0].estado,
            endEntrega[0].pais,
            endEntrega[0].cep
        )
        cy.get('.woocommerce-message').should('contain', "Endereço alterado com sucesso.")
    })

    //02 - Escolhendo os produtos - Comprando
    it('Deve selecionar os produtos e colocar no carrinho', () => {
        cy.addProdutoVariavel('Tank', 'Gym', 'M', '2')
        cy.addProdutoSimples('Shoes', 'Granite')
        cy.addProdutoSimplesPrimeiro('Agasalho')
        cy.addProdutoVariavelSegundo('Street', 'M', 'Orange', '2')
    });



    it('Demais etapas', () => {

        //03 - VER CARRINHO
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        //04 - FINALIZAR COMPRA
        cy.get('#terms').click()
        cy.get('#place_order').click()

        //05 - FIM DO PEDIDO E VERIFICAÇÃO
        cy.get('.woocommerce-notice').contains('Obrigado. Seu pedido foi recebido.').should('be.visible')

    })
})