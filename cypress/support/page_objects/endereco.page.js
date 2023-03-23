class EnderecoPage {

    alterarEnderecoFaturamento(nomeF, sobrenomeF, empresaF, paisF, enderecoF, complementoF, cidadeF, estadoF, cepF, telefoneF, emailF) {
        cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a').click()
        cy.get(':nth-child(1) > .title > .edit').click()

        cy.get('#billing_first_name').clear().type(nomeF)
        cy.get('#billing_last_name').clear().type(sobrenomeF)
        cy.get('#billing_company').clear().type(empresaF)

        cy.get('#select2-billing_country-container').click().type(paisF).get('[aria-selected="true"]').click()
        cy.get('#billing_address_1').clear().type(enderecoF)
        cy.get('#billing_address_2').clear().type(complementoF)
        cy.get('#billing_city').clear().type(cidadeF)
        cy.get('#select2-billing_state-container').click().type(estadoF + '{enter}')
        cy.get('#billing_postcode').clear().type(cepF)
        cy.get('#billing_phone').clear().type(telefoneF)
        cy.get('#billing_email').clear().type(emailF)
        cy.get(':nth-child(2) > .button').click()
    }

    alterarEnderecoEntrega(nome, sobrenome, empresa, pais, endereco, numero, cidade, estado, cep) {
        cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a').click()
        cy.get(':nth-child(2) > .title > .edit').click()

        cy.get('#shipping_first_name').clear().type(nome)
        cy.get('#shipping_last_name').clear().type(sobrenome)
        cy.get('#shipping_company').clear().type(empresa)

        cy.get('#select2-shipping_country-container').click().type(pais + '{enter}')
        cy.get('#shipping_address_1').clear().type(endereco)
        cy.get('#shipping_address_2').clear().type(numero)
        cy.get('#shipping_city').clear().type(cidade)
        cy.get('#select2-shipping_state-container').click().type(estado + '{enter}')
        cy.get('#shipping_postcode').clear().type(cep)
        cy.get(':nth-child(2) > .button').click()
    }
}

export default new EnderecoPage()