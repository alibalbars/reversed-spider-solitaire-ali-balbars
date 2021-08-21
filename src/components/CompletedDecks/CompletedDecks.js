import React from "react";
import * as Style from "./CompletedDecksStyle";

export default function CompletedDecks() {
    return (
        <Style.CompletedDecks>
            {[...Array(8)].map((e, i) => (
                <Style.CardPlaceHolder key={i}></Style.CardPlaceHolder>
            ))}
        </Style.CompletedDecks>
    );
}
