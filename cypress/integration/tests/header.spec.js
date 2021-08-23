describe("Header", () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('header title should be Score: 500 ', () => {
        cy.get('[data-cy="score"]').contains('Score: 500');
    })

    it('winCount should be 0', () => {
        cy.get('[data-cy="winCount"]').contains('0');
    })

});