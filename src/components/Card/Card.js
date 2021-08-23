import React from "react";
import * as Style from "./cardStyle";
import { Draggable } from "react-beautiful-dnd";
import { isDraggable } from "../../utils/utils";
import backFaceImg from "../../assets/img/backface.webp";

const BackFace = () => {
    return (
        <Style.Card>
            <img src={backFaceImg} alt="Card backface image"/>
        </Style.Card>
    );
};

export default function Card({ card, index, deck, selectedCards }) {

    if ((index < deck.cards.length - deck.openCardCount)) {
        return <BackFace></BackFace>;
    }

    return (
        <Draggable
            draggableId={card.id.toString()}
            index={index}
            isDragDisabled={!isDraggable(deck, index)}
        >
            {(provided, snapshot) => (
                <Style.Card
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                        ...Style.getDisplayStyle(
                            provided.draggableProps.style,
                            selectedCards,
                            card
                        ),
                        ...Style.getDropAnimationStyle(
                            provided.draggableProps.style,
                            snapshot
                        ),
                        ...Style.getDragAnimationStyle(
                            provided.draggableProps.style,
                            snapshot
                        ),
                    }}
                    isDragging={snapshot.isDragging}
                >
                    <Style.CardHead>
                        <span>{card.rank}</span>
                        <span>♠</span>
                    </Style.CardHead>
                    <Style.CardBody>
                        <span className="main-letter">{card.rank}</span>
                    </Style.CardBody>
                </Style.Card>
            )}
        </Draggable>
    );
}