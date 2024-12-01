import { useContext } from "react";
import { DeckContext } from "../context/DeckContext";
import { getSlug } from "./decks";
import { getAuthToken } from "@lyricsfluencer/firebase-client";
import DeletePopup from "./DeletePopup";

export default function DeleteCardPopup({handleAbort, card}) {

    const {setDeckContext} = useContext(DeckContext);

    async function deleteCard() {

        const deckName = getSlug()
        const token = await getAuthToken();
        if (!token) return;
        const res = await fetch('/flashcards/decks/cards', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,  // Send token as Bearer token
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deckName,
                id: card.id
            })
        })
        if (res.status !== 200) return;
        setDeckContext((prev) => prev.map(deck => {
            if (deck.deckName !== deckName) return deck;
            deck.cards = deck.cards.filter(c => c.id != card.id)
            return deck;
        }))
        handleAbort()
    }

    return <DeletePopup handleAbort={handleAbort} onSubmit={deleteCard} text={`Do you really want to delete the card ?`}/>
}