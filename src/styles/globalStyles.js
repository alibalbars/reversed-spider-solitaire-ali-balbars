import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import fontOptien from "../assets/fonts/Optien.ttf";
import * as VAR from "./variables";

const GlobalStyle = createGlobalStyle`

    // Reset

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    html, body {
        font-size: 13px;
        height: 100%;
        overflow: hidden;
    }

    // Load 'Optien' font
    @font-face {
        font-family: 'optien';
        src: local('optien'), url(${fontOptien}) format('truetype');
        font-weight: normal;
    }

    /* Media Queries */

    // Very small devices
    @media (max-width: ${VAR.VERY_SMALL}) { 
        html {
            font-size : 4px;
        }
    }
    // Very small devices
    @media (min-width: ${VAR.VERY_SMALL}) { 
        html {
            font-size : 5px;
        }
    }

    // Small devices
    @media (min-width: ${VAR.SMALL}) { 
        html {
            font-size : 7px;
        }
    }

    // Medium devices
    @media (min-width: ${VAR.MEDIUM}) { 
        html {
            font-size : 9px;
        }
    }

    // Large devices 
    @media (min-width: ${VAR.LARGE}) { 
        html {
            font-size : 10px;
        }
    }

    // Extra large devices
    @media (min-width: ${VAR.EXTRA}) { 
        html {
            font-size : 13px;
        }
    }

`;

export default GlobalStyle;

export const Toast = styled.div`
    font-family: "optien";
    font-size: 1.45rem;
`;
