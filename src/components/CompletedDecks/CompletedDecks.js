import React, { useContext } from "react";
import { InitialDataContext } from "../../contexts/initialDataContext";
import * as Style from "./completedDecksStyle";
import BackFaceImg from "../../assets/img/backface.webp";

export default function CompletedDecks() {
    const { initialData } = useContext(InitialDataContext);
    const { completedDeckCount } = initialData;
    
    return (
        <Style.CompletedDecks data-cy="completed-decks">
            {[...Array(8)].map((e, index) => (
                <Style.CardPlaceHolder key={index}>
                    {completedDeckCount >= index +1 ? <img src={BackFaceImg} alt="Card backface image"/>: null}
                    
                </Style.CardPlaceHolder>
            ))}
        </Style.CompletedDecks>
    );
}
