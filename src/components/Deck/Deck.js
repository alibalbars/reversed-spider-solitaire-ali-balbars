import React from "react";
import Card from "../Card/Card";
import * as S from "../../styles/styles";
import { Droppable } from "react-beautiful-dnd";

export default function Deck({ deck }) {
    return (
        <Droppable droppableId={deck.id.toString()}>
            {(provided) => (
                <S.Deck {...provided.droppableProps} ref={provided.innerRef}>
                    {deck.cards.map((card, index) => {
                        return <Card key={card.id} card={card} index={index} deck={deck} />;
                    })}
                    {provided.placeholder}
                </S.Deck>
            )}
        </Droppable>
    );
}

// TODO: provided.innerRef ne işe yarıyor?
