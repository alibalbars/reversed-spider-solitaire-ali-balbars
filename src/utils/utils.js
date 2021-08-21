import toast from "react-hot-toast";
import * as _ from "lodash";
import * as GlobalStyle from "../styles/globalStyles"; // TODO: silinecek

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

//TODO: Movecard() isDroppable içine alınacak.
export function moveCard(destination, source, draggableId, initialData) {
    // Drag to undesirable area
    if (!destination) {
        console.log("geldi");
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

    // Prevent unwanted moves
    // if(!isDroppable(selectedCard, endDeck)) {
    //     return initialData;
    // }

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

    return newInitialData;
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
    // console.log("~ newStartDeck", newStartDeck.openCardCount);
    // console.log("~ start length => ", newStartDeck.cards.length);

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
    console.log("~ newEndDeck", newEndDeck.openCardCount);

    return newEndDeck;
}

// Card count shouldn't be less then one if deck isn't empty
function getOpenCardCount(count) {
    return 20; // HACk :D
    if (count === undefined || count === null) {
        throw new Error("Count argument is undefined or null");
    }

    if (count < 1) {
        return 1;
    }

    return count;
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
    const openCardCount = deck.openCardCount;
    deck.openCardCount = openCardCount - 13;
    const newDeck = deck.cards.splice(deck.cards.length - 13); // TODO: tek satıra indirilecek
    console.log("~ newDeck", newDeck);
}

function isDeckHasCompletedCards(deck) {
    const checkArray = Array.from({ length: 13 }, (_, i) => i + 1); // [1, 2, ... , 13]
    const cardNumericRanks = deck.cards.map((card) =>
        getNumericRank(card.rank)
    );

    if (deck.openCardCount >= 13) {
        const lastThirtheenCards = deck.cards.slice(-13);
        const lastThirtheenCardsRanks = lastThirtheenCards.map((card) =>
            getNumericRank(card.rank)
        );
        if (_.isEqual(checkArray, lastThirtheenCardsRanks)) {
            // console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
            // removeCompletedCards(deck);
            return true;
        }

        // console.log("~ lastThirtheenCardsRanks", lastThirtheenCardsRanks)
        // console.log("~ lastThirtheenCards", lastThirtheenCards)
        // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
    }

    return false;
}

// Yeni initialDatayı döner //TODO: düzelt 
export function isThereCompletedSerial(initialData) { //TODO: isim değişecek
    Object.keys(initialData.decks).forEach((deckId) => {
        const deck = initialData.decks[deckId];
        if (isDeckHasCompletedCards(deck)) {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            removeCompletedCards(deck);
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


export function getToastStyle() {
    return {
        marginBottom: "50px",
    }
}