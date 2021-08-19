import cardInfo from "../utils/cardInfo.json";
import { initialDataSkeleton } from "../utils/initialDataSkeleton";
import * as _ from "lodash";

const letterRanks = {
    'A': 1,
    'J': 11,
    'Q': 12,
    'K': 13,
}

function generateCards() {
    let cards = [];
    let decks = [];
    let idCounter = 1;

    cardInfo["rank"].forEach((rank) => {

        // There is 13 rank, for two deck 13 * 8 = 104 cards
        for (let i = 1; i <= 8; i++) {
            //TODO: delete =>  8 tane A kartı olması gerek örneğin

            cards.push({
                id: idCounter,
                rank: rank,
                suit: "spade",
                // isBackFace: true,
                isOpen: true,
                deck: i,
            });
            // console.log(idCounter);
            idCounter = idCounter + 1;
        }
    });

    let shuffledCards = _.shuffle(cards);

    // Get first 4 decks
    decks.push(_.chunk(shuffledCards.slice(0, 24), 6));
    // Get remaining 6 decks
    decks.push(_.chunk(shuffledCards.slice(24, 54), 5));
    // Get helping cards
    decks.push(_.chunk(shuffledCards.slice(54), 10));

    return {
        cards: shuffledCards,
        decks: decks,
    };
}

export function getInitialData() {
    // Get initial data skeleton
    const initialData = { ...initialDataSkeleton };

    const deckData = generateCards().decks;

    const deckIds = Object.keys(initialData.decks);

    const fourDecks = deckData[0];
    const sixDecks = deckData[1];
    const remainingTenDecks = deckData[2];

    // Add 4 deck to initialData
    fourDecks.forEach((deck, index) => {
        initialData.decks[deckIds[index]].cards = deck;
    });

    // Add 6 deck to initialData
    sixDecks.forEach((deck, index) => {
        initialData.decks[deckIds[index + 4]].cards = deck;
    });

    return initialData;
}



const data = getInitialData();
export default data;
