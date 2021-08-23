import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import _initialData from "./logic/initialData.js";
import Deck from "./components/Deck/Deck";
import Stock from "./components/Stock/Stock";
import CompletedDecks from "./components/CompletedDecks/CompletedDecks";
import * as Style from "./styles/appStyle";
import {
    getSerialIndexes,
    moveCard,
    collectCompletedCardSerials,
    isGameOver,
} from "./utils/utils";
import GlobalStyle from "./styles/globalStyles";
import { InitialDataContext } from "./contexts/initialDataContext.js";
import { TimerContext } from "./contexts/timerContext.js";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import Modal from "./components/GameOverModal/GameOverModal";

export default function App() {
    const [initialData, setInitialData] = useState(_initialData);
    const [selectedCards, setSelectedCards] = useState([]);
    const [timer, setTimer] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // To make invisible the carried cards while dragging
    function onDragStart(start) {
        const { source } = start;
        const startDeck = initialData.decks[source.droppableId];

        // Get card indexes from deck that are in serial order
        const serialIndexes = getSerialIndexes(startDeck, source.index);

        // Selected card + cards below that
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

        setInitialData(newInitialData);
        collectCompletedCardSerials(newInitialData); //TODO: ismi değişecek fonksiyonun

        if (isGameOver(newInitialData)) {
            newInitialData.winCount += 1;
            setIsModalOpen(true);
        }
        
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <GlobalStyle />

            <InitialDataContext.Provider
                value={{ initialData, setInitialData }}
            >
                <TimerContext.Provider value={{ timer, setTimer }}>
                    <Style.App>
                        {/* Requirement by react-hot-toast library*/}
                        <div>
                            <Toaster />
                        </div>

                        <Modal
                            isOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                        ></Modal>

                        <Header></Header>
                        <Style.Decks data-cy="decks">
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
                        </Style.Decks>
                        <Stock></Stock>
                        <CompletedDecks></CompletedDecks>
                    </Style.App>
                </TimerContext.Provider>
            </InitialDataContext.Provider>
        </DragDropContext>
    );
}