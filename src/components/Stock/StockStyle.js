import styled from "styled-components";
import * as VAR from "../../styles/variables";

export const Stock = styled.div`
    background-color: transparent;
    width: ${VAR.CARD_WIDTH};
    height: ${VAR.CARD_HEIGHT};
    position: fixed;
    left: 5rem;
    bottom: 5rem;
    cursor: pointer;
    display: grid;

    grid-template-columns: repeat(5, 20px);

    border-radius: ${VAR.CARD_BORDER_RADIUS};
    img {
        width: ${VAR.CARD_WIDTH};
        height: ${VAR.CARD_HEIGHT};
    }
`;
