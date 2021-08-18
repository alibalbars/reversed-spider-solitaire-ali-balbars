const letterRanks = {
    A: 1,
    J: 11,
    Q: 12,
    K: 13,
};

// Check value is a number
export function isInteger(value) {
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
    if (!isInteger(rank)) {
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
    const card = deck.cards[index];
    const numericRank = getNumericRank(card.rank);
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
