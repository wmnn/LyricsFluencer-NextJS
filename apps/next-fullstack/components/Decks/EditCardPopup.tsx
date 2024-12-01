import { useContext, useState } from "react";
import { getAuthToken } from "@lyricsfluencer/firebase-client";
import { DeckContext } from "../context/DeckContext";
import CardPopup from "./CardPopup";

export default function EditCardPopup({card, handleAbort, deckName}) {

    const [front, setFront] = useState(card.front);
    const [back, setBack] = useState(card.back);
    const {setDeckContext} = useContext(DeckContext);
    
    async function onSubmit() {

        const token = await getAuthToken();
        if (!token) return;

        const res = await fetch('/flashcards/decks/cards', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,  // Send token as Bearer token
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deckName,
                card: {
                    ...card,
                    front: front,
                    back: back
                }
            })
        })
   
        if (res.status !== 200) return;
        const resBody = await res.json();
        setDeckContext((prev) => prev.map(deck => {
            if (deck.deckName !== deckName) return deck;
            deck.cards = deck.cards.map(c => {
                if (c.id !== card.id) return c;
                return resBody.card
            })
            return deck;
        }));
        handleAbort()
    }

    return <CardPopup 
        front={front}
        back={back}
        setFront={setFront}
        setBack={setBack}
        onAbort={handleAbort}
        onSubmit={onSubmit}
        showDeckSelectionMenu={false}
    />
}