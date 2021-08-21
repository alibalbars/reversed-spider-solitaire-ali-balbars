import React, { useContext } from "react";
import { InitialDataContext } from "../../contexts/initialDataContext";
import * as Style from "./CompletedDecksStyle";
import BackFaceImg from "../../assets/img/backface.png";

export default function CompletedDecks() {
    const { initialData } = useContext(InitialDataContext);
    const { completedDeckCount } = initialData;
    // console.log('COMPLETED DECKSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS', initialData.completedDeckCount);
    
    return (
        <Style.CompletedDecks>
            {[...Array(8)].map((e, index) => (
                <Style.CardPlaceHolder key={index}>
                    {completedDeckCount >= index +1 ? <img src={BackFaceImg}/>: null}
                    
                </Style.CardPlaceHolder>
            ))}
        </Style.CompletedDecks>
    );
}
