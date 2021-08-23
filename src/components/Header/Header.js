import React, { useState, useContext } from "react";
import { InitialDataContext } from "../../contexts/initialDataContext";
import Clock from "../Clock/Clock";
import RestartButton from "../RestartButton/RestartButton";
import * as Style from "./headerStyle";
import * as SharedStyle from "../../styles/_shared";
import * as VAR from "../../styles/variables";
import clockIcon from "../../assets/img/clock.svg";
import trophyIcon from "../../assets/img/trophy.png";
import restartIcon from "../../assets/img/restart.svg";

export default function Header() {
    const { initialData } = useContext(InitialDataContext);
    const { score, winCount } = initialData;

    return (
        <Style.Header>
            <div className="stats">
                <SharedStyle.IconGroup>
                    <img src={clockIcon} height={VAR.HEADER_ICON_HEIGHT} alt="clockIcon"/>
                    <Clock></Clock>
                </SharedStyle.IconGroup>

                <SharedStyle.IconGroup>
                    <img src={trophyIcon} height={VAR.HEADER_ICON_HEIGHT} alt="trophyIcon"/>
                    <SharedStyle.NumberBox>{winCount}</SharedStyle.NumberBox>
                </SharedStyle.IconGroup>
            </div>

            <Style.Text>Score: {score}</Style.Text>

            <RestartButton>
                <img src={restartIcon} height={VAR.HEADER_ICON_HEIGHT} alt="restartIcon"/>
            </RestartButton>
        </Style.Header>
    );
}
