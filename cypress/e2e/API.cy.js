describe('Teste de API Solar', () => {

  const AUTHORIZATION_TOKEN  = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmVlMmZhYS01MzVmLTRjZWYtODY0My1jYjNjZTA5NmY1ZjYiLCJhZG9wdGVyTmFtZSI6IkFsaW5lIENvZWxobyIsImlhdCI6MTcyOTU0MjE5MSwiZXhwIjoxNzI5ODAxMzkxfQ.Fi4oEFufp6fY7imOjTq82vUcXH_zYcXiLsRcA5XkLww`

  it('Deve ter sucesso na rota POST authentication/login', () => {
    const requestData = {
        cpfOrCnpj: '93639644930',
        password: 'Senha@123',
        firstAccess: true
    };

    cy.request({
        method: 'POST',
        url: 'https://bff-dev-ri-0-app-solar-dev.apps.opshml.solarbr.com.br/authentication/login', // Substitua pela URL da sua API
        body: requestData,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
       
        cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI

        // Verifique a resposta
        expect(response.status).to.eq(200); // Verifique se o status é 200 
        expect(response.body).to.have.property('authorization'); // Verifique se o authorization está presente na resposta

       });
   });
   

   it.only('Deve ter sucesso na rota POST authentication/user', () => {
    const requestData = {
        cpfOrCnpj: '93639644930',
    };

    cy.request({
        method: 'POST',
        url: 'https://bff-dev-ri-0-app-solar-dev.apps.opshml.solarbr.com.br/authentication/user', // Substitua pela URL da sua API
        body: requestData,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
       
        cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI

        // Verifique as respostas
            
        expect(response.body).to.be.an('object')    // Verifique se a resposta é um objeto

        // Validação das propriedades principais
        expect(response.body).to.have.property('allowPassword', true);
        expect(response.body).to.have.property('firstAccess', false);

        // Validação do objeto aninhado 'data'
        expect(response.body).to.have.property('data').that.is.an('object');
        expect(response.body.data).to.have.property('firstName', 'Validacao');
        expect(response.body.data).to.have.property('telphoneMasked', '85-*****-6060');
        expect(response.body.data).to.have.property('formattedTelephone', '85-*****-6060');
        expect(response.body.data).to.have.property('telphone', '85981516060');
        expect(response.body.data).to.have.property('clientId', '0006445933');
        expect(response.body.data).to.have.property('companyCode', null);
          	

       });
   });





    
  it.only('Deve retornar um status 200 para a requisição GET', () => {

     cy.request({
        method: 'GET',
        url: 'https://bff-dev-ri-0-app-solar-dev.apps.opshml.solarbr.com.br/api/docs#/Account/AccountController_createUser',
        headers: {
            'Authorization': AUTHORIZATION_TOKEN,
            'Content-Type': 'application/json'
        }
     }).then((res) => {
            expect(res.status).to.eq(200)
             expect(res.body).is.not.empty
            // expect(res.body).to.have.property('msg') // Verifique o que você espera na resposta
     })
  })
  
})