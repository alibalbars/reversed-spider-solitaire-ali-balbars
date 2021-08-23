
describe("Card Deal", () => {
    beforeEach(() => {
        cy.visit('/');
    })
    
    it("should have 5 decks", () => {
        const stock = cy.get('[data-cy="stock"]');
        stock.find('img').should('have.length', 5)
    }); 

    it("should have 4 decks", () => {
        const stock = cy.get('[data-cy="stock"]');
        stock.click();
        stock.find('img').should('have.length', 4)

    }); 
});