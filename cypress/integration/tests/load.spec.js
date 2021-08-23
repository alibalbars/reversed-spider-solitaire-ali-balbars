describe("Load Home Page", () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it("successfully loads", () => {
        cy.visit('/');
    });

    it('should have "reversed spider solitaire" title', () => {
        const title = cy.title();
        title.should('equal', 'Reversed Spider Solitaire')  
    })
});