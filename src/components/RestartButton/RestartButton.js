import React, { useContext } from "react";
import { InitialDataContext } from "../../contexts/initialDataContext";
import { TimerContext } from "../../contexts/timerContext";
import * as Style from "./RestartButtonStyle";
import * as SharedStyle from "../../styles/_Shared";
import toast from "react-hot-toast";
import * as GlobalStyle from "../../styles/GlobalStyles";
import { getToastStyle } from "../../utils/utils";
import { getInitialData } from "../../logic/initialData.js";


export default function RestartButton(props) {
    const { setInitialData } = useContext(InitialDataContext);
    const { timer, setTimer } = useContext(TimerContext);

    console.log('RESTART BUTTON');
    function handleClick() {
        // set newInitialData
        const newInitialData = getInitialData();
        setInitialData(newInitialData);

        // set Timer to 0
        setTimer(0);
        
        console.log("~ _initialData", getInitialData())

        toast(<GlobalStyle.Toast>Restarted</GlobalStyle.Toast>, {
            duration: 3000,
            position: "bottom-center",
            icon: "🚀",
            style: getToastStyle(),
        });
    }

    return (
        <Style.RestartButton onClick={handleClick}>
            <SharedStyle.IconGroup>
                {props.children}
                <span>Restart</span>
            </SharedStyle.IconGroup>
        </Style.RestartButton>
    )
}
