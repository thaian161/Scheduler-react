describe('Appointments', () => {
  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');

    cy.visit('/');

    cy.contains('Monday');
  });

  it('should book an interview', () => {
    cy.get('[alt=Add]').first().click();

    cy.get('[data-testid=student-name-input]').type('Whitney King');
    cy.get('[alt="Sylvia Palmer"]').click();

    cy.contains('Save').click();

    cy.contains('.appointment__card--show', 'Whitney King');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('should edit an interview', () => {
    cy.get('[alt=Edit]').first().click({ force: true });

    cy.get('[data-testid=student-name-input]')
      .clear()
      .type('Annn Testting');
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains('Save').click();

    cy.contains('.appointment__card--show', 'Annn Testting');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
  });

  it('should cancel an interview', () => {
    cy.get('[alt=Delete]').click({ force: true });

    cy.contains('Confirm').click();

    cy.contains('DELETING').should('exist');
    cy.contains('DELETING').should('not.exist');

    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});
