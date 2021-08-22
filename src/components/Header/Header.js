import React, { useState, useContext } from "react";
import { InitialDataContext } from "../../contexts/initialDataContext";
import Clock from "../Clock/Clock";
import RestartButton from "../RestartButton/RestartButton";
import * as Style from "./HeaderStyle";
import * as SharedStyle from "../../styles/_Shared";
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
                    <img src={clockIcon} height={VAR.HEADER_ICON_HEIGHT} />
                    <Clock></Clock>
                </SharedStyle.IconGroup>

                <SharedStyle.IconGroup>
                    <img src={trophyIcon} height={VAR.HEADER_ICON_HEIGHT} />
                    <SharedStyle.NumberBox>{winCount}</SharedStyle.NumberBox>
                </SharedStyle.IconGroup>
            </div>

            <Style.Text>Highest Score Ever: {score} </Style.Text>

            <RestartButton>
                <img src={restartIcon} height={VAR.HEADER_ICON_HEIGHT} />
            </RestartButton>
        </Style.Header>
    );
}
