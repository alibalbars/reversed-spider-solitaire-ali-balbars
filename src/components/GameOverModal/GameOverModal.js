import React, { useState, useEffect, useContext } from "react";
import RestartButton from "../RestartButton/RestartButton";
import { TimerContext } from "../../contexts/timerContext";
import * as Style from "./gameOverModalStyle";
import Modal from "react-modal";
import { secsToTimeString } from "../../utils/timeUtils";

const customStyles = {
    content: {
        // center modal
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "3rem 5rem",

        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "arial",
        fontSize: "1.5rem",
        gap: "1rem",
        color: "white",
        backgroundColor: "rgba(40, 94, 152)",
    },
};

function GameOverModal(props) {
    function closeModal() {
        props.setIsModalOpen(false);
        console.log("geldi");
    }

    return (
        <Modal
            isOpen={props.isOpen}
            contentLabel="Game over modal"
            style={customStyles}
            ariaHideApp={false}
        >
            <h2>Congratulations, You won!</h2>
            <span>
                Time: <TimeString />
            </span>
            <Style.ButtonWrapper onClick={closeModal}>
                <RestartButton></RestartButton>
            </Style.ButtonWrapper>
            <Style.Button onClick={closeModal}> Close </Style.Button>
        </Modal>
    );
}

// To avoid re-render create external component
function TimeString() {
    const { timer } = useContext(TimerContext);
    const [myTimer, setMyTimer] = useState(timer);

    return <span>{secsToTimeString(myTimer)}</span>;
}

export default React.memo(GameOverModal);
