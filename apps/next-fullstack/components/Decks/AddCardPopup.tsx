import { useContext, useState } from "react";
import CardPopup from "./CardPopup";
import { DeckContext } from "../context/DeckContext";
import { getAuthToken } from "@lyricsfluencer/firebase-client";

export default function AddCardPopup({onAbort, cardFront}) {

    const [front, setFront] = useState(cardFront);
    const [back, setBack] = useState('');
    const {setDeckContext, selectedDeck} = useContext(DeckContext);
    
    async function onSubmit() {

        const token = await getAuthToken();
        if (!token) return;

        const res = await fetch('/flashcards/decks/cards', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,  // Send token as Bearer token
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deckName: selectedDeck,
                card: {
                    front: front,
                    back: back
                }
            })
        })
   
        if (res.status !== 200) return;
        const resBody = await res.json();
        const card = resBody.card;

        setDeckContext((prev) => prev.map(deck => {
            if (deck.deckName !== selectedDeck) return deck;
            deck.cards = [...deck.cards, card]
            return deck;
        }));
        onAbort()
    }

    return <CardPopup 
        front={front}
        back={back}
        setFront={setFront}
        setBack={setBack}
        onAbort={onAbort}
        onSubmit={onSubmit}
        showDeckSelectionMenu={true}
    />
}

AddCardPopup.defaultProps = {
    cardFront: ''
}