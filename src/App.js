import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import _initialData from "./logic/initialData.js";
import Deck from "./components/Deck/Deck";
import Stock from "./components/Stock/Stock";
import * as S from "./styles/styles";
import { getSerialIndexes, moveCard } from "./utils/utils";
import GlobalStyle from "./styles/globalStyles";
import { InitialDataContext } from "./contexts/initialDataContext.js";

export default function App() {
    const [initialData, setInitialData] = useState(_initialData);
    const [selectedCards, setSelectedCards] = useState([]); 

    useEffect(() => {
        console.log("initialData", initialData);
    }, []);

    // To make invisible the carried cards while dragging
    function onDragStart(start) {
        const { source, draggableId } = start;
        const startDeck = initialData.decks[source.droppableId]; // startDeck alınamamış

        const serialIndexes = getSerialIndexes(startDeck, source.index);

        // Carried cards
        const carriedCards = serialIndexes.map((index) => {
            return startDeck.cards[index];
        });
        // Get only cards that below the dragging card
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
        console.log("~ newInitialData", newInitialData)

        setInitialData(newInitialData);
        
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <GlobalStyle />

            <InitialDataContext.Provider value={{initialData, setInitialData}}>
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
                    <Stock></Stock>
                </S.App>
            </InitialDataContext.Provider>
        </DragDropContext>
    );
}

//TODO: S' ler Style yapılacak
//TODO: Initial data'nın adı current data olarak değiştirilebilir. (gameData'da olabilir.)

//TODO: initialData için context API kullanılabilir.
//TODO: eslint eklenecek
//TODO: card objelerinde deck id'leri yanlış
//TODO: rank'ların hepsini number yapabiliriz
//TODO: getCarriedCards mettodu oluşturulabilir => ondrag start'ta kullanılıyor.



// Tüm kart id lerini göstermek için
// Object.keys(initialData.decks).map((deckId) => {
//     const deck = initialData.decks[deckId];
//     cards.push(deck.cards);
// });
// const idArray = cards.flat().map((e) => e.id);
// const uniq = [...new Set(idArray)];
// console.log("cards", uniq);
