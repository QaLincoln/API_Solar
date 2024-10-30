describe('Teste de API Solar', () => {
let token
       
     
//Login 
    it('Deve ter sucesso na rota POST clients/authentication/login', () => {
    const requestData = {
        cpfOrCnpj: Cypress.env('cpfOrCnpj'),
        password: Cypress.env('password'),
        firstAccess: true
    };


    cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/clients/authentication/login`,
        body: requestData,          //passa credenciais do cliente
        firstAccess: true,      
        headers: {
          Authorization: `Bearer ${ Cypress.env('AUTH_TOKEN')}`  //pega o token cypress.config.js
        },
        
      }).then((response) => {
        // Verifique se o login foi bem-sucedido
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('authorization'); // Verifique se o authorization está presente na resposta
        cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI
   
      })
    })

    it('Passando CPF/CNPJ vazio na rota POST', () => {
        const requestData = {
            "cpfOrCnpj": "",
            "password": "Senha@123",
            "code": "12345"
            
        };
    
        cy.request({
            method: 'POST',
            url: `${Cypress.env('apiUrl')}/clients/authentication/login`,
            body: requestData,          //passa credenciais do cliente
            firstAccess: true,
            failOnStatusCode: false,  // Isso permite capturar respostas com status de erro      
            headers: {
              Authorization: `Bearer ${ Cypress.env('AUTH_TOKEN')}`  //pega o token cypress.config.js
            },

        }).then((response) => {
           
            cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI
    
            // Valide a mensagem de erro
            expect(response.body).to.have.property('error', 'Bad Request');
            expect(response.body).to.have.property('statusCode', 400);
           
            // Valida a estrutura da mensagem
            expect(response.body.message).to.be.an('array').that.is.not.empty;
            expect(response.body.message[0]).to.have.property('property', 'cpfOrCnpj');
            expect(response.body.message[0].constraints).to.have.property('isNotEmpty', 'cpfOrCnpj should not be empty');
    
           });
    });

    it('Passando Senha vazia na rota POST', () => {
    const requestData = {
        "cpfOrCnpj": "93639644930",
        "password": "",
        "code": "12345"
            
    };
    
    cy.request({
         method: 'POST',
         url: `${Cypress.env('apiUrl')}/clients/authentication/login`,
         body: requestData,          //passa credenciais do cliente
         firstAccess: true,
         failOnStatusCode: false,  // Isso permite capturar respostas com status de erro      
         headers: {
             Authorization: `Bearer ${ Cypress.env('AUTH_TOKEN')}`  //pega o token cypress.config.js
        },

    }).then((response) => {
           
        cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI
    
        // Valide a mensagem de erro
        expect(response.body).to.have.property('error', 'Bad Request');
        expect(response.body).to.have.property('statusCode', 400);
           
        // Valida a estrutura da mensagem
        expect(response.body.message).to.be.an('array').that.is.not.empty;
        expect(response.body.message[0]).to.have.property('property', 'password');
        expect(response.body.message[0].constraints).to.have.property('isNotEmpty', 'password should not be empty');
    
           });
    });

    it('Passando Senha invalida na rota POST', () => {
        const requestData = {
            "cpfOrCnpj": "93639644930",
            "password": "1",
            "code": "12345"
                
        };
        
        cy.request({
             method: 'POST',
             url: `${Cypress.env('apiUrl')}/clients/authentication/login`,
             body: requestData,          //passa credenciais do cliente
             firstAccess: true,
             failOnStatusCode: false,  // Isso permite capturar respostas com status de erro      
             headers: {
                 Authorization: `Bearer ${ Cypress.env('AUTH_TOKEN')}`  //pega o token cypress.config.js
            },
    
        }).then((response) => {
               
            cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI
        
            // Valide a mensagem de erro
            expect(response.body).to.have.property('error', 'Unauthorized');
            expect(response.body).to.have.property('statusCode', 401);
            expect(response.body).to.have.property('message', 'Usuário ou Senha inválida.');
            expect(response.body).to.have.property('error', 'Unauthorized');                 
                    
        });
    });

    it('Passando CPF/CNPJ invalido na rota POST', () => {
        const requestData = {
            "cpfOrCnpj": "9363964493",
            "password": "Senha@123",
            "code": "12345"
                
        };
        
        cy.request({
             method: 'POST',
             url: `${Cypress.env('apiUrl')}/clients/authentication/login`,
             body: requestData,          //passa credenciais do cliente
             firstAccess: true,
             failOnStatusCode: false,  // Isso permite capturar respostas com status de erro      
             headers: {
                 Authorization: `Bearer ${ Cypress.env('AUTH_TOKEN')}`  //pega o token cypress.config.js
            },
    
        }).then((response) => {             
                 
            
            // Valide a mensagem de erro
            expect(response.body).to.have.property('error', 'Bad Request');
            expect(response.body).to.have.property('statusCode', 400);
           
            // Valida a estrutura da mensagem
            expect(response.body.message).to.be.an('array').that.is.not.empty;
            expect(response.body.message[0]).to.have.property('value', '9363964493');
            expect(response.body.message[0]).to.have.property('property', 'cpfOrCnpj');
            expect(response.body.message[0].constraints).to.have.property('IsCpfOrCnpjConstraint', 'CPF ou CNPJ inválido!');   
            
            cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI  
                    
        });
    }); 
    
//Enviar codigo de verificação para alterar senha

    it('Deve ter sucesso na rota POST clients/authentication/verification-code', () => {
        const requestData = {
            "cpfOrCnpj": "93639644930",
            "contactKey": "telphoneMasked"          //retorna o telefone do elastic
        };


        cy.request({
            method: 'POST',
            url: `${Cypress.env('apiUrl')}/clients/authentication/verification-code`,
            body: requestData,          //passa credenciais do cliente
            firstAccess: true,      
            headers: {
            Authorization: `Bearer ${ Cypress.env('AUTH_TOKEN')}`  //pega o token cypress.config.js
            },
            
            
        }).then((response) => {
            // Verifique se o login foi bem-sucedido
            expect(response.status).to.eq(201);
           
            cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI
    
        })	
    })

    it('Passando CPF/CNPJ invalido na rota POST', () => {
        const requestData = {
            "cpfOrCnpj": "9363964493",
            "contactKey": "telphoneMasked"          //retorna o telefone do elastic
        };


        cy.request({
            method: 'POST',
            url: `${Cypress.env('apiUrl')}/clients/authentication/verification-code`,
            body: requestData,          //passa credenciais do cliente
            firstAccess: true,
            failOnStatusCode: false,  // Isso permite capturar respostas com status de erro       
            headers: {
            Authorization: `Bearer ${ Cypress.env('AUTH_TOKEN')}`  //pega o token cypress.config.js
            },
            
            
        }).then((response) => {
            // Verifique se o login foi bem-sucedido
            expect(response.body).to.have.property('error', 'Bad Request');
            expect(response.body).to.have.property('statusCode', 400);
           
            // Valida a estrutura da mensagem
            expect(response.body.message).to.be.an('array').that.is.not.empty;
            expect(response.body.message[0]).to.have.property('value', '9363964493');
            expect(response.body.message[0]).to.have.property('property', 'cpfOrCnpj');
            expect(response.body.message[0].constraints).to.have.property('IsCpfOrCnpjConstraint', 'CPF ou CNPJ inválido');   
            
            cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI  
    
        })	
    })     

    it.only('Passando contactKey invalido na rota POST ', () => {
        const requestData = {
            "cpfOrCnpj": "93639644930",
            "contactKey": "telphoneMaske"          //retorna o telefone do elastic
        };


        cy.request({
            method: 'POST',
            url: `${Cypress.env('apiUrl')}/clients/authentication/verification-code`,
            body: requestData,          //passa credenciais do cliente
            firstAccess: true,
            failOnStatusCode: false,  // Isso permite capturar respostas com status de erro       
            headers: {
            Authorization: `Bearer ${ Cypress.env('AUTH_TOKEN')}`  //pega o token cypress.config.js
            },
            
            
        }).then((response) => {
            // Verifique se o login foi bem-sucedido
            expect(response.body).to.have.property('error', 'Bad Request');
            expect(response.body).to.have.property('statusCode', 400);
           
            // Valida a estrutura da mensagem
            expect(response.body.message).to.be.an('array').that.is.not.empty;
            expect(response.body.message[0]).to.have.property('value', 'telphoneMaske');
            expect(response.body.message[0]).to.have.property('property', 'contactKey');
            expect(response.body.message[0].constraints).to.have.property('isEnum', 'contactKey must be one of the following values: ');   
            
            cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI  
    
        })	
    })



   });





