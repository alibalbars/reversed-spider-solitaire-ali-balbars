import styled from "styled-components";
import * as VAR from "../../styles/variables";

export const Stock = styled.div`
    height: ${VAR.CARD_HEIGHT};
    /* width: 12rem; */
    width: 12rem;
    border-radius: ${VAR.CARD_BORDER_RADIUS};
    background-color: transparent;

    position: fixed;
    left: 5rem;
    bottom: 2rem;

    cursor: pointer;
    user-select: none;
    
    display: grid;
    grid-template-columns: repeat(5, 1.33rem);

    box-shadow: -3px 3px 3px 3px rgba(28,69,108,255);


    img {
        width: ${VAR.CARD_WIDTH};
        height: ${VAR.CARD_HEIGHT};
    }
`;