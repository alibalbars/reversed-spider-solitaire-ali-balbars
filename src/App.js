import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import _initialData from "./logic/initialData.js";
import Deck from "./components/Deck/Deck";
import * as S from "./styles/styles";
import { getSerialIndexes, isDroppable, moveCard } from "./utils/utils";
import GlobalStyle from "./styles/globalStyles";

export default function App() {
    const [initialData, setInitialData] = useState(_initialData);
    const [selectedCards, setSelectedCards] = useState([]);

    useEffect(() => {
        console.log("initialData", initialData);
    }, []);

    function onDragStart(start) {
        const { source, draggableId } = start;
        const startDeck = initialData.decks[source.droppableId];
        const serialIndexes = getSerialIndexes(startDeck, source.index);
        // Carried cards
        const carriedCards = serialIndexes.map((index) => {
            return startDeck.cards[index];
        });
        setSelectedCards(carriedCards.slice(1));

        // console.log(startDeck);
        // console.log(source.index);
        // console.log('serial Indexs', getSerialIndexes(startDeck, source.index));
    }

    function onDragEnd(result) {
        // When drag ended, reset selected cards
        setSelectedCards([]);

        const { destination, source, draggableId } = result;

        const newInitialData = moveCard(
            destination,
            source,
            draggableId,
            initialData
        );

        setInitialData(newInitialData);

        // // Drag to undesirable area
        // if (!destination) {
        //     return;
        // }

        // // Drag to same deck
        // if (destination.droppableId === source.droppableId) {
        //     return;
        // }

        // const startDeck = initialData.decks[source.droppableId];
        // const endDeck = initialData.decks[destination.droppableId];

        // // Get draggable card
        // const card = startDeck.cards.filter(
        //     (card) => Number(card.id) === Number(draggableId)
        // )[0];

        // // Create new Start Deck
        // const newStartCards = Array.from(startDeck.cards);
        // const serialIndexes = getSerialIndexes(startDeck, source.index);
        // // if(isDroppable(card, endDeck)) {
        // newStartCards.splice(source.index, serialIndexes.length);

        // // }
        // const newStartDeck = {
        //     ...startDeck,
        //     cards: newStartCards,
        // };

        // // Carried cards
        // const carriedCards = serialIndexes.map((index) => {
        //     return startDeck.cards[index];
        // });
        // // setSelectedCards(carriedCards);
        // // console.log('carried', carriedCards);

        // // Create new End Deck
        // const newEndCards = Array.from(endDeck.cards);
        // console.log(isDroppable(card, endDeck));
        // // if(isDroppable(card, endDeck)) {
        // newEndCards.push(...carriedCards); // Add all cards to end of the deck
        // // }
        // const newEndDeck = {
        //     ...endDeck,
        //     cards: newEndCards,
        // };

        // const newInitialData = {
        //     decks: {
        //         ...initialData.decks,
        //         [newStartDeck.id]: newStartDeck,
        //         [newEndDeck.id]: newEndDeck,
        //     },
        // };



        // console.log("new DATA => ", newInitialData);
        // console.log("new start cards => ", newStartCards);
        // console.log("new end cards => ", newEndCards);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <GlobalStyle />

            <S.App>
                <S.Decks>
                    {Object.keys(initialData.decks).map((deckId) => {
                        const deck = initialData.decks[deckId];
                        return (
                            <Deck
                                key={deck.id}
                                deck={deck}
                                selectedCards={selectedCards}
                            />
                        );
                    })}
                </S.Decks>
            </S.App>
        </DragDropContext>
    );
}

//TODO: onDragEnd'de ifDroppable kontrolü tüm onDragEnd fonksiyonuna taşınacak.
//TODO: move adında fonksiyon kullanılacak. (move fonksiyonu newState'i dönecek)

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
