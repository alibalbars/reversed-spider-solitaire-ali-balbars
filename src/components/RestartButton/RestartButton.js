import React, { useContext } from "react";
import { InitialDataContext } from "../../contexts/initialDataContext";
import { TimerContext } from "../../contexts/timerContext";
import * as Style from "./restartButtonStyle";
import * as SharedStyle from "../../styles/_shared";
import toast from "react-hot-toast";
import * as GlobalStyle from "../../styles/globalStyles";
import { restartGame, getToastStyle } from "../../utils/utils";


export default function RestartButton(props) {
    const { initialData, setInitialData } = useContext(InitialDataContext);
    const { setTimer } = useContext(TimerContext);

    function handleClick() {
        restartGame(initialData, setInitialData, setTimer);

        toast(<GlobalStyle.Toast>Restarted</GlobalStyle.Toast>, {
            duration: 3000,
            position: "bottom-center",
            icon: "🚀",
            style: getToastStyle(),
        });
    }

    return (
        <Style.RestartButton onClick={handleClick}  >
            <SharedStyle.IconGroup>
                {props.children}
                <span data-cy="restart">Restart</span>
            </SharedStyle.IconGroup>
        </Style.RestartButton>
    )
}
