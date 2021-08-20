import React from "react";
import * as Style from "./StockStyle";
import { useContext } from "react";
import { InitialDataContext } from "../../contexts/initialDataContext";
import Card from "../Card/Card";
import backFaceImg from "../../assets/img/backface.png";

export default function Stock() {
    let { initialData, setInitialData } = useContext(InitialDataContext);
    const { stockDecks } = initialData;

    function deal() {
        if (stockDecks.length < 1) {
            return;
        }
        const currentStockCards = stockDecks.pop();

        // Get a copy of initialData.decks
        const decksCopy = {
            ...initialData.decks
        }

        let i = 0;

        // Since initialData.decks is an object
        for(const key in decksCopy) { // deck => key (deck-1)
            const deck = decksCopy[key];
            
            const cardToBeAdded = currentStockCards[i];
            deck.cards.push(cardToBeAdded);
            deck.openCardCount++;
            i++;
        }

        // Change initialData.deck with deckCopy
        const newInitialData = {
            ...initialData,
            decks: decksCopy,
        };

        // Change state
        setInitialData(newInitialData);
    }
    return (
        <Style.Stock onClick={deal}>
            {stockDecks.map((e, index) => {
                return <img key={index} src={backFaceImg} />;
            })}
        </Style.Stock>
    );
}
