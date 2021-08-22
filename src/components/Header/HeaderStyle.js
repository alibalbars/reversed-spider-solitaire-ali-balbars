import styled from "styled-components";
import * as VAR from "../../styles/variables";

export const Header = styled.div`
    height: 35px;
    background-color: rgba(255,226,114,255);
    font-size: 20px;
    font-family: "arial";
    font-weight: bolder;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-left: 20px;
    padding-right: 50px;

    user-select: none;

    .stats {
        display: flex;
        align-items: center;
        gap: 30px;
    }

    .btn-restart {
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;
        font: inherit;
    }
`;



export const Text = styled.div`
    display: inline-block;

    
`;

export const IconGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;