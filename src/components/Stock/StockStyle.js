import styled from "styled-components";
import * as VAR from "../../styles/variables";

export const Stock = styled.div`
    height: ${VAR.CARD_HEIGHT};
    height: ${VAR.CARD_WIDTH};
    border-radius: ${VAR.CARD_BORDER_RADIUS};
    background-color: transparent;

    position: fixed;
    left: 5rem;
    bottom: 5rem;

    cursor: pointer;
    user-select: none;
    
    display: grid;
    grid-template-columns: repeat(5, 1.33rem);

    img {
        width: ${VAR.CARD_WIDTH};
        height: ${VAR.CARD_HEIGHT};
    }
`;


export const Toast = styled.div`
    font-family: 'optien';
    font-size: 1.25rem;
`;