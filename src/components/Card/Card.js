import React, { useEffect } from "react";
import * as S from "../../styles/styles";
import GlobalStyle from "../../styles/globalStyles";
import { Draggable } from "react-beautiful-dnd";
import { getSerialRanks, isSerial } from "../../utils/utils";

export default function Card({ card, index, deck }) {
    console.log(getSerialRanks(deck, index));
    return (
        <Draggable
            draggableId={card.id.toString()}
            index={index}
            isDragDisabled={!isSerial(getSerialRanks(deck, index))}
        >
            {(provided, snapshot) => (
                <S.Card
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                        ...getDropAnimationStyle(
                            provided.draggableProps.style,
                            snapshot
                        ),
                        ...getDragAnimationStyle(
                            provided.draggableProps.style,
                            snapshot
                        ),
                    }}
                    isDragging={snapshot.isDragging}
                >
                    <S.CardHead>
                        <span>{card.rank}</span>
                        <span>♠</span>
                    </S.CardHead>
                    <S.CardBody>
                        <span className="main-letter">{card.rank}</span>
                    </S.CardBody>
                    <GlobalStyle />
                </S.Card>
            )}
        </Draggable>
    );
}

// Cancel drop animation

// function getStyle(style, snapshot) {
//     const dropAnimation = {
//         transitionDuration: `0.001s`,
//     };

//     const transform = {
//         transform: "none",
//     };

//     if (snapshot.isDropAnimating) {
//         return {
//             ...style,
//             dropAnimation,
//         }
//     }

//     if (!snapshot.isDragging) {
//         return {
//             ...style,
//             transform,
//         }
//     }

//     return {
//         ...style,
//     }
// }

// TODO: bu fonklar başka bi dosyaya alınabilir.
//TODO: bu fonksiyonlar daha güzel yazılır mı? yazılamazsa yorum satırları eklencek açıklama için
function getDropAnimationStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
        return style;
    }
    return {
        ...style,
        // cannot be 0, but make it super tiny
        transitionDuration: `0.001s`,
    };
}

function getDragAnimationStyle(style, snapshot) {
    if (snapshot.isDragging) {
        return style;
    }
    return {
        ...style,
        transform: "none",
    };
}
