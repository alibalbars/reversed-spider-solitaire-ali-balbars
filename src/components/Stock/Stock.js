import React from "react";
import * as Style from "./StockStyle";
import { useContext } from "react";
import { InitialDataContext } from "../../contexts/initialDataContext";
import backFaceImg from "../../assets/img/backface.webp";
import * as GlobalStyle from "../../styles/GlobalStyles";
import { getToastStyle } from "../../utils/utils";

import toast from "react-hot-toast";

export default function Stock() {
    let { initialData, setInitialData } = useContext(InitialDataContext);
    const { stockDecks } = initialData;

    function deal() {
        // If no stock deck, do anything
        if (stockDecks.length < 1) {
            return;
        }

        // Make toast
        toast(<GlobalStyle.Toast>Cards added</GlobalStyle.Toast>, {
            duration: 3000,
            position: "bottom-center",
            style: getToastStyle(),
            icon: "📌",
        });

        const currentStockCards = stockDecks.pop();

        // Get a copy of initialData.decks
        const decksCopy = {
            ...initialData.decks,
        };

        let i = 0;

        // Since initialData.decks is an object
        for (const key in decksCopy) {
            // deck => key (deck-1)
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
        <Style.Stock onClick={deal} deckCount={stockDecks.length}>
            {stockDecks.map((e, index) => {
                return <img key={index} src={backFaceImg} />;
            })}
        </Style.Stock>
    );
}
