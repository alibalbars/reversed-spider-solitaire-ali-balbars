import styled, { createGlobalStyle } from "styled-components";
import * as VAR from "./variables";

//TODO: her comp için ayrı style dosyası açılabilir
//TODO: shared isimli ortak style dosyası açılabilir

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

export const App = styled.div`
    background: linear-gradient(
        -45deg,
        rgba(40, 94, 152, 1) 0%,
        rgba(57, 133, 192, 1)
    );
    height: 100vh;

`;

export const Card = styled.div`
    font-family: "optien";
    display: inline-flex;
    flex-direction: column;
    width: ${VAR.CARD_WIDTH};
    height: 10rem;
    background-color: white;
    border-radius: 10px;
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
