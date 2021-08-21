import styled from "styled-components";
import * as VAR from "../../styles/variables";

export const CompletedDecks = styled.div`
    display: flex;
    flex-direction: row;
    background-color: transparent;
    /* width: ${VAR.CARD_WIDTH}; */
    height: ${VAR.CARD_HEIGHT};
    position: fixed;
    bottom: 5rem; // 5rem ler değişkene atanabilir.
    right: 5rem;
`;

export const CardPlaceHolder = styled.div`
    width: ${VAR.CARD_WIDTH};
    height: ${VAR.CARD_HEIGHT};
    background-color: grey;
    border: 1px solid black;

`;
