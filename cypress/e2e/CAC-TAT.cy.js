describe('Central de Atendimento ao Cliente TAT', function() {
    const TREE_SECONDS_IN_MS =3000
    beforeEach(() => {
        cy.visit("./src/index.html");
    });
  it('verifica o título da aplicação', function() {
    
    cy.title().should('eq','Central de Atendimento ao Cliente TAT');
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('teste',20)
    cy.clock();
    cy.get('#firstName').type('jonatas');
    cy.get('#lastName').type('campista');
    cy.get('#email').type('teste@gmail.com');
    cy.get('#open-text-area').type(longText,{delay: 0});
    cy.get('button[type="submit"').click();

    cy.get('.success').should('be.visible','Mensagem enviada com sucesso.');
    cy.tick(TREE_SECONDS_IN_MS);
    cy.get('.success').should('not.be.visible','Mensagem enviada com sucesso.');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    cy.get('#firstName').type('jonatas');
    cy.get('#lastName').type('campista');
    cy.get('#email').type('teste@gmail,com');
    cy.get('#open-text-area').type('teste');
    cy.get('button[type="submit"').click();

    cy.get('.error').should('be.visible','Valide os campos obrigatórios!')
    
    cy.tick(TREE_SECONDS_IN_MS);
    cy.get('.error').should('not.be.visible','Valide os campos obrigatórios!')
  });
  
  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone')
      .type('teste')
      .should('have.value','');
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.get('#firstName').type('jonatas');
    cy.get('#lastName').type('campista');
    cy.get('#email').type('teste@gmail.com');
    cy.get('#phone-checkbox').check().should('be.checked');
    cy.get('#open-text-area').type('teste');
    
    cy.get('button[type="submit"').click();
    cy.get('.error').should('be.visible','Valide os campos obrigatórios!')
    cy.tick(TREE_SECONDS_IN_MS);
    cy.get('.error').should('not.be.visible','Valide os campos obrigatórios!')
    
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('jonatas')
      .should('have.value','jonatas')
      .clear()
      .should('have.value','');
      cy.get('#lastName')
      .type('campista')
      .should('have.value','campista')
      .clear()
      .should('have.value','');
      cy.get('#email')
      .type('teste@gmail.com')
      .should('have.value','teste@gmail.com')
      .clear()
      .should('have.value','');
      cy.get('#open-text-area')
      .type('teste')
      .should('have.value','teste')
      .clear()
      .should('have.value','');
      cy.get('#phone')
      .type('123456789')
      .should('have.value','123456789')
      .clear()
      .should('have.value','');
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    cy.clock();
    cy.get('button[type="submit"').click();

    cy.get('.error').should('be.visible','Valide os campos obrigatórios!');
    cy.tick(TREE_SECONDS_IN_MS);
    cy.get('.error').should('not.be.visible','Valide os campos obrigatórios!');
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit();

    cy.get('.success').should('be.visible','Mensagem enviada com sucesso.');
    cy.tick(TREE_SECONDS_IN_MS);
    cy.get('.success').should('not.be.visible','Mensagem enviada com sucesso.');
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value','mentoria');
  });

  it('seleciona um produto (Mentoria) por seu texto', () => {
    cy.get('#product')
      .select('Mentoria')
      .should('have.value','mentoria');
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value','blog');
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
      .and('have.value','feedback');

  });

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
       .should('have.length',3)
       .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
       });
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked');
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('samplefile');
    cy.get('input[type="file"]')
      .selectFile('@samplefile')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr','target','_blank')
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr','target')
      .click()

      cy.contains('Política de privacidade').should('be.visible')
  });

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', () => {
    const longText = Cypress._.repeat('teste',20)
    cy.get('#open-text-area')
      .invoke('val',longText)
      .should('have.value',longText);
    
  });

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should((response) =>{
        const {status,statusText,body} = response
        expect(status).to.equal(200);
        expect(statusText).to.equal('OK');
        expect(body).to.include('CAC TAT');
        
      })
  });

  it('Encontra o gato escondido', () => {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
  });
})

