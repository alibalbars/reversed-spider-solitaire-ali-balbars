import React, { useState, useEffect, useContext } from "react";
import { InitialDataContext } from "../../contexts/initialDataContext";
import { TimerContext } from "../../contexts/timerContext";
import * as Style from "./ClockStyle";
import * as SharedStyle from "../../styles/_Shared";
import { secsToTimeString } from "../../utils/utils";

export default function Clock() {
    const { timer, setTimer } = useContext(TimerContext);
    console.log("~ timer", timer);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [timer]);

    return (
        <Style.Clock>
            <SharedStyle.NumberBox>{secsToTimeString(timer)}</SharedStyle.NumberBox>
        </Style.Clock>
    );
}
