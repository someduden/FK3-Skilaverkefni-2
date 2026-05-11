describe('Task flow', () => {
  it('creates a project, adds a task, and marks it complete', () => {
    cy.visit('http://localhost:5173');

    cy.get('[data-testid="add-project-btn"]').click();
    cy.get('[data-testid="project-name-input"]').type('Test Project');
    cy.get('[data-testid="project-description-input"]').type('Test');
    cy.get('[data-testid="submit-project-btn"]').click();

    cy.get('[data-testid="project-name"]').click();

    cy.get('[data-testid="add-task-btn"]').click();
    cy.get('[data-testid="task-input"]').type('My first task');
    cy.get('[data-testid="task-description-input"]').type('Test');
    cy.get('[data-testid="submit-task-btn"]').click();

    cy.get('[data-testid="task-title"]').should('contain', 'My first task');

    cy.get('[data-testid^="task-row-"]')
      .contains('My first task')
      .closest('[data-testid^="task-row-"]')
      .as('taskRow');

    cy.get('@taskRow').find('[data-testid="task-checkbox-btn"]').click();

    cy.get('@taskRow').should('have.attr', 'data-completed', 'true');
  });
});
