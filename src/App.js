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
        console.log("initialData", initialData.decks);
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
