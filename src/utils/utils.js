import toast from "react-hot-toast";
import * as _ from "lodash";
import * as GlobalStyle from "../styles/globalStyles"; // TODO: silinecek
import { getInitialData } from "../logic/initialData.js";

const letterRanks = {
    A: 1,
    J: 11,
    Q: 12,
    K: 13,
};

// Check value is a number
export function isNumber(value) {
    if (!value) {
        return;
    }
    if (isNaN(Number(value))) {
        return false;
    }
    return true;
}

// Convert A, J, Q, K ranks to numeric rank
export function getNumericRank(rank) {
    // ranks: "A", "2", "3", ... , "J", "Q", "K"
    if (!isNumber(rank)) {
        rank = letterRanks[rank];
    } else {
        rank = Number(rank);
    }
    return rank;
}

export function isSerial(array) {
    // An Example Serie => [1,2,3,4,5,6]
    for (let i = 1; i < array.length; i++) {
        if (!(array[i - 1] + 1 === array[i])) {
            return false;
        }
    }
    return true;
}

export function getSerialRanks(deck, index) {
    const cards = deck.cards;
    let indexes = [index];

    // Get all indexes below selected card
    for (let i = index + 1; i < cards.length; i++) {
        indexes.push(i);
    }

    // Create an array that includes serial card ranks
    let ranks = indexes.map((index) => {
        return getNumericRank(cards[index].rank);
    });

    return ranks;

    // console.log("ranks", ranks);
    // console.log("cards", deck.cards);
    // console.log("indexes", indexes);
    // console.log('isSerial', isSerial(ranks));
}

export function isDraggable(deck, index) {
    return isSerial(getSerialRanks(deck, index));
}

export function getSerialIndexes(deck, index) {
    const cards = deck.cards;
    let indexes = [index];

    // Get all indexes below selected card
    for (let i = index + 1; i < cards.length; i++) {
        indexes.push(i);
    }

    return indexes;
}

export function isDroppable(card, droppableDeck) {
    // Get draggable card rank
    const cardRank = getNumericRank(card.rank);

    // Get the last card rank of the droppable deck
    const lastCardOfDeck = droppableDeck.cards.slice(-1)[0];

    // if deck is empty, allow to drag card
    if (lastCardOfDeck === undefined) {
        return true;
    }
    const lastCardRank = getNumericRank(lastCardOfDeck.rank);

    return isSerial([lastCardRank, cardRank]);
}

export function moveCard(destination, source, draggableId, initialData) {
    // Drag to an unwanted area
    if (!destination) {
        return initialData;
    }

    // Drag to same deck
    if (destination.droppableId === source.droppableId) {
        return initialData;
    }

    const startDeck = initialData.decks[source.droppableId];
    const endDeck = initialData.decks[destination.droppableId];

    // Get serial card indexes of below selected card
    const serialCardIndexes = getSerialIndexes(startDeck, source.index);

    const selectedCard = getSelectedCard(startDeck, draggableId);

    // Carried cards
    const carriedCards = serialCardIndexes.map((index) => {
        return startDeck.cards[index];
    });

    // Prevent unwanted moves //TODO: HACK
    // if(!isDroppable(selectedCard, endDeck)) {
    //     return initialData;
    // }

    // Get changed two new decks
    const newStartDeck = getNewStartDeck(startDeck, source.index);
    const newEndDeck = getNewEndDeck(endDeck, carriedCards, selectedCard);

    const newInitialData = {
        ...initialData,
        decks: {
            ...initialData.decks,
            [newStartDeck.id]: newStartDeck,
            [newEndDeck.id]: newEndDeck,
        },
    };

    changeScore(newInitialData, -1);

    return newInitialData;
}

// Changes game score
function changeScore(initialData, num) {
    initialData.score = initialData.score + num;
}

// New start deck after card move
function getNewStartDeck(startDeck, index) {
    const serialCardIndexes = getSerialIndexes(startDeck, index);

    // Create new Start Deck
    const newStartCards = Array.from(startDeck.cards);
    const startOpenCartCount = startDeck.openCardCount;

    const newStartOpenCartCount = getOpenCardCount(
        startOpenCartCount - serialCardIndexes.length
    );

    newStartCards.splice(index, serialCardIndexes.length);

    const newStartDeck = {
        ...startDeck,
        cards: newStartCards,
        openCardCount: newStartOpenCartCount,
    };

    return newStartDeck;
}

// New dropped deck after card move
function getNewEndDeck(endDeck, carriedCards) {
    const endOpenCartCount = endDeck.openCardCount;

    // Create new End Deck
    const newEndCards = Array.from(endDeck.cards);

    let newEndOpenCartCount;

    newEndCards.push(...carriedCards); // Add all cards to end of the deck

    // If empty deck receives cards, arrange openCardCount as carriedCards count
    if (endDeck.cards.length == 0) {
        newEndOpenCartCount = carriedCards.length;
    } else {
        newEndOpenCartCount = getOpenCardCount(
            endOpenCartCount + carriedCards.length
        );
    }

    const newEndDeck = {
        ...endDeck,
        cards: newEndCards,
        openCardCount: newEndOpenCartCount,
    };

    return newEndDeck;
}

// Card count shouldn't be less then one if deck isn't empty
function getOpenCardCount(count) {
    console.log(count); // TODO: sil
    return 20; // hack :D
    // if (count === undefined || count === null) {
    //     throw new Error("Count argument is undefined or null");
    // }

    // if (count < 1) {
    //     return 1;
    // }

    // return count;
}

function getSelectedCard(startDeck, draggableId) {
    // Get draggable card
    const card = startDeck.cards.filter(
        (card) => Number(card.id) === Number(draggableId)
    )[0];

    return card;
}

// Yeni deck'i döner
function removeCompletedCards(deck) {
    // decrease 13 from openCardCount
    const openCardCount = deck.openCardCount;
    deck.openCardCount = openCardCount - 13;

    // remove last 13 cards from deck
    deck.cards.splice(deck.cards.length - 13);
}

function isDeckHasCompletedCards(deck) {
    const checkArray = Array.from({ length: 13 }, (_, i) => i + 1); // [1, 2, ... , 13]

    if (deck.openCardCount >= 13) {
        const lastThirtheenCards = deck.cards.slice(-13);
        const lastThirtheenCardsRanks = lastThirtheenCards.map((card) =>
            getNumericRank(card.rank)
        );
        if (_.isEqual(checkArray, lastThirtheenCardsRanks)) {
            return true;
        }
    }

    return false;
}

// Yeni initialDatayı döner //TODO: düzelt
export function isThereCompletedSerial(initialData) {
    //TODO: isim değişecek
    Object.keys(initialData.decks).forEach((deckId) => {
        // Get deck
        const deck = initialData.decks[deckId];

        // if deck has [1, 2, ... , J, Q, K] cards
        if (isDeckHasCompletedCards(deck)) {
            // Remove completed cards
            removeCompletedCards(deck);

            // Increase score
            changeScore(initialData, 100);

            // Increase completedDeckCount
            initialData.completedDeckCount += 1;

            // Make toast
            toast(<GlobalStyle.Toast>Cards Completed</GlobalStyle.Toast>, {
                duration: 3000,
                position: "bottom-center",
                icon: "🙌",
                style: getToastStyle(),
            });
        }
    });
}

export function isGameOver(initialData) {
    if (initialData.completedDeckCount === 8) {
        return true;
    }
    return false;
}

export function getToastStyle() {
    return {
        marginBottom: "50px",
    };
}

export function restartGame(initialData, setInitialData, setTimer) {
    // Get winCount
    const { winCount } = initialData;

    // set newInitialData
    const newInitialData = getInitialData();

    // keep same winCount
    newInitialData.winCount = winCount;

    setInitialData(newInitialData);

    // set Timer to 0
    setTimer(0);

    console.log("~ _initialData", getInitialData());
}
