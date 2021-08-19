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
    // console.log('in serial Deck', deck);
    // console.log('in serial index', index);

    const cards = deck.cards;
    // const card = deck.cards[index];
    // const numericRank = getNumericRank(card.rank);
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
    console.log();
    const cards = deck.cards;
    let indexes = [index];

    // Get all indexes below selected card
    for (let i = index + 1; i < cards.length; i++) {
        indexes.push(i);
    }

    return indexes;
}

export function isDroppable(card, deck) {
    // Get draggable card rank 
    const cardRank = getNumericRank(card.rank);

    // Get the last card rank of the droppable deck
    const lastCardOfDeck = deck.cards.slice(-1)[0];

    // if deck is empty, allow to drag card
    if(lastCardOfDeck === undefined) {
        return true;
    }
    const lastCardRank = getNumericRank(lastCardOfDeck.rank);

    return isSerial([lastCardRank, cardRank]);
}

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

    // Get draggable card
    const card = startDeck.cards.filter(
        (card) => Number(card.id) === Number(draggableId)
    )[0];

    // Create new Start Deck
    const newStartCards = Array.from(startDeck.cards);
    const serialIndexes = getSerialIndexes(startDeck, source.index);
    // if(isDroppable(card, endDeck)) {
    newStartCards.splice(source.index, serialIndexes.length);

    // }
    const newStartDeck = {
        ...startDeck,
        cards: newStartCards,
    };

    // Carried cards
    const carriedCards = serialIndexes.map((index) => {
        return startDeck.cards[index];
    });
    // setSelectedCards(carriedCards);
    // console.log('carried', carriedCards);

    // Create new End Deck
    const newEndCards = Array.from(endDeck.cards);
    // console.log(isDroppable(card, endDeck));
    // if(isDroppable(card, endDeck)) {
    newEndCards.push(...carriedCards); // Add all cards to end of the deck
    // }
    const newEndDeck = {
        ...endDeck,
        cards: newEndCards,
    };

    const newInitialData = {
        decks: {
            ...initialData.decks,
            [newStartDeck.id]: newStartDeck,
            [newEndDeck.id]: newEndDeck,
        },
    };

    console.log('new', newInitialData);

    return newInitialData;
}

function arrangeCardsOpenStat(initialData) {
    const decks = initialData.decks;

}