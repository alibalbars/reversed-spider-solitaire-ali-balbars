describe("Restart", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("successfully restart", () => {
        cy.get('[data-cy="restart"]').click();
        cy.get('[data-cy="score"]').contains('Score: 500');
    });
});
