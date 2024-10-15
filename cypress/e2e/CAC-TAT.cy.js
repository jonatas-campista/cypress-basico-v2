describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit("./src/index.html");
    });
  it('verifica o título da aplicação', function() {
    
    cy.title().should('eq','Central de Atendimento ao Cliente TAT');
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,'
    
    cy.get('#firstName').type('jonatas');
    cy.get('#lastName').type('campista');
    cy.get('#email').type('teste@gmail.com');
    cy.get('#open-text-area').type(longText,{delay: 0});
    cy.get('button[type="submit"').click();

    cy.get('.success').should('be.visible','Mensagem enviada com sucesso.');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('jonatas');
    cy.get('#lastName').type('campista');
    cy.get('#email').type('teste@gmail,com');
    cy.get('#open-text-area').type('teste');
    cy.get('button[type="submit"').click();

    cy.get('.error').should('be.visible','Valide os campos obrigatórios!')
  });
  
  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone')
      .type('teste')
      .should('have.value','');
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('jonatas');
    cy.get('#lastName').type('campista');
    cy.get('#email').type('teste@gmail.com');
    cy.get('#phone-checkbox').check().should('be.checked');
    cy.get('#open-text-area').type('teste');
    
    cy.get('button[type="submit"').click();

    cy.get('.error').should('be.visible','Valide os campos obrigatórios!')
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
    cy.get('button[type="submit"').click();

    cy.get('.error').should('be.visible','Valide os campos obrigatórios!')
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get('.success').should('be.visible','Mensagem enviada com sucesso.');
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

  it.only('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked');
  });

})

