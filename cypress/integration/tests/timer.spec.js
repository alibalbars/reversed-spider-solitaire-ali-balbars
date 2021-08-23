describe("Timer", () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('timer should be 00:00:00 ', () => {
        cy.wait(2200);
        cy.get('[data-cy="timer"]').contains('00:00:02');
    })
});