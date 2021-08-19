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
        return initialData;
    }

    // Drag to same deck
    if (destination.droppableId === source.droppableId) {
        return;
    }

    const startDeck = initialData.decks[source.droppableId];
    const endDeck = initialData.decks[destination.droppableId];

    // Get serial card indexes of below selected card
    const serialCardIndexes = getSerialIndexes(startDeck, source.index);

    // Get draggable card
    // const card = startDeck.cards.filter(
    //     (card) => Number(card.id) === Number(draggableId)
    // )[0];

    const selectedCard = getSelectedCard(startDeck, draggableId);
    // console.log('card', card);

    // Carried cards
    const carriedCards = serialCardIndexes.map((index) => {
        return startDeck.cards[index];
    });

    // Prevent unwanted moves
    if(!isDroppable(selectedCard, endDeck)) {
        return initialData;
    }

    const newStartDeck = getNewStartDeck(startDeck, source.index);
    const newEndDeck = getNewEndDeck(endDeck, carriedCards, selectedCard);

    const newInitialData = {
        decks: {
            ...initialData.decks,
            [newStartDeck.id]: newStartDeck,
            [newEndDeck.id]: newEndDeck,
        },
    };

    return newInitialData;
}

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

function getNewEndDeck(endDeck, carriedCards, selectedCard) {

    // Create new End Deck
    const newEndCards = Array.from(endDeck.cards);
    const endOpenCartCount = endDeck.openCardCount;
    const newEndOpenCartCount = getOpenCardCount(
        endOpenCartCount + carriedCards.length
    );
    newEndCards.push(...carriedCards); // Add all cards to end of the deck
    const newEndDeck = {
        ...endDeck,
        cards: newEndCards,
        openCardCount: newEndOpenCartCount,
    };

    return newEndDeck;
}

function getOpenCardCount(count) {
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
