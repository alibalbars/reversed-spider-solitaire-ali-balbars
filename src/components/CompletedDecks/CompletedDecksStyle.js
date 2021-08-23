import styled from "styled-components";
import * as VAR from "../../styles/variables";

export const CompletedDecks = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    background-color: transparent;
    height: ${VAR.CARD_HEIGHT};

    position: fixed;
    right: ${VAR.SECTION_BOTTOM_PADDING};
    bottom: ${VAR.SECTION_BOTTOM_PADDING};
`;

export const CardPlaceHolder = styled.div`
    width: ${VAR.CARD_WIDTH};
    height: ${VAR.CARD_HEIGHT};
    border-radius: ${VAR.CARD_BORDER_RADIUS};

    background: linear-gradient(
        -45deg,
        rgba(40,94,152,255) 0%,
        rgba(57,133,192,255)
    );

    box-shadow: -3px 3px 3px 3px rgba(28,69,108,255);

    img {
        width: 100%;
        height: 100%;
    }
`;
