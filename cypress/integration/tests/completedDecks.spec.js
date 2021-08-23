describe("Completed deck placeholder count", () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it("sholud have 8 placeholder", () => {
        const completedDecks = cy.get('[data-cy="completed-decks"]');
        completedDecks.find('div').should('have.length', 8)
    }); 
});