import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import _initialData from "./logic/initialData.js";
import Deck from "./components/Deck/Deck";
import Stock from "./components/Stock/Stock";
import CompletedDecks from "./components/CompletedDecks/CompletedDecks";
import * as Style from "./styles/styles";
import {
    getSerialIndexes,
    moveCard,
    isThereCompletedSerial,
    isGameOver,
} from "./utils/utils";
// import GlobalStyle from "./styles/GlobalStyles";
import GlobalStyle from "./styles/GlobalStyles";
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

    useEffect(() => {
        console.log("initialData", initialData);
    }, []);

    // To make invisible the carried cards while dragging
    function onDragStart(start) {
        const { source, draggableId } = start;
        const startDeck = initialData.decks[source.droppableId]; // startDeck alınamamış

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
        console.log("~ newInitialData", newInitialData);

        setInitialData(newInitialData);
        isThereCompletedSerial(newInitialData); //TODO: ismi değişecek fonksiyonun
        // if(isGameOver(initialData)) {
        //     console.log('GAME IS OVER!!!');
        // }
        console.log(isGameOver(newInitialData));
        setIsModalOpen(true);
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

                        <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></Modal>

                        <Header></Header>
                        <Style.Decks>
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
//TODO: oyun kazanıldığında modal göster
//Metodlar iş yapmak yerine bir değer dönerse test daha kolay olur ??
//TODO: S' ler Style yapılacak
//TODO: Initial data'nın adı current data olarak değiştirilebilir. (gameData'da olabilir.)
//TODO: Moves counter eklenebilir.
//TODO: fonk'lara undefined kontrolü getirilecek.

//TODO: initialData için context API kullanılabilir.
//TODO: eslint eklenecek
//TODO: card objelerinde deck id'leri yanlış
//TODO: rank'ların hepsini number yapabiliriz
//TODO: getCarriedCards mettodu oluşturulabilir => ondrag start'ta kullanılıyor.
//TODO: yarn lock git ignore edilecek
//TODO: resimler webp olacak
//TODO: styles.js ismi değişecek
//TODO: styles.js componentlere ayrılacak
//TODO: SerialIndex's ismi değişebilir, seçili kart ve altındaki kartlar
//TODO: favicon ve uygulama adı değişecek
//TODO: en son console.log'lar ve gereksiz yorum satırları silinecek.
