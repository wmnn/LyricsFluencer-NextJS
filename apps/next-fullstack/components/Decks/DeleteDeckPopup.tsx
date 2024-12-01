import { getAuthToken } from "@lyricsfluencer/firebase-client";
import DeletePopup from "./DeletePopup";
import { DeckContext } from "../context/DeckContext";
import { useContext } from "react";

export default function DeleteDeckPopup({handleAbort, deckName}) {

    const {setDeckContext} = useContext(DeckContext);
    
    async function deleteDeck() {
        const token = await getAuthToken();
        if (!token) return;
        const res = await fetch('/flashcards/decks', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,  // Send token as Bearer token
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deckName
            })
        })
        if (res.status !== 200) return;
        setDeckContext((prev) => prev.filter(deck => deck.deckName !== deckName));
        handleAbort()
    }

    return <DeletePopup handleAbort={handleAbort} onSubmit={deleteDeck} text={`Do you really want to delete the deck ?`}/>
}