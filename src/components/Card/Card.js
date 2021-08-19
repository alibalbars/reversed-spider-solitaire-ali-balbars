import React, { useEffect, useState } from "react";
import * as S from "../../styles/styles";
import { Draggable } from "react-beautiful-dnd";
import { isDraggable } from "../../utils/utils";
import backFaceImg from "../../assets/img/backface.png";

const BackFace = () => {
    return (
        <S.Card>
            <img src={backFaceImg} alt="Card backface image"></img>
        </S.Card>
    );
};

export default function Card({ card, index, deck, selectedCards }) {
    // If it's once false it's always be false
    const [isBackFace, setIsBackFace] = useState(true);
    // console.log(card.isBackFace);

    

    // const isLastCard = +index === +deck.cards.length - 1;
    // useEffect(() => {
    //     if(isLastCard) {
    //         setIsBackFace(false);
    //     }
        
    // }, [])

    // if (isBackFace) {
        
    //     return <BackFace></BackFace>;
    // }

    // if (!isLastCard) {
        
    //     return <BackFace></BackFace>;
    // }

    return (
        <Draggable
            draggableId={card.id.toString()}
            index={index}
            isDragDisabled={!isDraggable(deck, index)}
        >
            {(provided, snapshot) => (
                <S.Card
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                        ...getDisplayStyle(
                            provided.draggableProps.style,
                            selectedCards,
                            card
                        ),
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
                </S.Card>
            )}
        </Draggable>
    );
}

// TODO: bu fonklar başka bi dosyaya alınabilir.
//TODO: bu fonksiyonlar daha güzel yazılır mı? yazılamazsa yorum satırları eklencek açıklama için
//TODO: Aşağıdaki 3 fonksiyon tek fonksiyonda sırasıyla birleştirilip tek style objesi dönsün

// // If card is in a selected serial, make it display:none when dragging
function getDisplayStyle(style, selectedCards, card, snapshot) {
    if (selectedCards.includes(card)) {
        // Dragging iken buraya girer
        return {
            ...style,
            display: "none",
        };
    }
    return style;
}

function getDropAnimationStyle(style, snapshot) {
    if (snapshot.isDropAnimating) {
        return {
            ...style,
            // cannot be 0, but make it super tiny
            transitionDuration: `0.001s`,
        };
    }

    return style;
}

function getDragAnimationStyle(style, snapshot) {
    if (!snapshot.isDragging) {
        return {
            ...style,
            transform: "none",
        };
    }
    return style;
}

//TODO: sil
/* yeni---------------------------- */
// function getDisplayStyle(style, selectedCards, card, snapshot) {
//     if(snapshot.isDragging) {
//         // console.log('dragging');
//         // console.log(selectedCards.includes(card))
//         // console.log(selectedCards)

//         // const selectedCardIds = selectedCards.map(card => card.id.toString());
//         // const cardId = card.id.toString();
//         // console.log(selectedCardIds)
//         // if(selectedCardIds.includes(cardId)){
//         //     console.log('geldi');
//         //     return {
//         //         ...style,
//         //         display: 'none',
//         //     }
//         // }

//         // if(selectedCards.includes(card)){
//         //     console.log('geldi');
//         //     return {
//         //         ...style,
//         //         display: 'none',
//         //     }
//         // }
//     } else {
//         // console.log('not dragging');
//         return {
//             ...style,
//             transform: "none",
//         };
//     }
//     if(snapshot.isDropAnimating) {
//         return {
//             ...style,
//             // cannot be 0, but make it super tiny
//             transitionDuration: `0.001s`,
//         };
//     }

//     return style;
// }
