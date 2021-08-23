import * as UTIL from "../../utils/utils";
import exampleInitialData from "./exampleInitialData";
import * as _ from "lodash";

describe("utils functions tests", () => {
    describe("isNumber function", () => {
        test("it should throw error when argument undefined or null", () => {
            expect(() => UTIL.isNumber(undefined)).toThrowError(
                "Argument is null or undefined"
            );
        });
        test("it should return true when argument is number", () => {
            const num = 1;
            expect(UTIL.isNumber(num)).toBeTruthy();
        });
    });

    describe("getNumericRank function", () => {
        test("it should throw error when argument undefined or null", () => {
            expect(() => UTIL.getNumericRank(undefined)).toThrowError(
                "Argument is null or undefined"
            );
        });
        test("it should return 13 when passing K", () => {
            const rank = "K";

            expect(UTIL.getNumericRank(rank)).toBe(13);
        });
        test("it should return 2 when passing 2", () => {
            const rank = 2;

            expect(UTIL.getNumericRank(rank)).toBe(2);
        });
    });

    describe("isSerial function", () => {
        test("it should throw error when argument undefined or null", () => {
            expect(() => UTIL.isSerial(undefined)).toThrowError(
                "Argument is null or undefined"
            );
        });

        test("it should return true when given array is Serial", () => {
            const serialArray = [5, 6, 7, 8];
            const result = UTIL.isSerial(serialArray);
            expect(result).toBeTruthy();
        });
    });

    describe("getSerialRanks function", () => {
        test("it should throw error when argument undefined or null", () => {
            expect(() => UTIL.getSerialRanks(undefined)).toThrowError(
                "Argument is null or undefined"
            );
        });

        test("it should return serialRanks after given index", () => {
            const deckExample = { cards: [{}, {}, {}, {}, {}, {}] };
            const index = 4;

            const result = UTIL.getSerialIndexes(deckExample, index);
            expect(result).toEqual([4, 5]);
        });
    });

    describe("isDraggable function", () => {
        test("it should throw error when argument undefined or null", () => {
            expect(() => UTIL.isDraggable(undefined)).toThrowError(
                "Argument is null or undefined"
            );
        });

        test("it should return true when decks serialRanks is Serial", () => {
            const deckExample = {
                cards: [{ rank: 3 }, { rank: 4 }, { rank: 5 }, { rank: 6 }],
            };
            const index = 0;

            const result = UTIL.isDraggable(deckExample, index);
            expect(result).toBeTruthy();
        });
    });

    describe("getSerialIndexes function", () => {
        test("it should throw error when argument undefined or null", () => {
            expect(() => UTIL.getSerialIndexes(undefined)).toThrowError(
                "Argument is null or undefined"
            );
        });

        test("it should return serialIndexes after given index", () => {
            const deckExample = { cards: [{}, {}, {}, {}, {}, {}] };
            const index = 4;

            const result = UTIL.getSerialIndexes(deckExample, index);
            expect(result).toEqual([4, 5]);
        });
    });

    describe("isDroppable function", () => {
        test("it should throw error when argument undefined or null", () => {
            expect(() => UTIL.isDroppable(undefined)).toThrowError(
                "Argument is null or undefined"
            );
        });
        test("it should return true when selected card is droppable for deck", () => {
            const card = { rank: 5 };
            const droppableDeck = { cards: [{}, {}, {}, {}, {}, { rank: 4 }] };

            const result = UTIL.isDroppable(card, droppableDeck);
            expect(result).toBeTruthy();
        });
    });

    

    describe("getNewScore function", () => {
        test("it should throw error when argument undefined or null", () => {
            expect(() => UTIL.getNewScore(undefined)).toThrowError(
                "Argument is null or undefined"
            );
        });
        test("it should return newScore correctly", () => {
            const score = 100;
            const num = 1;
            const result = UTIL.getNewScore(score, num);
            expect(result).toBe(101);
        });
    });

    describe("getOpenCardCount function", () => {
        test("it should throw error when argument undefined or null", () => {
            expect(() => UTIL.getOpenCardCount(undefined)).toThrowError(
                "Argument is null or undefined"
            );
        });
        test("it should return open card count correctly", () => {
            const count = 3;
            const result = UTIL.getOpenCardCount(count);
            expect(result).toBe(3);
        });

        test("it should return 1 when argument lower than 1", () => {
            const count = -1;
            const result = UTIL.getOpenCardCount(count);
            expect(result).toBe(1);
        });
    });

    describe("getSelectedCard function", () => {
        test("it should throw error when argument undefined or null", () => {
            expect(() => UTIL.getSelectedCard(undefined)).toThrowError(
                "Argument is null or undefined"
            );
        });
        test("it should return card that have given draggableId", () => {
            const draggableId = 31;
            const startDeck = {
                cards: [{ id: 21 }, { id: 31 }, { id: 41 }, { id: 51 }],
            };
            const card = { id: 31 };
            const result = UTIL.getSelectedCard(startDeck, draggableId);
            expect(result).toEqual(card);
        });
    });


    describe("isDeckHasCompletedCards function", () => {
        test("it should throw error when argument undefined or null", () => {
            expect(() => UTIL.isDeckHasCompletedCards(undefined)).toThrowError(
                "Argument is null or undefined"
            );
        });
        test("it should return true if deck has completed card serial", () => {
            const deck = {
                cards: [
                    { rank: "A" },
                    { rank: "2" },
                    { rank: "3" },
                    { rank: "4" },
                    { rank: "5" },
                    { rank: "6" },
                    { rank: "7" },
                    { rank: "8" },
                    { rank: "9" },
                    { rank: "10" },
                    { rank: "J" },
                    { rank: "Q" },
                    { rank: "K" },
                ],
                openCardCount : 13
            };

            const result = UTIL.isDeckHasCompletedCards(deck);
            expect(result).toBeTruthy();
        });
    });


    describe('isGameOver', () => {
        test("it should throw error when argument undefined or null", () => {
            expect(() => UTIL.isGameOver(undefined)).toThrowError(
                "Argument is null or undefined"
            );
        });

        test('it should return true when initialData.completedDeckCount is 8', () => {
            const initialData = { completedDeckCount: 8 };
            const result = UTIL.isGameOver(initialData)
            expect(result).toBeTruthy()
        })

        test('it should return false when initialData.completedDeckCount is not 8', () => {
            const initialData = { completedDeckCount: 7 };
            const result = UTIL.isGameOver(initialData)
            expect(result).toBeFalsy()
        })
    })

    describe('getToastStyle function', () => {
        test('it should return an object', () => {
            const result = UTIL.getToastStyle();
            expect.objectContaining(result)
        })
    })

});
