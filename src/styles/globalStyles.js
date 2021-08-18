import { createGlobalStyle } from "styled-components";
import fontOptien from "../assets/fonts/Optien.ttf";
import * as VAR from "./variables";

const GlobalStyle = createGlobalStyle`

    html {
        font-size: 15px;
    }

    // Reset
    body {
        margin: 0;
    }

    // Load 'Optien' font
    @font-face {
        font-family: 'optien';
        src: local('optien'), url(${fontOptien}) format('truetype');
        font-weight: normal;
    }

    /* Media Queries */
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
            font-size : 12px;
        }
    }

    // Extra large devices
    @media (min-width: ${VAR.EXTRA}) { 
        html {
            font-size : 15px;
        }
    }

`;

export default GlobalStyle;
