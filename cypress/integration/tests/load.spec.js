// const herokuUrl = "https://reversed-spyder-solitaire.herokuapp.com/";

describe("The Home Page", () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it("successfully loads", () => {
        cy.visit('/');
    });

    it('should have "reversed spider solitaire" title', () => {
        const title = cy.title();
        title.should('equal', "Reversed Spyder Solitaire")  
    })
});