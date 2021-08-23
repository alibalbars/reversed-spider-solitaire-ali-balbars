import styled from "styled-components";
import * as VAR from "../../styles/variables";

export const Card = styled.div`
font-family: "optien";
display: inline-flex;
flex-direction: column;
width: ${VAR.CARD_WIDTH};
height: ${VAR.CARD_HEIGHT};
border-radius: ${VAR.CARD_BORDER_RADIUS};
background-color: white;
overflow: hidden;
user-select: none;
box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.49);
transition: all 0.2s;
transform: none;
`;

export const CardHead = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 0.2rem 0.66rem;
height: ${VAR.CARD_HEAD_HEIGHT};
font-size: ${VAR.CARD_HEAD_HEIGHT};
`;

export const CardBody = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-grow: 1;

span {
    font-size: 4.66rem;
}
`;

// If card is in a selected serial, make it display:none when dragging
export function getDisplayStyle(style, selectedCards, card, snapshot) {
    if (selectedCards.includes(card)) {
        // Dragging iken buraya girer
        return {
            ...style,
            display: "none",
        };
    }
    return style;
}

export function getDropAnimationStyle(style, snapshot) {
    if (snapshot.isDropAnimating) {
        return {
            ...style,
            // cannot be 0, but make it super tiny
            transitionDuration: `0.001s`,
        };
    }

    return style;
}

export function getDragAnimationStyle(style, snapshot) {
    if (!snapshot.isDragging) {
        return {
            ...style,
            transform: "none",
        };
    }
    return style;
}
