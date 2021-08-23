describe("Deck count", () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it("deck count should be 84", () => {
        const decks = cy.get('[data-cy="decks"]');
        decks.find('div').should('have.length', 84)
    }); 
});