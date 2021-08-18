import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import _initialData from "./logic/initialData.js";
import Deck from "./components/Deck/Deck";
import * as S from "./styles/styles";
import { getSerialRanks } from "./utils/utils";

export default function App() {
    const [initialData, setInitialData] = useState(_initialData);
    useEffect(() => {
        //TODO: farklı gösteriyor
        console.log("initialData", initialData);
        let cards = [];
    }, []);

    function onDragStart(start) {
        const { source, draggableId } = start;
        const startDeck = initialData.decks[source.droppableId];
        // console.log("serie", getSerie(startDeck, source.index));
        // getSerialRanks(startDeck, source.index);
        // console.log(start);
    }

    function onDragEnd(result) {
        const { destination, source, draggableId } = result;
        // console.log("draggableId", draggableId);

        // Drag to undesirable area
        if (!destination) {
            return;
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

        const newStartCards = Array.from(startDeck.cards);
        newStartCards.splice(source.index, 1);
        const newStartDeck = {
            ...startDeck,
            cards: newStartCards,
        };

        const newEndCards = Array.from(endDeck.cards);
        newEndCards.splice(destination.index, 0, card);
        // console.log("newEndCards", newEndCards);
        const newEndDeck = {
            ...endDeck,
            cards: newEndCards,
        };

        const newInitialData = {
            // ...initialData,
            decks: {
                ...initialData.decks,
                [newStartDeck.id]: newStartDeck,
                [newEndDeck.id]: newEndDeck,
            },
        };

        setInitialData(newInitialData);

        // console.log("new DATA => ", newInitialData);
        // console.log("new start cards => ", newStartCards);
        // console.log("new end cards => ", newEndCards);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <S.App>
                {Object.keys(initialData.decks).map((deckId) => {
                    const deck = initialData.decks[deckId];
                    return <Deck key={deck.id} deck={deck} />;
                })}
            </S.App>
        </DragDropContext>
    );
}

//TODO: initialData için context API kullanılabilir.
//TODO: Deck kartlardaki hareketler önlenecek.
//TODO: eslint eklenecek
//TODO: card objelerinde deck id'leri yanlış
//TODO: rank'ların hepsini number yapabiliriz



// Tüm kart id lerini göstermek için
// Object.keys(initialData.decks).map((deckId) => {
//     const deck = initialData.decks[deckId];
//     cards.push(deck.cards);
// });
// const idArray = cards.flat().map((e) => e.id);
// const uniq = [...new Set(idArray)];
// console.log("cards", uniq);
