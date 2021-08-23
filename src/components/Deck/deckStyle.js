import styled from "styled-components";
import * as VAR from "../../styles/variables";

export const Deck = styled.div`
    display: grid;
    grid-template-rows: repeat(
        20,
        ${VAR.CARD_HEAD_HEIGHT}
    );
    min-width: ${VAR.CARD_WIDTH};
`;

export const Decks = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding-top: 30px;
`;