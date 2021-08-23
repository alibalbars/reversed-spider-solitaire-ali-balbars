import React from "react";
import Card from "../Card/Card";
import * as Style from "./deckStyle";
import { Droppable } from "react-beautiful-dnd";

export default function Deck({ deck, selectedCards }) {
    return (
        <Droppable droppableId={deck.id.toString()}>
            {(provided) => (
                <Style.Deck {...provided.droppableProps} ref={provided.innerRef}>
                    {deck.cards.map((card, index) => {
                        return <Card key={card.id} card={card} index={index} deck={deck} selectedCards={selectedCards}/>;
                    })}
                    {provided.placeholder}
                </Style.Deck>
            )}
        </Droppable>
    );
}

