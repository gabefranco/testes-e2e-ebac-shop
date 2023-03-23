/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

import EnderecoPage from '../support/page_objects/endereco.page';

const endEntrega = require('../fixtures/endEntrega.json');

describe('Teste de E2E - Login, Compras, Carrinho, Alteração Cadastro e Finalização', () => {
    it('Deve fazer login com sucesso - sem otimização', () => {
        cy.visit('/')
        cy.get('.icon-user-unfollow').click()
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá,')

        EnderecoPage.alterarEnderecoFaturamento(
            faker.name.firstName(),
            faker.name.lastName(),
            faker.company.name(),
            "Brasil",
            faker.address.streetAddress(),
            faker.address.secondaryAddress(),
            faker.address.cityName(),
            "São Paulo",
            faker.address.zipCode('#####-###'),
            faker.phone.number('## #### ####'),
            faker.internet.email());
        cy.get('.woocommerce-message').should('contain', "Endereço alterado com sucesso.");

        EnderecoPage.alterarEnderecoEntrega(
            endEntrega[0].nome,
            endEntrega[0].sobrenome,
            endEntrega[0].empresa,
            endEntrega[0].pais,
            endEntrega[0].endereco,
            endEntrega[0].numero,
            endEntrega[0].cidade,
            endEntrega[0].estado,
            endEntrega[0].cep);
        cy.get('.woocommerce-message').should('contain', "Endereço alterado com sucesso.")

        cy.addProdutoVariavel('Tank', 'Gym', 'M', '2')
        cy.addProdutoSimples('Denim', 'Pants')
        cy.addProdutoSimplesPrimeiro('Teste HB')
        cy.addProdutoVariavelSegundo('Street', 'M', 'Orange', '2')

        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        cy.get('#terms').click()
        cy.get('#place_order').click()

        cy.get('.woocommerce-notice').contains('Obrigado. Seu pedido foi recebido.').should('be.visible')
    })
});