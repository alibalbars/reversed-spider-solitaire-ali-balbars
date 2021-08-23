// const herokuUrl = "https://reversed-spyder-solitaire.herokuapp.com/";

describe("The Home Page", () => {
    it("successfully loads", () => {
        cy.visit('/');
    });
});