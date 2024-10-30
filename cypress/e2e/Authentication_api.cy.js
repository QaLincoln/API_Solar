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

    it('Passando CPF/CNPJ vazio', () => {
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

    it('Passando Senha vazia', () => {
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

    it('Passando Senha invalida', () => {
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

    it('Passando CPF/CNPJ invalido', () => {
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

    it('Passando CPF/CNPJ invalido ', () => {
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

    it.only('Passando contactKey invalido ', () => {
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






       
// //User
//    it('Deve ter sucesso na rota POST authentication/user', () => {
//     const requestData = {
//         cpfOrCnpj: '93639644930',
//     };

//     cy.request({
//         method: 'POST',
//         url:  `${Cypress.env('apiUrl')}/authentication/user`, // Substitua pela URL da sua API
//         body: requestData,
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then((response) => {
       
//         cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI

//         // Verifique as respostas
            
//         expect(response.body).to.be.an('object')    // Verifique se a resposta é um objeto

//         // Validação das propriedades principais
//         expect(response.body).to.have.property('allowPassword', true);
//         expect(response.body).to.have.property('firstAccess', false);

//         // Validação do objeto aninhado 'data'
//         expect(response.body).to.have.property('data').that.is.an('object');
//         expect(response.body.data).to.have.property('firstName', 'Validacao');
//         expect(response.body.data).to.have.property('telphoneMasked', '85-*****-3076');
//         expect(response.body.data).to.have.property('formattedTelephone', '85-*****-3076');
//         expect(response.body.data).to.have.property('telphone', '85985763076');
//         expect(response.body.data).to.have.property('clientId', '0006445933');
//         expect(response.body.data).to.have.property('companyCode', null);
          	

//        });
//    });

//    it('Passando usuario com CPFCNPJ invalido', () => {
//     const requestData = {
//         cpfOrCnpj: '9363964493',
//     };


//     cy.request({
//         method: 'POST',
//         url: `${Cypress.env('apiUrl')}/authentication/user`, // Substitua pela URL da sua API
//         body: requestData,
//         failOnStatusCode: false,  // Isso permite capturar respostas com status de erro
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then((response) => {
       
//         cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI

//         // Verifique as respostas
            
//         expect(response.body).to.be.an('object')    // Verifique se a resposta é um objeto

//         // Verifique a resposta
//         expect(response.status).to.eq(400); // Verifique se o status é 200 
      
//         expect(response.body).to.have.property('error', 'Não conseguimos validar seu usuário.');      //('mensagem', 'Mensagem esperada')

//        });
//    });

//    it('Passando usuario com CPFCNPJ vazio', () => {
//     const requestData = {
//         cpfOrCnpj: '',
//     };


//     cy.request({
//         method: 'POST',
//         url: `${Cypress.env('apiUrl')}/authentication/user`, // Substitua pela URL da sua API
//         body: requestData,
//         failOnStatusCode: false,  // Isso permite capturar respostas com status de erro
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then((response) => {
       
//         cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI

//         // Verifique as respostas
            
//         expect(response.body).to.be.an('object')    // Verifique se a resposta é um objeto

//         // Verifique a resposta
//         expect(response.status).to.eq(400); // Verifique se o status é 200 
      
//         expect(response.body.message).to.be.an('array').that.is.not.empty;
//         expect(response.body.message[0]).to.have.property('property', 'cpfOrCnpj');
//         expect(response.body.message[0].constraints).to.have.property('isNotEmpty', 'cpfOrCnpj should not be empty');

//        });
//    });

// //Resete-password
//    it('Deve ter sucesso na rota POST reset-password', () => {
//     const requestData = {
//         "cpfOrCnpj": "93639644930",
//         "password": "Senha@123",
//         "code": "12345"
        
//     };

//     cy.request({
//         method: 'POST',
//         url: 'https://bff-dev-ri-0-app-solar-dev.apps.opshml.solarbr.com.br/authentication/reset-password', // Substitua pela URL da sua API
//         body: requestData,
//         failOnStatusCode: true,
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then((response) => {
       
//         cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI

//         // Verifique a resposta
//         expect(response.status).to.eq(200); // Verifique se o status é 200 
      
//         expect(response.body).to.have.property('message', 'A senha foi alterada com sucesso');      //('mensagem', 'Mensagem esperada')

//        });
//    });
   
//    it('Passando CPFCNPJ invalido', () => {
//     const requestData = {
//         "cpfOrCnpj": "9363964493",
//         "password": "Senha@123",
//         "code": "12345"
        
//     };

//     cy.request({
//         method: 'POST',
//         url: 'https://bff-dev-ri-0-app-solar-dev.apps.opshml.solarbr.com.br/authentication/reset-password', // Substitua pela URL da sua API
//         body: requestData,
//         failOnStatusCode: false,  // Isso permite capturar respostas com status de erro
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then((response) => {
       
//         cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI

//         // Verifique a resposta
//         expect(response.status).to.eq(401); // Verifique se o status é 200 
      
//         expect(response.body).to.have.property('error', 'Não conseguimos modificar sua senha.');      //('mensagem', 'Mensagem esperada')

//        });
//    });

//    it('Passando CPFCNPJ vazio', () => {
//     const requestData = {
//         "cpfOrCnpj": "",
//         "password": "Senha@123",
//         "code": "12345"
        
//     };

//     cy.request({
//         method: 'POST',
//         url: 'https://bff-dev-ri-0-app-solar-dev.apps.opshml.solarbr.com.br/authentication/reset-password', // Substitua pela URL da sua API
//         body: requestData,
//         failOnStatusCode: false,  // Isso permite capturar respostas com status de erro
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then((response) => {
       
//         cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI

//         // Valide a mensagem de erro
//         expect(response.body).to.have.property('error', 'Bad Request');
//         expect(response.body).to.have.property('statusCode', 400);
       
//         // Valida a estrutura da mensagem
//         expect(response.body.message).to.be.an('array').that.is.not.empty;
//         expect(response.body.message[0]).to.have.property('property', 'cpfOrCnpj');
//         expect(response.body.message[0].constraints).to.have.property('isNotEmpty', 'cpfOrCnpj should not be empty');

//        });
//    });

//    it('Passando Senha vazia', () => {
//     const requestData = {
//         "cpfOrCnpj": "93639644930",
//         "password": "",
//         "code": "12345"
        
//     };

//     cy.request({
//         method: 'POST',
//         url: 'https://bff-dev-ri-0-app-solar-dev.apps.opshml.solarbr.com.br/authentication/reset-password', // Substitua pela URL da sua API
//         body: requestData,
//         failOnStatusCode: false,  // Isso permite capturar respostas com status de erro
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then((response) => {
       
//         cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI

//         // Valide a mensagem de erro
//         expect(response.body).to.have.property('error', 'Bad Request');
//         expect(response.body).to.have.property('statusCode', 400);
       
//         // Valida a estrutura da mensagem
//         expect(response.body.message).to.be.an('array').that.is.not.empty;
//         expect(response.body.message[0]).to.have.property('property', 'password');
//         expect(response.body.message[0].constraints).to.have.property('isNotEmpty', 'password should not be empty');

//        });
//    });

// //User/address   
//    it('Deve ter sucesso na rota GET user/address', () => {
//         // Verifique se o token e a URL estão definidos
//         const token = Cypress.env('token');
//         const apiUrl = Cypress.env('apiUrl'); // A URL base da API

//         cy.request({
//             method: 'GET',
//             url: `${apiUrl}/user/address`, // Corrigido: Usando template string para concatenar
//             headers: {
//                 Authorization: `Bearer ${token}` // Usa o token armazenado
//             },
//             failOnStatusCode: false // Permite tratamento manual de erros
//         }).then((response) => {
//             cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI

//             // Verifique o status da resposta
//             expect(response.status).to.eq(200, 'O status da resposta deve ser 200');

//             // Valide o corpo da resposta
//             expect(response.body).to.have.property('address', 'R VINTE E OITO,   SANTA MARIA, ARACAJU - SE, 49043-772');
//         });
//    });

// //User/user-infos   
//    it('Deve ter sucesso na rota POST user/user-infos', () => {
//     const requestData = {
//         telephone: '85985763076',
//         smsCode: '12345',
//         email: 'ldrodrigues@solar.com.br'
//     };

//     cy.request('PACH', `${Cypress.env('apiUrl')}/user/user-infos`, {
//         cpfOrCnpj: Cypress.env('cpfOrCnpj'),
//         password: Cypress.env('password'),
//         firstAccess: true
       
//       })
//       .then((response) => {

//          cy.log(JSON.stringify(response.body));     // Exibir a resposta de LOG no Cypress GUI 
//          expect(response.status).to.eq(200);
//          expect(response.body).to.have.property('authorization'); // Verifique se o authorization está presente na resposta
          
//          token = response.body.authorization;
//          Cypress.env('token', token); // Armazena o token como variável de ambiente
//       })
//     })




   });





